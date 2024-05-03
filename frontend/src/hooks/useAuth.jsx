import { useContext } from 'react';
import { UserDetailsContext } from '../context/UserDetailsContext';

const useAuth = () => {
  return useContext(UserDetailsContext);
}

export default useAuth
