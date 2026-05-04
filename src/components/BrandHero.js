import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function BrandHero({ title, subtitle, compact = false }) {
  return (
    <ImageBackground
      source={require("../../assets/mswdo-bg.jpg")}
      style={[styles.background, compact && styles.compactBackground]}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.tintOverlay} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Image source={require("../../assets/mswdo-logo.jpg")} style={styles.logo} />
          <View style={styles.brandCopy}>
            <Text style={styles.brandName}>MSWDO ALEGRIA</Text>
            <Text style={styles.brandSub}>Municipality of Alegria, Surigao del Norte</Text>
          </View>
        </View>

        <View style={styles.textBlock}>
          <Text style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>#ResponsivePublicService</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    minHeight: 256,
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    marginBottom: 16
  },
  compactBackground: {
    minHeight: 200
  },
  backgroundImage: {
    resizeMode: "cover"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8, 30, 65, 0.72)"
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 58, 122, 0.30)"
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 22
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)"
  },
  brandCopy: {
    flex: 1
  },
  brandName: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  brandSub: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 11,
    marginTop: 2
  },
  textBlock: {
    gap: 8
  },
  title: {
    color: theme.colors.white,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    maxWidth: 260
  },
  compactTitle: {
    fontSize: 26,
    lineHeight: 30
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 270
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.colors.gold
  },
  tagText: {
    color: theme.colors.navyDeep,
    fontWeight: "800",
    fontSize: 11
  }
});
