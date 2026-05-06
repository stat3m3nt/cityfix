import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

type ScreenHeaderProps = {
    title: string;
    subtitle?: string;
};

export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
    return (
        <View style={styles.container}>
             <View style={styles.accentBar} />
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
    gap: 12,
  },
  accentBar: {
    width: 4,
    height: 32,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 2,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
    marginTop: 3,
    letterSpacing: 0.1,
  },
});