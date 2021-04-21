import React from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = React.useState(undefined);

    React.useEffect(() => {
        return firebase.auth().onAuthStateChanged(user => setAuthUser(user));
    }, []);

    return <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>;
}
