import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/auth/AuthContext";
import Header from "../../components/layout/Header";
import Title from "../../components/solicitacoes/Title";
import SpacedBody from "../../components/layout/SpacedBody";
import SolicitacaoCard from "../../components/solicitacoes/SolicitacaoCard";
import { IoIosApps } from "react-icons/io";
import SearchInput from "../../components/solicitacoes/inputs/SearchInput";

import "./Solicitacoes.css";

export interface Solicitacao {
    id: number,
    usuario: string,
    categoria: string,
    descricao: string,
    status: string,
    data: Date
}

const Solicitacoes = () => {
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
    const [filtered, setFiltered] = useState<Solicitacao[]>([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        const getSolicitacoes = async () => {
            const req = await fetch(`${import.meta.env.VITE_API_URL}/solicitacao/all`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userContext?.user.token}`
                }
            });

            const res = await req.json();
            setSolicitacoes(res);
            setFiltered(res);
        }

        getSolicitacoes();
    }, []);

    useEffect(() => {
        console.log(filtered);
    }, [filtered])

    return (
        <div id="container">
            <Header title="Sistema de Solicitação" backButton={true} />
            <SpacedBody>
                <Title title="Minhas Solicitações"/>
                {solicitacoes.length === 0 && (
                    <div id="solicitacoes-not-found">
                        <IoIosApps />
                        <p>Nenhuma solicitação até<br />o momento.</p>
                    </div>
                )}
                {solicitacoes.length > 0 && (
                    <SearchInput 
                     solicitacoes={solicitacoes}
                     filterHandler={setFiltered}
                    />
                )}
                {filtered.length > 0 && filtered.map((solicitacao, idx) => (
                    <SolicitacaoCard 
                     key={solicitacao.id}
                     id={solicitacao.id}
                     categoria={solicitacao.categoria}
                     descricao={solicitacao.descricao}
                     data={new Date(solicitacao.data)}
                     status={solicitacao.status}
                     delayPosition={idx}
                    /> 
                ))}
            </SpacedBody>
        </div>
    )
}

export default Solicitacoes;