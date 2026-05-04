import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { theme } from "../theme";
import {
  getApplicationCounts,
  getApplicationProgress,
  getApplicationStatusMeta,
  getServiceByKey
} from "../utils/portalLogic";

export default function DashboardScreen({
  user,
  applications,
  bannerMessage,
  onClearBanner,
  onOpenService,
  onStartApplication,
  onNavigate
}) {
  const counts = getApplicationCounts(applications);

  return (
    <ScreenContainer activeScreen="requests" onNavigate={onNavigate} showTabs>
      <View style={styles.banner}>
        <Text style={styles.bannerKicker}>MY REQUESTS</Text>
        <Text style={styles.bannerTitle}>{user.profile.firstName}, here is your service activity.</Text>
        <Text style={styles.bannerCopy}>
          Track all active cases, document readiness, and next follow-up steps in one place.
        </Text>
      </View>

      {bannerMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>{bannerMessage}</Text>
          <Pressable onPress={onClearBanner}>
            <Text style={styles.dismissText}>Hide</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.statsGrid}>
        <MetricCard label="Total Requests" value={String(counts.total)} />
        <MetricCard label="Active Cases" value={String(counts.active)} />
        <MetricCard label="Urgent Flags" value={String(counts.urgent)} />
      </View>

      {applications.length ? (
        applications.map((application) => {
          const service = getServiceByKey(application.serviceKey);
          const statusMeta = getApplicationStatusMeta(application, service);
          const progress = getApplicationProgress(service, application.status);
          const completedDocs = application.checklist.filter((item) => item.done).length;

          return (
            <Pressable
              key={application.id}
              style={styles.card}
              onPress={() => onOpenService(application.serviceKey)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderMain}>
                  <Text style={styles.cardTitle}>{application.serviceTitle}</Text>
                  <Text style={styles.cardMeta}>{application.id}</Text>
                </View>
                <Text style={styles.cardUpdated}>{application.updatedAtLabel}</Text>
              </View>

              <View
                style={[
                  styles.statusPill,
                  statusMeta.tone === "success" && styles.statusPillSuccess,
                  statusMeta.tone === "warning" && styles.statusPillWarning,
                  statusMeta.tone === "critical" && styles.statusPillCritical
                ]}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    statusMeta.tone === "success" && styles.statusPillTextSuccess,
                    statusMeta.tone === "warning" && styles.statusPillTextWarning,
                    statusMeta.tone === "critical" && styles.statusPillTextCritical
                  ]}
                >
                  {statusMeta.label}
                </Text>
              </View>

              <Text style={styles.concernType}>{application.concernType}</Text>
              <Text style={styles.copy}>{application.notes}</Text>

              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Workflow progress</Text>
                <Text style={styles.progressValue}>{progress.percent}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress.percent}%` }]} />
              </View>

              <View style={styles.detailRow}>
                <DetailChip label={`${completedDocs}/${application.checklist.length} requirements ready`} />
                <DetailChip label={application.priority} />
                <DetailChip label={application.contactPreference} />
              </View>

              <Text style={styles.linkText}>Open service desk</Text>
            </Pressable>
          );
        })
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No requests yet</Text>
          <Text style={styles.copy}>
            Start with the service that matches the resident&apos;s concern, then complete the guided form
            to place it in the MSWDO queue.
          </Text>
          <Pressable style={styles.primaryButton} onPress={() => onStartApplication("assistance")}>
            <Text style={styles.primaryButtonText}>Start Assistance Request</Text>
          </Pressable>
        </View>
      )}
    </ScreenContainer>
  );
}

function MetricCard({ label, value }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function DetailChip({ label }) {
  return (
    <View style={styles.detailChip}>
      <Text style={styles.detailChipText}>{label}</Text>
    </View>
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
    color: "rgba(255,255,255,0.68)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.6,
    marginBottom: 6
  },
  bannerTitle: {
    color: theme.colors.white,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    marginBottom: 8
  },
  bannerCopy: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    lineHeight: 20
  },
  successBanner: {
    backgroundColor: theme.colors.greenSoft,
    borderWidth: 1,
    borderColor: "#C9E8DA",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  successText: {
    color: theme.colors.text,
    flex: 1,
    fontWeight: "700",
    lineHeight: 20
  },
  dismissText: {
    color: theme.colors.green,
    fontWeight: "900"
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16
  },
  metricCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow
  },
  metricValue: {
    color: theme.colors.navy,
    fontSize: 22,
    fontWeight: "900"
  },
  metricLabel: {
    color: theme.colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5
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
  emptyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10
  },
  cardHeaderMain: {
    flex: 1
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900"
  },
  cardMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4
  },
  cardUpdated: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.blueSoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 10
  },
  statusPillSuccess: {
    backgroundColor: theme.colors.greenSoft
  },
  statusPillWarning: {
    backgroundColor: theme.colors.goldSoft
  },
  statusPillCritical: {
    backgroundColor: theme.colors.roseSoft
  },
  statusPillText: {
    color: theme.colors.blue,
    fontSize: 11,
    fontWeight: "900"
  },
  statusPillTextSuccess: {
    color: theme.colors.green
  },
  statusPillTextWarning: {
    color: theme.colors.gold
  },
  statusPillTextCritical: {
    color: theme.colors.rose
  },
  concernType: {
    color: theme.colors.navy,
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 6
  },
  copy: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 8
  },
  progressLabel: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 12
  },
  progressValue: {
    color: theme.colors.navy,
    fontWeight: "900",
    fontSize: 12
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.blue,
    borderRadius: 999
  },
  detailRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14
  },
  detailChip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderLight
  },
  detailChipText: {
    color: theme.colors.text,
    fontSize: 11,
    fontWeight: "700"
  },
  linkText: {
    color: theme.colors.blue,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 14
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "900"
  }
});
