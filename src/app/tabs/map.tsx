import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useReportContext } from "../../context/ReportContext";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import React, {useEffect, useMemo, useRef, useState } from "react";

type LatLng = {
    latitude: number;
    longitude: number;
}

const DEFAULT_REGION: Region = {
  latitude: 43.1594,
  longitude: -79.2469,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const getMarkerColor = (severity: string) => {
  if (severity === "High") return "red";
  if (severity === "Medium") return "orange";
  return "green";
};
 
export default function MapScreen() {
  const { reports } = useReportContext();
  const { getCurrentLocation } = useCurrentLocation();

  const mapRef = useRef<MapView | null>(null);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const LoadLocation = async () => {
        const loc = await getCurrentLocation();
        if(loc) {
            setUserLocation(loc);
        }
        setLoading(false);
    };
    LoadLocation();
  }, []); 

  const initialRegion = useMemo<Region>(() => {
     if (reports.length > 0){
        return {
        latitude: reports[0].latitude,
        longitude: reports[0].longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
        };
    } 
    if (userLocation) {
        return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        };
    }
    
    return DEFAULT_REGION;
}, [reports, userLocation]);
    
useEffect(() => {
    if(!mapRef.current) return;

    if(reports.length > 0){
        mapRef.current.animateToRegion(
            {
             latitude: reports[0].latitude,
             longitude: reports[0].longitude, 
             latitudeDelta: 0.02,
             longitudeDelta: 0.02,  
            },
            1000
        );
        return;
    }

    if(userLocation){
        mapRef.current.animateToRegion(
            {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            1000
        );
    }
}, [reports, userLocation]);

if(loading) {
  return(
    <View style={styles.center}>
      <ActivityIndicator size="large"/>
      <Text style={styles.infoText}> Loading map...</Text>
    </View>
  );
} 

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard"
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            title={report.category}
            description={report.notes || "No notes"}
            pinColor={getMarkerColor(report.severity)}
        />
        ))}
      </MapView>

    {/* Legend */}
     <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: "red" }]} />
          <Text style={styles.legendLabel}>High</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: "orange" }]} />
          <Text style={styles.legendLabel}>Medium</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: "green" }]} />
          <Text style={styles.legendLabel}>Low</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    marginTop: 10,
    color: "#666",
  },
  legend: {
    position: "absolute",
    bottom: 30,
    right: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    gap: 6,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: "#333",
  },
});