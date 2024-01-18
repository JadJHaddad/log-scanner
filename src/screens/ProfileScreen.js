import { Text, Button, FlatList } from "react-native";
import { useUserContext } from "../context/UserContext";
import { Section, CheckItem } from "../components";
import { useDataContext } from '../context/DataContext';

function ProfileScreen() {
    const { username, logout } = useUserContext();
    const { unsyncedData, todayData } = useDataContext();

    return (
        <>
            <Section title={'Profile'}>
                <Text>{username}</Text>
                <Button title="Logout" onPress={() => { logout() }} />
            </Section>
            <Section title={"Today's Logs"}>
                <FlatList
                    data={todayData}
                    renderItem={({ item }) => <CheckItem time={item.time} type={item.type} />}
                    keyExtractor={item => item.time}
                />
            </Section>
            <Section title={"Unsynced Logs"}>
                <FlatList
                    data={unsyncedData}
                    renderItem={({ item }) => <CheckItem time={item.time} type={item.type} />}
                    keyExtractor={item => item.time}
                />
            </Section>
        </>

    )
}

export default ProfileScreen;
