import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Report } from "@/src/context/ReportContext";
import { COLORS } from "@/src/constants/colors";

type ReportCardProps = {
  report: Report;
  onStatusChange: (id: string, newStatus: Report["status"]) => void;
};

const SEVERITY_CONFIG = {
  High:   { color: COLORS.highSeverity,   bg: "#FDEAEA", icon: "alert-circle"     },
  Medium: { color: COLORS.mediumSeverity, bg: "#FFF3E8", icon: "warning"          },
  Low:    { color: COLORS.lowSeverity,    bg: "#E8F5EE", icon: "checkmark-circle"  },
} as const;

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReportCard({ report, onStatusChange }: ReportCardProps) {
  const sev = SEVERITY_CONFIG[report.severity as keyof typeof SEVERITY_CONFIG] ?? SEVERITY_CONFIG.Low;
  const isOpen = report.status === "Open";

  return (
    <View style={styles.card}>
      {/* Photo */}
      {report.photoURI ? (
        <Image source={{ uri: report.photoURI }} style={styles.photo} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Ionicons name="camera-outline" size={24} color={COLORS.textMuted} />
          <Text style={styles.photoPlaceholderText}>No photo</Text>
        </View>
      )}

      <View style={styles.body}>
        {/* Top row */}
        <View style={styles.topRow}>
          <Text style={styles.category}>{report.category}</Text>
          <Text style={styles.date}>{formatDate(report.createdAt)}</Text>
        </View>

        {/* Address */}
        {report.address ? (
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={12} color={COLORS.textMuted} />
            <Text style={styles.address} numberOfLines={1}>{report.address}</Text>
          </View>
        ) : null}

        {/* Badges */}
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: sev.bg }]}>
            <Ionicons name={sev.icon as any} size={11} color={sev.color} />
            <Text style={[styles.badgeText, { color: sev.color }]}>{report.severity}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: isOpen ? "#FFF3E8" : "#E8F5EE" }]}>
            <View style={[styles.dot, { backgroundColor: isOpen ? COLORS.open : COLORS.resolved }]} />
            <Text style={[styles.badgeText, { color: isOpen ? COLORS.open : COLORS.resolved }]}>
              {report.status}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {report.notes ? (
          <Text style={styles.notes} numberOfLines={2}>{report.notes}</Text>
        ) : null}

        {/* Resolve button */}
        {isOpen && (
          <Pressable
            style={styles.resolveButton}
            onPress={() => onStatusChange(report.id, "Resolved")}
          >
            <Ionicons name="checkmark" size={14} color={COLORS.white} />
            <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  photo: {
    width: "100%",
    height: 160,
  },
  photoPlaceholder: {
    width: "100%",
    height: 80,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  photoPlaceholderText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  body: {
    padding: 14,
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    flex: 1,
  },
  date: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  address: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  notes: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  resolveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  resolveButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },
});