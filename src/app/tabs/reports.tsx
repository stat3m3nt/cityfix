import { View, StyleSheet} from "react-native";
import { useReportContext } from '../../context/ReportContext';
import EmptyState from '../../components/common/EmptyState';
import ReportList from '../../components/reports/ReportList';
import ScreenHeader from "../../components/common/ScreenHeader";
import { COLORS } from "../../constants/colors";

export default function ReportScreen(){
    const { reports, updateReportStatus } = useReportContext();

    const handleResolve = (id: string) => {
        updateReportStatus(id, 'Resolved');
    };

    return (
        <View style={styles.container}>
            <ScreenHeader title="Saved Reports"></ScreenHeader>
            {reports.length === 0 ? (
                <EmptyState
                title="No reports submitted yet."
                message='Use the "Create Report" button to submit a report.'
                />
            ):(
                <View style={styles.reportContainer}>
                    <ReportList reports={reports} onStatusChange={handleResolve}/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },
  reportContainer: {
    flex: 1,
  },

})

