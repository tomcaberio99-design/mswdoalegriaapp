import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import BrandHero from "../components/BrandHero";
import ScreenContainer from "../components/ScreenContainer";
import { theme } from "../theme";

export default function LoginScreen({
  email,
  password,
  message,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onNavigate
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScreenContainer>
      <Pressable style={styles.backButton} onPress={() => onNavigate("home")}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>

      <BrandHero
        compact
        title="Sign in to the MSWDO portal"
        subtitle="Use one account to manage assistance, protection, senior, solo parent, and 4Ps service requests."
        metaItems={["Resident Access", "Staff Friendly"]}
      />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Login</Text>
        <Text style={styles.infoText}>
          Front-desk staff can also use this account view to demonstrate service flows during assisted registration.
        </Text>

        <Text style={styles.fieldLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="sample@email.com"
          placeholderTextColor={theme.colors.mutedLight}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={onEmailChange}
        />

        <Text style={styles.fieldLabel}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.mutedLight}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={onPasswordChange}
          />
          <Pressable style={styles.toggleButton} onPress={() => setShowPassword((current) => !current)}>
            <Text style={styles.toggleButtonText}>{showPassword ? "HIDE" : "SHOW"}</Text>
          </Pressable>
        </View>

        {message ? (
          <View style={styles.errorNotice}>
            <Text style={styles.errorText}>{message}</Text>
          </View>
        ) : null}

        <Pressable style={styles.primaryButton} onPress={onLogin}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </Pressable>
      </View>

      <View style={styles.registerRow}>
        <Text style={styles.registerText}>No account yet? </Text>
        <Pressable onPress={() => onNavigate("register")}>
          <Text style={styles.registerLink}>Create one here</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 12,
    alignSelf: "flex-start"
  },
  backButtonText: {
    color: theme.colors.navy,
    fontWeight: "700",
    fontSize: 15
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 20,
    ...theme.shadow
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 20,
    marginBottom: 10
  },
  infoText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 18
  },
  fieldLabel: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 8
  },
  input: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    marginBottom: 14,
    color: theme.colors.text,
    fontSize: 16
  },
  passwordRow: {
    position: "relative"
  },
  passwordInput: {
    paddingRight: 72
  },
  toggleButton: {
    position: "absolute",
    right: 14,
    top: 0,
    height: 56,
    justifyContent: "center"
  },
  toggleButtonText: {
    color: theme.colors.blue,
    fontSize: 11,
    fontWeight: "900"
  },
  errorNotice: {
    borderRadius: 14,
    backgroundColor: theme.colors.redSoft,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F5C0BA"
  },
  errorText: {
    color: theme.colors.red,
    fontWeight: "600",
    lineHeight: 20
  },
  primaryButton: {
    minHeight: 58,
    borderRadius: 20,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadowMd
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 17
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center"
  },
  registerText: {
    color: theme.colors.muted,
    fontSize: 14
  },
  registerLink: {
    color: theme.colors.blue,
    fontWeight: "800",
    fontSize: 14
  }
});
