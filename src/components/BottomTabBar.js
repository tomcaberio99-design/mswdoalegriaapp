import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { theme } from "../theme";

const tabs = [
  { key: "home", label: "Home" },
  { key: "dashboard", label: "Dashboard" },
  { key: "payout", label: "Payout" },
  { key: "profile", label: "Profile" }
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
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    borderRadius: 16
  },
  activeTab: {
    backgroundColor: theme.colors.navy
  },
  label: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "700"
  },
  activeLabel: {
    color: theme.colors.white
  }
});
