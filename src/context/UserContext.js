import { createContext, useContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { getDBConnection, createTables, getUserDB, setUserDB, deleteUserDB, deleteTable } from "../api/LocalDatabase";
import { loginServer } from "../api/MockDataBase";

const UserContext = createContext();

function useUserContext() {
    return useContext(UserContext);
}

function UserProvider({ children }) {

    const [userID, setUserID] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const getUser = async () => {
        try {
            const db = await getDBConnection();
            await createTables(db);
            const userInfo = await getUserDB(db);
            if (userInfo[0].length == 0) {
                console.log("No Data");
            } else {
                const user = userInfo[0].rows.item(0);
                if (user) {
                    setUserID(user.uid);
                    setToken(user.token);
                    setUsername(user.username);
                    navigation.navigate('home');
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const login = async (username, password) => {
        const userInfo = loginServer(username, password);
        if (userInfo) {
            try {
                const db = await getDBConnection();
                await createTables(db);
                await setUserDB(db, userInfo);
                setUserID(userInfo.id);
                setToken(userInfo.token);
                setUsername(userInfo.username);
                navigation.navigate('home');
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log("Wrong Credentials")
        }
    }

    const logout = async () => {
        try {
            const db = await getDBConnection();
            await deleteUserDB(db, userID);
            navigation.navigate('login');
        } catch (err) {
            console.error(err)
        }
    }

    const value = {
        login,
        logout,
        userID,
        token,
        username
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export { useUserContext, UserProvider }
