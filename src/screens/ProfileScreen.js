import { Text, Button } from "react-native";
import { useUserContext } from "../context/UserContext";
import { Section } from "../components";

function ProfileScreen() {
    const { username, logout } = useUserContext();
    return (
        <>
            <Section title={'Profile'}>
                <Text>{username}</Text>
                <Button title="Logout" onPress={() => { logout() }} />
            </Section>
            <Section title={"Today's Logs"}>
            </Section>
            <Section title={"Past Logs"}>
            </Section>
        </>

    )
}

export default ProfileScreen;
