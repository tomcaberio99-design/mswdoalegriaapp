import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { barangays } from "../data/portalData";
import { theme } from "../theme";

const civilStatuses = ["Single", "Married", "Widowed", "Separated"];

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

export default function RegisterScreen({
  formData,
  age,
  message,
  status,
  onChange,
  onSubmit,
  onNavigate
}) {
  return (
    <ScreenContainer padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable onPress={() => onNavigate("home")}>
            <Text style={styles.topAction}>Back</Text>
          </Pressable>
          <Text style={styles.topTitle}>Register</Text>
          <Pressable onPress={() => onNavigate("login")}>
            <Text style={styles.topAction}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            {[1, 2, 3, 4].map((step) => (
              <View key={step} style={styles.progressStep}>
                <View style={[styles.progressDot, step === 1 && styles.activeProgressDot]}>
                  <Text style={[styles.progressNumber, step === 1 && styles.activeProgressNumber]}>{step}</Text>
                </View>
                <Text style={styles.progressLabel}>
                  {["Personal", "Address", "Contact", "Review"][step - 1]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <TextInput style={styles.input} placeholder="First Name" value={formData.firstName} onChangeText={(value) => onChange("firstName", value)} />
          <TextInput style={styles.input} placeholder="Middle Name (Optional)" value={formData.middleName} onChangeText={(value) => onChange("middleName", value)} />
          <TextInput style={styles.input} placeholder="Last Name" value={formData.lastName} onChangeText={(value) => onChange("lastName", value)} />
          <TextInput style={styles.input} placeholder="Birth Date (YYYY-MM-DD)" value={formData.birthDate} onChangeText={(value) => onChange("birthDate", value)} />

          <ChipGroup label="Sex" value={formData.sex} options={["Female", "Male"]} onChange={(value) => onChange("sex", value)} />
          <ChipGroup label="Civil Status" value={formData.civilStatus} options={civilStatuses} onChange={(value) => onChange("civilStatus", value)} />

          <View style={styles.ageCard}>
            <Text style={styles.ageLabel}>Computed Age</Text>
            <Text style={styles.ageValue}>{age || "--"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Address and Contact</Text>

          <TextInput style={styles.input} placeholder="House No." value={formData.houseNo} onChangeText={(value) => onChange("houseNo", value)} />
          <TextInput style={styles.input} placeholder="Street / Sitio" value={formData.street} onChangeText={(value) => onChange("street", value)} />

          <Text style={styles.label}>Barangay</Text>
          <View style={styles.pickerGrid}>
            {barangays.map((barangay) => {
              const active = formData.barangay === barangay;
              return (
                <Pressable
                  key={barangay}
                  style={[styles.barangayChip, active && styles.activeBarangayChip]}
                  onPress={() => onChange("barangay", barangay)}
                >
                  <Text style={[styles.barangayText, active && styles.activeBarangayText]}>{barangay}</Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput style={styles.input} placeholder="City / Municipality" value={formData.city} onChangeText={(value) => onChange("city", value)} />
          <TextInput style={styles.input} placeholder="Province" value={formData.province} onChangeText={(value) => onChange("province", value)} />
          <TextInput style={styles.input} placeholder="Contact Number" value={formData.phone} onChangeText={(value) => onChange("phone", value)} />
          <TextInput style={styles.input} placeholder="Email Address" value={formData.email} onChangeText={(value) => onChange("email", value)} autoCapitalize="none" keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" value={formData.password} onChangeText={(value) => onChange("password", value)} secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirm Password" value={formData.confirmPassword} onChangeText={(value) => onChange("confirmPassword", value)} secureTextEntry />
        </View>

        {message ? (
          <View style={[styles.messageCard, status === "error" ? styles.errorCard : styles.successCard]}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        <Pressable style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitText}>{status === "submitting" ? "Submitting..." : "Continue to Dashboard"}</Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
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
  topAction: {
    color: theme.colors.navy,
    fontWeight: "700"
  },
  topTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800"
  },
  progressCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 16
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },
  activeProgressDot: {
    backgroundColor: theme.colors.navy
  },
  progressNumber: {
    color: theme.colors.muted,
    fontWeight: "800"
  },
  activeProgressNumber: {
    color: theme.colors.white
  },
  progressLabel: {
    color: theme.colors.muted,
    fontSize: 11
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 16
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 14
  },
  input: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    marginBottom: 12,
    color: theme.colors.text
  },
  fieldBlock: {
    marginBottom: 12
  },
  label: {
    color: theme.colors.text,
    fontWeight: "700",
    marginBottom: 8
  },
  chipRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap"
  },
  chip: {
    minWidth: 96,
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center"
  },
  activeChip: {
    backgroundColor: theme.colors.navy
  },
  chipText: {
    color: theme.colors.text,
    fontWeight: "700"
  },
  activeChipText: {
    color: theme.colors.white
  },
  ageCard: {
    backgroundColor: theme.colors.goldSoft,
    borderRadius: 18,
    padding: 14,
    marginTop: 6
  },
  ageLabel: {
    color: "#9A6A00",
    fontWeight: "700"
  },
  ageValue: {
    color: theme.colors.navyDeep,
    fontWeight: "900",
    fontSize: 28,
    marginTop: 4
  },
  pickerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12
  },
  barangayChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceAlt,
    maxWidth: "48%"
  },
  activeBarangayChip: {
    backgroundColor: theme.colors.blueSoft,
    borderWidth: 1,
    borderColor: theme.colors.blue
  },
  barangayText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700"
  },
  activeBarangayText: {
    color: theme.colors.blue
  },
  messageCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 16
  },
  errorCard: {
    backgroundColor: theme.colors.redSoft
  },
  successCard: {
    backgroundColor: theme.colors.greenSoft
  },
  messageText: {
    color: theme.colors.text,
    lineHeight: 20
  },
  submitButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  submitText: {
    color: theme.colors.white,
    fontWeight: "800",
    fontSize: 16
  }
});
