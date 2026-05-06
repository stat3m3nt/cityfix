import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="create-report"
        options={{
          tabBarLabel: "Create Report",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          tabBarLabel: "Reports",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size}/>
          )
        }}
        />

        <Tabs.Screen
        name="map"
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
        <FontAwesome5 name="map-marked-alt" size={size} color={color} />          )
        }}
      />
    </Tabs>
  );
}