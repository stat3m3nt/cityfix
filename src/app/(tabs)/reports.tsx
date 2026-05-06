import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useReportContext } from '../../context/ReportContext';
import EmptyState from '../../components/common/EmptyState';
import ReportList from '../../components/reports/ReportList';
import ScreenHeader from "../../components/common/ScreenHeader";
import { COLORS } from "../../constants/colors";
import { Report } from "../../context/ReportContext";

type Filter = "All" | "Open" | "Resolved";
const FILTERS: Filter[] = ["All", "Open", "Resolved"];

export default function ReportScreen(){
    const { reports, updateReportStatus } = useReportContext();
    const params = useLocalSearchParams<{ filter?: string }>();
    const [activeFilter, setActiveFilter] = useState<Filter>("All");

    useEffect(() => {
        if (params.filter && FILTERS.includes(params.filter as Filter)) {
            setActiveFilter(params.filter as Filter);
        }
    }, [params.filter]);

    const handleResolve = (id: string, newStatus: Report["status"]) => {
        updateReportStatus(id, newStatus);
    };

    const filteredReports = activeFilter === "All" ? reports : reports.filter((r) => r.status === activeFilter);

    return (
        <View style={styles.container}>
            <ScreenHeader title="My Reports" subtitle="Track issues you've submitted to the city"></ScreenHeader>

            <View style={styles.filterBar}>
                {FILTERS.map((filter) => {
                    const isActive = activeFilter === filter;
                    const count = filter === "All" ? reports.length : reports.filter(r => r.status === filter).length;
                    return (
                        <Pressable
                            key={filter}
                            style={[styles.filterTab, isActive && styles.filterTabActive]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>{filter} 
                            </Text>
                            <View style={[styles.filterBadge, isActive && styles.filterBadgeActive]}>
                                <Text style={[styles.filterBadgeText, isActive && styles.filterBadgeTextActive]}>{count}</Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>

            {filteredReports.length === 0 ? (
            <EmptyState
                title={activeFilter === "All" ? "No reports submitted yet." : `No ${activeFilter.toLowerCase()} reports`}
                message={
                    activeFilter === "All" ? "Use the \"Create Report\" tab to submit a report." : `There are no ${activeFilter.toLowerCase()} reports to display.`
                }
            />

            ):(
                <View style={styles.listContainer}>
                    <ReportList reports={filteredReports} onStatusChange={handleResolve}/>
                </View>
            )}
        </View>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    filterBar: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.card,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        gap: 8,
    },
    filterTab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        gap: 6,
    },
    filterTabActive: {
        backgroundColor: COLORS.primaryFaint,
  },
  filterLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: "600",
    },
    filterLabelActive: {
        color: COLORS.primary,
    },

    filterBadge: {
        minWidth: 20,
        height: 20,
        backgroundColor: COLORS.border,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
    },
    filterBadgeActive: {
        backgroundColor: COLORS.primary,
    },
    filterBadgeText: {
        fontSize: 11,
        color: COLORS.textSecondary,
        fontWeight: "600",
    },
    filterBadgeTextActive: {
        color: COLORS.white,
    }, 
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12, 
    }, 

})

