import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useReportContext } from "../../context/ReportContext";
import ReportList from "../../components/reports/ReportList";
import ScreenHeader from "../../components/common/ScreenHeader";
import EmptyState from "../../components/common/EmptyState";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";

type StatBoxProps = {
  label: string;
  value: number;
  color: string;
  bg: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

function StatBox({ label, value, color, bg, icon, route }: StatBoxProps) {
  const router = useRouter();
  return (
    <Pressable
      style={[styles.statBox, { backgroundColor: bg }]}
      onPress={() => router.push(route as any)}
    >
      <View style={[styles.statIconWrap, { backgroundColor: color + "22" }]}>
        <Ionicons name={icon} size={16} color={color} />
      </View>
      <Text style={[styles.statNumber, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { reports, updateReportStatus } = useReportContext();

  const totalReports = reports.length;
  const openReports = reports.filter((r) => r.status === "Open").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const recentReports = reports.slice(0, 3);

  return (
    <View style={styles.wrapper}>
      <ScreenHeader
        title="CivicSnap"
        subtitle="Report municipal issues in your community"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview section */}
        <Text style={styles.sectionLabel}>Overview</Text>
        <View style={styles.statsRow}>
          <StatBox
            label="Total"
            value={totalReports}
            color={COLORS.primary}
            bg={COLORS.primaryFaint}
            icon="layers-outline"
            route="/(tabs)/reports"
          />
          <StatBox
            label="Open"
            value={openReports}
            color={COLORS.open}
            bg="#FFF3E8"
            icon="time-outline"
            route="/(tabs)/reports"
          />
          <StatBox
            label="Resolved"
            value={resolvedReports}
            color={COLORS.resolved}
            bg="#E8F5EE"
            icon="checkmark-done-outline"
            route="/(tabs)/reports"
          />
        </View>

        {/* Recent reports section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Recent Reports</Text>
          {reports.length > 3 && (
            <Pressable onPress={() => {}}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          )}
        </View>

        {recentReports.length === 0 ? (
          <EmptyState
            title="No reports yet"
            message="Tap 'Create Report' to submit your first community issue."
          />
        ) : (
          <ReportList
            reports={recentReports}
            onStatusChange={(id) => updateReportStatus(id, "Resolved")}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 14,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.primaryMid,
    fontWeight: "600",
  },
});