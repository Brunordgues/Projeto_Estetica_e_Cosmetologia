import { useEffect, useRef, useState } from "react";

import Home from "./pages/Home";
import Materiais from "./pages/Materiais";
import Equipamentos from "./pages/Equipamentos";
import Manutencoes from "./pages/Manutencoes";

import "./Slider.css";
import PopUp from "../../components/PopUp";
import Header from "../../components/layout/Header";

export interface PageProps {
    switcher: (page: (typeof pages)[number]["name"], id: (typeof pages)[number]["id"]) => void,
    popUpContext: {
        setPopUpTitle: React.Dispatch<React.SetStateAction<string>>,
        popUpContent: React.RefObject<React.ReactNode>,
        setPopUp: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export const pages = [
    {id: 0, name: "home", title: "Início", content: (props: PageProps) => <Home {...props} />},
    {id: 1, name: "materiais", title: "Materiais", content: (props: PageProps) => <Materiais {...props} />},
    {id: 2, name: "equipamentos", title: "Equip.", content: (props: PageProps) => <Equipamentos {...props} />},
    {id: 3, name: "manutencoes", title: "Manut.", content: (props: PageProps) => <Manutencoes {...props} />}
]

const Slider = () => {
    const [currentPage, setCurrentPage] = useState(pages[0]);
    const [previousPage, setPreviousPage] = useState<(typeof pages)[number] | null>(null);

    const [popUp, setPopUp] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState("");
    const popUpContent = useRef<React.ReactNode>(null);

    const switchPage = (name: string, id: (typeof pages)[number]["id"]) => {
        document.body.scrollIntoView({block: "start", behavior: "smooth"});
        
        document.body.style.setProperty("--slider-options-number", pages.length.toString());
        document.body.style.setProperty("--slider-option-number", id.toString());

        setPreviousPage(currentPage);
        setCurrentPage(pages.find(page => page.name == name)!);

        setTimeout(() => setPreviousPage(null), 700);
    }

    useEffect(() => {
        console.log(popUp);
    }, [popUp])

    useEffect(() => {
        switchPage(currentPage.name, currentPage.id);
    }, [])

    return (
        <div id="slider-container">
            {popUp && (
                <PopUp 
                 title={popUpTitle}
                 titleStyle="center"
                 setPopUp={setPopUp}
                >
                    {popUpContent.current}
                </PopUp>
            )}
            <Header title="Sistema de Solicitação" />
            <nav id="slider-options">
                {pages && pages.map(page => (
                    <button 
                     className="slider-option" 
                     key={page.id}
                     onClick={() => switchPage(page.name, page.id)}
                    >
                        {page.title}
                    </button>
                ))}
                <div id="slider-option-line"></div>
            </nav>
            <div id="slider-pages-container">
                {pages && pages.map(page => (
                    <section 
                     id={`slider-page-${page.name}`} 
                     className="slider-page" 
                     key={page.name}
                    >
                        {(currentPage === page || previousPage === page) && page.content({switcher: switchPage, popUpContext: {setPopUp, popUpContent, setPopUpTitle}})}
                    </section>
                ))}
            </div>
        </div>
    )
}

export default Slider;