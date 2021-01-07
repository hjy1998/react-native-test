import { StyleSheet } from 'react-native';
import { Theme } from '../context/themeContext';
import useThemeContext from './useTheme';

/**
 * A custom hook to create `StyleSheet` and able to receive `props` to do conditional styling
 */
export const makeStyles = <
    T extends {}, // to determine the props value
    P extends StyleSheet.NamedStyles<P>, // to determine the return type for created stylesheet
    >(callbackfn: (
        theme: Theme,  // the type of paramters that will pass whenever the creation of a style
        props?: T, // props that can be used to determine the CSS
    ) => P // return type of callback and it is the type to pass as the paramtere of StyleSheet.create()
) => {

    return (props?: T) => { // calling makeStyles will return this function
        const theme = useThemeContext(); // ThemContext hooks

        return StyleSheet.create(callbackfn(theme, props)); // return type of calling the function that called makeStyles
    }
}





