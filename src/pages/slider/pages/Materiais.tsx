import { useContext, useEffect, useState } from "react";
import ContentButton from "../../../components/slider/buttons/ContentButton";
import ContentBody from "../../../components/slider/ContentBody";
import ContentTitle from "../../../components/slider/ContentTitle";
import DefaultInput from "../../../components/slider/inputs/DefaultInput";
import ListInput from "../../../components/slider/inputs/ListInput";
import TextAreaInput from "../../../components/slider/inputs/TextAreaInput";
import { pages, type PageProps } from "../Slider";

import "./Materiais.css";
import type GenericList from "../../../components/slider/interfaces/GenericList";
import { UserContext } from "../../../components/auth/AuthContext";
import DateInput from "../../../components/slider/inputs/DateInput";

interface MateriaisForm {
    materialTipoId: number | null,
    setorId: number | null,
    quantidade: number | null,
    dataNecessidade: Date | null,
    justificativa: string | null
}

const emptyMateriais = {
    materialTipoId: null,
    setorId: null,
    quantidade: 1,
    dataNecessidade: null,
    justificativa: null
}

const Materiais: React.FC<PageProps> = ({switcher, popUpContext}) => {
    const [materiaisForm, setMateriaisForm] = useState<MateriaisForm>(emptyMateriais);
    const [tiposMateriais, setTiposMateriais] = useState<GenericList[]>([]);
    const [setores, setSetores] = useState<GenericList[]>([]);

    const userContext = useContext(UserContext);

    const inputHandler = (name: string, value: string | number | Date) => {
        setMateriaisForm((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const req = await fetch(`${import.meta.env.VITE_API_URL}/solicitacao/material/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userContext?.user.token}`
            },
            body: JSON.stringify(materiaisForm)
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

        getItems("/material/all", setTiposMateriais);
        getItems("/setor/all", setSetores);
    }, []);

    useEffect(() => {
        console.log(materiaisForm);
    }, [materiaisForm]);

    return (
        <section className="slider-content">
            <ContentTitle 
             title="Solicitação de Materiais"
            />
            <form onSubmit={handleSubmit}>
                <ContentBody>
                    <TextAreaInput 
                     title="Justificativa"
                     name="justificativa"
                     placeholder="Descreva o motivo desta solicitação."
                     max={1000}
                     handler={inputHandler}
                    />
                    <ListInput 
                     title="Tipo de Material"
                     name="materialTipoId"
                     list={tiposMateriais}
                     popUpTitle="Materiais"
                     placeholder={tiposMateriais.find(material => material.id === materiaisForm.materialTipoId)?.nome ?? "Selecione um tipo"}
                     popUpContext={popUpContext}
                     handler={inputHandler}
                    />
                    <ListInput 
                     title="Setor Solicitante"
                     name="setorId"
                     list={setores}
                     popUpTitle="Setores"
                     placeholder={setores.find(setor => setor.id === materiaisForm.setorId)?.nome ?? "Selecione um setor"}
                     popUpContext={popUpContext}
                     handler={inputHandler}
                    />
                    <DefaultInput 
                     title="Quantidade"
                     type="number"
                     name="quantidade"
                     step={1}
                     placeholder="1"
                     handler={inputHandler}
                    />
                    <DateInput 
                     title="Data de Necessidade"
                     name="dataNecessidade"
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

export default Materiais;