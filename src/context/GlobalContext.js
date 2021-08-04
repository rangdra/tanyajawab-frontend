import axios from '../config/axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { initAuthState, initPostState } from './initialState';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initAuthState);
  const [postState, postDispatch] = useReducer(postReducer, initPostState);

  useEffect(() => {
    checkUserLogin();
  }, []);
  // check user login
  const checkUserLogin = async () => {
    try {
      const res = await axios.get('/auth/me');
      authDispatch({ type: 'LOGIN', payload: res });
    } catch (error) {
      console.log(error);
    } finally {
      authDispatch({ type: 'STOP_LOADING' });
    }
  };
  return (
    <GlobalContext.Provider
      value={{ authState, authDispatch, postState, postDispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
