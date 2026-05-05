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
      setInstallHint("On Android: use Chrome, then tap Install App.");
    } else {
      setInstallHint("Use Chrome or Safari on your phone for the best install experience.");
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
      return;
    }

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome !== "accepted") {
      setDeferredPrompt(null);
      return;
    }
    setDeferredPrompt(null);
  }

  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View style={[styles.card, isInstalled && styles.successCard]}>
      <View style={styles.iconWrap}>
        <Text style={styles.iconText}>{isInstalled ? "✅" : "📥"}</Text>
      </View>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{isInstalled ? "Installed on this device" : "Install the MSWDO App"}</Text>
        <Text style={styles.body}>
          {isInstalled
            ? "The app is ready for faster access and can be opened like a native app."
            : "Add to your home screen. It works like a native app and no store download is needed."}
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
    padding: 20,
    gap: 16,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  successCard: {
    backgroundColor: "#DDF8EA"
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.colors.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.green,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  iconText: {
    fontSize: 22
  },
  textColumn: {
    flex: 1,
    gap: 4
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#064E3B"
  },
  body: {
    fontSize: 12,
    color: "#065F46",
    lineHeight: 18,
    marginBottom: 10
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.green,
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10
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
    marginTop: 6
  }
});
