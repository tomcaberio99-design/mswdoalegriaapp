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
    <View>
      <View style={styles.bottomMeta}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>

      <View style={styles.shell}>
        {tabs.map((tab) => {
          const active = activeScreen === tab.key;
          const showDeveloper = tab.key === "profile";

          return (
            <Pressable key={tab.key} onPress={() => onNavigate(tab.key)} style={[styles.tab, active && styles.activeTab]}>
              <View style={styles.iconWrap}>
                <View style={[styles.iconBadge, active && styles.activeBadge]}>
                  <Text style={styles.iconText}>{tab.icon}</Text>
                </View>
                {tab.alert ? (
                  <View style={styles.alertDot}>
                    <Text style={styles.alertText}>{tab.alert}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
              {showDeveloper ? <Text style={styles.developerText}>Developed by: Rusty Tommy</Text> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomMeta: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
    paddingBottom: 12,
    minHeight: 20,
    backgroundColor: theme.colors.background
  },
  versionText: {
    color: theme.colors.muted,
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center"
  },
  shell: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
    elevation: 8
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 58,
    borderRadius: 14,
    gap: 4,
    paddingVertical: 6,
    position: "relative"
  },
  activeTab: {
    backgroundColor: theme.colors.accentSoft
  },
  iconWrap: {
    position: "relative"
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  activeBadge: {
    backgroundColor: theme.colors.primary
  },
  iconText: {
    fontSize: 18
  },
  label: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: "700"
  },
  activeLabel: {
    color: theme.colors.primary
  },
  developerText: {
    position: "absolute",
    top: 58,
    left: 0,
    right: 0,
    textAlign: "center",
    color: theme.colors.muted,
    fontSize: 8.5,
    fontStyle: "italic"
  },
  alertDot: {
    position: "absolute",
    top: -4,
    right: -6,
    width: 16,
    height: 16,
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
