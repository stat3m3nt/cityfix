
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useReportContext } from "../../context/ReportContext"; 
import ReportList from "../../components/reports/ReportList";
import ScreenHeader from "../../components/common/ScreenHeader";
import EmptyState from "../../components/common/EmptyState";
import { COLORS } from "../../constants/colors";



export default function HomeScreen() {
  const { reports, updateReportStatus } = useReportContext();

  const totalReports = reports.length;
  const openReports = reports.filter((r) => r.status === "Open").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;


  const recentReports = reports.slice(0, 3);

  const handleResolve = (id: string) => { 
    updateReportStatus(id,'Resolved');
  };

  return (
    <View style={styles.wrapper}>
      <ScreenHeader title="GeoSnap" subtitle="Track and manage your field reports" />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalReports}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.openColor]}>{openReports}</Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.resolvedColor]}>{resolvedReports}</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

        {/* Recent Reports */}
        <Text style={styles.sectionTitle}>Recent Reports</Text>
        
        {recentReports.length === 0 ? (
          <EmptyState
           title="No reports yet"
           message='Tap "Create Report" to submit our first field report.' />
        ) : (
          <ReportList reports={recentReports} onStatusChange={handleResolve} />
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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 5,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  openColor: {
    color: "#e67e22",
  },

  resolvedColor: {
    color: "#27ae60",
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
    marginTop: 4,
  },
});