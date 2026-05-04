export const barangays = [
  "Alipao",
  "Anahaw",
  "Budlingin",
  "Camp Eduard (Geotina)",
  "Ferlda",
  "Gamuton",
  "Don Julio Ouano",
  "Ombong",
  "Poblacion (Alegria)",
  "Pongtud",
  "San Juan",
  "San Pedro"
];

export const serviceCatalog = [
  {
    key: "assistance",
    title: "Assistance",
    shortName: "AID",
    accent: "gold",
    summary: "Financial, medical, burial, food, and emergency support requests.",
    audience: "Residents needing immediate social welfare intervention.",
    responseTime: "1 to 3 working days after assessment",
    contactPoint: "Social Assistance Desk",
    privacyNote: "Personal and household information is reviewed only by authorized MSWDO staff.",
    eligibility: [
      "Resident of Alegria or referred by an authorized barangay office",
      "Valid reason for assistance and supporting documents when available",
      "Reachable contact number for interview or follow-up"
    ],
    requirements: [
      "Valid ID of applicant or representative",
      "Barangay certification or referral",
      "Proof of need such as medical abstract, quotation, or incident report"
    ],
    concernTypes: [
      "Medical Assistance",
      "Burial Assistance",
      "Food Support",
      "Transport Support",
      "Emergency Crisis Intervention"
    ],
    noteLabel: "Describe the assistance needed",
    scheduleLabel: "Preferred interview date or office visit",
    statusStages: [
      { key: "submitted", label: "Submitted" },
      { key: "assessment", label: "Assessment" },
      { key: "scheduled", label: "Interview Scheduled" },
      { key: "released", label: "Support Released" }
    ]
  },
  {
    key: "cicl",
    title: "CICL",
    shortName: "CICL",
    accent: "teal",
    summary: "Case intake, intervention planning, and referral support for children in conflict with the law.",
    audience: "MSWDO staff, guardians, and authorized focal persons.",
    responseTime: "Handled according to case urgency and legal timeline",
    contactPoint: "CICL Focal Desk",
    privacyNote: "This module contains sensitive case information and must stay restricted to authorized users.",
    eligibility: [
      "Referral from barangay, police, school, or court partner",
      "Case details for immediate assessment",
      "Guardian or contact person information when available"
    ],
    requirements: [
      "Referral note or incident summary",
      "Basic child and guardian information",
      "Available case documents or mediation records"
    ],
    concernTypes: [
      "Initial Intake",
      "Intervention Follow-up",
      "Court or Diversion Schedule",
      "Family Conference",
      "Referral to Partner Agency"
    ],
    noteLabel: "Enter the case overview or referral reason",
    scheduleLabel: "Preferred coordination date",
    statusStages: [
      { key: "submitted", label: "Intake Logged" },
      { key: "assessment", label: "Case Assessment" },
      { key: "conference", label: "Conference Scheduled" },
      { key: "active-support", label: "Intervention Active" }
    ]
  },
  {
    key: "vawdo",
    title: "VAWDO",
    shortName: "VAW",
    accent: "rose",
    summary: "Confidential violence response, safety planning, and coordinated referral services.",
    audience: "Survivors, family contacts, and authorized MSWDO responders.",
    responseTime: "Urgent concerns should be acted on immediately",
    contactPoint: "VAW Desk",
    privacyNote: "Use neutral language in shared devices. Sensitive details should be discussed with the desk privately.",
    eligibility: [
      "Survivor, family member, or authorized reporter",
      "Safe contact channel or trusted representative",
      "Emergency details for urgent intervention when applicable"
    ],
    requirements: [
      "Safe contact person or number",
      "Incident summary or protection concern",
      "Available medico-legal, barangay, or police records if already obtained"
    ],
    concernTypes: [
      "Emergency Reporting",
      "Safety Planning",
      "Legal Referral",
      "Shelter or Temporary Protection",
      "Psychosocial Support"
    ],
    noteLabel: "Enter only the details that are safe to save on this device",
    scheduleLabel: "Preferred safe callback time",
    statusStages: [
      { key: "submitted", label: "Report Received" },
      { key: "safety-check", label: "Safety Check" },
      { key: "referral", label: "Referral Arranged" },
      { key: "active-support", label: "Case Support Ongoing" }
    ]
  },
  {
    key: "senior",
    title: "Senior Citizen",
    shortName: "SC",
    accent: "blue",
    summary: "Registration, validation, social pension advisories, and benefit tracking for senior citizens.",
    audience: "Senior citizens, family representatives, and validation staff.",
    responseTime: "Depends on document review and payout schedule",
    contactPoint: "Senior Citizen Desk",
    privacyNote: "Keep the reference number and contact details updated for follow-up and payout notices.",
    eligibility: [
      "Senior citizen or authorized representative",
      "Resident information complete and valid",
      "Documents ready for barangay or municipal validation"
    ],
    requirements: [
      "Senior citizen valid ID or proof of age",
      "Barangay certificate of residency",
      "Supporting civil registry document when requested"
    ],
    concernTypes: [
      "New Registration",
      "Profile Update",
      "Pension or Payout Concern",
      "Replacement ID Concern",
      "Benefit Verification"
    ],
    noteLabel: "Describe the senior citizen concern or request",
    scheduleLabel: "Preferred validation or office visit date",
    statusStages: [
      { key: "submitted", label: "Submitted" },
      { key: "for-validation", label: "For Validation" },
      { key: "approved", label: "Approved" },
      { key: "payout-ready", label: "Payout Ready" }
    ]
  },
  {
    key: "solo-parent",
    title: "Solo Parent",
    shortName: "SP",
    accent: "orange",
    summary: "Solo parent ID application, renewal, seminar schedules, and benefit endorsement tracking.",
    audience: "Solo parents and family welfare desk staff.",
    responseTime: "2 to 5 working days depending on document completeness",
    contactPoint: "Solo Parent Desk",
    privacyNote: "Uploaded details are used only for eligibility checking, ID processing, and LGU follow-up.",
    eligibility: [
      "Solo parent or authorized representative",
      "Supporting proof for solo parent status",
      "Complete household and contact information"
    ],
    requirements: [
      "Valid ID",
      "Barangay certificate or proof of residency",
      "Supporting proof of solo parent circumstance"
    ],
    concernTypes: [
      "New Solo Parent ID",
      "ID Renewal",
      "Benefit Endorsement",
      "Seminar Schedule",
      "Profile Correction"
    ],
    noteLabel: "Describe the solo parent request",
    scheduleLabel: "Preferred seminar or office visit date",
    statusStages: [
      { key: "submitted", label: "Submitted" },
      { key: "for-review", label: "For Review" },
      { key: "scheduled", label: "Schedule Set" },
      { key: "approved", label: "Approved" }
    ]
  },
  {
    key: "4ps",
    title: "4Ps",
    shortName: "4PS",
    accent: "plum",
    summary: "Household coordination, compliance reminders, and local referral support linked to 4Ps concerns.",
    audience: "4Ps households coordinating with local MSWDO staff.",
    responseTime: "Based on referral and validation schedules",
    contactPoint: "4Ps Link Desk",
    privacyNote: "The app can help track local follow-up, but final eligibility and grants remain under official DSWD processes.",
    eligibility: [
      "Household seeking local 4Ps coordination or follow-up",
      "Updated household contact and child information",
      "Referral or compliance issue requiring assistance"
    ],
    requirements: [
      "Household head ID or representative ID",
      "Child or household document relevant to the concern",
      "Referral note, school, or health compliance document if available"
    ],
    concernTypes: [
      "Household Profile Update",
      "Compliance Reminder",
      "Referral Follow-up",
      "Document Concern",
      "Community Assembly Schedule"
    ],
    noteLabel: "Describe the household concern or compliance question",
    scheduleLabel: "Preferred follow-up date",
    statusStages: [
      { key: "submitted", label: "Submitted" },
      { key: "verification", label: "Verification" },
      { key: "referred", label: "Referred" },
      { key: "monitoring", label: "Monitoring" }
    ]
  }
];

