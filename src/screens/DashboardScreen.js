import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { dashboardAnnouncements } from "../data/portalData";
import { theme } from "../theme";

export default function DashboardScreen({ user, payoutStatus, onNavigate }) {
  return (
    <ScreenContainer activeScreen="dashboard" onNavigate={onNavigate} showTabs>
      <View style={styles.banner}>
        <View style={styles.bannerTop}>
          <View>
            <Text style={styles.bannerKicker}>Dashboard</Text>
            <Text style={styles.bannerTitle}>Good day,{"\n"}{user.profile.firstName}!</Text>
          </View>
          <View style={styles.noticeButton}>
            <Text style={styles.noticeButtonText}>NEW</Text>
          </View>
        </View>
        <Text style={styles.bannerCopy}>
          Here is your application status together with the latest service updates.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Application Status</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>PENDING REVIEW</Text>
          </View>
        </View>
        <Text style={styles.copy}>
          Your application is currently being reviewed by the MSWDO staff.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Application Summary</Text>
          <Pressable onPress={() => onNavigate("profile")}>
            <Text style={styles.viewLink}>View</Text>
          </Pressable>
        </View>
        <SummaryRow label="Reference ID" value={user.profile.referenceId} highlight />
        <SummaryRow label="Submission Date" value={user.createdAtLabel} />
        <SummaryRow label="Barangay" value={user.profile.barangay} />
      </View>

      <Pressable
        style={[styles.card, payoutStatus.included ? styles.payoutCardSuccess : styles.payoutCardPending]}
        onPress={() => onNavigate("payout")}
      >
        <View style={styles.payoutCardRow}>
          <View style={styles.payoutCardLeft}>
            <View style={[styles.payoutBadge, payoutStatus.included ? styles.payoutBadgeSuccess : styles.payoutBadgePending]}>
              <Text style={[styles.payoutBadgeText, payoutStatus.included ? styles.payoutBadgeTextSuccess : styles.payoutBadgeTextPending]}>
                PAYOUT
              </Text>
            </View>
            <View>
              <Text style={styles.payoutCardTitle}>{payoutStatus.label}</Text>
              <Text style={styles.payoutCardBody}>{payoutStatus.detail}</Text>
            </View>
          </View>
          <Text style={styles.payoutCardArrow}>GO</Text>
        </View>
      </Pressable>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Announcements</Text>
          <Text style={styles.viewLink}>Latest</Text>
        </View>
        {dashboardAnnouncements.map((item, index) => (
          <View key={item.title} style={[styles.noticeCard, index > 0 && styles.noticeCardSpaced]}>
            <View style={styles.noticeMarker} />
            <View style={styles.noticeBody}>
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Text style={styles.noticeText}>{item.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

function SummaryRow({ label, value, highlight }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, highlight && styles.summaryValueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: theme.colors.navy,
    borderRadius: theme.radius.xl,
    padding: 20,
    marginBottom: 16,
    gap: 10
  },
  bannerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  bannerKicker: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4
  },
  bannerTitle: {
    color: theme.colors.white,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900"
  },
  noticeButton: {
    minWidth: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  noticeButtonText: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: "900"
  },
  bannerCopy: {
    color: "rgba(255,255,255,0.82)",
    lineHeight: 20,
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12
  },
  viewLink: {
    color: theme.colors.blue,
    fontWeight: "800",
    fontSize: 13
  },
  statusRow: {
    marginBottom: 10
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: theme.colors.goldSoft,
    borderWidth: 1,
    borderColor: "#F0D060"
  },
  statusBadgeText: {
    color: "#A46C00",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 0.4
  },
  copy: {
    color: theme.colors.muted,
    lineHeight: 20,
    fontSize: 13
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center"
  },
  summaryLabel: {
    color: theme.colors.muted,
    fontWeight: "600",
    fontSize: 13
  },
  summaryValue: {
    color: theme.colors.text,
    fontWeight: "800",
    maxWidth: "55%",
    textAlign: "right",
    fontSize: 13
  },
  summaryValueHighlight: {
    color: theme.colors.navy,
    fontSize: 14
  },
  payoutCardSuccess: {
    backgroundColor: theme.colors.greenSoft,
    borderColor: "#A5D6BE"
  },
  payoutCardPending: {
    backgroundColor: theme.colors.goldSoft,
    borderColor: "#F0D060"
  },
  payoutCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  payoutCardLeft: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    flex: 1
  },
  payoutBadge: {
    minWidth: 56,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  payoutBadgeSuccess: {
    backgroundColor: "rgba(26,140,94,0.14)"
  },
  payoutBadgePending: {
    backgroundColor: "rgba(245,200,66,0.24)"
  },
  payoutBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.4
  },
  payoutBadgeTextSuccess: {
    color: theme.colors.green
  },
  payoutBadgeTextPending: {
    color: "#9A6A00"
  },
  payoutCardTitle: {
    color: theme.colors.navy,
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 4
  },
  payoutCardBody: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 220
  },
  payoutCardArrow: {
    color: theme.colors.navy,
    fontSize: 12,
    fontWeight: "900"
  },
  noticeCard: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start"
  },
  noticeCardSpaced: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  noticeMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.blue,
    marginTop: 5
  },
  noticeBody: {
    flex: 1,
    gap: 3
  },
  noticeTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 14
  },
  noticeText: {
    color: theme.colors.muted,
    lineHeight: 18,
    fontSize: 13
  }
});
