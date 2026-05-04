import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BrandHero from "../components/BrandHero";
import ScreenContainer from "../components/ScreenContainer";
import { payoutBulletin, services } from "../data/portalData";
import { theme } from "../theme";

const serviceBadges = {
  Register: "REG",
  Dashboard: "DB",
  Payout: "PAY",
  Announcements: "NEWS"
};

export default function HomeScreen({ onNavigate }) {
  return (
    <ScreenContainer activeScreen="home" onNavigate={onNavigate} showTabs>
      <BrandHero
        title="Senior Citizen Services Portal"
        subtitle="Access registration, payout updates, and official citizen advisories in one place."
      />

      <View style={styles.noticeStrip}>
        <View style={styles.noticeStripDot} />
        <View style={styles.noticeStripBody}>
          <Text style={styles.noticeStripTitle}>Service Advisory</Text>
          <Text style={styles.noticeStripText}>
            Online registration and payout lookup are available today.
          </Text>
        </View>
      </View>

      <View style={styles.quickCard}>
        <View style={styles.quickCardHeader}>
          <Text style={styles.quickCardTitle}>Quick Access</Text>
          <Text style={styles.quickCardMeta}>Most used</Text>
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.primaryAction} onPress={() => onNavigate("register")}>
            <View style={styles.actionBadgePrimary}>
              <Text style={styles.actionBadgePrimaryText}>REG</Text>
            </View>
            <View style={styles.actionTextBlock}>
              <Text style={styles.primaryActionText}>Register</Text>
              <Text style={styles.primaryActionMeta}>Start a new application</Text>
            </View>
          </Pressable>

          <Pressable style={styles.secondaryAction} onPress={() => onNavigate("login")}>
            <View style={styles.actionBadgeSecondary}>
              <Text style={styles.actionBadgeSecondaryText}>IN</Text>
            </View>
            <View style={styles.actionTextBlock}>
              <Text style={styles.secondaryActionText}>Login</Text>
              <Text style={styles.secondaryActionMeta}>Open your account</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.payoutAlert}>
        <View style={styles.payoutAlertLeft}>
          <View style={styles.payoutBadge}>
            <Text style={styles.payoutBadgeText}>CURRENT PAYOUT</Text>
          </View>
          <Text style={styles.payoutAlertTitle}>Check your payout schedule</Text>
          <Text style={styles.payoutAlertBody}>
            {payoutBulletin.releaseDate} at {payoutBulletin.venue}
          </Text>
        </View>
        <Pressable style={styles.payoutAlertButton} onPress={() => onNavigate("payout")}>
          <Text style={styles.payoutAlertButtonText}>View</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>City Services</Text>
          <Text style={styles.sectionMeta}>Digital shortcuts</Text>
        </View>
        <View style={styles.serviceGrid}>
          {services.map((service) => (
            <Pressable
              key={service.title}
              style={styles.serviceCard}
              onPress={() => {
                if (service.title === "Register") onNavigate("register");
                else if (service.title === "Dashboard") onNavigate("dashboard");
                else if (service.title === "Payout") onNavigate("payout");
              }}
            >
              <View style={styles.serviceBadge}>
                <Text style={styles.serviceBadgeText}>{serviceBadges[service.title] || "APP"}</Text>
              </View>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceArrow}>Open</Text>
              </View>
              <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <Text style={styles.sectionMeta}>Updated today</Text>
        </View>
        <View style={styles.noticeRow}>
          <View style={styles.noticeDot} />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>May Payout Schedule</Text>
            <Text style={styles.noticeMeta}>May 12, 2026</Text>
            <Text style={styles.noticeCopy}>
              Please wait for the official clustered payout schedule before going to the venue.
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  noticeStrip: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 16,
    ...theme.shadow
  },
  noticeStripDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.blue,
    marginTop: 6
  },
  noticeStripBody: {
    flex: 1,
    gap: 2
  },
  noticeStripTitle: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  noticeStripText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  quickCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 16,
    ...theme.shadow
  },
  quickCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  quickCardTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  quickCardMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "600"
  },
  actionRow: {
    gap: 12
  },
  primaryAction: {
    minHeight: 72,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.colors.navy,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    ...theme.shadow
  },
  actionBadgePrimary: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    marginTop: 1
  },
  actionBadgePrimaryText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: "900"
  },
  primaryActionText: {
    color: theme.colors.white,
    fontWeight: "800",
    fontSize: 16
  },
  secondaryAction: {
    minHeight: 72,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    ...theme.shadow
  },
  actionBadgeSecondary: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.blueSoft,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    marginTop: 3
  },
  actionBadgeSecondaryText: {
    color: theme.colors.blue,
    fontSize: 10,
    fontWeight: "900"
  },
  actionTextBlock: {
    gap: 2,
    flex: 1
  },
  primaryActionMeta: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12
  },
  secondaryActionText: {
    color: theme.colors.navy,
    fontWeight: "800",
    fontSize: 16
  },
  secondaryActionMeta: {
    color: theme.colors.muted,
    fontSize: 12
  },
  payoutAlert: {
    backgroundColor: theme.colors.goldSoft,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: "#F0D060",
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  payoutAlertLeft: {
    flex: 1,
    gap: 4
  },
  payoutBadge: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 2
  },
  payoutBadgeText: {
    color: theme.colors.navyDeep,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  payoutAlertTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  payoutAlertBody: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  payoutAlertButton: {
    backgroundColor: theme.colors.navy,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginLeft: 12
  },
  payoutAlertButtonText: {
    color: theme.colors.white,
    fontWeight: "800",
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 18
  },
  sectionMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "600"
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  serviceCard: {
    width: "47%",
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    gap: 4
  },
  serviceBadge: {
    minWidth: 42,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.blueSoft,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    marginBottom: 4
  },
  serviceBadgeText: {
    color: theme.colors.blue,
    fontSize: 10,
    fontWeight: "900"
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  serviceTitle: {
    color: theme.colors.navy,
    fontWeight: "900",
    fontSize: 14
  },
  serviceArrow: {
    color: theme.colors.blue,
    fontSize: 11,
    fontWeight: "800"
  },
  serviceSubtitle: {
    color: theme.colors.muted,
    fontSize: 11,
    lineHeight: 16
  },
  noticeRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start"
  },
  noticeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.blue,
    marginTop: 6
  },
  noticeContent: {
    flex: 1,
    gap: 3
  },
  noticeTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800"
  },
  noticeMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "600"
  },
  noticeCopy: {
    color: theme.colors.muted,
    lineHeight: 20,
    fontSize: 13
  }
});
