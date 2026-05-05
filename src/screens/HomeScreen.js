import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BrandHero from "../components/BrandHero";
import ScreenContainer from "../components/ScreenContainer";
import WebInstallCard from "../components/WebInstallCard";
import {
  emergencyContacts,
  homeAnnouncements,
  serviceCatalog
} from "../data/portalData";
import { theme } from "../theme";
import { getApplicationCounts } from "../utils/portalLogic";

const accentStyles = {
  gold: { soft: theme.colors.goldSoft, strong: theme.colors.gold },
  teal: { soft: theme.colors.tealSoft, strong: theme.colors.teal },
  rose: { soft: theme.colors.roseSoft, strong: theme.colors.rose },
  blue: { soft: theme.colors.blueSoft, strong: theme.colors.blue },
  orange: { soft: theme.colors.orangeSoft, strong: theme.colors.orange },
  plum: { soft: theme.colors.plumSoft, strong: theme.colors.plum }
};

export default function HomeScreen({
  currentUser,
  applications,
  inboxCount,
  onNavigate,
  onOpenService
}) {
  const counts = getApplicationCounts(applications);

  return (
    <ScreenContainer activeScreen="home" onNavigate={onNavigate} showTabs>
      <BrandHero
        title="One portal for every"
        subtitle="Residents and staff can access assistance, CICL, VAWDO, senior citizen, solo parent, and 4Ps workflows in one mobile-friendly PWA."
        metaItems={["6 Service Modules", "Accessible on Web"]}
      />

      <WebInstallCard />

      <View style={styles.emergencyCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Emergency & Safe Contacts</Text>
          <Text style={styles.sectionMeta}>Quick reach</Text>
        </View>
        <View style={styles.officeRow}>
          <Text style={styles.contactLabel}>MSWDO Office</Text>
          <Text style={styles.contactValue}>📞 (086) 123-4567</Text>
        </View>
        {emergencyContacts.map((item, index) => (
          <View key={item.label} style={[styles.contactRow, styles.rowDivider]}>
            <Text style={styles.contactLabel}>{item.label}</Text>
            <Text style={styles.contactValue}>📞 {item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{currentUser ? "Account Snapshot" : "Get Started"}</Text>
          <Text style={styles.sectionMeta}>{currentUser ? "Today" : "New users"}</Text>
        </View>

        {currentUser ? (
          <>
            <View style={styles.statGrid}>
              <StatCard label="Requests" value={String(counts.total)} />
              <StatCard label="Active" value={String(counts.active)} />
              <StatCard label="Inbox" value={String(inboxCount)} />
            </View>
            <Text style={styles.summaryCopy}>
              Welcome back, {currentUser.profile.firstName}. Continue a request, open a service desk,
              or review follow-up notices from MSWDO.
            </Text>
            <View style={styles.quickActions}>
              <Pressable style={styles.primaryAction} onPress={() => onNavigate("requests")}>
                <Text style={styles.primaryActionText}>Open My Requests</Text>
              </Pressable>
              <Pressable style={styles.secondaryAction} onPress={() => onNavigate("inbox")}>
                <Text style={styles.secondaryActionText}>Check Inbox</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.summaryCopy}>
              Create one citizen account to submit requests, track statuses, and receive MSWDO updates
              across all available programs.
            </Text>
            <View style={styles.quickActions}>
              <Pressable style={styles.primaryAction} onPress={() => onNavigate("register")}>
                <Text style={styles.primaryActionText}>Create Account</Text>
              </Pressable>
              <Pressable style={styles.secondaryAction} onPress={() => onNavigate("login")}>
                <Text style={styles.secondaryActionText}>Sign In</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>MSWDO Services</Text>
          <Text style={styles.sectionMeta}>Tap a desk</Text>
        </View>
        <View style={styles.serviceGrid}>
          {serviceCatalog.map((service) => {
            const accent = accentStyles[service.accent];

            return (
              <Pressable
                key={service.key}
                style={[styles.serviceCard, { backgroundColor: accent.soft }]}
                onPress={() => onOpenService(service.key)}
              >
                <View style={[styles.serviceBadge, { backgroundColor: accent.strong }]}>
                  <Text style={styles.serviceBadgeText}>{service.shortName}</Text>
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSummary}>{service.summary}</Text>
                <Text style={[styles.serviceLink, { color: accent.strong }]}>Open service →</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {applications.length ? (
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Requests</Text>
            <Pressable onPress={() => onNavigate("requests")}>
              <Text style={styles.linkText}>View all</Text>
            </Pressable>
          </View>
          {applications.slice(0, 3).map((application, index) => (
            <Pressable
              key={application.id}
              style={[styles.requestRow, index > 0 && styles.rowDivider]}
              onPress={() => onOpenService(application.serviceKey)}
            >
              <View style={styles.requestMain}>
                <Text style={styles.requestTitle}>{application.serviceTitle}</Text>
                <Text style={styles.requestMeta}>{application.concernType}</Text>
              </View>
              <View>
                <Text style={styles.requestStatus}>{application.updatedAtLabel}</Text>
                <Text style={styles.requestMeta}>{application.status.replace(/-/g, " ")}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ) : null}

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Office Advisories</Text>
          <Text style={styles.sectionMeta}>Updated</Text>
        </View>
        {homeAnnouncements.map((item, index) => (
          <View key={item.id} style={[styles.noticeRow, index > 0 && styles.rowDivider]}>
            <View
              style={[
                styles.noticeMarker,
                item.tone === "warning" && styles.noticeMarkerWarning,
                item.tone === "critical" && styles.noticeMarkerCritical
              ]}
            />
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

function StatCard({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emergencyCard: {
    backgroundColor: "#FFF1F2",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#F4C7D4",
    padding: 16,
    marginBottom: 16
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 16,
    ...theme.shadow
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
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
    fontSize: 16,
    fontWeight: "900"
  },
  sectionMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  officeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 10
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 10
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  contactLabel: {
    color: theme.colors.text,
    fontWeight: "700",
    flex: 1
  },
  contactValue: {
    color: "#E11D48",
    fontWeight: "900"
  },
  statGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.borderLight
  },
  statValue: {
    color: theme.colors.navy,
    fontSize: 24,
    fontWeight: "900"
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4
  },
  summaryCopy: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  quickActions: {
    gap: 10,
    marginTop: 16
  },
  primaryAction: {
    minHeight: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.navy
  },
  primaryActionText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "900"
  },
  secondaryAction: {
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  secondaryActionText: {
    color: theme.colors.navy,
    fontSize: 15,
    fontWeight: "800"
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  serviceCard: {
    width: "48%",
    borderRadius: 20,
    padding: 14,
    minHeight: 170
  },
  serviceBadge: {
    minWidth: 52,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 10
  },
  serviceBadgeText: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: "900",
    textAlign: "center"
  },
  serviceTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 6
  },
  serviceSummary: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18,
    flex: 1
  },
  serviceLink: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 10
  },
  requestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 12
  },
  requestMain: {
    flex: 1
  },
  requestTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "900"
  },
  requestMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    marginTop: 4
  },
  requestStatus: {
    color: theme.colors.navy,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "right"
  },
  linkText: {
    color: theme.colors.blue,
    fontSize: 13,
    fontWeight: "800"
  },
  noticeRow: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12
  },
  noticeMarker: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: theme.colors.blue,
    marginTop: 6
  },
  noticeMarkerWarning: {
    backgroundColor: theme.colors.orange
  },
  noticeMarkerCritical: {
    backgroundColor: theme.colors.rose
  },
  noticeBody: {
    flex: 1
  },
  noticeTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 4
  },
  noticeText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18
  }
});
