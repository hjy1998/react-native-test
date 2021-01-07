import { createContext } from 'react'

export type User = {
    isAuthorized: boolean,
}

type UserContext = User & {
    handleChange: (newUser: User) => void,
}

const defaultUser: UserContext = {
    isAuthorized: false,
    handleChange: () => { }
}

const userContext = createContext(defaultUser);

export {
    defaultUser,
    userContext,
}