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
    },
    {
        id: 3,
        username: "thirdperson",
        password: "Password213",
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

const loginServer = ( username, password ) => {
    return onlineUserData.find( a => a.username == username && a.password == password )
}

export { onlineChecks, onlineUserData, loginServer };
