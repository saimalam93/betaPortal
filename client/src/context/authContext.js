import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const intialState = {
  user: null,
};

let userToken = localStorage.getItem("token");

if (userToken !== null) {
  const decodeToken = jwtDecode(userToken);
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    intialState.user = decodeToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, intialState);

  const login = (userData) => {
    if (userData) {
      const decodeToken = jwtDecode(userData.token);
      localStorage.setItem("token", userData.token);
      dispatch({
        type: "LOGIN",
        payload: decodeToken,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
