import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import WebInstallCard from "../components/WebInstallCard";
import { homeAnnouncements, serviceCatalog } from "../data/portalData";
import { theme } from "../theme";

const logoImage = require("../../assets/mswdo-logo.jpg");

const serviceToneMap = {
  assistance: {
    badge: "ASST",
    bg: theme.colors.goldSoft,
    fg: theme.colors.gold,
    summary: "Financial, food, and livelihood support for residents in need."
  },
  vawdo: {
    badge: "VAWDO",
    bg: theme.colors.roseSoft,
    fg: theme.colors.rose,
    summary: "Support and protection for women and children against violence."
  },
  senior: {
    badge: "OSCA",
    bg: theme.colors.tealSoft,
    fg: theme.colors.teal,
    summary: "Benefits, IDs, and assistance for senior citizen residents."
  },
  "solo-parent": {
    badge: "SOLO",
    bg: theme.colors.blueSoft,
    fg: theme.colors.blue,
    summary: "Solo parent ID registration and welfare program benefits."
  },
  "4ps": {
    badge: "4Ps",
    bg: theme.colors.orangeSoft,
    fg: theme.colors.orange,
    summary: "Pantawid Pamilyang Pilipino beneficiary management and records."
  },
  cicl: {
    badge: "CICL",
    bg: theme.colors.plumSoft,
    fg: theme.colors.plum,
    summary: "Children in conflict with the law - case management and diversion."
  }
};

const emergencyContacts = [
  { label: "MSWDO Office", value: "(085) 123-4567" },
  { label: "VAWDO Hotline", value: "1-800-1888-1222" },
  { label: "PNP Alegria MPS", value: "(085) 765-4321" },
  { label: "Barangay", value: "(085) 111-2222" }
];

const fallbackAdvisories = [
  {
    title: "Walk-in Assistance Available",
    body: "MSWDO Alegria is open Mon-Fri, 8AM-5PM for in-person requests and document processing.",
    tone: "info"
  },
  {
    title: "4Ps Update Schedule",
    body: "Beneficiary validation for Q2 2025 will be conducted May 12-16. Bring your valid ID.",
    tone: "warning"
  },
  {
    title: "Typhoon Advisory",
    body: "During typhoon signals, MSWDO activates emergency assistance. Contact the hotline immediately.",
    tone: "critical"
  }
];

