import { openDatabase } from 'react-native-sqlite-storage';

const getDBConnection = async () => {
    return openDatabase({ name: 'punchCard.db', location: 'default' });
}

const createTables = async (db) => {
    const UserTableQuery =
        `CREATE TABLE IF NOT EXISTS user_data (
                uid INTEGER PRIMARY KEY,
                token TEXT NOT NULL,
                username TEXT NOT NULL
            );`;

    const ChecksTableQuery =
        `CREATE TABLE IF NOT EXISTS checks (
                uid INTEGER NOT NULL,
                type TEXT NOT NULL,
                time TEXT NOT NULL
            );`;

    await db.executeSql(UserTableQuery);
    await db.executeSql(ChecksTableQuery);
}

const getUserDB = async (db) => {
    return await db.executeSql('SELECT uid, token, username FROM user_data');
}
const setUserDB = async (db, userInfo) => {
    const insertQuery = "INSERT OR REPLACE INTO user_data(uid, token, username) VALUES(" + userInfo.id + ", '" + userInfo.token + "','" + userInfo.username + "');"
    return db.executeSql(insertQuery);
}
const deleteUserDB = async (db, uid) => {
    const deleteQuery = `DELETE from user_data where uid = ${uid}`;
    await db.executeSql(deleteQuery);
};


const getChecksDB = async (db, uid) => {
    return await db.executeSql(`SELECT rowid as id, type, time FROM checks WHERE uid = ${uid} ORDER BY time ASC;`)
}
const setChecksDB = async (db, checkInfo) => {
    const insertQuery = `INSERT INTO checks (uid, type, time) VALUES ('` + checkInfo.uid + `','` + checkInfo.type + `','` + checkInfo.time + `' );`
    return db.executeSql(insertQuery);
}
const deleteCheckDB = async (db, id) => {
    const deleteQuery = `DELETE from checks where rowid = ${id}`;
    await db.executeSql(deleteQuery);
};

const deleteTable = async (db, tableName) => {
    const query = `drop table ${tableName}`;
    await db.executeSql(query);
};

export {
    getDBConnection,
    createTables,
    getUserDB,
    setUserDB,
    deleteUserDB,
    getChecksDB,
    setChecksDB,
    deleteCheckDB,
    deleteTable
};
