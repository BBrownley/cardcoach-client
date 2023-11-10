import { createContext, useContext, useState, useEffect } from "react";
import userService from "./services/users";

const AuthContext = createContext();
const AuthUpdateContext = createContext();

// allows child component to consume context
export const useAuth = () => {
  return useContext(AuthContext); // subscribe to context using the value of AuthContext
};

// allows child component to update context
export const useAuthUpdate = () => {
  // subscribe to AuthUpdateContext, allowing child component access to update functions
  return useContext(AuthUpdateContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const session = await userService.getUserSession();

      if (session.loggedIn) {
        const { id, username } = session;
        setUser({ id, username });
      }
    };

    checkLogin(); // send GET request to /users/login
  }, []);

  const handleSetUser = user => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={user}>
      <AuthUpdateContext.Provider value={handleSetUser}>{children}</AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};
