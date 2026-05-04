import { serviceCatalog } from "../data/portalData";

function parseBirthDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? "").trim())) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
}

export function calculateAge(birthDate) {
  if (!birthDate) return "";

  const today = new Date();
  const birth = parseBirthDate(birthDate);

  if (!birth) {
    return "";
  }

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return Number.isNaN(age) ? "" : age;
}

export function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function formatDateLabel(value = new Date()) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export function createCitizenReferenceId() {
  const timestamp = Date.now().toString().slice(-6);
  return `MSWDO-${timestamp}`;
}

export function createApplicationId(serviceKey) {
  const stamp = Date.now().toString().slice(-5);
  return `${serviceKey.toUpperCase()}-${stamp}`;
}

export function createInboxId() {
  return `INBOX-${Date.now().toString().slice(-6)}`;
}

export function getServiceByKey(serviceKey) {
  return serviceCatalog.find((service) => service.key === serviceKey) || null;
}

export function formatApplicantAddress(profile) {
  return [
    profile.houseNo,
    profile.street,
    profile.barangay,
    profile.city,
    profile.province
  ]
    .filter(Boolean)
    .join(", ");
}

export function validateRegistrationData(formData, age) {
  const normalizedEmail = normalizeEmail(formData.email);
  const trimmedPhone = String(formData.phone ?? "").trim();

  if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.barangay || !normalizedEmail) {
    return "Please complete the required fields before submitting your MSWDO account.";
  }

  if (!parseBirthDate(formData.birthDate)) {
    return "Birth date must follow YYYY-MM-DD and be a valid calendar date.";
  }

  if (!age || age < 18) {
    return "Applicants must be at least 18 years old. For minors, please coordinate directly with the MSWDO office.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return "Please enter a valid email address.";
  }

  if (trimmedPhone && !/^[0-9+\-\s()]{7,20}$/.test(trimmedPhone)) {
    return "Please enter a valid contact number.";
  }

  if (formData.password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (formData.password !== formData.confirmPassword) {
    return "Password confirmation does not match.";
  }

  return "";
}

export function getProfileCompletion(profile) {
  const checks = [
    profile.firstName,
    profile.lastName,
    profile.birthDate,
    profile.sex,
    profile.civilStatus,
    profile.barangay,
    profile.city,
    profile.province,
    profile.phone,
    profile.referenceId
  ];

  const completed = checks.filter(Boolean).length;
  const total = checks.length;
  const score = Math.round((completed / total) * 100);
  const missing = [];

  if (!profile.phone) missing.push("contact number");
  if (!profile.street && !profile.houseNo) missing.push("street address");
  if (!profile.civilStatus) missing.push("civil status");

  return {
    completed,
    total,
    score,
    missing
  };
}

export function getApplicationStatusMeta(application, service) {
  const status = application?.status || service?.statusStages?.[0]?.key || "submitted";

  const stage = service?.statusStages?.find((item) => item.key === status);

  const tones = {
    submitted: "pending",
    "for-review": "info",
    "for-validation": "info",
    assessment: "info",
    verification: "info",
    scheduled: "warning",
    conference: "warning",
    "safety-check": "critical",
    referral: "warning",
    referred: "warning",
    approved: "success",
    "payout-ready": "success",
    released: "success",
    monitoring: "success",
    "active-support": "success"
  };

  const tone = tones[status] || "pending";

  return {
    label: stage?.label || "Submitted",
    tone,
    title: `${service?.title || "Request"} is ${stage?.label?.toLowerCase() || "submitted"}.`,
    description:
      application?.notes ||
      service?.summary ||
      "Your request is already in the system and can be followed up through the assigned desk."
  };
}

export function getApplicationProgress(service, status) {
  const stages = service?.statusStages || [];

  if (!stages.length) {
    return { percent: 0, currentIndex: 0, stages: [] };
  }

  const currentIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.key === status)
  );

  return {
    percent: Math.round(((currentIndex + 1) / stages.length) * 100),
    currentIndex,
    stages
  };
}

export function getApplicationCounts(applications = []) {
  const counts = {
    total: applications.length,
    active: 0,
    completed: 0,
    urgent: 0
  };

  applications.forEach((application) => {
    if (["approved", "released", "monitoring", "payout-ready", "active-support"].includes(application.status)) {
      counts.completed += 1;
    } else {
      counts.active += 1;
    }

    if (["Urgent", "Confidential"].includes(application.priority)) {
      counts.urgent += 1;
    }
  });

  return counts;
}

export function buildApplicationDraft(service, existingApplication) {
  const checklistMap = Object.fromEntries(
    service.requirements.map((label) => [
      label,
      existingApplication?.checklist?.find((item) => item.label === label)?.done || false
    ])
  );

  return {
    concernType: existingApplication?.concernType || "",
    urgency: existingApplication?.priority || (service.key === "vawdo" ? "Confidential" : "Standard"),
    contactPreference: existingApplication?.contactPreference || "SMS",
    preferredSchedule: existingApplication?.preferredSchedule || "",
    householdNote: existingApplication?.householdNote || "",
    notes: existingApplication?.notes || "",
    checklist: checklistMap
  };
}

export function validateApplicationDraft(service, draft) {
  if (!draft.concernType) {
    return `Please choose a request type for ${service.title}.`;
  }

  if (!draft.notes || draft.notes.trim().length < 12) {
    return "Please add a short but clear description so the assigned desk can review it properly.";
  }

  return "";
}

export function createApplicationRecord(service, draft, existingApplication) {
  return {
    id: existingApplication?.id || createApplicationId(service.key),
    serviceKey: service.key,
    serviceTitle: service.title,
    status: existingApplication?.status || service.statusStages[0].key,
    priority: draft.urgency,
    concernType: draft.concernType,
    contactPreference: draft.contactPreference,
    preferredSchedule: draft.preferredSchedule.trim(),
    householdNote: draft.householdNote.trim(),
    notes: draft.notes.trim(),
    officeLane: service.contactPoint,
    submittedAtLabel: existingApplication?.submittedAtLabel || formatDateLabel(),
    updatedAtLabel: formatDateLabel(),
    checklist: service.requirements.map((label) => ({
      label,
      done: !!draft.checklist[label]
    }))
  };
}

export function createInboxMessage(service, applicationId) {
  return {
    id: createInboxId(),
    title: `${service.title} request received`,
    body: `Reference ${applicationId} is now recorded in the portal. Please keep your contact details active for follow-up.`,
    tone: service.key === "vawdo" ? "critical" : "info",
    dateLabel: formatDateLabel()
  };
}
