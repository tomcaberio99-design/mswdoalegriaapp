import React, { useMemo, useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import PayoutScreen from "./src/screens/PayoutScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { calculateAge, createReferenceId, getPayoutStatus } from "./src/utils/portalLogic";

const initialForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  sex: "",
  civilStatus: "",
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
  createdAtLabel: "May 18, 2026",
  profile: {
    firstName: "Maria",
    middleName: "Dela Cruz",
    lastName: "Santos",
    fullName: "Maria D. Santos",
    birthDate: "1960-05-15",
    age: 65,
    sex: "Female",
    civilStatus: "Married",
    houseNo: "Purok 2",
    street: "Poblacion",
    barangay: "Poblacion (Alegria)",
    city: "Alegria",
    province: "Surigao del Norte",
    phone: "0912 345 6789",
    referenceId: "SC-2025-000123"
  }
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [accounts, setAccounts] = useState([demoAccount]);
  const [sessionEmail, setSessionEmail] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [registerStatus, setRegisterStatus] = useState("idle");
  const [registerMessage, setRegisterMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const currentUser = useMemo(
    () => accounts.find((account) => account.email === sessionEmail) || null,
    [accounts, sessionEmail]
  );

  const age = useMemo(() => calculateAge(formData.birthDate), [formData.birthDate]);
  const payoutStatus = getPayoutStatus(currentUser?.profile?.barangay);

  function navigate(screen) {
    const protectedScreens = ["dashboard", "payout", "profile"];

    if (protectedScreens.includes(screen) && !currentUser) {
      setLoginMessage("Please sign in first to access your account.");
      setActiveScreen("login");
      return;
    }

    setActiveScreen(screen);
  }

  function handleFormChange(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleRegister() {
    if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.barangay || !formData.email) {
      setRegisterStatus("error");
      setRegisterMessage("Please complete all required fields before submitting.");
      return;
    }

    if (!age || age < 60) {
      setRegisterStatus("error");
      setRegisterMessage("Applicants must be at least 60 years old to continue.");
      return;
    }

    if (formData.password.length < 6) {
      setRegisterStatus("error");
      setRegisterMessage("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setRegisterStatus("error");
      setRegisterMessage("Password confirmation does not match.");
      return;
    }

    const email = formData.email.trim().toLowerCase();

    if (accounts.some((account) => account.email === email)) {
      setRegisterStatus("error");
      setRegisterMessage("An account with this email address already exists.");
      return;
    }

    const nextAccount = {
      email,
      password: formData.password,
      createdAtLabel: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
      profile: {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        fullName: [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(" "),
        birthDate: formData.birthDate,
        age,
        sex: formData.sex,
        civilStatus: formData.civilStatus,
        houseNo: formData.houseNo,
        street: formData.street,
        barangay: formData.barangay,
        city: formData.city,
        province: formData.province,
        phone: formData.phone,
        referenceId: createReferenceId()
      }
    };

    setAccounts((current) => [...current, nextAccount]);
    setSessionEmail(email);
    setRegisterStatus("success");
    setRegisterMessage("Registration completed successfully.");
    setFormData(initialForm);
    setActiveScreen("dashboard");
  }

  function handleLogin() {
    const email = loginEmail.trim().toLowerCase();
    const matchedAccount = accounts.find((account) => account.email === email);

    if (!matchedAccount || matchedAccount.password !== loginPassword) {
      setLoginMessage("Invalid email address or password.");
      return;
    }

    setSessionEmail(matchedAccount.email);
    setLoginMessage("");
    setActiveScreen("dashboard");
  }

  function handleLogout() {
    setSessionEmail(null);
    setLoginEmail("");
    setLoginPassword("");
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

  if (activeScreen === "dashboard" && currentUser) {
    return <DashboardScreen user={currentUser} payoutStatus={payoutStatus} onNavigate={navigate} />;
  }

  if (activeScreen === "payout" && currentUser) {
    return <PayoutScreen payoutStatus={payoutStatus} onNavigate={navigate} />;
  }

  if (activeScreen === "profile" && currentUser) {
    return <ProfileScreen user={currentUser} onNavigate={navigate} onLogout={handleLogout} />;
  }

  return <HomeScreen onNavigate={navigate} />;
}
