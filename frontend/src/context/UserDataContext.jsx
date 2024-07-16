import { createContext, useContext, useState } from "react";

export const userDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [userData,setUserData] = useState({
        date:'',
        time:'',
        timeZone:'',
        email:'',
        sequence:'',
    });

    const updateUserData = (newData) => {
        setUserData(prevData => ({...prevData,...newData}));
    };

    return(
        <userDataContext.Provider value={{userData,updateUserData}}>
            {children}
        </userDataContext.Provider>
    )
};

export const useUserData = () => useContext(userDataContext);