export default function HomeScreen({
  currentUser,
  onNavigate,
  onOpenService
}) {
  const services = serviceCatalog.slice(0, 6);
  const advisories = fallbackAdvisories.map((item, index) => ({
    ...item,
    body: homeAnnouncements[index]?.body || item.body
  }));

  return (
    <ScreenContainer activeScreen="home" onNavigate={onNavigate} showTabs padded={false}>
      <AnimatedHero>
        <View style={styles.hero}>
          <View style={styles.heroOrbTop} />
          <View style={styles.heroOrbBottom} />

          <View style={styles.heroTop}>
            <View style={styles.logoRow}>
              <View style={styles.logoRing}>
                <Image source={logoImage} style={styles.logoImage} />
              </View>
              <View style={styles.logoTextWrap}>
                <Text style={styles.orgText}>MSWDO ALEGRIA</Text>
                <Text style={styles.orgSub}>Municipal Social Welfare & Development</Text>
              </View>
            </View>

            <View style={styles.officialBadge}>
              <Text style={styles.officialIcon}>🛡️</Text>
              <Text style={styles.officialText}>OFFICIAL</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>
            One portal for every <Text style={styles.heroAccent}>MSWDO</Text> service
          </Text>
          <Text style={styles.heroDesc}>
            {currentUser
              ? "Residents and staff can access assistance, CICL, VAWDO, senior citizen, solo parent, and 4Ps workflows in one mobile-friendly PWA."
              : "Residents and staff can access assistance, CICL, VAWDO, senior citizen, solo parent, and 4Ps workflows in one mobile-friendly PWA."}
          </Text>

          <View style={styles.heroChips}>
            <View style={styles.chip}>
              <View style={styles.chipDot} />
              <Text style={styles.chipText}>6 Service Modules</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>🌐 Accessible on Web</Text>
            </View>
          </View>
        </View>
      </AnimatedHero>

      <View style={styles.content}>
        <AnimatedSection delay={100}>
          <WebInstallCard />
        </AnimatedSection>

        <AnimatedSection delay={170}>
          <View style={styles.emergencyCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🚨 Emergency & Safe Contacts</Text>
              <Text style={styles.sectionMeta}>Quick reach</Text>
            </View>

            {emergencyContacts.map((item, index) => (
              <View
                key={item.label}
                style={[styles.contactRow, index > 0 && styles.contactRowBorder]}
              >
                <Text style={styles.contactLabel}>{item.label}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </AnimatedSection>

        <AnimatedSection delay={240}>
          <View style={styles.summaryCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{currentUser ? "Account Snapshot" : "Get Started"}</Text>
              <Text style={styles.sectionMeta}>{currentUser ? "Citizen portal" : "New users"}</Text>
            </View>

            <Text style={styles.summaryCopy}>
              {currentUser
                ? "Your citizen account is active and ready for request tracking, advisories, and service follow-up."
                : "Create one citizen account to submit requests, track statuses, and receive MSWDO updates across all available programs."}
            </Text>

            <View style={styles.quickActions}>
              <Pressable
                style={styles.primaryButton}
                onPress={() => onNavigate(currentUser ? "requests" : "register")}
              >
                <Text style={styles.primaryButtonText}>
                  {currentUser ? "Open Requests" : "Create Account"}
                </Text>
              </Pressable>
              <Pressable
                style={styles.secondaryButton}
                onPress={() => onNavigate(currentUser ? "profile" : "login")}
              >
                <Text style={styles.secondaryButtonText}>
                  {currentUser ? "Open Profile" : "Sign In"}
                </Text>
              </Pressable>
            </View>
          </View>
        </AnimatedSection>

        <AnimatedSection delay={310}>
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>MSWDO Services</Text>
              <Text style={styles.sectionMeta}>Tap a desk</Text>
            </View>

            <View style={styles.serviceGrid}>
              {services.map((service) => {
                const tone = serviceToneMap[service.key];

                return (
                  <Pressable
                    key={service.key}
                    style={[styles.serviceCard, { backgroundColor: tone?.bg || theme.colors.surface }]}
                    onPress={() => onOpenService(service.key)}
                  >
                    <View style={[styles.serviceBadge, { backgroundColor: tone?.fg || theme.colors.primary }]}>
                      <Text style={styles.serviceBadgeText}>{tone?.badge || service.title.slice(0, 4).toUpperCase()}</Text>
                    </View>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceSummary}>{tone?.summary || service.summary}</Text>
                    <Text style={[styles.serviceLink, { color: tone?.fg || theme.colors.primary }]}>
                      Open service →
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </AnimatedSection>

        <AnimatedSection delay={380}>
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Office Advisories</Text>
              <Text style={styles.sectionMeta}>Updated</Text>
            </View>

            {advisories.map((item, index) => (
              <View key={item.title} style={[styles.noticeRow, index > 0 && styles.noticeBorder]}>
                <View
                  style={[
                    styles.noticeMarker,
                    item.tone === "warning" && styles.noticeWarning,
                    item.tone === "critical" && styles.noticeCritical
                  ]}
                />
                <View style={styles.noticeBody}>
                  <Text style={styles.noticeTitle}>{item.title}</Text>
                  <Text style={styles.noticeText}>{item.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </AnimatedSection>
      </View>
    </ScreenContainer>
  );
}

function AnimatedHero({ children }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
  }, [opacity, translateY]);

  return <Animated.View style={{ opacity, transform: [{ translateY }] }}>{children}</Animated.View>;
}

function AnimatedSection({ children, delay = 0 }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 560,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 560,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      })
    ]).start();
  }, [delay, opacity, translateY]);

  return <Animated.View style={{ opacity, transform: [{ translateY }] }}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 32,
    position: "relative",
    overflow: "hidden"
  },
  heroOrbTop: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.05)"
  },
  heroOrbBottom: {
    position: "absolute",
    bottom: -40,
    left: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.04)"
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1
  },
  logoRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...theme.shadow
  },
  logoImage: {
    width: "100%",
    height: "100%"
  },
  logoTextWrap: {
    flex: 1
  },
  orgText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.4
  },
  orgSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 10
  },
  officialBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  officialIcon: {
    fontSize: 10
  },
  officialText: {
    color: theme.colors.white,
    fontSize: 9,
    fontWeight: "800"
  },
  heroTitle: {
    color: theme.colors.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    marginBottom: 10,
    maxWidth: 310
  },
  heroAccent: {
    color: "#93C5FD"
  },
  heroDesc: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 20
  },
  heroChips: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap"
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E"
  },
  chipText: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: "700"
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
    gap: 14
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: 16,
    ...theme.shadow
  },
  emergencyCard: {
    backgroundColor: theme.colors.roseSoft,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#F4C7D4",
    padding: 16
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
    fontWeight: "900",
    flexShrink: 1
  },
  sectionMeta: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12
  },
  contactRowBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight
  },
  contactLabel: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "700",
    flex: 1
  },
  contactValue: {
    color: theme.colors.rose,
    fontSize: 13,
    fontWeight: "900"
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    padding: 16,
    ...theme.shadow
  },
  summaryCopy: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 21
  },
  quickActions: {
    gap: 10,
    marginTop: 16
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadowMd
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 18,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "800"
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  serviceCard: {
    width: "48.2%",
    minHeight: 170,
    borderRadius: 20,
    padding: 14
  },
  serviceBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10
  },
  serviceBadgeText: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: "900"
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
    marginTop: 10,
    fontSize: 12,
    fontWeight: "900"
  },
  noticeRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    paddingVertical: 12
  },
  noticeBorder: {
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
  noticeWarning: {
    backgroundColor: theme.colors.orange
  },
  noticeCritical: {
    backgroundColor: theme.colors.rose
  },
  noticeBody: {
    flex: 1
  },
  noticeTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4
  },
  noticeText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 19
  }
});
