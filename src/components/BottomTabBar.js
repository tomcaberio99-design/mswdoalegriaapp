import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

const tabs = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "requests", label: "Requests", icon: "📋", alert: "2" },
  { key: "inbox", label: "Inbox", icon: "📥" },
  { key: "profile", label: "Profile", icon: "👤" }
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
            <View style={styles.iconWrap}>
              <View style={[styles.badge, active && styles.activeBadge]}>
                <Text style={styles.badgeText}>{tab.icon}</Text>
              </View>
              {tab.alert ? <View style={styles.alertDot}><Text style={styles.alertText}>{tab.alert}</Text></View> : null}
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
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    borderRadius: 24,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
    elevation: 6
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    borderRadius: 14,
    gap: 4,
    paddingVertical: 8
  },
  activeTab: {
    backgroundColor: "#EFF6FF"
  },
  iconWrap: {
    position: "relative"
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  activeBadge: {
    backgroundColor: theme.colors.navy
  },
  badgeText: {
    fontSize: 18
  },
  label: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: "700"
  },
  activeLabel: {
    color: theme.colors.navy
  },
  alertDot: {
    position: "absolute",
    top: -3,
    right: -4,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  alertText: {
    color: theme.colors.white,
    fontSize: 8,
    fontWeight: "900"
  }
});
