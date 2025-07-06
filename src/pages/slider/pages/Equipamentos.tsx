import { useContext, useEffect, useState } from "react";
import ContentTitle from "../../../components/slider/ContentTitle";
import { pages, type PageProps } from "../Slider";

import "./Equipamentos.css";
import type GenericList from "../../../components/slider/interfaces/GenericList";
import { UserContext } from "../../../components/auth/AuthContext";
import ContentBody from "../../../components/slider/ContentBody";
import ListInput from "../../../components/slider/inputs/ListInput";
import DefaultInput from "../../../components/slider/inputs/DefaultInput";
import DateInput from "../../../components/slider/inputs/DateInput";
import TextAreaInput from "../../../components/slider/inputs/TextAreaInput";
import ContentButton from "../../../components/slider/buttons/ContentButton";

interface EquipamentosForm {
    equipamentoTipoId: number | null,
    nome: string | null,
    dataInicio: Date | null,
    dataTermino: Date | null,
    local: string | null,
    justificativa: string | null,
    responsavel: string | null
}

const emptyEquipamentos = {
    equipamentoTipoId: null,
    nome: null,
    dataInicio: null,
    dataTermino: null,
    local: null,
    justificativa: null,
    responsavel: null
}

const Equipamentos: React.FC<PageProps> = ({switcher, popUpContext}) => {
    const [equipamentosForm, setEquipamentosForm] = useState<EquipamentosForm>(emptyEquipamentos);
    const [tiposEquipamentos, setTiposEquipamentos] = useState<GenericList[]>([]);

    const userContext = useContext(UserContext);

    const inputHandler = (name: string, value: string | number | Date) => {
        setEquipamentosForm((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        switcher(pages[0].name, 0);
        const req = await fetch(`${import.meta.env.VITE_API_URL}/solicitacao/equipamento/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext?.user.token}`
            },
            body: JSON.stringify(equipamentosForm)
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

        getItems("/tipoEquipamento/all", setTiposEquipamentos);
    }, []);

    useEffect(() => {
        console.log(equipamentosForm);
    }, [equipamentosForm]);

    return (
        <section className="slider-content">
            <ContentTitle 
             title="Solicitação de Equipamentos"
            />
            <form onSubmit={handleSubmit}>
                <ContentBody>
                    <ListInput 
                     title="Categoria do Equipamento"
                     name="equipamentoTipoId"
                     list={tiposEquipamentos}
                     popUpTitle="Tipos de Equipamentos"
                     placeholder={tiposEquipamentos.find(tipoEquipamento => tipoEquipamento.id === equipamentosForm.equipamentoTipoId)?.nome ?? "Selecione um tipo"}
                     popUpContext={popUpContext}
                     handler={inputHandler}
                    />
                    <DefaultInput 
                     title="Equipamento"
                     type="text"
                     name="nome"
                     placeholder="Informe o nome do equipamento."
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
                     title="Local de Uso"
                     type="text"
                     name="local"
                     placeholder="Informe onde o equipamento será utilizado."
                     handler={inputHandler}
                    />
                    <TextAreaInput 
                     title="Justificativa"
                     name="justificativa"
                     placeholder="Descreva o motivo desta solicitação."
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
                </ContentBody>
                <ContentButton 
                 text="Solicitar"
                />
            </form>
        </section>
    )
}

export default Equipamentos;