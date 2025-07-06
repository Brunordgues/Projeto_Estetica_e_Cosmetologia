import { useContext, useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import SpacedBody from "../../components/layout/SpacedBody";
import ContentBody from "../../components/slider/ContentBody";
import Title from "../../components/solicitacoes/Title";

import "./Solicitacao.css";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../components/auth/AuthContext";
import { dateFormat, dateTimeFormat } from "../../components/helper/DateFormat";

export interface Solicitacao {
    [name: string]: string | number
}

const Solicitacao = () => {
    const [solicitacao, setSolicitacao] = useState<Solicitacao>();
    const userContext = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const switchPage = (page: string) => {
        navigate(`/minhas-solicitacoes/${id}${page}`);
    }

    const deleteSolicitacao = async () => {
        const req = await fetch(`${import.meta.env.VITE_API_URL}/solicitacao/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userContext?.user.token}`
            }
        });

        const res = await req.json();
        console.log(res);

        if (req.ok) {
            navigate(-1);
        }
    }

    useEffect(() => {
        const getSolicitacao = async () => {
            const req = await fetch(`${import.meta.env.VITE_API_URL}/solicitacao/get/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userContext?.user.token}`
                }
            });

            const res = await req.json();
            console.log(res);

            if (req.ok) {
                setSolicitacao(res);
            }
        }

        getSolicitacao();
    }, [])

    return (
        <div id="container">
            <Header title="Sistema de Solicitação" backButton={true} />
            <SpacedBody>
                <Title title="Minhas Solicitações" />
                <br />
                <ContentBody>
                    <div className="solicitacao-info">
                        <h3 className="solicitacao-title">{solicitacao?.titulo}</h3>
                        <h4 className={`solicitacao-status ${solicitacao?.status}`}>{solicitacao?.status}</h4>
                        <h3 className="solicitacao-content"><strong>ID da Solicitação: </strong>#{id}</h3>
                        {solicitacao && (solicitacao.categoria_solicitacao === "Equipamentos" ? (
                            <>
                                <h3 className="solicitacao-content"><strong>Categoria do Equipamento: </strong>{solicitacao.categoria_equipamento}</h3>
                                <h3 className="solicitacao-content"><strong>Data de Início: </strong>{dateFormat(new Date(solicitacao.data_inicio))}</h3>
                                <h3 className="solicitacao-content"><strong>Data de Término: </strong>{dateFormat(new Date(solicitacao.data_termino))}</h3>
                                <h3 className="solicitacao-content"><strong>Local de Uso: </strong>{solicitacao.local_uso}</h3>
                                <h3 className="solicitacao-content"><strong>Responsável: </strong>{solicitacao.responsavel}</h3>
                                <h3 className="solicitacao-content"><strong>Justificativa: </strong>{solicitacao.justificativa}</h3>
                            </>
                        ) : solicitacao.categoria_solicitacao === "Material" ? (
                            <>
                                <h3 className="solicitacao-content"><strong>Tipo de Material: </strong>{solicitacao.tipo_material}</h3>
                                <h3 className="solicitacao-content"><strong>Setor Solicitante: </strong>{solicitacao.setor}</h3>
                                <h3 className="solicitacao-content"><strong>Quantidade: </strong>{solicitacao.quantidade}</h3>
                                <h3 className="solicitacao-content"><strong>Data de Necessidade: </strong>{dateFormat(new Date(solicitacao.data_necessidade))}</h3>
                                <h3 className="solicitacao-content"><strong>Justificativa: </strong>{solicitacao.justificativa}</h3>
                            </>
                        ) : (
                            <>
                                <h3 className="solicitacao-content"><strong>Tipo de Manutenção: </strong>{solicitacao.tipo_manutencao}</h3>
                                <h3 className="solicitacao-content"><strong>Categoria: </strong>{solicitacao.categoria_manutencao}</h3>
                                <h3 className="solicitacao-content"><strong>Prioridade: </strong>{solicitacao.prioridade}</h3>
                                <h3 className="solicitacao-content"><strong>Data de Início: </strong>{dateFormat(new Date(solicitacao.data_inicio))}</h3>
                                <h3 className="solicitacao-content"><strong>Data de Término: </strong>{dateFormat(new Date(solicitacao.data_termino))}</h3>
                                <h3 className="solicitacao-content"><strong>Local/Equipamento: </strong>{solicitacao.local_equipamento}</h3>
                                <h3 className="solicitacao-content"><strong>Contato: </strong>{solicitacao.contato}</h3>
                                <h3 className="solicitacao-content"><strong>Descrição: </strong>{solicitacao.descricao}</h3>
                                <h3 className="solicitacao-content"><strong>Responsável: </strong>{solicitacao.responsavel}</h3>
                                <h3 className="solicitacao-content"><strong>Disponibilidade para atendimento: </strong>{solicitacao.disponibilidade}</h3>
                            </>
                        ))}
                    </div>
                </ContentBody>
                <br />
                <ContentBody>
                    {solicitacao && (
                        <>
                            <h3 className="solicitacao-title">Histórico</h3>
                            <h3 className="solicitacao-content"><strong>{dateTimeFormat(new Date(solicitacao.data_solicitacao))} - </strong>Solicitação criada</h3>
                        </>
                    )}
                </ContentBody>
                <div id="solicitacao-button-container">
                    <button 
                     className="solicitacao-button red"
                     onClick={deleteSolicitacao}
                    >
                        Apagar
                    </button>
                    <button 
                     className="solicitacao-button green"
                     onClick={() => switchPage("/editar")}
                    >
                        Editar
                    </button>
                </div>
            </SpacedBody>
        </div>
    )
}

export default Solicitacao;