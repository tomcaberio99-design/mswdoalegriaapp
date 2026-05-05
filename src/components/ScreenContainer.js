import React from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../theme";
import BottomTabBar from "./BottomTabBar";

export default function ScreenContainer({
  children,
  activeScreen,
  onNavigate,
  showTabs = false,
  padded = true
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={[styles.content, padded && styles.padded]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {showTabs ? (
          <View style={styles.tabDock}>
            <BottomTabBar activeScreen={activeScreen} onNavigate={onNavigate} />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  root: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    paddingBottom: 138
  },
  padded: {
    paddingHorizontal: 16,
    paddingTop: 0
  },
  tabDock: {
    position: Platform.OS === "web" ? "fixed" : "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    elevation: 20
  }
});
