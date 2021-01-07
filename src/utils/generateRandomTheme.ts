let themeList = ['red', 'blue', 'green']
let textFieldTheme = ['orange', 'purple', 'yellow']

/**
 * To randomize the theme when launching and longPress lottie.
 */
export const generateRandomTheme = (index: number) => {

    return [themeList[index], textFieldTheme[index]]
}