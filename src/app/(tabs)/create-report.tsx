import ScreenHeader from "../../components/common/ScreenHeader";
import ReportPhotoInput from "../../components/reports/ReportPhotoInput";
import SeveritySelector from "../../components/reports/SeveritySelector";
import { REPORT_CATEGORIES} from "../../constants/reportOptions";
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
            <ScreenHeader title="Create New Report" subtitle="Capture and describe your report"/>

            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={styles.container} 
                keyboardShouldPersistTaps="handled" 
                showsVerticalScrollIndicator={true}
            >

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Photo</Text>
                    <ReportPhotoInput 
                    photoURI={photoURI} 
                    onTakePhoto={openCamera} 
                    onRetakePhoto={retakePhoto}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.pickerContainer}>
                        <Picker<string>
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                            style={styles.picker}
                            itemStyle={{ color: '#000000' }}
                        >
                            <Picker.Item label="Select a category" value="" />
                            {REPORT_CATEGORIES.map((option) => {
                                const Item = Picker.Item as any;
                                return <Item key={option} label={option} value={option} />;
                            })}
                        </Picker>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Severity</Text>
                    <Text style={styles.subtitle}>(Indicate the severity level of the issue.)</Text>
                    <SeveritySelector severity={severity} onChange={setSeverity} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={styles.textInput}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Add any additional details about the report..."
                        multiline
                    />
                </View>

                <Pressable style={styles.saveButton} onPress={saveReport}>
                    <Text style={styles.saveButtonText}>Save Report</Text>
                </Pressable>
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
        paddingBottom: 30,
        paddingTop: 24,
    },
    formGroup: {
        marginVertical: 10,
    },
    subtitle:{
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: COLORS.primary,
    },
    textInput: {   
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        backgroundColor: COLORS.white,
        textAlignVertical: "top",
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        width: "50%",
        alignSelf: "center",
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
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
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    captureButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,   
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: COLORS.background,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    captureButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButtonText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        fontWeight: "bold",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
        backgroundColor: COLORS.white,
    
    },
    picker: {   
        height: 50,
        width: "100%",
        color: '#000000',
    },

});