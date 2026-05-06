import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Report } from "@/src/context/ReportContext";
import { COLORS } from "@/src/constants/colors";

type ReportCardProps = {
    report: Report;
    onStatusChange: (id: string, newStatus: Report["status"]) => void;
};

const severityColor = (severity: string) => {
  if (severity === "High") return COLORS.highSeverity;
  if (severity === "Medium") return COLORS.mediumSeverity;
  return COLORS.lowSeverity;
};
 
const severityBg = (severity: string) => {
  if (severity === "High") return "#FDEAEA";
  if (severity === "Medium") return "#FFF3E8";
  return "#E8F7F2";
};

export default function ReportCard({ report, onStatusChange }: ReportCardProps) {
    return (
        <View style={styles.card}>
            {report.photoURI ? (
                <Image source={{ uri: report.photoURI }} style={styles.image} />) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>No Image</Text>
                </View>
            )}

            <View style={styles.body}>
                <View style={styles.row}>
                    <Text style={styles.category}>{report.category}</Text>
                    <View style={[styles.severityBadge, { backgroundColor: severityBg(report.severity) }]}>
                    
                        <Text style={[styles.severityText, { color: severityColor(report.severity) }]}>
                        {report.severity}
                        </Text>
                    </View>
                </View>
 
                {report.notes ? (
                    <Text style={styles.notes} numberOfLines={2}>{report.notes}</Text>
                ) : null}
        
                <View style={styles.footer}>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: report.status === "Open" ? "#FFF3E8" : "#E8F7F2" }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: report.status === "Open" ? COLORS.open : COLORS.resolved }
                    ]}>
                
                        {report.status}
                    </Text>
                </View>
 
                {report.status === "Open" && (
                    <Pressable
                        style={styles.resolveButton}
                        onPress={() => onStatusChange(report.id, "Resolved")}>
                        <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
                    </Pressable>
                )}
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  imagePlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: COLORS.primaryFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    color: COLORS.primaryLight,
    fontSize: 13,
    fontWeight: "500",
  },
  body: {
    padding: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginLeft: 8,
  },
  severityText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  notes: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  resolveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  resolveButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },
});
 