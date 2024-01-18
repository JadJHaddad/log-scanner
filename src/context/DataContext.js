import { createContext, useContext, useEffect, useState } from "react";
import { addCheck, validateToken, getTodayChecks } from "../api/MockDataBase";
import { useUserContext } from "./UserContext";
import { createTables, getChecksDB, getDBConnection, setChecksDB, deleteCheckDB } from "../api/LocalDatabase";

const DataContext = createContext();

function useDataContext() {
    return useContext(DataContext);
}

function DataProvider({ children, online }) {

    const { userID, token, logout } = useUserContext();
    const [scanSuccess, setScanSuccess] = useState(true);
    const [unsyncedData, setUnsyncedData] = useState([]);
    const [todayOnlineData, setTodayOnlineData] = useState([]);
    const [todayData, setTodayData] = useState([]);

    useEffect(() => {
        if (token != '' && online) {
            getUnsyncedData();
            getTodayOnlineData();
            if (validateToken(userID, token)) {
                syncLocalData();
                getUnsyncedData();
                getTodayOnlineData();
            } else {
                logout();
            }
        }
    }, [token, online])

    useEffect(() => {
        let start = new Date();
        start.setUTCHours(0, 0, 0, 0)
        start = start.getTime();
        let today = [];
        if (todayOnlineData)
            today = today.concat(todayOnlineData);
        if (unsyncedData)
            today = today.concat(unsyncedData.filter(a => { if (a.time > start) return a }))
        setTodayData(today);
    }, [unsyncedData, todayOnlineData])

    const getTodayOnlineData = () => {
        const today = getTodayChecks();
        setTodayOnlineData(today);
    }

    const getUnsyncedData = async () => {
        try {
            let unsynced = [];
            const db = await getDBConnection();
            await createTables(db);
            const checksResponse = await getChecksDB(db, userID);
            const checks = checksResponse[0].rows;
            if (checks.length > 0) {
                for (let i = 0; i < checks.length; i++) {
                    unsynced.push(checks.item(i));
                }
            }
            console.log(unsynced)
            setUnsyncedData(unsynced);
        } catch (err) {
            console.error(err);
        }
    }

    const onScan = async (scans) => {
        const scanCode = scans[0].value.split('-');
        if (scanCode[0] == "2zkbzgjoxnioXzrAEQkoPYb3M289rnZ3") {
            const time = Date.now();
            if (online) {
                addCheck(token, userID, scanCode[1], time);
                setTodayOnlineData([...todayOnlineData, { time, type: scanCode[1], uid: userID }])
            } else {
                try {
                    const db = await getDBConnection();
                    await createTables(db);
                    await setChecksDB(db, { uid: userID, type: scanCode[1], time });
                    setUnsyncedData([...unsyncedData, { time, type: scanCode[1], uid: userID }])
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
        syncLocalData,
        unsyncedData,
        todayOnlineData,
        todayData
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export { useDataContext, DataProvider }
