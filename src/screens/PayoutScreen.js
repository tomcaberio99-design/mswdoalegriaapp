import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { payoutBulletin } from "../data/portalData";
import { theme } from "../theme";

export default function PayoutScreen({ payoutStatus, onNavigate }) {
  return (
    <ScreenContainer activeScreen="payout" onNavigate={onNavigate} showTabs>
      <View style={[styles.heroCard, payoutStatus.included ? styles.heroSuccess : styles.heroPending]}>
        <Text style={styles.heroTitle}>{payoutStatus.label}</Text>
        <Text style={styles.heroCopy}>{payoutStatus.title}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payout Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Release Date</Text>
          <Text style={styles.detailValue}>{payoutBulletin.releaseDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Venue</Text>
          <Text style={styles.detailValue}>{payoutBulletin.venue}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Claim Time</Text>
          <Text style={styles.detailValue}>{payoutBulletin.claimWindow}</Text>
        </View>
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

      <View style={[styles.card, styles.reminderCard]}>
        <Text style={styles.cardTitle}>Reminder</Text>
        <Text style={styles.reminderText}>{payoutStatus.helper}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => onNavigate("dashboard")}>
        <Text style={styles.primaryButtonText}>Return to Dashboard</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: theme.radius.xl,
    padding: 20,
    marginBottom: 16
  },
  heroSuccess: {
    backgroundColor: theme.colors.greenSoft
  },
  heroPending: {
    backgroundColor: theme.colors.goldSoft
  },
  heroTitle: {
    color: theme.colors.navy,
    fontSize: 24,
    fontWeight: "900"
  },
  heroCopy: {
    color: theme.colors.text,
    lineHeight: 22,
    marginTop: 8
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
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  detailLabel: {
    color: theme.colors.muted,
    fontWeight: "600"
  },
  detailValue: {
    color: theme.colors.text,
    fontWeight: "800",
    maxWidth: "55%",
    textAlign: "right"
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceAlt
  },
  chipText: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 12
  },
  reminderCard: {
    backgroundColor: theme.colors.goldSoft
  },
  reminderText: {
    color: theme.colors.text,
    lineHeight: 20
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: "800",
    fontSize: 16
  }
});
