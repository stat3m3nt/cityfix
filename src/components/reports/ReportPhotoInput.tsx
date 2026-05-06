import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { COLORS } from "@/src/constants/colors";

type ReportPhotoInputProps = {
    photoURI: string | null;
    onTakePhoto: () => void;
    onRetakePhoto: () => void;
};

export default function ReportPhotoInput({ photoURI, onTakePhoto, onRetakePhoto }: ReportPhotoInputProps) {
    if (photoURI) {
        return (
            <View style={styles.photoContainer}>
                <Image source={{ uri: photoURI }} style={styles.photo} />
                <Pressable style={styles.retakeButton} onPress={onRetakePhoto}>
                    <Text style={styles.retakeButtonText}>Retake Photo</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <Pressable style={styles.takePhotoButton} onPress={onTakePhoto}>
            <Text style={styles.takePhotoButtonText}>Take Photo</Text>
    
        </Pressable>
    );
}

const styles = StyleSheet.create({
    photoContainer: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
        
    },
    photo: {
        width: "100%",
        height: "100%",
    },
    retakeButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    retakeButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "bold",
    },
    takePhotoButton: {
        backgroundColor: COLORS.background,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        borderWidth: 3,
    },
    takePhotoButtonText: {
        color: COLORS.primaryLight,
        fontSize: 14,
        fontWeight: "bold",
    },
});