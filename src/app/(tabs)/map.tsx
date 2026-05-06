import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useReportContext } from "../../context/ReportContext";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { Report } from "../../context/ReportContext";
import { COLORS } from "../../constants/colors";
import React, { useEffect, useMemo, useRef, useState } from "react";

type LatLng = {
  latitude: number;
  longitude: number;
};

const DEFAULT_REGION: Region = {
  latitude: 43.1594,
  longitude: -79.2469,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const getMarkerColor = (report: Report) => {
  if (report.status === "Resolved") return "#A0A0A0"; // grey out resolved
  if (report.severity === "High") return COLORS.highSeverity;
  if (report.severity === "Medium") return COLORS.mediumSeverity;
  return COLORS.lowSeverity;
};

const severityBg = (severity: string) => {
  if (severity === "High") return "#FDEAEA";
  if (severity === "Medium") return "#FFF3E8";
  return "#E8F7F2";
};

const severityColor = (severity: string) => {
  if (severity === "High") return COLORS.highSeverity;
  if (severity === "Medium") return COLORS.mediumSeverity;
  return COLORS.lowSeverity;
};

export default function MapScreen() {
  const { reports, updateReportStatus } = useReportContext();
  const { getCurrentLocation } = useCurrentLocation();

  const mapRef = useRef<MapView | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const loadLocation = async () => {
      const loc = await getCurrentLocation();
      if (loc) setUserLocation(loc);
      setLoading(false);
    };
    loadLocation();
  }, []);

  const initialRegion = useMemo<Region>(() => {
    if (reports.length > 0) {
      return {
        latitude: reports[0].latitude,
        longitude: reports[0].longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
    }
    if (userLocation) {
      return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    return DEFAULT_REGION;
  }, [reports, userLocation]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (reports.length > 0) {
      mapRef.current.animateToRegion(
        {
          latitude: reports[0].latitude,
          longitude: reports[0].longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
      return;
    }
    if (userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [reports, userLocation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.infoText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard"
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            pinColor={getMarkerColor(report)}
            onPress={() => setSelectedReport(report)}
          />
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Severity</Text>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.highSeverity }]} />
          <Text style={styles.legendLabel}>High</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.mediumSeverity }]} />
          <Text style={styles.legendLabel}>Medium</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.lowSeverity }]} />
          <Text style={styles.legendLabel}>Low</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: "#A0A0A0" }]} />
          <Text style={styles.legendLabel}>Resolved</Text>
        </View>
      </View>

      {/* Report Detail Modal */}
      <Modal
        visible={selectedReport !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedReport(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedReport(null)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            {/* Handle bar */}
            <View style={styles.handle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header row */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalCategory}>
                  {selectedReport?.category}
                </Text>
                <Pressable
                  onPress={() => setSelectedReport(null)}
                  style={styles.closeBtn}
                >
                  <Text style={styles.closeBtnText}>✕</Text>
                </Pressable>
              </View>

              {/* Badges */}
              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: severityBg(
                        selectedReport?.severity ?? ""
                      ),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color: severityColor(
                          selectedReport?.severity ?? ""
                        ),
                      },
                    ]}
                  >
                    {selectedReport?.severity} Severity
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        selectedReport?.status === "Open"
                          ? "#FFF3E8"
                          : "#E8F7F2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color:
                          selectedReport?.status === "Open"
                            ? COLORS.open
                            : COLORS.resolved,
                      },
                    ]}
                  >
                    {selectedReport?.status}
                  </Text>
                </View>
              </View>

              {/* Notes */}
              {selectedReport?.notes ? (
                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>Notes</Text>
                  <Text style={styles.sectionValue}>
                    {selectedReport.notes}
                  </Text>
                </View>
              ) : null}

              {/* Location */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Location</Text>
                <Text style={styles.sectionValue}>
                  {selectedReport?.latitude.toFixed(5)},{" "}
                  {selectedReport?.longitude.toFixed(5)}
                </Text>
              </View>

              {/* Date */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Submitted</Text>
                <Text style={styles.sectionValue}>
                  {selectedReport?.createdAt
                    ? new Date(selectedReport.createdAt).toLocaleDateString(
                        "en-CA",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "—"}
                </Text>
              </View>

              {/* Resolve button */}
              {selectedReport?.status === "Open" && (
                <Pressable
                  style={styles.resolveBtn}
                  onPress={() => {
                    updateReportStatus(selectedReport.id, "Resolved");
                    setSelectedReport((prev) =>
                      prev ? { ...prev, status: "Resolved" } : null
                    );
                  }}
                >
                  <Text style={styles.resolveBtnText}>Mark as Resolved</Text>
                </Pressable>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  infoText: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  // Legend
  legend: {
    position: "absolute",
    bottom: 30,
    right: 16,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    gap: 6,
  },
  legendTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 12,
    color: COLORS.textPrimary,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(28, 26, 46, 0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
    maxHeight: "65%",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalCategory: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    flex: 1,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  resolveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  resolveBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },
});