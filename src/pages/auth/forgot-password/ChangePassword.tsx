import { useEffect, useState } from "react";
import AuthButton from "../../../components/auth/AuthButton";
import AuthInput from "../../../components/auth/AuthInput";
import { useNavigate, useParams } from "react-router";

import "./ChangePassword.css";

interface Password {
    newPassword: string
}

const ChangePassword = () => {
    const [info, setInfo] = useState<Password | {}>({});
    const { hash } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password/change-password/${hash}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const res = await req.json();
        console.log(res);

        if (req.ok) {
            console.log("Senha alterada com sucesso!");
            navigate("/");
        };
    }

    useEffect(() => {
        console.log(info);
    }, [info])
    
    return (
        <div id="change-password-container">
            <form onSubmit={handleSubmit}>
                <AuthInput 
                 title="Alterar senha" 
                 name="newPassword" 
                 placeholder="Nova senha" 
                 type="text" 
                 handler={setInfo}
                />
                <AuthButton 
                 text="Entrar" 
                />
            </form>
        </div>
    )
}

export default ChangePassword;