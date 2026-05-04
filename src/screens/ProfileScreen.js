import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { barangays } from "../data/portalData";
import { theme } from "../theme";
import { formatApplicantAddress, getProfileCompletion } from "../utils/portalLogic";

export default function ProfileScreen({ user, onNavigate, onLogout, onSaveProfile, message }) {
  const initial = user.profile.firstName.slice(0, 1).toUpperCase();
  const completion = getProfileCompletion(user.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    phone: user.profile.phone || "",
    houseNo: user.profile.houseNo || "",
    street: user.profile.street || "",
    barangay: user.profile.barangay || "",
    city: user.profile.city || "",
    province: user.profile.province || "",
    accountRole: user.profile.accountRole || "Citizen"
  });

  useEffect(() => {
    setDraft({
      phone: user.profile.phone || "",
      houseNo: user.profile.houseNo || "",
      street: user.profile.street || "",
      barangay: user.profile.barangay || "",
      city: user.profile.city || "",
      province: user.profile.province || "",
      accountRole: user.profile.accountRole || "Citizen"
    });
  }, [user]);

  const addressPreview = useMemo(() => formatApplicantAddress(user.profile), [user.profile]);

  function updateDraft(field, value) {
    setDraft((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleSave() {
    const saved = onSaveProfile(draft);

    if (saved) {
      setIsEditing(false);
    }
  }

  return (
    <ScreenContainer activeScreen="profile" onNavigate={onNavigate} showTabs>
      <View style={styles.hero}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        </View>
        <Text style={styles.name}>{user.profile.fullName}</Text>
        <Text style={styles.roleTag}>{user.profile.accountRole || "Citizen"}</Text>
        <Text style={styles.referenceId}>Ref: {user.profile.referenceId}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Account Snapshot</Text>
          <Text style={styles.editLink}>{completion.score}% complete</Text>
        </View>
        <InfoRow label="Email Address" value={user.email} />
        <InfoRow label="Saved Address" value={addressPreview || "-"} />
        <InfoRow
          label="Missing Items"
          value={completion.missing.length ? completion.missing.join(", ") : "Profile is ready for follow-up."}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Basic Information</Text>
          <Text style={styles.editLink}>Read only</Text>
        </View>
        <InfoRow label="Reference ID" value={user.profile.referenceId} />
        <InfoRow label="Birth Date" value={user.profile.birthDate} />
        <InfoRow label="Age" value={`${user.profile.age} years old`} />
        <InfoRow label="Sex" value={user.profile.sex || "-"} />
        <InfoRow label="Civil Status" value={user.profile.civilStatus || "-"} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Contact and Address</Text>
          <Pressable onPress={() => setIsEditing((current) => !current)}>
            <Text style={styles.editLink}>{isEditing ? "Cancel" : "Edit"}</Text>
          </Pressable>
        </View>

        {isEditing ? (
          <View>
            <InputBlock
              label="Mobile Number"
              value={draft.phone}
              onChangeText={(value) => updateDraft("phone", value)}
              placeholder="09XX XXX XXXX"
            />
            <InputBlock
              label="House No. / Purok"
              value={draft.houseNo}
              onChangeText={(value) => updateDraft("houseNo", value)}
              placeholder="Purok 2"
            />
            <InputBlock
              label="Street / Sitio"
              value={draft.street}
              onChangeText={(value) => updateDraft("street", value)}
              placeholder="Poblacion"
            />
            <Text style={styles.inputLabel}>Barangay</Text>
            <View style={styles.barangayGrid}>
              {barangays.map((barangay) => {
                const active = draft.barangay === barangay;

                return (
                  <Pressable
                    key={barangay}
                    style={[styles.barangayChip, active && styles.barangayChipActive]}
                    onPress={() => updateDraft("barangay", barangay)}
                  >
                    <Text style={[styles.barangayChipText, active && styles.barangayChipTextActive]}>
                      {barangay}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <InputBlock
              label="City / Municipality"
              value={draft.city}
              onChangeText={(value) => updateDraft("city", value)}
              placeholder="Alegria"
            />
            <InputBlock
              label="Province"
              value={draft.province}
              onChangeText={(value) => updateDraft("province", value)}
              placeholder="Surigao del Norte"
            />
            <InputBlock
              label="Account Role"
              value={draft.accountRole}
              onChangeText={(value) => updateDraft("accountRole", value)}
              placeholder="Citizen"
            />
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save changes</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <InfoRow label="Mobile Number" value={user.profile.phone || "-"} />
            <InfoRow label="Address" value={addressPreview || "-"} />
            <InfoRow label="Account Role" value={user.profile.accountRole || "Citizen"} />
          </View>
        )}

        {message ? (
          <View style={styles.messageCard}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}
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

function InputBlock({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputBlock}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mutedLight}
      />
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
  roleTag: {
    color: theme.colors.navyDeep,
    backgroundColor: theme.colors.goldSoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
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
  inputBlock: {
    marginBottom: 14
  },
  inputLabel: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 8
  },
  input: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: 14,
    color: theme.colors.text,
    fontSize: 15
  },
  barangayGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14
  },
  barangayChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  barangayChipActive: {
    backgroundColor: theme.colors.blueSoft,
    borderColor: theme.colors.blue
  },
  barangayChipText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700"
  },
  barangayChipTextActive: {
    color: theme.colors.blue
  },
  saveButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.navy,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4
  },
  saveButtonText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 15
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
  messageCard: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: theme.colors.greenSoft,
    borderWidth: 1,
    borderColor: "#A5D6BE",
    padding: 12
  },
  messageText: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700"
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
