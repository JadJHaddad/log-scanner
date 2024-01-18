import { enablePromise } from 'react-native-sqlite-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScannerScreen, ProfileScreen, LoginScreen } from './screens';
import ScannerIcon from './assets/scanner.svg'
import ProfileIcon from './assets/profile.svg'
import { UserProvider } from './context/UserContext';

function Home() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    if (route.name == 'Scanner')
                        return <ScannerIcon name='Scanner' fill={color} height={size} width={size} />
                    else
                        return <ProfileIcon name='User' fill={color} height={size} width={size} />

                }
            })}
        >
            <Tab.Screen name="Scanner" component={ScannerScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

function App() {

    enablePromise(true);
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <UserProvider>
                <Stack.Navigator>
                    <Stack.Screen name={'login'} component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name={'home'} component={Home} options={{ headerShown: false }} />
                </Stack.Navigator>
            </UserProvider>
        </NavigationContainer>
    );
}

export default App;
