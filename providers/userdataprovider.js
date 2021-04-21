import React from "react";

const UserDataContext = React.createContext();

export function UserDataProvider({ children }) {
    const [userData, setUserData] = React.useState(null);
    const authUser = React.useContext(AuthContext);

    React.useEffect(() => {
        if (!authUser) return;
        const query = firebase.firestore().collection("/users").where("userId", "==", authUser.uid);
        return query.onSnapshot(snapshot => setUserData(snapshot.empty ? null : snapshot.docs[0].data()));
    }, [authUser]);

    return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
}