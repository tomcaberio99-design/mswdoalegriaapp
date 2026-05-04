import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import BrandHero from "../components/BrandHero";
import { payoutBulletin, services } from "../data/portalData";
import { theme } from "../theme";

export default function HomeScreen({ onNavigate }) {
  return (
    <ScreenContainer activeScreen="home" onNavigate={onNavigate} showTabs>
      <BrandHero
        title="Senior Citizen Services Portal"
        subtitle="Official mobile access for registration, payout advisories, and community announcements."
      />

      <View style={styles.quickActions}>
        <Pressable style={styles.primaryAction} onPress={() => onNavigate("register")}>
          <Text style={styles.primaryActionText}>Register Now</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction} onPress={() => onNavigate("login")}>
          <Text style={styles.secondaryActionText}>Login</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Services</Text>
          <Text style={styles.sectionLink}>See all</Text>
        </View>
        <View style={styles.serviceGrid}>
          {services.map((service) => (
            <Pressable
              key={service.title}
              style={styles.serviceCard}
              onPress={() => {
                if (service.title === "Register") onNavigate("register");
                if (service.title === "Dashboard") onNavigate("dashboard");
                if (service.title === "Payout") onNavigate("payout");
              }}
            >
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.card, styles.highlightCard]}>
        <Text style={styles.highlightLabel}>PAYOUT ANNOUNCEMENT</Text>
        <Text style={styles.highlightTitle}>Check if your Barangay is included.</Text>
        <Text style={styles.highlightCopy}>
          {payoutBulletin.releaseDate} at {payoutBulletin.venue}
        </Text>
        <Pressable style={styles.inlineLink} onPress={() => onNavigate("payout")}>
          <Text style={styles.inlineLinkText}>View details</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <Text style={styles.sectionLink}>Updated today</Text>
        </View>
        <View style={styles.noticeRow}>
          <Text style={styles.noticeTitle}>Payout Schedule for May</Text>
          <Text style={styles.noticeMeta}>May 12, 2026</Text>
          <Text style={styles.noticeCopy}>
            Please wait for the official clustered payout schedule before proceeding to the venue.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16
  },
  primaryAction: {
    flex: 1,
    minHeight: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.navy
  },
  primaryActionText: {
    color: theme.colors.white,
    fontWeight: "800",
    fontSize: 15
  },
  secondaryAction: {
    width: 118,
    minHeight: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  secondaryActionText: {
    color: theme.colors.text,
    fontWeight: "700"
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
    fontWeight: "800",
    fontSize: 18
  },
  sectionLink: {
    color: theme.colors.blue,
    fontSize: 12,
    fontWeight: "700"
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  serviceCard: {
    width: "47%",
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 14
  },
  serviceTitle: {
    color: theme.colors.navy,
    fontWeight: "800",
    fontSize: 15
  },
  serviceSubtitle: {
    marginTop: 6,
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  highlightCard: {
    backgroundColor: theme.colors.goldSoft,
    borderColor: "#F1D37A"
  },
  highlightLabel: {
    color: "#9A6A00",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 8
  },
  highlightTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "800"
  },
  highlightCopy: {
    marginTop: 8,
    color: theme.colors.muted,
    lineHeight: 20
  },
  inlineLink: {
    marginTop: 12
  },
  inlineLinkText: {
    color: theme.colors.navy,
    fontWeight: "800"
  },
  noticeRow: {
    gap: 6
  },
  noticeTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  noticeMeta: {
    color: theme.colors.blue,
    fontSize: 12,
    fontWeight: "700"
  },
  noticeCopy: {
    color: theme.colors.muted,
    lineHeight: 20
  }
});
