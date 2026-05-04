import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { theme } from "../theme";

const urgencyOptions = ["Standard", "Urgent", "Confidential"];
const contactOptions = ["SMS", "Call", "Email", "Barangay Relay"];

export default function ApplicationFormScreen({
  service,
  draft,
  message,
  status,
  onChange,
  onToggleChecklist,
  onSubmit,
  onNavigate
}) {
  return (
    <ScreenContainer>
      <Pressable style={styles.backButton} onPress={() => onNavigate("service")}>
        <Text style={styles.backButtonText}>Back to Service</Text>
      </Pressable>

      <View style={styles.headerCard}>
        <Text style={styles.headerLabel}>REQUEST FORM</Text>
        <Text style={styles.headerTitle}>{service.title}</Text>
        <Text style={styles.headerCopy}>
          Fill out the details below so the assigned desk can review the concern and prepare the next step.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1. Request Type</Text>
        <View style={styles.chipRow}>
          {service.concernTypes.map((item) => {
            const active = draft.concernType === item;

            return (
              <Pressable
                key={item}
                style={[styles.chip, active && styles.activeChip]}
                onPress={() => onChange("concernType", item)}
              >
                <Text style={[styles.chipText, active && styles.activeChipText]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>2. Contact and Urgency</Text>
        <Text style={styles.label}>Urgency</Text>
        <View style={styles.chipRow}>
          {urgencyOptions.map((item) => {
            const active = draft.urgency === item;

            return (
              <Pressable
                key={item}
                style={[styles.chip, active && styles.activeChip]}
                onPress={() => onChange("urgency", item)}
              >
                <Text style={[styles.chipText, active && styles.activeChipText]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Preferred contact</Text>
        <View style={styles.chipRow}>
          {contactOptions.map((item) => {
            const active = draft.contactPreference === item;

            return (
              <Pressable
                key={item}
                style={[styles.chip, active && styles.activeChip]}
                onPress={() => onChange("contactPreference", item)}
              >
                <Text style={[styles.chipText, active && styles.activeChipText]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>{service.scheduleLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: May 12 morning or anytime after 2 PM"
          placeholderTextColor={theme.colors.mutedLight}
          value={draft.preferredSchedule}
          onChangeText={(value) => onChange("preferredSchedule", value)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3. Background Notes</Text>
        <Text style={styles.label}>{service.noteLabel}</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Provide the important details staff need to understand the concern."
          placeholderTextColor={theme.colors.mutedLight}
          value={draft.notes}
          onChangeText={(value) => onChange("notes", value)}
          multiline
          textAlignVertical="top"
        />
        <Text style={styles.label}>Household or representative note</Text>
        <TextInput
          style={[styles.input, styles.multilineInputSmall]}
          placeholder="Optional: representative name, children involved, or barangay context."
          placeholderTextColor={theme.colors.mutedLight}
          value={draft.householdNote}
          onChangeText={(value) => onChange("householdNote", value)}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>4. Requirement Readiness</Text>
        {service.requirements.map((label, index) => {
          const checked = draft.checklist[label];

          return (
            <Pressable
              key={label}
              style={[styles.checkRow, index > 0 && styles.rowDivider]}
              onPress={() => onToggleChecklist(label)}
            >
              <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                <Text style={styles.checkboxText}>{checked ? "OK" : ""}</Text>
              </View>
              <Text style={styles.checkText}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {message ? (
        <View style={[styles.messageCard, status === "error" ? styles.errorCard : styles.successCard]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}

      <Pressable
        style={[styles.submitButton, status === "submitting" && styles.disabledButton]}
        onPress={onSubmit}
        disabled={status === "submitting"}
      >
        <Text style={styles.submitButtonText}>
          {status === "submitting" ? "Saving Request..." : "Save Request"}
        </Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 12,
    alignSelf: "flex-start"
  },
  backButtonText: {
    color: theme.colors.navy,
    fontWeight: "800",
    fontSize: 14
  },
  headerCard: {
    backgroundColor: theme.colors.navy,
    borderRadius: theme.radius.xl,
    padding: 20,
    marginBottom: 16
  },
  headerLabel: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.6,
    marginBottom: 6
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 8
  },
  headerCopy: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    lineHeight: 20
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 16,
    ...theme.shadow
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 14
  },
  label: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 6
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  chip: {
    minHeight: 42,
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  activeChip: {
    backgroundColor: theme.colors.navy,
    borderColor: theme.colors.navy
  },
  chipText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700"
  },
  activeChipText: {
    color: theme.colors.white
  },
  input: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: theme.colors.text,
    fontSize: 15
  },
  multilineInput: {
    minHeight: 120
  },
  multilineInputSmall: {
    minHeight: 88
  },
  checkRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 12
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white
  },
  checkboxChecked: {
    backgroundColor: theme.colors.green,
    borderColor: theme.colors.green
  },
  checkboxText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: "900"
  },
  checkText: {
    color: theme.colors.text,
    lineHeight: 20,
    fontSize: 13,
    flex: 1
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
    fontWeight: "700"
  },
  submitButton: {
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: theme.colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    ...theme.shadowMd
  },
  disabledButton: {
    opacity: 0.55
  },
  submitButtonText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 16
  }
});
