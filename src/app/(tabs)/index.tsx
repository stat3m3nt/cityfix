
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useReportContext } from "../../context/ReportContext"; 
import ReportList from "../../components/reports/ReportList";
import ScreenHeader from "../../components/common/ScreenHeader";
import EmptyState from "../../components/common/EmptyState";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";



export default function HomeScreen() {
  const { reports, updateReportStatus } = useReportContext();
  const router = useRouter();

  const totalReports = reports.length;
  const openReports = reports.filter((r) => r.status === "Open").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;


  const stats = [
    {
      label: "Total",
      value: totalReports,
      color: COLORS.primary,
      bg: COLORS.primaryFaint,
      route: "/(tabs)/reports",
    },
    {
      label: "Open",
      value: openReports,
      color: COLORS.open,
      bg: "#FFF3E8",
      route: "/(tabs)/reports",
    },
    {
      label: "Resolved",
      value: resolvedReports,
      color: COLORS.resolved,
      bg: "#E8F7F2",
      route: "/(tabs)/reports",
    },
  ];
  return (
    <View style={styles.wrapper}>
      <ScreenHeader title="GeoSnap" subtitle="Track and manage your field reports" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>

      <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <Pressable
              key={stat.label}
              style={[styles.statBox, { backgroundColor: stat.bg }]}
              onPress={() => router.push(stat.route as any)}
            >
              <Text style={[styles.statNumber, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: stat.color }]}>
                {stat.label}
              </Text>
            </Pressable>
          ))}
        </View>
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 24,
  },
  
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 16,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    borderRadius: 14,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

  },

  statNumber: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -1,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#666",
    marginTop: 4,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
});