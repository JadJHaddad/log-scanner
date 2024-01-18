import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from "react-native";

function MainLayout({ children }) {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ backgroundStyle }}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

export default MainLayout;
