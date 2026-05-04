import React, { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ServiceScreen from "./src/screens/ServiceScreen";
import ApplicationFormScreen from "./src/screens/ApplicationFormScreen";
import InboxScreen from "./src/screens/InboxScreen";
import { serviceCatalog } from "./src/data/portalData";
import {
  buildApplicationDraft,
  calculateAge,
  createApplicationRecord,
  createCitizenReferenceId,
  createInboxMessage,
  formatDateLabel,
  getServiceByKey,
  normalizeEmail,
  validateApplicationDraft,
  validateRegistrationData
} from "./src/utils/portalLogic";

const initialForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  sex: "",
  civilStatus: "",
  accountRole: "",
  houseNo: "",
  street: "",
  barangay: "",
  city: "Alegria",
  province: "Surigao del Norte",
  phone: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const demoAccount = {
  email: "maria.santos@email.com",
  password: "Password123",
  createdAtLabel: "May 1, 2026",
  profile: {
    firstName: "Maria",
    middleName: "Dela Cruz",
    lastName: "Santos",
    fullName: "Maria D. Santos",
    birthDate: "1960-05-15",
    age: 65,
    sex: "Female",
    civilStatus: "Married",
    accountRole: "Citizen",
    houseNo: "Purok 2",
    street: "Poblacion",
    barangay: "Poblacion (Alegria)",
    city: "Alegria",
    province: "Surigao del Norte",
    phone: "0912 345 6789",
    referenceId: "MSWDO-240115"
  },
  applications: [
    {
      id: "ASSISTANCE-10241",
      serviceKey: "assistance",
      serviceTitle: "Assistance",
      status: "scheduled",
      priority: "Standard",
      concernType: "Medical Assistance",
      contactPreference: "SMS",
      preferredSchedule: "May 15 morning",
      householdNote: "Lives with daughter and one grandchild.",
      notes: "Requesting medical assistance for maintenance medicine and laboratory follow-up.",
      officeLane: "Social Assistance Desk",
      submittedAtLabel: "May 2, 2026",
      updatedAtLabel: "May 4, 2026",
      checklist: [
        { label: "Valid ID of applicant or representative", done: true },
        { label: "Barangay certification or referral", done: true },
        { label: "Proof of need such as medical abstract, quotation, or incident report", done: false }
      ]
    },
    {
      id: "SENIOR-10242",
      serviceKey: "senior",
      serviceTitle: "Senior Citizen",
      status: "approved",
      priority: "Standard",
      concernType: "Benefit Verification",
      contactPreference: "Call",
      preferredSchedule: "",
      householdNote: "",
      notes: "Senior citizen profile has been validated and is waiting for the next payout advisory.",
      officeLane: "Senior Citizen Desk",
      submittedAtLabel: "May 1, 2026",
      updatedAtLabel: "May 4, 2026",
      checklist: [
        { label: "Senior citizen valid ID or proof of age", done: true },
        { label: "Barangay certificate of residency", done: true },
        { label: "Supporting civil registry document when requested", done: true }
      ]
    },
    {
      id: "SOLO-PARENT-10243",
      serviceKey: "solo-parent",
      serviceTitle: "Solo Parent",
      status: "for-review",
      priority: "Standard",
      concernType: "ID Renewal",
      contactPreference: "Email",
      preferredSchedule: "Any weekday afternoon",
      householdNote: "Needs updated ID before school enrollment season.",
      notes: "Submitted renewal concern and waiting for document review from the solo parent desk.",
      officeLane: "Solo Parent Desk",
      submittedAtLabel: "May 3, 2026",
      updatedAtLabel: "May 4, 2026",
      checklist: [
        { label: "Valid ID", done: true },
        { label: "Barangay certificate or proof of residency", done: true },
        { label: "Supporting proof of solo parent circumstance", done: false }
      ]
    }
  ],
  inbox: [
    {
      id: "INBOX-100001",
      title: "Welcome to the MSWDO portal",
      body: "Your citizen account can now be used to track service requests and receive follow-up notices.",
      tone: "info",
      dateLabel: "May 1, 2026"
    },
    {
      id: "INBOX-100002",
      title: "Assistance interview schedule updated",
      body: "Please prepare your referral note and medical abstract before the scheduled office visit.",
      tone: "info",
      dateLabel: "May 4, 2026"
    },
    {
      id: "INBOX-100003",
      title: "Safe contact reminder",
      body: "Confidential services may use a trusted contact person or preferred callback time when needed.",
      tone: "critical",
      dateLabel: "May 4, 2026"
    }
  ]
};

const STORAGE_KEYS = {
  accounts: "mswdo-accounts",
  sessionEmail: "mswdo-session-email"
};

function readWebStorage(key, fallback) {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [selectedServiceKey, setSelectedServiceKey] = useState(serviceCatalog[0].key);
  const [accounts, setAccounts] = useState(() => readWebStorage(STORAGE_KEYS.accounts, [demoAccount]));
  const [sessionEmail, setSessionEmail] = useState(() => readWebStorage(STORAGE_KEYS.sessionEmail, null));
  const [formData, setFormData] = useState(initialForm);
  const [registerStatus, setRegisterStatus] = useState("idle");
  const [registerMessage, setRegisterMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [applicationDraft, setApplicationDraft] = useState(() => buildApplicationDraft(serviceCatalog[0], null));
  const [applicationStatus, setApplicationStatus] = useState("idle");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [requestsMessage, setRequestsMessage] = useState("");

  const currentUser = useMemo(
    () => accounts.find((account) => account.email === sessionEmail) || null,
    [accounts, sessionEmail]
  );

  const selectedService = useMemo(
    () => getServiceByKey(selectedServiceKey) || serviceCatalog[0],
    [selectedServiceKey]
  );

  const selectedApplication = useMemo(
    () => currentUser?.applications?.find((application) => application.serviceKey === selectedServiceKey) || null,
    [currentUser, selectedServiceKey]
  );

  const age = useMemo(() => calculateAge(formData.birthDate), [formData.birthDate]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return;
    }

    if (sessionEmail) {
      window.localStorage.setItem(STORAGE_KEYS.sessionEmail, JSON.stringify(sessionEmail));
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.sessionEmail);
    }
  }, [sessionEmail]);

  function navigate(screen) {
    const protectedScreens = ["requests", "inbox", "profile", "apply"];

    if (protectedScreens.includes(screen) && !currentUser) {
      setLoginMessage("Please sign in first to access your MSWDO account.");
      setActiveScreen("login");
      return;
    }

    if (screen !== "apply") {
      setApplicationMessage("");
      setApplicationStatus("idle");
    }

    setLoginMessage("");
    setRegisterMessage("");
    setProfileMessage("");
    setActiveScreen(screen);
  }

  function openService(serviceKey) {
    setSelectedServiceKey(serviceKey);
    setActiveScreen("service");
  }

  function startApplication(serviceKey) {
    const service = getServiceByKey(serviceKey);

    if (!service) {
      return;
    }

    if (!currentUser) {
      setSelectedServiceKey(serviceKey);
      setLoginMessage("Sign in to submit and track requests.");
      setActiveScreen("login");
      return;
    }

    const existingApplication =
      currentUser.applications.find((application) => application.serviceKey === serviceKey) || null;

    setSelectedServiceKey(serviceKey);
    setApplicationDraft(buildApplicationDraft(service, existingApplication));
    setApplicationMessage("");
    setApplicationStatus("idle");
    setActiveScreen("apply");
  }

  function handleFormChange(field, value) {
    if (registerStatus !== "idle") {
      setRegisterStatus("idle");
      setRegisterMessage("");
    }

    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleRegister() {
    setRegisterStatus("submitting");
    setRegisterMessage("");

    const validationMessage = validateRegistrationData(formData, age);

    if (validationMessage) {
      setRegisterStatus("error");
      setRegisterMessage(validationMessage);
      return;
    }

    const email = normalizeEmail(formData.email);

    if (accounts.some((account) => account.email === email)) {
      setRegisterStatus("error");
      setRegisterMessage("An account with this email address already exists.");
      return;
    }

    const nextAccount = {
      email,
      password: formData.password,
      createdAtLabel: formatDateLabel(),
      profile: {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        fullName: [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(" "),
        birthDate: formData.birthDate,
        age,
        sex: formData.sex,
        civilStatus: formData.civilStatus,
        accountRole: formData.accountRole,
        houseNo: formData.houseNo,
        street: formData.street,
        barangay: formData.barangay,
        city: formData.city,
        province: formData.province,
        phone: formData.phone.trim(),
        referenceId: createCitizenReferenceId()
      },
      applications: [],
      inbox: [
        {
          id: "INBOX-WELCOME",
          title: "Account created successfully",
          body: "You can now submit requests to any MSWDO service desk and track status updates here.",
          tone: "info",
          dateLabel: formatDateLabel()
        }
      ]
    };

    setAccounts((current) => [...current, nextAccount]);
    setSessionEmail(email);
    setRegisterStatus("success");
    setRegisterMessage("Account created successfully.");
    setFormData(initialForm);
    setRequestsMessage("Your account is ready. Start a request from any service card.");
    setActiveScreen("home");
  }

  function handleLogin() {
    const email = normalizeEmail(loginEmail);
    const matchedAccount = accounts.find((account) => account.email === email);

    if (!matchedAccount || matchedAccount.password !== loginPassword) {
      setLoginMessage("Invalid email address or password.");
      return;
    }

    setSessionEmail(matchedAccount.email);
    setLoginMessage("");
    setActiveScreen("home");
  }

  function handleSaveProfile(profileUpdates) {
    if (!currentUser) {
      return false;
    }

    setProfileMessage("");

    if (!profileUpdates.barangay || !profileUpdates.city || !profileUpdates.province) {
      setProfileMessage("Barangay, city, and province are required.");
      return false;
    }

    if (profileUpdates.phone && !/^[0-9+\-\s()]{7,20}$/.test(profileUpdates.phone.trim())) {
      setProfileMessage("Please enter a valid contact number.");
      return false;
    }

    const nextProfile = {
      ...currentUser.profile,
      ...profileUpdates,
      phone: profileUpdates.phone.trim()
    };

    setAccounts((current) =>
      current.map((account) =>
        account.email === currentUser.email
          ? {
              ...account,
              profile: nextProfile
            }
          : account
      )
    );
    setProfileMessage("Profile updated successfully.");
    return true;
  }

  function handleApplicationChange(field, value) {
    if (applicationStatus !== "idle") {
      setApplicationStatus("idle");
      setApplicationMessage("");
    }

    setApplicationDraft((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleToggleChecklist(label) {
    setApplicationDraft((current) => ({
      ...current,
      checklist: {
        ...current.checklist,
        [label]: !current.checklist[label]
      }
    }));
  }

  function handleSubmitApplication() {
    if (!currentUser) {
      return;
    }

    setApplicationStatus("submitting");
    setApplicationMessage("");

    const validationMessage = validateApplicationDraft(selectedService, applicationDraft);

    if (validationMessage) {
      setApplicationStatus("error");
      setApplicationMessage(validationMessage);
      return;
    }

    const existingApplication =
      currentUser.applications.find((application) => application.serviceKey === selectedService.key) || null;

    const nextApplication = createApplicationRecord(selectedService, applicationDraft, existingApplication);
    const nextInboxItem = createInboxMessage(selectedService, nextApplication.id);

    setAccounts((current) =>
      current.map((account) => {
        if (account.email !== currentUser.email) {
          return account;
        }

        const remainingApplications = account.applications.filter(
          (application) => application.serviceKey !== selectedService.key
        );

        return {
          ...account,
          applications: [nextApplication, ...remainingApplications],
          inbox: [nextInboxItem, ...account.inbox]
        };
      })
    );

    setApplicationStatus("success");
    setApplicationMessage("Request saved successfully.");
    setRequestsMessage(`${selectedService.title} request saved and sent to the assigned desk.`);
    setActiveScreen("requests");
  }

  function handleLogout() {
    setSessionEmail(null);
    setLoginEmail("");
    setLoginPassword("");
    setLoginMessage("");
    setProfileMessage("");
    setRequestsMessage("");
    setActiveScreen("home");
  }

  if (activeScreen === "register") {
    return (
      <RegisterScreen
        formData={formData}
        age={age}
        status={registerStatus}
        message={registerMessage}
        onChange={handleFormChange}
        onSubmit={handleRegister}
        onNavigate={navigate}
      />
    );
  }

  if (activeScreen === "login") {
    return (
      <LoginScreen
        email={loginEmail}
        password={loginPassword}
        message={loginMessage}
        onEmailChange={setLoginEmail}
        onPasswordChange={setLoginPassword}
        onLogin={handleLogin}
        onNavigate={navigate}
      />
    );
  }

  if (activeScreen === "service") {
    return (
      <ServiceScreen
        service={selectedService}
        application={selectedApplication}
        onNavigate={navigate}
        onStartApplication={startApplication}
      />
    );
  }

  if (activeScreen === "apply") {
    return (
      <ApplicationFormScreen
        service={selectedService}
        draft={applicationDraft}
        message={applicationMessage}
        status={applicationStatus}
        onChange={handleApplicationChange}
        onToggleChecklist={handleToggleChecklist}
        onSubmit={handleSubmitApplication}
        onNavigate={navigate}
      />
    );
  }

  if (activeScreen === "requests" && currentUser) {
    return (
      <DashboardScreen
        user={currentUser}
        applications={currentUser.applications}
        bannerMessage={requestsMessage}
        onClearBanner={() => setRequestsMessage("")}
        onOpenService={openService}
        onStartApplication={startApplication}
        onNavigate={navigate}
      />
    );
  }

  if (activeScreen === "inbox" && currentUser) {
    return <InboxScreen inbox={currentUser.inbox} onNavigate={navigate} />;
  }

  if (activeScreen === "profile" && currentUser) {
    return (
      <ProfileScreen
        user={currentUser}
        onNavigate={navigate}
        onLogout={handleLogout}
        onSaveProfile={handleSaveProfile}
        message={profileMessage}
      />
    );
  }

  return (
    <HomeScreen
      currentUser={currentUser}
      applications={currentUser?.applications || []}
      inboxCount={currentUser?.inbox?.length || 0}
      onNavigate={navigate}
      onOpenService={openService}
    />
  );
}
