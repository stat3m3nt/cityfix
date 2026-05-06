/**
 * EmptyState component to display a message when there are no reports to show.
 * This component is used in the HomeScreen to inform users that there are no reports yet and encourages them to create a new report.
 */

import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

type EmptyStateProps = {
    title: string;
    message: string;
};

export default function EmptyState({ title, message }: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary,
        textAlign: "center",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
});