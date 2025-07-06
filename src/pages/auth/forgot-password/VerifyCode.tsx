import { useEffect, useState } from "react";
import AuthInput from "../../../components/auth/AuthInput";
import { useNavigate } from "react-router";
import AuthButton from "../../../components/auth/AuthButton";
import verificar from "../../../assets/verificar.svg";

import "./VerifyCode.css";

interface Code {
    code: number
}

const VerifyCode = () => {
    const [info, setInfo] = useState<Code | {}>({});
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password/verify-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const res = await req.json();
        console.log(res);

        if (req.ok) {
            console.log("Código confirmado!");
            navigate(`/auth/forgot-password/change-password/${res.message}`);
            return;
        };

        setError(res.message);
    }

    useEffect(() => {
        console.log(info);
    }, [info])
    
    return (
        <div id="verify-code-container">
            <form onSubmit={handleSubmit}>
                <img src={verificar} alt="Simbolo de email enviado com sucesso." />
                <p>Enviamos um código de verificação para o seu e-mail. Verifique sua caixa de entrada (e também o spam) e insira o código para continuar.</p>
                <AuthInput 
                 title="" 
                 name="code" 
                 placeholder="Insira seu código" 
                 type="number" 
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

export default VerifyCode;