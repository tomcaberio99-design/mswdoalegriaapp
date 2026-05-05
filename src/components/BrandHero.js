import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function BrandHero({
  title,
  subtitle,
  compact = false,
  accentLabel = "OFFICIAL",
  metaItems = ["Citizen Services", "Responsive PWA"]
}) {
  return (
    <View style={[styles.shell, compact && styles.compactShell]}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>8:48 AM</Text>
        <View style={styles.statusIcons}>
          <Text style={styles.statusText}>📶</Text>
          <Text style={styles.statusText}>🔋</Text>
        </View>
      </View>

      <View style={[styles.card, compact && styles.compactCard]}>
        <View style={styles.orbTop} />
        <View style={styles.orbBottom} />

        <View style={styles.headerRow}>
          <View style={styles.identityRow}>
            <View style={styles.logoRing}>
              <Image source={require("../../assets/mswdo-logo.jpg")} style={styles.logo} />
            </View>
            <View style={styles.brandCopy}>
              <Text style={styles.brandName}>MSWDO CONNECT</Text>
              <Text style={styles.brandSub}>Municipal Social Welfare & Development</Text>
            </View>
          </View>
          <View style={styles.headerPill}>
            <Text style={styles.headerPillText}>{accentLabel}</Text>
          </View>
        </View>

        <View style={styles.textBlock}>
          <Text style={[styles.title, compact && styles.compactTitle]}>
            {title}{" "}
            {!compact ? <Text style={styles.titleAccent}>MSWDO</Text> : null}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.metaRow}>
          {metaItems.map((item, index) => (
            <View key={item} style={styles.metaPill}>
              {index === 0 ? <View style={styles.metaDot} /> : null}
              <Text style={styles.metaPillText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: theme.colors.navy,
    borderRadius: 36,
    overflow: "hidden",
    marginBottom: 16,
    ...theme.shadowMd
  },
  compactShell: {
    borderRadius: 28
  },
  statusBar: {
    backgroundColor: "#0D2C6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 10
  },
  statusText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: "700"
  },
  statusIcons: {
    flexDirection: "row",
    gap: 6
  },
  card: {
    backgroundColor: "#0D2C6B",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
    position: "relative",
    overflow: "hidden"
  },
  compactCard: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24
  },
  orbTop: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.05)"
  },
  orbBottom: {
    position: "absolute",
    bottom: -40,
    left: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.04)"
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24
  },
  identityRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12
  },
  logoRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 23
  },
  brandCopy: {
    flex: 1
  },
  brandName: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.6
  },
  brandSub: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 10,
    marginTop: 2
  },
  headerPill: {
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)"
  },
  headerPillText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  textBlock: {
    gap: 8
  },
  title: {
    color: theme.colors.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    maxWidth: 290
  },
  compactTitle: {
    fontSize: 24,
    lineHeight: 30
  },
  titleAccent: {
    color: "#93C5FD"
  },
  subtitle: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 290
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
    flexWrap: "wrap"
  },
  metaPill: {
    minHeight: 30,
    borderRadius: 15,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  metaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E"
  },
  metaPillText: {
    color: theme.colors.white,
    fontWeight: "700",
    fontSize: 11
  }
});
