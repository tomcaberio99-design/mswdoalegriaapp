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
    <View style={[styles.card, compact && styles.compactCard]}>
      <View style={styles.headerRow}>
        <View style={styles.identityRow}>
          <Image source={require("../../assets/mswdo-logo.jpg")} style={styles.logo} />
          <View style={styles.brandCopy}>
            <Text style={styles.brandName}>MSWDO ALEGRIA</Text>
            <Text style={styles.brandSub}>Municipal Social Welfare and Development Office</Text>
          </View>
        </View>
        <View style={styles.headerPill}>
          <Text style={styles.headerPillText}>{accentLabel}</Text>
        </View>
      </View>

      <View style={[styles.contentPanel, compact && styles.compactPanel]}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.metaRow}>
          {metaItems.map((item) => (
            <View key={item} style={styles.metaPill}>
              <Text style={styles.metaPillText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.xl,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow
  },
  compactCard: {
    padding: 14
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  identityRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14
  },
  brandCopy: {
    flex: 1
  },
  brandName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  brandSub: {
    color: theme.colors.muted,
    fontSize: 11,
    marginTop: 2
  },
  headerPill: {
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.blueSoft,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  headerPillText: {
    color: theme.colors.blue,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  contentPanel: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: theme.colors.navy
  },
  compactPanel: {
    padding: 18
  },
  textBlock: {
    gap: 8
  },
  title: {
    color: theme.colors.white,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    maxWidth: 270
  },
  compactTitle: {
    fontSize: 24,
    lineHeight: 30
  },
  subtitle: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
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
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center"
  },
  metaPillText: {
    color: theme.colors.white,
    fontWeight: "700",
    fontSize: 11
  }
});
