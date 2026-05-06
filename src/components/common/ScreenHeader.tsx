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
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 20,
        backgroundColor: COLORS.primary,

    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.white,
        letterSpacing: -0.5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 12,
        color: COLORS.primaryFaint,
        textAlign: 'center',
        marginTop: 4,
        opacity: 0.85,
    },
});