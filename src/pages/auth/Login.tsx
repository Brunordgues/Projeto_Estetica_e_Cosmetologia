import { useContext, useEffect, useState } from "react";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";
import { UserContext } from "../../components/auth/AuthContext";
import { useNavigate } from "react-router";

import "./Login.css";

export interface LoginInfo {
    cpf: string,
    senha: string
}

const Login = () => {
    const [info, setInfo] = useState<LoginInfo | {}>({});
    const authContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const res = await req.json();
        console.log(res);

        if (req.ok) {
            const split = res.message.split(" ");

            authContext?.setUser({
                token: split[0],
                role: split[1],
                nome: split[2]
            });

            console.log("Logado com sucesso!");
            navigate("/slider");
        };
    }

    useEffect(() => {
        console.log(info);
    }, [info])

    return (
        <div id="login-container">
            <form onSubmit={handleSubmit}>
                <AuthInput 
                 title="CPF" 
                 name="cpf" 
                 placeholder="Digite seu CPF" 
                 mask={["000.000.000-00"]}
                 min={14}
                 type="text" 
                 handler={setInfo}
                />
                <AuthInput 
                 title="Senha" 
                 name="senha" 
                 placeholder="Digite sua senha" 
                 type="password" 
                 handler={setInfo}
                />
                <div id="login-small-links">
                    <a id="login-register-button" href="/auth/register">
                        Cadastre-se
                    </a>
                    <a id="login-forgot-password-button" href="/auth/forgot-password">
                        Esqueceu a senha?
                    </a>
                </div>
                <AuthButton 
                 text="Entrar" 
                />
            </form>
        </div>
    )
}

export default Login;