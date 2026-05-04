import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { dashboardAnnouncements } from "../data/portalData";
import { theme } from "../theme";

export default function DashboardScreen({ user, payoutStatus, onNavigate }) {
  return (
    <ScreenContainer activeScreen="dashboard" onNavigate={onNavigate} showTabs>
      <View style={styles.banner}>
        <Text style={styles.bannerKicker}>Dashboard</Text>
        <Text style={styles.bannerTitle}>Good day, {user.profile.firstName}!</Text>
        <Text style={styles.bannerCopy}>Here is your application status and the latest portal updates.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Application Status</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>Pending Review</Text>
        </View>
        <Text style={styles.copy}>
          Your application is currently being reviewed by MSWDO staff.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Application Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Reference ID</Text>
          <Text style={styles.summaryValue}>{user.profile.referenceId}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Submitted</Text>
          <Text style={styles.summaryValue}>{user.createdAtLabel}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Barangay</Text>
          <Text style={styles.summaryValue}>{user.profile.barangay}</Text>
        </View>
        <Pressable style={styles.inlineLink} onPress={() => onNavigate("profile")}>
          <Text style={styles.inlineLinkText}>View full profile</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payout Reminder</Text>
        <Text style={styles.highlightTitle}>{payoutStatus.label}</Text>
        <Text style={styles.copy}>{payoutStatus.detail}</Text>
        <Pressable style={styles.inlineLink} onPress={() => onNavigate("payout")}>
          <Text style={styles.inlineLinkText}>Open payout details</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.cardTitle}>Announcements</Text>
          <Text style={styles.headerMeta}>Latest</Text>
        </View>
        {dashboardAnnouncements.map((item) => (
          <View key={item.title} style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>{item.title}</Text>
            <Text style={styles.noticeBody}>{item.body}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: theme.colors.navy,
    borderRadius: theme.radius.xl,
    padding: 20,
    marginBottom: 16
  },
  bannerKicker: {
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "800"
  },
  bannerTitle: {
    color: theme.colors.white,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "900",
    marginTop: 8
  },
  bannerCopy: {
    color: "rgba(255,255,255,0.86)",
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
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: theme.colors.goldSoft,
    marginBottom: 10
  },
  statusBadgeText: {
    color: "#A46C00",
    fontWeight: "800"
  },
  copy: {
    color: theme.colors.muted,
    lineHeight: 20
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  summaryLabel: {
    color: theme.colors.muted,
    fontWeight: "600"
  },
  summaryValue: {
    color: theme.colors.text,
    fontWeight: "800",
    maxWidth: "55%",
    textAlign: "right"
  },
  inlineLink: {
    marginTop: 12
  },
  inlineLinkText: {
    color: theme.colors.blue,
    fontWeight: "800"
  },
  highlightTitle: {
    color: theme.colors.navy,
    fontWeight: "900",
    fontSize: 20,
    marginBottom: 8
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  headerMeta: {
    color: theme.colors.blue,
    fontWeight: "700",
    fontSize: 12
  },
  noticeCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 14,
    marginTop: 10
  },
  noticeTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    marginBottom: 4
  },
  noticeBody: {
    color: theme.colors.muted,
    lineHeight: 20
  }
});
