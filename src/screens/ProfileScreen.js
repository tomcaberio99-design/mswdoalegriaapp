import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { theme } from "../theme";

export default function ProfileScreen({ user, onNavigate, onLogout }) {
  const initial = user.profile.firstName.slice(0, 1).toUpperCase();

  return (
    <ScreenContainer activeScreen="profile" onNavigate={onNavigate} showTabs>
      <View style={styles.hero}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        </View>
        <Text style={styles.name}>{user.profile.fullName}</Text>
        <View style={styles.verifiedTag}>
          <Text style={styles.verifiedText}>Verified Applicant</Text>
        </View>
        <Text style={styles.referenceId}>Ref: {user.profile.referenceId}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Applicant Information</Text>
          <Pressable>
            <Text style={styles.editLink}>Edit</Text>
          </Pressable>
        </View>
        <InfoRow label="Reference ID" value={user.profile.referenceId} />
        <InfoRow label="Barangay" value={user.profile.barangay} />
        <InfoRow label="Birth Date" value={user.profile.birthDate} />
        <InfoRow label="Age" value={`${user.profile.age} years old`} />
        <InfoRow label="Sex" value={user.profile.sex || "-"} />
        <InfoRow label="Civil Status" value={user.profile.civilStatus || "-"} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <Pressable>
            <Text style={styles.editLink}>Edit</Text>
          </Pressable>
        </View>
        <InfoRow label="Mobile Number" value={user.profile.phone || "-"} />
        <InfoRow label="Email Address" value={user.email} />
        <InfoRow
          label="Address"
          value={`${user.profile.street || "-"}, ${user.profile.barangay}, ${user.profile.city}`}
        />
      </View>

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Log out</Text>
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
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    gap: 8
  },
  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: theme.colors.gold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white
  },
  avatarText: {
    color: theme.colors.navy,
    fontSize: 36,
    fontWeight: "900"
  },
  name: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center"
  },
  verifiedTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: theme.colors.greenSoft
  },
  verifiedText: {
    color: theme.colors.green,
    fontWeight: "800",
    fontSize: 13
  },
  referenceId: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "600"
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14
  },
  cardTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 16
  },
  editLink: {
    color: theme.colors.blue,
    fontWeight: "700",
    fontSize: 13
  },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    gap: 3
  },
  infoLabel: {
    color: theme.colors.muted,
    fontWeight: "600",
    fontSize: 12
  },
  infoValue: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 14,
    lineHeight: 20
  },
  logoutButton: {
    minHeight: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.white,
    marginBottom: 8
  },
  logoutText: {
    color: theme.colors.red,
    fontWeight: "800",
    fontSize: 15
  }
});
