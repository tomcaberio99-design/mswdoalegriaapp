import { payoutBulletin } from "../data/portalData";

export function calculateAge(birthDate) {
  if (!birthDate) return "";

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return Number.isNaN(age) ? "" : age;
}

export function createReferenceId() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 900 + 100);
  return `SC-${timestamp}-${random}`;
}

export function getPayoutStatus(barangay) {
  const normalizedBarangay = String(barangay ?? "").trim();
  const isIncluded = payoutBulletin.includedBarangays.includes(normalizedBarangay);

  if (isIncluded) {
    return {
      included: true,
      label: "Included in Payout",
      title: `${normalizedBarangay} is included in the current payout release.`,
      detail: `Proceed to ${payoutBulletin.venue} on ${payoutBulletin.releaseDate}, ${payoutBulletin.claimWindow}.`,
      helper: "Bring a valid ID and wait for the official Barangay call sequence."
    };
  }

  return {
    included: false,
    label: "Waiting for Next Schedule",
    title: `${normalizedBarangay || "Your Barangay"} is not yet included in the current batch.`,
    detail: "Please wait for the next LGU advisory for the updated clustered payout schedule.",
    helper: "The dashboard will be updated once your Barangay is included."
  };
}
