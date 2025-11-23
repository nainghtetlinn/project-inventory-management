import { THEMES } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: THEMES.background,
        },
        headerTintColor: THEMES.headline,
        headerTitleAlign: "center",
        tabBarInactiveTintColor: THEMES.secondary.headline,
        tabBarActiveTintColor: THEMES.button.foreground,
        tabBarActiveBackgroundColor: THEMES.button.background,
        tabBarStyle: {
          backgroundColor: THEMES.secondary.background,
          borderRadius: THEMES.border.radius,
          position: "absolute",
          margin: 24,
          paddingBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 8,
          overflow: "hidden",
          height: "auto",
        },
        tabBarItemStyle: {
          borderRadius: THEMES.border.radius,
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "My Warehouse",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
