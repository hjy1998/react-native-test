import React, { useState } from 'react'
import { Theme, defaultTheme, themeContext } from './src/context/themeContext'
import { User, defaultUser, userContext } from './src/context/userContext'
import { makeStyles } from './src/hooks/makeStyles'
import Router from './Router'

const useStyle = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    color: theme.theme,
    backgroundColor: theme.textFieldTheme,
  },
}))

const App = () => {
  const [themeColor, setThemeColor] = useState(defaultTheme);
  const [userState, setUserState] = useState(defaultUser);

  const handleThemeChange = (newTheme: Theme) => {
    setThemeColor((prevTheme) => {
      return {
        ...prevTheme,
        ...newTheme
      }
    });
  };

  const handleUserChange = (newUserState: User) => {
    setUserState((prevUserState) => {
      return {
        ...prevUserState,
        ...newUserState
      }
    })
  }

  return (
    <themeContext.Provider value={{
      ...themeColor,
      handleChange: handleThemeChange,
    }}>
      <userContext.Provider
        value={{
          ...userState,
          handleChange: handleUserChange,
        }}
      >
        <Router />
      </userContext.Provider>
    </themeContext.Provider>
  )
}

export default App;
