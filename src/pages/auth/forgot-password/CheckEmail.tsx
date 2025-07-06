import { useEffect, useState } from "react";
import AuthButton from "../../../components/auth/AuthButton";
import AuthInput from "../../../components/auth/AuthInput";
import { useNavigate } from "react-router";

import "./CheckEmail.css";

interface Email {
    email: string
}

const CheckEmail = () => {
    const [info, setInfo] = useState<Email | {}>({});
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password/generate-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const res = await req.json();
        console.log(res);

        if (req.ok) {
            console.log("Código enviado para o email!");
            navigate("/auth/forgot-password/verify-code");
            return;
        };

        setError(res.message);
    }

    useEffect(() => {
        console.log(info);
    }, [info])

    return (
        <div id="forgot-password-container">
            <form onSubmit={handleSubmit}>
                <AuthInput 
                 title="Email" 
                 name="email" 
                 placeholder="Digite seu email" 
                 type="email" 
                 handler={setInfo}
                 />
                 {error && <p id="forgot-password-error">{error}</p>}
                 <div className="button-space"></div>
                <AuthButton 
                 text="Entrar" 
                />
            </form>
        </div>
    )
}

export default CheckEmail;