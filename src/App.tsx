import { SafeAreaView, View } from "react-native";
import Auth from "./screens/Auth";
import { useCurrentUser } from "./hooks/useCurrentUser";
import Core from "./screens/Core";
import Collection from "./screens/Collection";
import CoinDash from "./screens/CoinDash";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DegenCoinFlip from "./screens/DegenCoinFlip";

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoggedIn = useCurrentUser()!!;

  return (
    <NavigationContainer>
      <View style={{ backgroundColor: "#2D2C35", flex: 1 }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2D2C35" }}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#1A1D1F",  // Add your desired background color here
              },
              headerTintColor: "white",  // Set the text color of the header
            }}
          >
            {isLoggedIn ? (
              <>
                <Stack.Screen name=" " component={Core} />
                <Stack.Screen name="Collection" component={Collection} />
                <Stack.Screen name="CoinDash" component={CoinDash} />
                <Stack.Screen name="DegenCoinFlip" component={DegenCoinFlip} />
              </>
            ) : (
              <Stack.Screen name=" " component={Auth} />
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </View>
    </NavigationContainer>
  );
}
