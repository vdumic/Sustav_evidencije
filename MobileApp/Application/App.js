import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import EvidenceDoneScreen from "./screens/EvidenceDoneScreen";
import StatiticsScreen from "./screens/StatisticsScreen";
import StudentListScreen from "./screens/StudentListScreen";
import ActivationDoneScreen from "./screens/ActivationDoneScreen";
import DeactivationDoneScreen from "./screens/DeactivationDoneScreen";

import MainContainerStudent from "./navigation/MainContainerStudent";
import MainContainerProfesor from "./navigation/MainContainerProfesor";

const Stack = createNativeStackNavigator();

const App = () => {
  const isStudent = true;

  if (isStudent) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Evidence" component={EvidenceDoneScreen} />
          <Stack.Screen name="Statistics" component={StatiticsScreen} />
          <Stack.Screen name="TabNavigator" component={MainContainerStudent} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Activated" component={ActivationDoneScreen} />
          <Stack.Screen name="Deactivated" component={DeactivationDoneScreen} />
          <Stack.Screen name="Studentlist" component={StudentListScreen} />
          <Stack.Screen name="TabNavigator" component={MainContainerProfesor} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
