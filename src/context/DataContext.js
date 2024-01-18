import { createContext, useContext } from "react";

const DataContext = createContext();

function useDataContext() {
    return useContext(UserContext);
}

function DataProvider({ children }) {


    const value = {
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export { useDataContext, DataProvider }
