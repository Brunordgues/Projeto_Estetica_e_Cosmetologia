import { useContext, useEffect, useState } from "react";
import ContentTitle from "../../../components/slider/ContentTitle";
import { pages, type PageProps } from "../Slider";

import "./Manutencoes.css"
import type GenericList from "../../../components/slider/interfaces/GenericList";
import { UserContext } from "../../../components/auth/AuthContext";
import ContentBody from "../../../components/slider/ContentBody";
import ListInput from "../../../components/slider/inputs/ListInput";
import DateInput from "../../../components/slider/inputs/DateInput";
import DefaultInput from "../../../components/slider/inputs/DefaultInput";
import TextAreaInput from "../../../components/slider/inputs/TextAreaInput";
import ContentButton from "../../../components/slider/buttons/ContentButton";

interface ManutencoesForm {
    manutencaoTipoId: number | null,
    manutencaoCategoriaId: number | null,
    prioridadeId: number | null,
    dataInicio: Date | null,
    dataTermino: Date | null,
    localEquipamento: string | null,
    contato: string | null,
    descricao: string | null,
    responsavel: string | null,
    disponibilidade: string | null
}

const emptyManutencoes = {
    manutencaoTipoId: null,
    manutencaoCategoriaId: null,
    prioridadeId: null,
    dataInicio: null,
    dataTermino: null,
    localEquipamento: null,
    contato: null,
    descricao: null,
    responsavel: null,
    disponibilidade: null
}

const Manutencoes: React.FC<PageProps> = ({switcher, popUpContext}) => {
    const [manutencoesForm, setManutencoesForm] = useState<ManutencoesForm>(emptyManutencoes);
    const [tiposManutencoes, setTiposManutencoes] = useState<GenericList[]>([]);
    const [manutencoesCategorias, setManutencoesCategorias] = useState<GenericList[]>([]);
    const [prioridades, setPrioridades] = useState<GenericList[]>([]);

    const userContext = useContext(UserContext);

    const inputHandler = (name: string, value: string | number | Date) => {
        setManutencoesForm((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        switcher(pages[0].name, 0);
        const req = await fetch(`${import.meta.env.VITE_API_URL}/solicitacao/manutencao/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext?.user.token}`
            },
            body: JSON.stringify(manutencoesForm)
        });

        const res = await req.json();
        console.log(res);
        if (req.ok) {
            switcher(pages[0].name, 0);
            return;
        }

        popUpContext.setPopUpTitle("Erro!");
        popUpContext.popUpContent.current = <p>{res.message}</p>;
        popUpContext.setPopUp(true);
    }

    useEffect(() => {
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

        getItems("/tipoManutencao/all", setTiposManutencoes);
        getItems("/categoriaManutencao/all", setManutencoesCategorias);
        getItems("/prioridade/all", setPrioridades);
    }, []);

    useEffect(() => {
        console.log(manutencoesForm);
    }, [manutencoesForm]);

    return (
        <section className="slider-content">
            <ContentTitle 
             title="Solicitação de Manutenção"
            />
            <form onSubmit={handleSubmit}>
                <ContentBody>
                    <ListInput 
                     title="Tipo de Manutenção"
                     name="manutencaoTipoId"
                     list={tiposManutencoes}
                     popUpTitle="Tipos de Manutenções"
                     placeholder={tiposManutencoes.find(tipoManutencao => tipoManutencao.id === manutencoesForm.manutencaoTipoId)?.nome ?? "Selecione um tipo"}
                     popUpContext={popUpContext}
                     handler={inputHandler}
                    />
                    <ListInput 
                     title="Categoria"
                     name="manutencaoCategoriaId"
                     list={manutencoesCategorias}
                     popUpTitle="Categorias"
                     placeholder={manutencoesCategorias.find(manutencaoCategoria => manutencaoCategoria.id === manutencoesForm.manutencaoCategoriaId)?.nome ?? "Selecione uma categoria"}
                     popUpContext={popUpContext}
                     handler={inputHandler}
                    />
                    <ListInput 
                     title="Nível de Prioridade"
                     name="prioridadeId"
                     list={prioridades}
                     popUpTitle="Níveis de Prioridades"
                     placeholder={prioridades.find(prioridade => prioridade.id === manutencoesForm.prioridadeId)?.nome ?? "Selecione um nível"}
                     popUpContext={popUpContext}
                     handler={inputHandler}
                    />
                    <DateInput 
                     title="Data de Início"
                     name="dataInicio"
                     handler={inputHandler}
                    />
                    <DateInput 
                     title="Data de Término"
                     name="dataTermino"
                     handler={inputHandler}
                    />
                    <DefaultInput 
                     title="Local/Equipamento"
                     type="text"
                     name="localEquipamento"
                     placeholder="Informe o local ou equipamento que precisa."
                     handler={inputHandler}
                    />
                    <DefaultInput 
                     title="Contato para Agendamento"
                     type="text"
                     name="contato"
                     placeholder="Nome e telefone para contato."
                     handler={inputHandler}
                    />
                    <TextAreaInput 
                     title="Descrição do problema"
                     name="descricao"
                     placeholder="Descreva detalhadamente o problema."
                     max={1000}
                     handler={inputHandler}
                    />
                    <DefaultInput 
                     title="Responsável"
                     type="text"
                     name="responsavel"
                     placeholder="Nome do responsável pelo equipamento."
                     handler={inputHandler}
                    />
                    <TextAreaInput 
                     title="Disponibilidade para atendimento"
                     name="disponibilidade"
                     placeholder="Informe os dias e horários disponíveis para o atendimento."
                     max={1000}
                     handler={inputHandler}
                    />
                </ContentBody>
                <ContentButton
                 text="Solicitar"
                />
            </form>
        </section>
    )
}

export default Manutencoes;