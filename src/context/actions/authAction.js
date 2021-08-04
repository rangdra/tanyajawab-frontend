import axios from '../../config/axios';

export const login = (user, history) => async (dispatch) => {
  try {
    await axios.post('/auth/login', user);
    const res = await axios.get('/auth/me');
    dispatch({ type: 'LOGIN', payload: res });
    history.push('/');
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: 'ERROR', payload: error.response.data });
  }
};

export const register = (user, history) => async (dispatch) => {
  try {
    await axios.post('/auth/register', user);
    const res = await axios.get('/auth/me');
    dispatch({ type: 'REGISTER', payload: res });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
