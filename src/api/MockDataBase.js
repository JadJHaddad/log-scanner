let onlineUserData = [
    {
        id: 1,
        username: "jad",
        password: "password",
        token: "token1a2b3c",
        lastState: 'out'
    },
    {
        id: 2,
        username: "someoneelse",
        password: "Password132",
        token: "token1a2b3c",
        lastState: 'out'
    }
]

let onlineChecks = [
    {
        uid: 1,
        type: 'in',
        time: 1705228848
    },
    {
        uid: 1,
        type: 'out',
        time: 1705243248
    },
    {
        uid: 1,
        type: 'in',
        time: 1705246848
    }
]

const loginServer = (username, password) => {
    return onlineUserData.find(a => a.username == username && a.password == password)
}

const validateToken = (uid, token) => {
    return onlineUserData.find(a => a.id == uid && a.token == token)
}

const addCheck = (token, uid, type, time) => {
    if (onlineUserData.find(a => a.id == uid && a.token == token)) {
        onlineChecks.push({ uid, type, time });
    }
}

const getTodayChecks = () => {
    let start = new Date();
    start.setUTCHours(0, 0, 0, 0)
    start = start.getTime();
    return onlineChecks.filter( a => {if (a.time > start) return a} );
}

export { loginServer, addCheck, validateToken, getTodayChecks };
