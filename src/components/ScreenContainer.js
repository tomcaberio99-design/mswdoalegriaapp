import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
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
    backgroundColor: theme.colors.surfaceAlt
  },
  root: {
    flex: 1
  },
  content: {
    paddingBottom: 112
  },
  padded: {
    paddingHorizontal: 18,
    paddingTop: 18
  },
  tabDock: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18
  }
});
