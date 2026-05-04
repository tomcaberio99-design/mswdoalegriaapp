import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { theme } from "../theme";

export default function ProfileScreen({ user, onNavigate, onLogout }) {
  return (
    <ScreenContainer activeScreen="profile" onNavigate={onNavigate} showTabs>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.profile.firstName.slice(0, 1)}</Text>
        </View>
        <Text style={styles.name}>{user.profile.fullName}</Text>
        <View style={styles.verifiedTag}>
          <Text style={styles.verifiedText}>Verified Applicant</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Applicant Information</Text>
        <InfoRow label="Reference ID" value={user.profile.referenceId} />
        <InfoRow label="Barangay" value={user.profile.barangay} />
        <InfoRow label="Birth Date" value={user.profile.birthDate} />
        <InfoRow label="Age" value={`${user.profile.age} years old`} />
        <InfoRow label="Civil Status" value={user.profile.civilStatus} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <InfoRow label="Mobile Number" value={user.profile.phone} />
        <InfoRow label="Email Address" value={user.email} />
        <InfoRow label="Address" value={`${user.profile.street || "-"}, ${user.profile.barangay}, ${user.profile.city}`} />
      </View>

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScreenContainer>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: theme.colors.navy,
    borderRadius: theme.radius.xl,
    padding: 20,
    alignItems: "center",
    marginBottom: 16
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white
  },
  avatarText: {
    color: theme.colors.navy,
    fontSize: 34,
    fontWeight: "900"
  },
  name: {
    color: theme.colors.white,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 14,
    textAlign: "center"
  },
  verifiedTag: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: theme.colors.greenSoft
  },
  verifiedText: {
    color: theme.colors.green,
    fontWeight: "800"
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    marginBottom: 16,
    ...theme.shadow
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 12
  },
  infoRow: {
    marginBottom: 12
  },
  infoLabel: {
    color: theme.colors.muted,
    fontWeight: "700",
    marginBottom: 4
  },
  infoValue: {
    color: theme.colors.text,
    fontWeight: "800",
    lineHeight: 20
  },
  logoutButton: {
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.white
  },
  logoutText: {
    color: theme.colors.blue,
    fontWeight: "800"
  }
});
