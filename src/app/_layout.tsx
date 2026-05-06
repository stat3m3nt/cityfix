import { Stack } from "expo-router";
import { ReportProvider, useReportContext } from "@/src/context/ReportContext";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
    const { isLoading } = useReportContext();

    if (isLoading) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }
    return (
        <ReportProvider>
            <Stack screenOptions={{ headerShown: false }}/>
        </ReportProvider>
    );

}