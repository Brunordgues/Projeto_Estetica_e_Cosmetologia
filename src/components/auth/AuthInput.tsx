import { IMaskInput } from "react-imask";
import type { LoginInfo } from "../../pages/auth/Login";
import "./AuthInput.css";

interface AuthInputProps {
    title: string,
    name: string,
    type: "text" | "number" | "password" | "email",
    placeholder: string,
    min?: number,
    mask?: string[],
    handler: React.Dispatch<React.SetStateAction<LoginInfo>> 
}

const AuthInput = ({title, name, type, placeholder, mask, min, handler}: AuthInputProps) => {
    const handleInput = (value: string) => {
        handler((prev) => ({...prev, [name]: value}));
    }

    return (
        <div className="auth-input-container">
            <h2>{title}</h2>
            <IMaskInput 
             type={type} 
             name={name} 
             id={`auth-input-${name}`} 
             placeholder={placeholder}
             mask={mask}
             minLength={min}
             className="auth-input"
             onInput={(e) => handleInput(e.currentTarget.value)} 
            />
        </div>
    )
}

export default AuthInput;