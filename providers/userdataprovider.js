import React from "react";
import {AuthContext} from './authprovider';
import fire from '../config/fire-conf';

const UserDataContext = React.createContext();

export function UserDataProvider({ children }) {
    const [userData, setUserData] = React.useState(null);
    const authUser = React.useContext(AuthContext);

    React.useEffect(() => {
        if (!authUser) return;
        const query = fire.firestore().collection("/users").where("uid", "==", authUser.uid);
        return query.onSnapshot(snapshot => setUserData(snapshot.empty ? null : snapshot.docs[0].data()));
    }, [authUser]);

    return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
}