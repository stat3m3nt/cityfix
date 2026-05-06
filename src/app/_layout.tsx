import { Stack } from "expo-router";
import { ReportProvider, useReportContext } from "@/src/context/ReportContext";
import { ActivityIndicator, View } from "react-native";

function RootLayoutInner(){
    const { isLoading } = useReportContext();
    if (isLoading) {
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
    
    return (
        <ReportProvider>
            <RootLayoutInner />
        </ReportProvider>
    );

}