export const homeAnnouncements = [
  {
    id: "ann-1",
    title: "Municipal help desk is open for assisted registration",
    body: "Walk-in support remains available for residents who need help creating accounts or uploading requirements.",
    tone: "info"
  },
  {
    id: "ann-2",
    title: "Bring original documents during scheduled validation",
    body: "Submitted online details still need in-person checking when requested by the assigned desk.",
    tone: "warning"
  },
  {
    id: "ann-3",
    title: "Confidential cases can use safe callback instructions",
    body: "For VAWDO and other sensitive concerns, residents may specify the safest contact time or representative.",
    tone: "critical"
  }
];

export const officeContacts = {
  office: "MSWDO Alegria",
  mobile: "0912 888 1000",
  landline: "(086) 123-4567",
  email: "mswdo.alegria@example.gov.ph",
  address: "Municipal Hall, Alegria, Surigao del Norte",
  hours: "Monday to Friday, 8:00 AM to 5:00 PM"
};

export const emergencyContacts = [
  { label: "VAWDO Hotline", value: "0917 700 1122" },
  { label: "MSWDO Action Desk", value: "0912 888 1000" },
  { label: "Alegria PNP", value: "0998 222 4400" }
];

export const feedbackPrompts = [
  "Was the request process easy to understand?",
  "Which service still needs clearer instructions?",
  "Did staff follow-up happen on time?"
];
