import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BrandHero from "../components/BrandHero";
import ScreenContainer from "../components/ScreenContainer";
import { theme } from "../theme";
import { getApplicationProgress, getApplicationStatusMeta } from "../utils/portalLogic";

const accentStyles = {
  gold: { soft: theme.colors.goldSoft, strong: theme.colors.gold },
  teal: { soft: theme.colors.tealSoft, strong: theme.colors.teal },
  rose: { soft: theme.colors.roseSoft, strong: theme.colors.rose },
  blue: { soft: theme.colors.blueSoft, strong: theme.colors.blue },
  orange: { soft: theme.colors.orangeSoft, strong: theme.colors.orange },
  plum: { soft: theme.colors.plumSoft, strong: theme.colors.plum }
};

export default function ServiceScreen({ service, application, onNavigate, onStartApplication }) {
  const accent = accentStyles[service.accent];
  const statusMeta = application ? getApplicationStatusMeta(application, service) : null;
  const progress = application ? getApplicationProgress(service, application.status) : null;
  const checklist = application?.checklist || service.requirements.map((label) => ({ label, done: false }));

  return (
    <ScreenContainer>
      <Pressable style={styles.backButton} onPress={() => onNavigate("home")}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>

      <BrandHero
        compact
        title={service.title}
        subtitle={service.summary}
        accentLabel={service.shortName}
        metaItems={[service.contactPoint, service.responseTime]}
      />

      <View style={[styles.highlightCard, { backgroundColor: accent.soft }]}>
        <Text style={[styles.highlightLabel, { color: accent.strong }]}>SERVICE OVERVIEW</Text>
        <Text style={styles.highlightTitle}>{service.audience}</Text>
        <Text style={styles.highlightCopy}>{service.privacyNote}</Text>
      </View>

      {application ? (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Current Request</Text>
            <Text style={styles.cardMeta}>{application.id}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: accent.soft }]}>
            <Text style={[styles.statusBadgeText, { color: accent.strong }]}>{statusMeta.label}</Text>
          </View>
          <Text style={styles.requestType}>{application.concernType}</Text>
          <Text style={styles.copy}>{application.notes}</Text>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressLabel}>{progress.percent}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress.percent}%`, backgroundColor: accent.strong }]} />
          </View>
          <Pressable style={styles.primaryButton} onPress={() => onStartApplication(service.key)}>
            <Text style={styles.primaryButtonText}>Update Request Details</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No active request yet</Text>
          <Text style={styles.copy}>
            Start a guided request for this desk, save requirement readiness, and receive follow-up
            notices in your account inbox.
          </Text>
          <Pressable style={styles.primaryButton} onPress={() => onStartApplication(service.key)}>
            <Text style={styles.primaryButtonText}>Start {service.title} Request</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Requirement Checklist</Text>
        {checklist.map((item, index) => (
          <View key={item.label} style={[styles.listRow, index > 0 && styles.rowDivider]}>
            <View
              style={[
                styles.checkbox,
                item.done && { backgroundColor: accent.strong, borderColor: accent.strong }
              ]}
            >
              <Text style={styles.checkboxText}>{item.done ? "OK" : ""}</Text>
            </View>
            <Text style={styles.listText}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Eligibility and Notes</Text>
        {service.eligibility.map((item, index) => (
          <View key={item} style={[styles.listRow, index > 0 && styles.rowDivider]}>
            <View style={[styles.dot, { backgroundColor: accent.strong }]} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 12,
    alignSelf: "flex-start"
  },
  backButtonText: {
    color: theme.colors.navy,
    fontWeight: "800",
    fontSize: 14
  },
  highlightCard: {
    borderRadius: theme.radius.lg,
    padding: 16,
    marginBottom: 16
  },
  highlightLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.6,
    marginBottom: 6
  },
  highlightTitle: {
    color: theme.colors.text,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "900",
    marginBottom: 6
  },
  highlightCopy: {
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 12
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "900"
  },
  cardMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 10
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "900"
  },
  requestType: {
    color: theme.colors.navy,
    fontWeight: "900",
    fontSize: 14,
    marginBottom: 6
  },
  copy: {
    color: theme.colors.muted,
    lineHeight: 20,
    fontSize: 13
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 8
  },
  progressLabel: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700"
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 999
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
    fontWeight: "900",
    fontSize: 15
  },
  listRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 12
  },
  rowDivider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white
  },
  checkboxText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: "900"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8
  },
  listText: {
    color: theme.colors.text,
    lineHeight: 20,
    fontSize: 13,
    flex: 1
  }
});
