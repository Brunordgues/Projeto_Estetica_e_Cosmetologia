import { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/layout/Header";
import type { Solicitacao } from "./Solicitacao";
import { UserContext } from "../../components/auth/AuthContext";
import { useNavigate, useParams } from "react-router";
import DefaultInput from "../../components/solicitacoes/inputs/DefaultInput";
import ContentBody from "../../components/slider/ContentBody";
import Title from "../../components/solicitacoes/Title";
import SpacedBody from "../../components/layout/SpacedBody";
import TextAreaInput from "../../components/solicitacoes/inputs/TextAreaInput";
import type GenericList from "../../components/slider/interfaces/GenericList";
import ListInput from "../../components/solicitacoes/inputs/ListInput";
import DateInput from "../../components/solicitacoes/inputs/DateInput";
import PopUp from "../../components/PopUp";
import ContentButton from "../../components/slider/buttons/ContentButton";

const EditarSolicitacao = () => {
    const [solicitacao, setSolicitacao] = useState<Solicitacao>();
    const userContext = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [popUp, setPopUp] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState("");
    const popUpContent = useRef<React.ReactNode>(null);
    
    const popUpContext = {setPopUp, popUpContent, setPopUpTitle};
    
    const [tiposMateriais, setTiposMateriais] = useState<GenericList[]>([]);
    const [setores, setSetores] = useState<GenericList[]>([]);

    const [tiposEquipamentos, setTiposEquipamentos] = useState<GenericList[]>([]);

    const [tiposManutencoes, setTiposManutencoes] = useState<GenericList[]>([]);
    const [manutencoesCategorias, setManutencoesCategorias] = useState<GenericList[]>([]);
    const [prioridades, setPrioridades] = useState<GenericList[]>([]);

    const sendRequest = async (type: string, data: Solicitacao) => {
        const req = await fetch(`${import.meta.env.VITE_API_URL}/solicitacao/${type}/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext?.user.token}`
            },
            body: JSON.stringify(data)
        });

        const res = await req.json();
        console.log(res);

        if (req.ok) {
            navigate(-1);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (solicitacao?.categoria_solicitacao) {
            case "Material":
                sendRequest("material", 
                    {
                        materialTipoId: Number(solicitacao.tipo_material_id),
                        setorId: Number(solicitacao.setor_id),
                        quantidade: Number(solicitacao.quantidade),
                        dataNecessidade: new Date(solicitacao.data_necessidade).setUTCHours(20),
                        justificativa: solicitacao.justificativa
                    }
                );
                break;
            case "Equipamentos":
                sendRequest("equipamento", 
                    {
                        equipamentoTipoId: Number(solicitacao.categoria_equipamento_id),
                        nome: solicitacao.titulo,
                        dataInicio: new Date(solicitacao.data_inicio).setUTCHours(20),
                        dataTermino: new Date(solicitacao.data_termino).setUTCHours(20),
                        local: solicitacao.local_uso,
                        justificativa: solicitacao.justificativa,
                        responsavel: solicitacao.responsavel
                    }
                );
                break;
            case "Manutenção":
                sendRequest("manutencao", {
                    manutencaoTipoId: Number(solicitacao.tipo_manutencao_id),
                    manutencaoCategoriaId: Number(solicitacao.categoria_manutencao_id),
                    prioridadeId: Number(solicitacao.prioridade_id),
                    dataInicio: new Date(solicitacao.data_inicio).setUTCHours(20),
                    dataTermino: new Date(solicitacao.data_termino).setUTCHours(20),
                    localEquipamento: solicitacao.local_equipamento,
                    contato: solicitacao.contato,
                    descricao: solicitacao.descricao,
                    responsavel: solicitacao.responsavel,
                    disponibilidade: solicitacao.disponibilidade
                })
                break;
        }
    }

    const inputHandler = (name: string, value: string | number) => {
        setSolicitacao((prev) => ({...prev, [name]: value}));
    }

    useEffect(() => {
        console.log(solicitacao);
    }, [solicitacao])

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
            console.log(await req.status)

            if (req.ok) {
                console.log("pablo")
                setSolicitacao(res);
            }
        }

        const getItems = async (
            url: string, 
            setItem: React.Dispatch<React.SetStateAction<GenericList[]>>
        ) => {
            const req = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userContext?.user.token}`
                }
            });

            const res = await req.json();
            console.log(res);
            setItem(res);
        };

        getItems("/material/all", setTiposMateriais);
        getItems("/setor/all", setSetores);

        getItems("/tipoEquipamento/all", setTiposEquipamentos);

        getItems("/tipoManutencao/all", setTiposManutencoes);
        getItems("/categoriaManutencao/all", setManutencoesCategorias);
        getItems("/prioridade/all", setPrioridades);

        getSolicitacao();
    }, [])
    
    return (
        <div id="container">
            {popUp && (
                <PopUp 
                 title={popUpTitle}
                 titleStyle="center"
                 setPopUp={setPopUp}
                >
                    {popUpContent.current}
                </PopUp>
            )}
            <Header title="Sistema de Solicitação" backButton={true} />
            <SpacedBody>
                <Title title="Editar Solicitação" />
                <form onSubmit={handleSubmit}>
                    <ContentBody>
                        {solicitacao && (
                            <>
                                {solicitacao.categoria_solicitacao === "Equipamentos" ? (
                                    <>
                                        <ListInput 
                                         title="Categoria do Equipamento"
                                         name="categoria_equipamento_id"
                                         list={tiposEquipamentos}
                                         popUpTitle="Tipos de Equipamentos"
                                         placeholder={solicitacao.categoria_equipamento_id as string}
                                         popUpContext={popUpContext}
                                         handler={inputHandler}
                                        />
                                        <DefaultInput 
                                         title="Equipamento"
                                         type="text"
                                         value={solicitacao.titulo}
                                         name="titulo"
                                         placeholder="Informe o nome do equipamento."
                                         handler={inputHandler}
                                        />
                                        <DateInput 
                                         title="Data de Início"
                                         name="data_inicio"
                                         value={solicitacao.data_inicio as string}
                                         handler={inputHandler}
                                        />
                                        <DateInput 
                                         title="Data de Término"
                                         name="data_termino"
                                         value={solicitacao.data_termino as string}
                                         handler={inputHandler}
                                        />
                                        <DefaultInput 
                                         title="Local de Uso"
                                         type="text"
                                         value={solicitacao.local_uso}
                                         name="local_uso"
                                         placeholder="Informe onde o equipamento será utilizado."
                                         handler={inputHandler}
                                        />
                                        <TextAreaInput 
                                         title="Justificativa"
                                         name="justificativa"
                                         value={solicitacao.justificativa as string}
                                         placeholder="Descreva o motivo desta solicitação."
                                         max={1000}
                                         handler={inputHandler}
                                        />
                                        <DefaultInput 
                                         title="Responsável"
                                         type="text"
                                         name="responsavel"
                                         value={solicitacao.responsavel}
                                         placeholder="Nome do responsável pelo equipamento."
                                         handler={inputHandler}
                                        />
                                    </>
                                ) : solicitacao.categoria_solicitacao === "Material" ? (
                                    <>
                                        <TextAreaInput 
                                         title="Justificativa"
                                         name="justificativa"
                                         value={solicitacao.justificativa as string}
                                         placeholder="Descreva o motivo desta solicitação."
                                         max={1000}
                                         handler={inputHandler}
                                        />
                                        <ListInput 
                                         title="Tipo de Material"
                                         name="tipo_material_id"
                                         list={tiposMateriais}
                                         popUpTitle="Materiais"
                                         placeholder={solicitacao.tipo_material_id as string}
                                         popUpContext={popUpContext}
                                         handler={inputHandler}
                                        />
                                        <ListInput 
                                         title="Setor Solicitante"
                                         name="setor_id"
                                         list={setores}
                                         popUpTitle="Setores"
                                         placeholder={solicitacao.setor_id as string}
                                         popUpContext={popUpContext}
                                         handler={inputHandler}
                                        />
                                        <DefaultInput 
                                         title="Quantidade"
                                         type="number"
                                         value={solicitacao.quantidade}
                                         name="quantidade"
                                         step={1}
                                         placeholder="1"
                                         handler={inputHandler}
                                        />
                                        <DateInput 
                                         title="Data de Necessidade"
                                         name="data_necessidade"
                                         value={solicitacao.data_necessidade as string}
                                         handler={inputHandler}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <ListInput 
                                         title="Tipo de Manutenção"
                                         name="tipo_manutencao_id"
                                         list={tiposManutencoes}
                                         popUpTitle="Tipos de Manutenções"
                                         placeholder={solicitacao.tipo_manutencao_id as string}
                                         popUpContext={popUpContext}
                                         handler={inputHandler}
                                        />
                                        <ListInput 
                                         title="Categoria"
                                         name="categoria_manutencao_id"
                                         list={manutencoesCategorias}
                                         popUpTitle="Categorias"
                                         placeholder={solicitacao.categoria_manutencao_id as string}
                                         popUpContext={popUpContext}
                                         handler={inputHandler}
                                        />
                                        <ListInput 
                                         title="Nível de Prioridade"
                                         name="prioridade_id"
                                         list={prioridades}
                                         popUpTitle="Níveis de Prioridades"
                                         placeholder={solicitacao.prioridade_id as string}
                                         popUpContext={popUpContext}
                                         handler={inputHandler}
                                        />
                                        <DateInput 
                                         title="Data de Início"
                                         name="data_inicio"
                                         value={solicitacao.data_inicio as string}
                                         handler={inputHandler}
                                        />
                                        <DateInput 
                                         title="Data de Término"
                                         name="data_termino"
                                         value={solicitacao.data_termino as string}
                                         handler={inputHandler}
                                        />
                                        <DefaultInput 
                                         title="Local/Equipamento"
                                         type="text"
                                         name="local_equipamento"
                                         value={solicitacao.local_equipamento}
                                         placeholder="Informe o local ou equipamento que precisa."
                                         handler={inputHandler}
                                        />
                                        <DefaultInput 
                                         title="Contato para Agendamento"
                                         type="text"
                                         name="contato"
                                         value={solicitacao.contato}
                                         placeholder="Nome e telefone para contato."
                                         handler={inputHandler}
                                        />
                                        <TextAreaInput 
                                         title="Descrição do problema"
                                         name="descricao"
                                         value={solicitacao.descricao as string}
                                         placeholder="Descreva detalhadamente o problema."
                                         max={1000}
                                         handler={inputHandler}
                                        />
                                        <DefaultInput 
                                         title="Responsável"
                                         type="text"
                                         name="responsavel"
                                         value={solicitacao.responsavel}
                                         placeholder="Nome do responsável pelo equipamento."
                                         handler={inputHandler}
                                        />
                                        <TextAreaInput 
                                         title="Disponibilidade para atendimento"
                                         name="disponibilidade"
                                         value={solicitacao.disponibilidade as string}
                                         placeholder="Informe os dias e horários disponíveis para o atendimento."
                                         max={1000}
                                         handler={inputHandler}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </ContentBody>
                    <ContentButton 
                     text="Solicitar"
                    />
                </form>
            </SpacedBody>
        </div>
    )
}

export default EditarSolicitacao;