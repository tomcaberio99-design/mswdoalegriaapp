import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { payoutBulletin, supportDetails } from "../data/portalData";
import { theme } from "../theme";

export default function PayoutScreen({ payoutStatus, onNavigate }) {
  return (
    <ScreenContainer activeScreen="payout" onNavigate={onNavigate} showTabs>
      <View style={[styles.heroCard, payoutStatus.included ? styles.heroSuccess : styles.heroPending]}>
        <View style={[styles.heroStatusBadge, payoutStatus.included ? styles.heroStatusBadgeSuccess : styles.heroStatusBadgePending]}>
          <Text style={[styles.heroStatusBadgeText, payoutStatus.included ? styles.heroStatusTextSuccess : styles.heroStatusTextPending]}>
            PAYOUT STATUS
          </Text>
        </View>
        <Text style={styles.heroTitle}>{payoutStatus.label}</Text>
        <Text style={styles.heroCopy}>{payoutStatus.title}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payout Details</Text>
        <DetailRow label="Release Date" value={payoutBulletin.releaseDate} />
        <DetailRow label="Venue" value={payoutBulletin.venue} />
        <DetailRow label="Claim Time" value={payoutBulletin.claimWindow} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Claim Requirements</Text>
        <RequirementRow text="Valid ID (original)" />
        <RequirementRow text="Claim stub issued at the venue" />
        <RequirementRow text="Personal appearance is required" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Included Barangays</Text>
        <View style={styles.chipGrid}>
          {payoutBulletin.includedBarangays.map((barangay) => (
            <View key={barangay} style={styles.chip}>
              <Text style={styles.chipText}>{barangay}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.reminderCard}>
        <View style={styles.reminderMarker} />
        <View style={styles.reminderBody}>
          <Text style={styles.reminderTitle}>Reminder</Text>
          <Text style={styles.reminderText}>{payoutStatus.helper}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Need Help?</Text>
        <DetailRow label="Office" value={supportDetails.office} />
        <DetailRow label="Mobile" value={supportDetails.mobile} />
        <DetailRow label="Email" value={supportDetails.email} />
        <DetailRow label="Office Hours" value={supportDetails.hours} />
      </View>

      <Pressable style={styles.primaryButton} onPress={() => onNavigate("dashboard")}>
        <Text style={styles.primaryButtonText}>Back to Dashboard</Text>
      </Pressable>
    </ScreenContainer>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function RequirementRow({ text }) {
  return (
    <View style={styles.requirementRow}>
      <View style={styles.requirementDot} />
      <Text style={styles.requirementText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: theme.radius.xl,
    padding: 22,
    marginBottom: 16,
    alignItems: "center",
    gap: 8,
    borderWidth: 1.5
  },
  heroSuccess: {
    backgroundColor: theme.colors.greenSoft,
    borderColor: "#A5D6BE"
  },
  heroPending: {
    backgroundColor: theme.colors.goldSoft,
    borderColor: "#F0D060"
  },
  heroStatusBadge: {
    minWidth: 110,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  heroStatusBadgeSuccess: {
    backgroundColor: "rgba(26,140,94,0.14)"
  },
  heroStatusBadgePending: {
    backgroundColor: "rgba(245,200,66,0.24)"
  },
  heroStatusBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.4
  },
  heroStatusTextSuccess: {
    color: theme.colors.green
  },
  heroStatusTextPending: {
    color: "#9A6A00"
  },
  heroTitle: {
    color: theme.colors.navy,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center"
  },
  heroCopy: {
    color: theme.colors.muted,
    lineHeight: 20,
    textAlign: "center",
    fontSize: 13
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
    marginBottom: 14
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight
  },
  detailLabel: {
    color: theme.colors.muted,
    fontWeight: "600",
    fontSize: 13
  },
  detailValue: {
    color: theme.colors.text,
    fontWeight: "800",
    maxWidth: "55%",
    textAlign: "right",
    fontSize: 13
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8
  },
  requirementDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.green
  },
  requirementText: {
    color: theme.colors.text,
    fontWeight: "600",
    fontSize: 14
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  chipText: {
    color: theme.colors.navy,
    fontWeight: "700",
    fontSize: 12
  },
  reminderCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: theme.colors.goldSoft,
    borderRadius: theme.radius.lg,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0D060",
    alignItems: "flex-start"
  },
  reminderMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.goldDark,
    marginTop: 4
  },
  reminderBody: {
    flex: 1,
    gap: 4
  },
  reminderTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 15
  },
  reminderText: {
    color: theme.colors.muted,
    lineHeight: 20,
    fontSize: 13
  },
  primaryButton: {
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadowMd
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 16
  }
});
