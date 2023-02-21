import HomeScreen from "./src/screens/HomeScreen";
import ToDoScreen from "./src/screens/ToDoScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "To-Do App" }}
        />
        <Stack.Screen
          name="ToDoItem_to_ToDoScreen"
          component={ToDoScreen}
          options={{ title: "Activity" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
