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
  const [user, setUser] = useState(null); // the currently signed in user on the application
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const session = await userService.getUserSession();

      if (session.loggedIn) {
        const { id, username } = session;
        setUser({ id, username });
      }

      setLoading(false);
    };

    checkLogin(); // send GET request to /users/login
  }, []);

  const handleSetUser = user => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <AuthUpdateContext.Provider value={handleSetUser}>{children}</AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};


// Error page context

const ErrorContext = createContext();
const ErrorUpdateContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
}

export const useErrorUpdate = () => {
  return useContext(ErrorUpdateContext);
}

export const ErrorProvider = ({children}) => {

  const [errorObj, setErrorObj] = useState({
    status: null,
    message: "Oops! Looks like the flashcards you were looking for got lost in a pile of virtual clutter. Try searching for it again or revisit the homepage/dashboard"
  })

  const handleSetError = errObj => {
    handleSetError(errObj)
  }

  return (
    <ErrorContext.Provider value={errorObj}>
      <ErrorUpdateContext.Provider value={setErrorObj}>{children}</ErrorUpdateContext.Provider>
    </ErrorContext.Provider>
  )
}

// Flashcard set edit mode context

const EditModeContext = createContext();
const EditModeUpdateContext = createContext();

// Flashcard set state context (contains an object representing the original state of the currently edited set)

const EditSetStateContext = createContext();
const EditSetStateUpdateContext = createContext();

export const useEditMode = () => useContext(EditModeContext);
export const useEditModeUpdate = () => useContext(EditModeUpdateContext);

// Stores the original state of the set we're editing
export const useEditSetState = () => useContext(EditSetStateContext);
export const useEditSetStateUpdate = () => useContext(EditSetStateUpdateContext);

export const SetEditProvider = ({children}) => {

  const [editMode, setEditMode] = useState(false);
  const [originalSetState, setOriginalSetState] = useState({title: "", description: "", cards: [], setId: null});

  return (
    <EditModeContext.Provider value={editMode}>
      <EditModeUpdateContext.Provider value={setEditMode}>
        <EditSetStateContext.Provider value={originalSetState}>
          <EditSetStateUpdateContext.Provider value={setOriginalSetState}>
            {children}
          </EditSetStateUpdateContext.Provider>
        </EditSetStateContext.Provider>
      </EditModeUpdateContext.Provider>
    </EditModeContext.Provider>
  )
}