import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

const tabs = [
  { key: "home", label: "Home", badge: "HM" },
  { key: "requests", label: "Requests", badge: "RQ" },
  { key: "inbox", label: "Inbox", badge: "IN" },
  { key: "profile", label: "Profile", badge: "ME" }
];

export default function BottomTabBar({ activeScreen, onNavigate }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = activeScreen === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onNavigate(tab.key)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <View style={[styles.badge, active && styles.activeBadge]}>
              <Text style={[styles.badgeText, active && styles.activeBadgeText]}>{tab.badge}</Text>
            </View>
            <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: 26,
    padding: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadowMd
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    borderRadius: 20,
    gap: 4,
    paddingTop: 4
  },
  activeTab: {
    backgroundColor: theme.colors.surfaceAlt
  },
  badge: {
    minWidth: 30,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7
  },
  activeBadge: {
    backgroundColor: theme.colors.navy
  },
  badgeText: {
    color: theme.colors.navy,
    fontSize: 10,
    fontWeight: "900"
  },
  activeBadgeText: {
    color: theme.colors.white
  },
  label: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: "700"
  },
  activeLabel: {
    color: theme.colors.navy
  }
});
