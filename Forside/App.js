import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import GlemtPassordScreen from "./Screens/GlemtPassordScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#66A2BA"
          }
        }}
      >
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tilbake"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="GlemtPassord"
          component={GlemtPassordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};