import { useContext } from 'react';
import { userContext } from '../context/userContext'

const useUserContext = () => {
    const userContextData = useContext(userContext)
    return userContextData;
};

export default useUserContext;