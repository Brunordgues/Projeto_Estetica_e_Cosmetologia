import { createContext, useState } from "react";

interface User {
  token: string,
  role: string,
  nome: string
}

interface UserContext {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
}

export const UserContext = createContext<UserContext | null>(null);

const AuthContext = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User>({token: "", role: "", nome: ""});
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthContext;