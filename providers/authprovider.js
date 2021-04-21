import React from "react";
import fire from '../config/fire-conf';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = React.useState(undefined);

    React.useEffect(() => {
        return fire.auth().onAuthStateChanged(user => setAuthUser(user));
    }, []);

    return <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>;
}
