import { useContext } from 'react';
import { themeContext } from '../context/themeContext'

const useThemeContext = () => {
    const themeContextData = useContext(themeContext)
    return themeContextData;
};

export default useThemeContext;