/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer } from "react";
// import Cookies from "js-cookie";

const initialState = {
  darkMode: false,
//   userInfo: Cookies.get("userInfo")
//   // @ts-ignore
  
//     ? JSON.parse(Cookies.get("userInfo"))
//     : null,
  search_query: "",
  startLocation: null,
  destinationLocation: null,
  pathInfo: null
};

// @ts-ignore
export const Store = createContext();

function reducer(state: any, action: { type: any; payload: any; }) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case 'SET_CURRENT_LOCATION':
        return {...state, startLocation: action.payload}
    case 'SET_DESTINATION_LOCATION':
        return {...state, destinationLocation: action.payload}
    case 'SET_PATH_INFO':
        return {...state, pathInfo: action.payload}
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "USER_LOGIN":
    //   Cookies.set('userInfo', JSON.stringify(action.payload), { expires: 7 })
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null, cart: { cartItems: [] } };
    case "SET_SEARCH_QUERY":
      return { ...state, search_query: action.payload };
    default:
      return state;
  }
}

interface Props{
  children?:any
}

export function StoreProvider(props:Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  )
}