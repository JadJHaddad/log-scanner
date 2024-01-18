import { createContext, useContext, useEffect, useState } from "react";
import { addCheck, validateToken } from "../api/MockDataBase";
import { useUserContext } from "./UserContext";
import { createTables, getChecksDB, getDBConnection, setChecksDB, deleteCheckDB } from "../api/LocalDatabase";

const DataContext = createContext();

function useDataContext() {
    return useContext(DataContext);
}

function DataProvider({ children, online }) {

    const { userID, token, logout } = useUserContext();
    const [scanSuccess, setScanSuccess] = useState(true);

    useEffect(() => {
        if (token != '' && online) {
            if (validateToken(userID, token)) {
                syncLocalData();
            } else {
                logout();
            }
        }
    }, [token, online])

    const onScan = async (scans) => {
        const scanCode = scans[0].value.split('-');
        console.log(online);
        if (scanCode[0] == "2zkbzgjoxnioXzrAEQkoPYb3M289rnZ3") {
            const time = Date.now();
            if (online) {
                addCheck(token, userID, scanCode[1], time);
            } else {
                try {
                    const db = await getDBConnection();
                    await createTables(db);
                    await setChecksDB(db, { uid: userID, type: scanCode[1], time });
                    console.log('done')
                } catch (err) {
                    console.error(err);
                }
            }
            setScanSuccess(true);
        } else {
            setScanSuccess(false);
        }
    }

    const syncLocalData = async () => {
        try {
            const db = await getDBConnection();
            await createTables(db);
            const checksResponse = await getChecksDB(db, userID);
            const checks = checksResponse[0].rows;
            if (checks.length > 0) {
                for (let i = 0; i < checks.length; i++) {
                    const check = checks.item(i);
                    addCheck(token, userID, check.type, check.time);
                    await deleteCheckDB(db, check.id)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const value = {
        scanSuccess,
        onScan,
        syncLocalData
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export { useDataContext, DataProvider }
