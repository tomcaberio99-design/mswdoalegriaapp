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
        subtitle="Official mobile access for registration, payout advisories, and community announcements."
      />

      <View style={styles.actionRow}>
        <Pressable style={styles.primaryAction} onPress={() => onNavigate("register")}>
          <View style={styles.actionBadgePrimary}>
            <Text style={styles.actionBadgePrimaryText}>REG</Text>
          </View>
          <Text style={styles.primaryActionText}>Register Now</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction} onPress={() => onNavigate("login")}>
          <View style={styles.actionBadgeSecondary}>
            <Text style={styles.actionBadgeSecondaryText}>IN</Text>
          </View>
          <Text style={styles.secondaryActionText}>Login</Text>
        </Pressable>
      </View>

      <View style={styles.payoutAlert}>
        <View style={styles.payoutAlertLeft}>
          <View style={styles.payoutBadge}>
            <Text style={styles.payoutBadgeText}>PAYOUT</Text>
          </View>
          <Text style={styles.payoutAlertTitle}>Included in the Current Release?</Text>
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
          <Text style={styles.sectionTitle}>Services</Text>
          <Text style={styles.sectionMeta}>Choose what you need</Text>
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
              <Text style={styles.serviceTitle}>{service.title}</Text>
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
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16
  },
  primaryAction: {
    flex: 1,
    minHeight: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.navy,
    flexDirection: "row",
    gap: 8,
    ...theme.shadow
  },
  actionBadgePrimary: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
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
    width: 110,
    minHeight: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    gap: 4,
    ...theme.shadow
  },
  actionBadgeSecondary: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.blueSoft,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6
  },
  actionBadgeSecondaryText: {
    color: theme.colors.blue,
    fontSize: 10,
    fontWeight: "900"
  },
  secondaryActionText: {
    color: theme.colors.navy,
    fontWeight: "800",
    fontSize: 13
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
  serviceTitle: {
    color: theme.colors.navy,
    fontWeight: "900",
    fontSize: 14
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
