import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Report } from "@/src/context/ReportContext";
import { COLORS } from "@/src/constants/colors";

type ReportCardProps = {
    report: Report;
    onStatusChange: (id: string, newStatus: Report["status"]) => void;
};

export default function ReportCard({ report, onStatusChange }: ReportCardProps) {
    return (
        <View style={styles.reportCard}>
            {report.photoURI ? (
                <Image source={{ uri: report.photoURI }} style={styles.reportImage} />) : (
                <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>No Image</Text>
                </View>
            )}
            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportCategory}>Category: {report.category}</Text>
            <Text style={styles.reportSeverity}>Severity: {report.severity}</Text>
            <Text style={styles.reportStatus}>Status: {report.status}</Text>
            <Text style={styles.reportText}>Notes:{report.notes}</Text>

            {report.status === "Open" && (
                <Pressable
                    style={styles.resolveButton}
                    onPress={() => onStatusChange(report.id, "Resolved")}>
                    <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    reportCard: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    reportImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    placeholderImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        color: COLORS.primary,
        fontSize: 16,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    reportDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    reportCategory: {
        fontSize: 12,
        color: COLORS.secondary,
    },
    reportSeverity: {
        fontSize: 12,
        color: COLORS.secondary,
    },
    reportStatus: {
        fontSize: 12,
        color: COLORS.secondary,
    },
    reportText: {
        fontSize: 14,
        marginTop: 5,
    },
    resolveButton: {
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    resolveButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
    },
});