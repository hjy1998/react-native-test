import { StyleSheet } from 'react-native';
import { Theme } from '../context/themeContext';
import useThemeContext from './useTheme';

type CallbackFunction<T> = <
    P extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>   // to determine the return type for created stylesheet
    >(
    theme: Theme,   // the type of paramters that will pass whenever the creation of a style
    props?: T,   // props that can be used to determine the CSS
) => P | StyleSheet.NamedStyles<P>  // return type of callback and it is the type to pass as the paramtere of StyleSheet.create()

/**
 * A custom hook to create `StyleSheet`
 */
export const makeStyles = <
    T extends {}, // to determine the props value
    >(callbackfn: CallbackFunction<T>
    ) => {
    return (props?: T) => { // calling makeStyles will return this function
        const theme = useThemeContext(); // ThemContext hooks
        const styles = callbackfn(theme, props);
        return StyleSheet.create(styles); // return type of calling the function that called makeStyles
    }
}

export type ErrorValueCallback<T> = <P extends {}>(err: any, val: T) => P

export const foo = <T extends {}>(cb: ErrorValueCallback<T>) => {
    return (props: T) => {
        return cb(null, props);
    }
};






