import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { feedbackPrompts, officeContacts } from "../data/portalData";
import { theme } from "../theme";

export default function InboxScreen({ inbox, onNavigate }) {
  return (
    <ScreenContainer activeScreen="inbox" onNavigate={onNavigate} showTabs>
      <View style={styles.headerCard}>
        <Text style={styles.headerLabel}>INBOX</Text>
        <Text style={styles.headerTitle}>Updates, feedback, and office follow-up</Text>
        <Text style={styles.headerCopy}>
          Keep residents informed with request confirmations, reminders, and the best contact channels
          for each desk.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Messages</Text>
        {inbox.length ? (
          inbox.map((item, index) => (
            <View key={item.id} style={[styles.messageRow, index > 0 && styles.rowDivider]}>
              <View
                style={[
                  styles.messageMarker,
                  item.tone === "critical" && styles.messageMarkerCritical
                ]}
              />
              <View style={styles.messageBody}>
                <View style={styles.messageHeader}>
                  <Text style={styles.messageTitle}>{item.title}</Text>
                  <Text style={styles.messageDate}>{item.dateLabel}</Text>
                </View>
                <Text style={styles.messageText}>{item.body}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.copy}>No inbox messages yet. Confirmations will appear here after a request is saved.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Feedback Prompts</Text>
        {feedbackPrompts.map((prompt, index) => (
          <View key={prompt} style={[styles.promptRow, index > 0 && styles.rowDivider]}>
            <Text style={styles.promptNumber}>{index + 1}</Text>
            <Text style={styles.promptText}>{prompt}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Office Contact</Text>
        <InfoRow label="Office" value={officeContacts.office} />
        <InfoRow label="Mobile" value={officeContacts.mobile} />
        <InfoRow label="Landline" value={officeContacts.landline} />
        <InfoRow label="Email" value={officeContacts.email} />
        <InfoRow label="Office Hours" value={officeContacts.hours} />
      </View>
    </ScreenContainer>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
    marginBottom: 16,
    ...theme.shadow
  },
  headerLabel: {
    color: theme.colors.blue,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.6,
    marginBottom: 6
  },
  headerTitle: {
    color: theme.colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    marginBottom: 8
  },
  headerCopy: {
    color: theme.colors.muted,
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
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12
  },
  messageRow: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  messageMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.blue,
    marginTop: 6
  },
  messageMarkerCritical: {
    backgroundColor: theme.colors.rose
  },
  messageBody: {
    flex: 1
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 4
  },
  messageTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 14,
    flex: 1
  },
  messageDate: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  messageText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  copy: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  promptRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 12
  },
  promptNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.navy,
    color: theme.colors.white,
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "900",
    overflow: "hidden"
  },
  promptText: {
    flex: 1,
    color: theme.colors.text,
    lineHeight: 20,
    fontSize: 13
  },
  infoRow: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  infoLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4
  },
  infoValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "800"
  }
});
