import { createContext } from "react"
import { generateRandomTheme } from '../utils/generateRandomTheme'

export type Theme = {
    theme: string;
    textFieldTheme: string,
}

type ThemeContext = Theme & {
    handleChange: (newTheme: Theme) => void;
}

const elementIndex = Math.floor(Math.random() * 3);

const defaultTheme: ThemeContext = {
    theme: generateRandomTheme(elementIndex)[0],
    textFieldTheme: generateRandomTheme(elementIndex)[1],
    handleChange: () => { },
}

const themeContext = createContext(defaultTheme)

export {
    defaultTheme,
    themeContext,
}