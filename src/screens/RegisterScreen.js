import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { barangays } from "../data/portalData";
import { theme } from "../theme";

const civilStatuses = ["Single", "Married", "Widowed", "Separated"];
const accountRoles = ["Citizen", "Family Representative", "Barangay Staff"];
const steps = ["Identity", "Address", "Account", "Ready"];

function ChipGroup({ label, value, options, onChange }) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chipRow}>
        {options.map((option) => {
          const active = value === option;

          return (
            <Pressable
              key={option}
              style={[styles.chip, active && styles.activeChip]}
              onPress={() => onChange(option)}
            >
              <Text style={[styles.chipText, active && styles.activeChipText]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function FieldInput({ label, placeholder, value, onChangeText, keyboardType, secureTextEntry, autoCapitalize }) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mutedLight}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize || "words"}
      />
    </View>
  );
}

export default function RegisterScreen({
  formData,
  age,
  message,
  status,
  onChange,
  onSubmit,
  onNavigate
}) {
  const [step, setStep] = useState(1);

  function canProceed() {
    if (step === 1) {
      return (
        formData.firstName &&
        formData.lastName &&
        formData.birthDate &&
        formData.sex &&
        formData.civilStatus &&
        formData.accountRole
      );
    }

    if (step === 2) {
      return formData.barangay && formData.city && formData.province;
    }

    if (step === 3) {
      return formData.email && formData.password && formData.confirmPassword;
    }

    return true;
  }

  function goBack() {
    if (step > 1) {
      setStep((current) => current - 1);
    } else {
      onNavigate("home");
    }
  }

  function goNext() {
    if (step < 4) {
      setStep((current) => current + 1);
    }
  }

  return (
    <ScreenContainer padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable onPress={goBack}>
            <Text style={styles.topAction}>{step > 1 ? "Back" : "Home"}</Text>
          </Pressable>
          <Text style={styles.topTitle}>Create Account</Text>
          <Pressable onPress={() => onNavigate("login")}>
            <Text style={styles.topAction}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>MSWDO Account Setup</Text>
          <View style={styles.progressRow}>
            {steps.map((item, index) => {
              const stepNumber = index + 1;
              const active = stepNumber === step;
              const done = step > stepNumber;

              return (
                <View key={item} style={styles.progressStep}>
                  <View style={[styles.progressDot, active && styles.progressDotActive, done && styles.progressDotDone]}>
                    <Text style={[styles.progressNumber, (active || done) && styles.progressNumberActive]}>
                      {done ? "OK" : stepNumber}
                    </Text>
                  </View>
                  <Text style={[styles.progressLabel, active && styles.progressLabelActive]}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {step === 1 ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Identity</Text>
            <FieldInput label="First Name *" placeholder="Maria" value={formData.firstName} onChangeText={(value) => onChange("firstName", value)} />
            <FieldInput label="Middle Name" placeholder="Dela Cruz" value={formData.middleName} onChangeText={(value) => onChange("middleName", value)} />
            <FieldInput label="Last Name *" placeholder="Santos" value={formData.lastName} onChangeText={(value) => onChange("lastName", value)} />
            <FieldInput
              label="Birth Date * (YYYY-MM-DD)"
              placeholder="1988-07-15"
              value={formData.birthDate}
              onChangeText={(value) => onChange("birthDate", value)}
              keyboardType="numeric"
              autoCapitalize="none"
            />
            {age ? (
              <View style={styles.ageCard}>
                <Text style={styles.ageLabel}>Computed Age</Text>
                <Text style={styles.ageValue}>{age} years old</Text>
              </View>
            ) : null}
            <ChipGroup label="Sex *" value={formData.sex} options={["Female", "Male"]} onChange={(value) => onChange("sex", value)} />
            <ChipGroup label="Civil Status *" value={formData.civilStatus} options={civilStatuses} onChange={(value) => onChange("civilStatus", value)} />
            <ChipGroup label="Account Role *" value={formData.accountRole} options={accountRoles} onChange={(value) => onChange("accountRole", value)} />
          </View>
        ) : null}

        {step === 2 ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Address</Text>
            <FieldInput label="House No. / Purok" placeholder="Purok 2" value={formData.houseNo} onChangeText={(value) => onChange("houseNo", value)} />
            <FieldInput label="Street / Sitio" placeholder="Poblacion" value={formData.street} onChangeText={(value) => onChange("street", value)} />
            <Text style={styles.label}>Barangay *</Text>
            <View style={styles.barangayGrid}>
              {barangays.map((barangay) => {
                const active = formData.barangay === barangay;

                return (
                  <Pressable
                    key={barangay}
                    style={[styles.barangayChip, active && styles.barangayChipActive]}
                    onPress={() => onChange("barangay", barangay)}
                  >
                    <Text style={[styles.barangayChipText, active && styles.barangayChipTextActive]}>{barangay}</Text>
                  </Pressable>
                );
              })}
            </View>
            <FieldInput label="City / Municipality *" placeholder="Alegria" value={formData.city} onChangeText={(value) => onChange("city", value)} />
            <FieldInput label="Province *" placeholder="Surigao del Norte" value={formData.province} onChangeText={(value) => onChange("province", value)} />
          </View>
        ) : null}

        {step === 3 ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contact and Security</Text>
            <FieldInput
              label="Contact Number"
              placeholder="09XX XXX XXXX"
              value={formData.phone}
              onChangeText={(value) => onChange("phone", value)}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
            <FieldInput
              label="Email Address *"
              placeholder="sample@email.com"
              value={formData.email}
              onChangeText={(value) => onChange("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FieldInput
              label="Password *"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChangeText={(value) => onChange("password", value)}
              secureTextEntry
              autoCapitalize="none"
            />
            <FieldInput
              label="Confirm Password *"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChangeText={(value) => onChange("confirmPassword", value)}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        ) : null}

        {step === 4 ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Ready for Services</Text>
            <ReviewRow label="Name" value={[formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(" ")} />
            <ReviewRow label="Role" value={formData.accountRole || "-"} />
            <ReviewRow label="Birth Date" value={formData.birthDate || "-"} />
            <ReviewRow label="Barangay" value={formData.barangay || "-"} />
            <ReviewRow label="Email" value={formData.email || "-"} />
            <View style={styles.reviewNotice}>
              <Text style={styles.reviewNoticeTitle}>What happens next</Text>
              <Text style={styles.reviewNoticeText}>
                After account creation, you can open any MSWDO service desk, submit a request, and track updates from the same profile.
              </Text>
            </View>
          </View>
        ) : null}

        {message ? (
          <View style={[styles.messageCard, status === "error" ? styles.errorCard : styles.successCard]}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        <View style={styles.navButtons}>
          {step < 4 ? (
            <Pressable style={[styles.nextButton, !canProceed() && styles.disabledButton]} onPress={goNext} disabled={!canProceed()}>
              <Text style={styles.nextButtonText}>Continue</Text>
            </Pressable>
          ) : (
            <Pressable style={[styles.submitButton, status === "submitting" && styles.disabledButton]} onPress={onSubmit} disabled={status === "submitting"}>
              <Text style={styles.submitText}>{status === "submitting" ? "Creating Account..." : "Create Account"}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function ReviewRow({ label, value }) {
  return (
    <View style={styles.reviewRow}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18
  },
  topTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  topAction: {
    color: theme.colors.navy,
    fontWeight: "700",
    fontSize: 15
  },
  progressCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 16
  },
  progressTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 14
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressStep: {
    alignItems: "center",
    flex: 1
  },
  progressDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderWidth: 1.5,
    borderColor: theme.colors.border
  },
  progressDotActive: {
    backgroundColor: theme.colors.navy,
    borderColor: theme.colors.navy
  },
  progressDotDone: {
    backgroundColor: theme.colors.green,
    borderColor: theme.colors.green
  },
  progressNumber: {
    color: theme.colors.muted,
    fontWeight: "800",
    fontSize: 11
  },
  progressNumberActive: {
    color: theme.colors.white
  },
  progressLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: "700"
  },
  progressLabelActive: {
    color: theme.colors.navy
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
    marginBottom: 16
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 18
  },
  fieldBlock: {
    marginBottom: 14
  },
  label: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 8
  },
  input: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    color: theme.colors.text,
    fontSize: 16
  },
  chipRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap"
  },
  chip: {
    minHeight: 46,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: theme.colors.border
  },
  activeChip: {
    backgroundColor: theme.colors.navy,
    borderColor: theme.colors.navy
  },
  chipText: {
    color: theme.colors.text,
    fontWeight: "700"
  },
  activeChipText: {
    color: theme.colors.white
  },
  ageCard: {
    backgroundColor: theme.colors.blueSoft,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14
  },
  ageLabel: {
    color: theme.colors.blue,
    fontWeight: "700",
    fontSize: 12
  },
  ageValue: {
    color: theme.colors.navyDeep,
    fontWeight: "900",
    fontSize: 24,
    marginTop: 2
  },
  barangayGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14
  },
  barangayChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: theme.colors.border
  },
  barangayChipActive: {
    backgroundColor: theme.colors.blueSoft,
    borderColor: theme.colors.blue
  },
  barangayChipText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700"
  },
  barangayChipTextActive: {
    color: theme.colors.blue
  },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight
  },
  reviewLabel: {
    color: theme.colors.muted,
    fontWeight: "600",
    fontSize: 13
  },
  reviewValue: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 13,
    maxWidth: "55%",
    textAlign: "right"
  },
  reviewNotice: {
    marginTop: 18,
    borderRadius: 16,
    padding: 14,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.borderLight
  },
  reviewNoticeTitle: {
    color: theme.colors.navy,
    fontWeight: "900",
    fontSize: 13,
    marginBottom: 6
  },
  reviewNoticeText: {
    color: theme.colors.muted,
    lineHeight: 19,
    fontSize: 12
  },
  messageCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1
  },
  errorCard: {
    backgroundColor: theme.colors.redSoft,
    borderColor: "#F5C0BA"
  },
  successCard: {
    backgroundColor: theme.colors.greenSoft,
    borderColor: "#A5D6BE"
  },
  messageText: {
    color: theme.colors.text,
    lineHeight: 20,
    fontWeight: "600"
  },
  navButtons: {
    gap: 12,
    marginBottom: 20
  },
  nextButton: {
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadowMd
  },
  disabledButton: {
    opacity: 0.45
  },
  nextButtonText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 17
  },
  submitButton: {
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: theme.colors.green,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadowMd
  },
  submitText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 16
  }
});
