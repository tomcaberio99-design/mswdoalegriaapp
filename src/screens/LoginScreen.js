import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
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
  return (
    <ScreenContainer>
      <BrandHero
        compact
        title="Login to your account"
        subtitle="Use your registered email address and password to continue."
      />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={onEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={onPasswordChange}
        />

        {message ? (
          <View style={styles.notice}>
            <Text style={styles.noticeText}>{message}</Text>
          </View>
        ) : null}

        <Pressable style={styles.primaryButton} onPress={onLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>

        <Pressable style={styles.secondaryLink} onPress={() => onNavigate("register")}>
          <Text style={styles.secondaryLinkText}>Create a new account</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 18,
    ...theme.shadow
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 14
  },
  input: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    marginBottom: 12
  },
  notice: {
    borderRadius: 14,
    backgroundColor: theme.colors.redSoft,
    padding: 12,
    marginBottom: 12
  },
  noticeText: {
    color: theme.colors.text
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: "800",
    fontSize: 16
  },
  secondaryLink: {
    marginTop: 14,
    alignItems: "center"
  },
  secondaryLinkText: {
    color: theme.colors.blue,
    fontWeight: "700"
  }
});
