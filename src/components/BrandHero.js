import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";
import { theme } from "../theme";

export default function BrandHero({ title, subtitle, compact = false }) {
  return (
    <ImageBackground
      source={require("../../assets/mswdo-bg.jpg")}
      style={[styles.background, compact && styles.compactBackground]}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Image source={require("../../assets/mswdo-logo.jpg")} style={styles.logo} />
          <View style={styles.brandCopy}>
            <Text style={styles.brandName}>MSWDO ALEGRIA</Text>
            <Text style={styles.brandSub}>Municipality of Alegria, Surigao del Norte</Text>
          </View>
        </View>

        <Text style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>#ResponsablengpagSerbisyo</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    minHeight: 248,
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    marginBottom: 16
  },
  compactBackground: {
    minHeight: 212
  },
  backgroundImage: {
    resizeMode: "cover"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(9, 36, 72, 0.70)"
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: theme.colors.white
  },
  brandCopy: {
    flex: 1
  },
  brandName: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: "800"
  },
  brandSub: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 11,
    marginTop: 2
  },
  title: {
    color: theme.colors.white,
    fontSize: 35,
    lineHeight: 38,
    fontWeight: "900",
    maxWidth: 240
  },
  compactTitle: {
    fontSize: 30,
    lineHeight: 34
  },
  subtitle: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 260
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: theme.colors.gold
  },
  tagText: {
    color: theme.colors.navyDeep,
    fontWeight: "800",
    fontSize: 12
  }
});
