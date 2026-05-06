import ScreenHeader from "../../components/common/ScreenHeader";
import ReportPhotoInput from "../../components/reports/ReportPhotoInput";
import SeveritySelector from "../../components/reports/SeveritySelector";
import { REPORT_CATEGORIES, CATEGORY_DESCRIPTIONS} from "../../constants/reportOptions";
import { COLORS } from "../../constants/colors";
import { useCreateReport } from "../../hooks/useCreateReport";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CameraView } from "expo-camera";

export default function CreateReportScreen() {
    const { 
        category, 
        setCategory, 
        severity, 
        setSeverity, 
        notes, 
        setNotes,
        photoURI, 
        showCamera,
        setShowCamera,
        cameraReady,
        setCameraReady,
        cameraRef,
        setCameraRef,
        openCamera,
        takePhoto,
        retakePhoto,
        saveReport,
    } = useCreateReport();

    const Camera = CameraView as any; // Type assertion to bypass ref typing issues with expo-camera

    if(showCamera) {
        return (
            <View style={styles.cameraContainer}>
                <Camera
                    ref={setCameraRef}
                    style={styles.camera}
                    facing="back"
                    onCameraReady={() => setCameraReady(true)}
                />

                <View style={styles.cameraControls}>
                    <Pressable style={styles.captureButton} onPress={takePhoto} disabled={!cameraReady}>
                        <Text style={styles.captureButtonText}>Capture</Text>
                    </Pressable>

                    <Pressable style={styles.cancelButton} onPress={() => setShowCamera(false)}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>

                </View>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <ScreenHeader title="Report an Issue" subtitle="Help improve our community's infrastructure"/>

            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={styles.container} 
                keyboardShouldPersistTaps="handled" 
                showsVerticalScrollIndicator={false}
            >

                {/* Photo Input */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Photo</Text>
                    <Text style={styles.subtitle}>A photo helps city workers understand the issue better.</Text>
                    
                    <ReportPhotoInput 
                    photoURI={photoURI} 
                    onTakePhoto={openCamera} 
                    onRetakePhoto={retakePhoto}
                    />
                </View>

                {/* Category Picker */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Issue Type</Text>
                    {category ? (
                        <Text style={styles.hint}>{CATEGORY_DESCRIPTIONS[category]}</Text>
                    ) : (
                        <Text style={styles.hint}>Select the type of infrastructure issue.</Text>
                    )}
                    <View style={styles.pickerContainer}>
                        <Picker<string>
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select issue type..." value="" />
                            {REPORT_CATEGORIES.map((option) => {
                                const Item = Picker.Item as any;
                                return <Item key={option} label={option} value={option} />;
                            })}
                        </Picker>
                    </View>
                </View>

                {/* Severity */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Urgency</Text>
                    <Text style={styles.hint}>How urgently does this need to be addressed?</Text>
                    <SeveritySelector severity={severity} onChange={setSeverity} />
                </View>

                 {/* Notes */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.hint}>Add any details that will help city workers locate and fix the issue.</Text>
                    <TextInput
                        style={styles.textInput}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="e.g. Large pothole near the bus stop, approximately 30cm wide..."
                        placeholderTextColor={COLORS.textMuted}
                        multiline
                    />
                </View>

                <Pressable style={styles.saveButton} onPress={saveReport}>
                    <Text style={styles.saveButtonText}>Save Report</Text>
                </Pressable>

                 <Text style={styles.disclaimer}>
                    Reports are geotagged with your current location and timestamp.
                </Text>
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
        paddingBottom: 40,
        paddingTop: 24,
    },
    formGroup: {
        marginBottom: 20,
    },
    subtitle:{
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 4,
        color: COLORS.textPrimary,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    hint: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
    },
    textInput: {   
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 10,
        padding: 12,
        backgroundColor: COLORS.card,
        textAlignVertical: "top",
        fontSize: 14,
        color: COLORS.textPrimary,
    },

    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 8,
        alignItems: "center",
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
    },
    disclaimer: {
        fontSize: 11,
        color: COLORS.textMuted,
        textAlign: "center",
        marginTop: 12,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    camera: {
        flex: 1,
    },
    cameraControls: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    captureButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 10,   
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: COLORS.background,
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 10,
    },

    captureButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "600",
    },
    cancelButtonText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        fontWeight: "700",
    },
    pickerContainer: {
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 10,
        backgroundColor: COLORS.card,
        overflow: "hidden",
    
    },
    picker: {   
        height: 52,
        width: "100%",
        color: COLORS.textPrimary,
    },

});