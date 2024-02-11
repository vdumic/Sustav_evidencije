import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import EvidenceScreen from "../screens/EvidenceScreen";
import LookupScreen from "../screens/LookupScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Screen names
const evidenceName = "Evidencija";
const lookupName = "Pregled";
const settingsName = "Postavke";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={evidenceName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let rn = route.name;

          if (rn === evidenceName) {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (rn == lookupName) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={30} color="black" />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name={evidenceName}
        component={EvidenceScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={lookupName}
        component={LookupScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={settingsName}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
