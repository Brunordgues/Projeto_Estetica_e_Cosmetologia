import { useEffect, useState } from "react";
import "./Register.css";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { useNavigate } from "react-router";

interface RegisterInfo {
    nome: string,
    email: string,
    senha: string,
    repetirSenha: string,
    role: "USER",
    cpf: string
}

const Register = () => {
    const [info, setInfo] = useState<RegisterInfo | {}>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const nome = formData.get("nome") as string;
        const email = formData.get("email") as string;
        const cpf = formData.get("cpf") as string;
        const password = formData.get("senha") as string;
        const repeatedPassword = formData.get("repetirSenha") as string;

        if (password.length < 4 || password !== repeatedPassword) 
            return console.log("senhas inválidas");

        const req = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: password,
                role: "USER",
                cpf: cpf
            })
        });

        const res = await req.json();
        console.log(res);
        if (req.ok) {
            navigate("/auth/login");
        }
    }

    useEffect(() => {
            console.log(info);
    }, [info]);

    return (
        <div id="register-container">
            <form onSubmit={handleSubmit}>
                <AuthInput 
                 title="Nome"
                 name="nome"
                 placeholder="Digite seu nome"
                 type="text"
                 handler={setInfo}
                />
                <AuthInput 
                 title="E-mail"
                 name="email"
                 placeholder="Digite seu e-mail"
                 type="email"
                 handler={setInfo}
                />
                <AuthInput 
                 title="CPF"
                 name="cpf"
                 mask={["000.000.000-00"]}
                 min={14}
                 placeholder="Digite seu CPF"
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
                <AuthInput 
                 title="Confirmar Senha"
                 name="repetirSenha"
                 placeholder="Confirme sua senha"
                 type="password"
                 handler={setInfo}
                />
                <div id="register-button-space"></div>
                <AuthButton 
                 text="Cadastrar"
                />
            </form>
        </div>
    )
}

export default Register;