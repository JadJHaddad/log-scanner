import { useState } from "react";
import { Section } from "../components";
import { TextInput, View, Button, StyleSheet, useWindowDimensions } from "react-native";
import { useUserContext } from "../context/UserContext";

function LoginScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUserContext();
    const { height } = useWindowDimensions();

    return (
        <View style={{ display: "flex", height: height, paddingTop: height / 6 }}>
            <View>
                <Section title="Login:">
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="UserName"
                    />
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <View style={{ marginTop: 10 }}>
                        <Button
                            title={'Login'}
                            onPress={() => { login(username, password) }} />
                    </View>
                </Section>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%'
    }
});

export default LoginScreen;
