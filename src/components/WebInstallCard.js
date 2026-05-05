import React, { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function WebInstallCard() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installHint, setInstallHint] = useState("");

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }

    const userAgent = window.navigator.userAgent || "";
    const standalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone;

    if (standalone) {
      setIsInstalled(true);
    }

    if (/FBAN|FBAV|Instagram|Messenger/i.test(userAgent)) {
      setInstallHint("Open this site in Chrome or Safari first. In-app browsers usually block app install.");
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setInstallHint("On iPhone: tap Share then Add to Home Screen.");
    } else if (/Android/i.test(userAgent)) {
      setInstallHint("On Android: use Chrome, then tap Install App or Add to Home screen.");
    } else {
      setInstallHint("Use Chrome or Safari on phone for the best install experience.");
    }

    function handleBeforeInstallPrompt(event) {
      event.preventDefault();
      setDeferredPrompt(event);
    }

    function handleInstalled() {
      setIsInstalled(true);
      setDeferredPrompt(null);
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
      if (typeof window !== "undefined") {
        window.alert(installHint || "Open this app in Chrome or Safari and add it to the home screen.");
      }
      return;
    }

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    if (choice.outcome !== "accepted" && typeof window !== "undefined") {
      window.alert("Install canceled. You can try again anytime.");
    }
  }

  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View style={[styles.card, isInstalled && styles.successCard]}>
      <View style={styles.iconWrap}>
        <Text style={styles.iconText}>{isInstalled ? "✅" : "📲"}</Text>
      </View>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{isInstalled ? "Installed on this device" : "Install MSWDO Connect"}</Text>
        <Text style={styles.body}>
          {isInstalled
            ? "MSWDO Connect is ready for faster access even on low-end phones."
            : "Add to your home screen. It works like a native app, with the same MSWDO logo and faster access for residents and staff."}
        </Text>
        {!isInstalled ? (
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleInstall}>
            <Text style={styles.buttonText}>Install Now</Text>
          </Pressable>
        ) : null}
        {!isInstalled && installHint ? <Text style={styles.helper}>{installHint}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#A7F3D0",
    padding: 18,
    marginBottom: 16,
    gap: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#1D8A57",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  successCard: {
    backgroundColor: "#EDF8F1"
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: theme.colors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  iconText: {
    fontSize: 20
  },
  textColumn: {
    gap: 6,
    flex: 1
  },
  title: {
    color: "#064E3B",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },
  body: {
    color: "#065F46",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
    maxWidth: 250
  },
  button: {
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    backgroundColor: theme.colors.green,
    borderRadius: 999,
    paddingHorizontal: 18,
    shadowColor: "#16A34A",
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  buttonPressed: {
    opacity: 0.88
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: "900"
  },
  helper: {
    color: "#047857",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2
  }
});
