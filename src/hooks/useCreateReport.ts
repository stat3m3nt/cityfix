/**
 * GeoSnap Field Reporter - useCreateReport Hook
 * ---------------------------------------------------
 * Author: Andrew Evboifo
 * Description:
 * This custom hook, `useCreateReport`, is designed to manage the state and logic for creating a new report in the GeoSnapFieldReporter app. It handles user input, validates the input, and adds the new report to the context. The hook integrates with the current location and camera permissions to ensure that reports are created with accurate location data and optional photos.
 * 
 * The hook provides functions for handling changes to report fields, validating the input, and submitting the report. It also manages the state of the report being created, including its title, category, severity, notes, photo URI, and location.
 */


import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { useReportContext } from '../context/ReportContext';
import { useCurrentLocation } from './useCurrentLocation';
import { Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { createNewReport, validateReportInput } from '../utils/reportHelpers';

export function useCreateReport() {
    const [category, setCategory] = useState('');
    const [severity, setSeverity] = useState('');
    const [notes, setNotes] = useState('');
    const [photoURI, setPhotoURI] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);

    const cameraRef = useRef<CameraView | null>(null);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();

    const { addReport } = useReportContext();
    const { getCurrentLocation } = useCurrentLocation();
    const router = useRouter();

    const openCamera = async () => {
        if (!cameraPermission?.granted) {
            const permission = await requestCameraPermission();

            if (!permission.granted) {
                Alert.alert('Permission Denied', 'Camera access is required to take photos for your reports.');
                return;
            }
        }

        setShowCamera(true);
    };

    const takePhoto = async () => {
          if(!cameraRef.current || !cameraReady) {
            Alert.alert('Camera Not Ready', 'The camera is not ready yet. Please wait a moment and try again.');
            return;
        }

        try {
            const photo = await cameraRef.current.takePictureAsync();
            
            if (photo?.uri) {
                setPhotoURI(photo.uri);
                setShowCamera(false);
            }

        } catch (error) {
            console.error('Error taking photo:', error);    
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const retakePhoto = () => {
        setPhotoURI(null);
        setShowCamera(true);
    };

    const resetForm = () => {
        setCategory('');
        setSeverity('');
        setNotes('');
        setPhotoURI(null);
    };

    const saveReport = async () => {
        const validationError = validateReportInput(category, severity, notes); 

        if (validationError) {
            Alert.alert('Validation Error', validationError);
            return;
        }

        const location = await getCurrentLocation();

        if (!location) {
            Alert.alert('Location Error', 'Unable to retrieve current location. Please ensure location services are enabled and try again.');
            return;
        }

        const newReport = createNewReport({
            category,
            severity,
            notes,
            photoURI,
            latitude: location.latitude,
            longitude: location.longitude,
        });

        addReport(newReport);
        resetForm();
        Alert.alert('Success', 'Report saved successfully.');
        router.replace('/(tabs)/reports');
    };

    return {
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
        openCamera,
        takePhoto,
        retakePhoto,
        saveReport,
    };
}