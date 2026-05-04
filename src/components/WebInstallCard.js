import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function WebInstallCard() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }

    const standalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone;

    if (standalone) {
      setIsInstalled(true);
    }

    function handleBeforeInstallPrompt(event) {
      event.preventDefault();
      setDeferredPrompt(event);
    }

    function handleInstalled() {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setMessage("Installed successfully. Open it from your home screen anytime.");
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) {
      setMessage("Open this app in Android Chrome and choose Install App or Add to Home screen.");
      return;
    }

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setMessage("Installing app...");
    } else {
      setMessage("Install canceled. You can try again anytime.");
    }

    setDeferredPrompt(null);
  }

  if (Platform.OS !== "web") {
    return null;
  }

  if (isInstalled) {
    return (
      <View style={[styles.card, styles.successCard]}>
        <Text style={styles.successTitle}>Installed on this device</Text>
        <Text style={styles.successBody}>
          The portal is ready on your home screen for faster senior-friendly access.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.textColumn}>
          <Text style={styles.kicker}>EASY ACCESS</Text>
          <Text style={styles.title}>Install this app on your phone</Text>
          <Text style={styles.body}>
            Add the portal to the home screen so seniors and family members can open it
            like a regular app.
          </Text>
        </View>
        <Pressable style={styles.button} onPress={handleInstall}>
          <Text style={styles.buttonText}>Install App</Text>
        </Pressable>
      </View>

      <Text style={styles.helper}>Best experience: Android Chrome on phone or tablet.</Text>
      {message ? <Text style={styles.feedback}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.greenSoft,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "#C9E8DA",
    padding: 16,
    marginBottom: 16,
    gap: 10
  },
  successCard: {
    backgroundColor: "#EDF8F1"
  },
  headerRow: {
    gap: 14
  },
  textColumn: {
    gap: 6
  },
  kicker: {
    color: theme.colors.green,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.7
  },
  title: {
    color: theme.colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900"
  },
  body: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19
  },
  button: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.green,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    alignSelf: "flex-start"
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  helper: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  feedback: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700"
  },
  successTitle: {
    color: theme.colors.green,
    fontSize: 18,
    fontWeight: "900"
  },
  successBody: {
    color: theme.colors.text,
    fontSize: 13,
    lineHeight: 19
  }
});
