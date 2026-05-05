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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 14,
    paddingHorizontal: 8,
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
    minHeight: 50,
    borderRadius: 12,
    gap: 3,
    paddingVertical: 6
  },
  activeTab: {
    backgroundColor: "#EFF6FF"
  },
  iconWrap: {
    position: "relative"
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC"
  },
  activeBadge: {
    backgroundColor: theme.colors.navy
  },
  badgeText: {
    fontSize: 14
  },
  label: {
    color: theme.colors.muted,
    fontSize: 9,
    fontWeight: "700"
  },
  activeLabel: {
    color: theme.colors.navy
  },
  alertDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  alertText: {
    color: theme.colors.white,
    fontSize: 7,
    fontWeight: "900"
  }
});
