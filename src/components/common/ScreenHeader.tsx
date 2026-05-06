import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

type ScreenHeaderProps = {
    title: string;
    subtitle?: string;
};

export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
           {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.white,
        // marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 12,
        color: COLORS.white,
        textAlign: 'center',
    },
});