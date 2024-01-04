// import { useContext, useReducer } from "react"


// const INITIAL_STATE = {
//   user: null,
//   error: null,
//   loading: false,
// }

// export const authContext = useContext(INITIAL_STATE);

//  const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case "Login_Start":
//       return {
//         user: null,
//         error: null,
//         loading: true,
//       }
//     case "Login_Success":
//       return {
//         user: action.payload,
//         error: null,
//         loading: false,
//       }
//     case "Login_failure":
//       return {
//         user: null,
//         error: action.payload,
//         loading: false,
//       }
//     default:
//       return INITIAL_STATE;
//   }
// }

// export const authProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

//   return (
//     <authContext.Provider value={{ user: state.user, error: state.error, loading: state.loading, dispatch }}>
//       {children}
//     </authContext.Provider>
//   )
// }





import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
