import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useReportContext } from "../../context/ReportContext";
import ReportCard from "../../components/reports/ReportCard";
import ScreenHeader from "../../components/common/ScreenHeader";
import EmptyState from "../../components/common/EmptyState";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";
import { Report } from "../../context/ReportContext";

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
  const router = useRouter();

  const totalReports = reports.length;
  const openReports = reports.filter((r) => r.status === "Open").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const recentReports = reports.slice(0, 3);

  const ListHeader = (
    <View>
      {/* Stats row */}
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

      {/* Recent reports header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>Recent Reports</Text>
        {reports.length > 3 && (
          <Pressable onPress={() => router.push("/(tabs)/reports" as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <ScreenHeader
        title="Groundwork"
        subtitle="Report municipal issues in your community"
      />
      <FlatList
        data={recentReports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <EmptyState
            title="No reports yet"
            message="Tap 'Create Report' to submit your first community issue."
          />
        }
        renderItem={({ item }: { item: Report }) => (
          <ReportCard
            report={item}
            onStatusChange={(id) => updateReportStatus(id, "Resolved")}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    marginBottom: 12,
  },
});