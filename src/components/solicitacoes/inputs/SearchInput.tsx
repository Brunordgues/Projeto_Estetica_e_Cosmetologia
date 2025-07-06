import { useEffect, useState } from "react";
import type { Solicitacao } from "../../../pages/solicitacoes/Solicitacoes";

import "./SearchInput.css";

interface SearchInputProps {
    solicitacoes: Solicitacao[]
    filterHandler: React.Dispatch<React.SetStateAction<Solicitacao[]>>
}

const SearchInput = ({solicitacoes, filterHandler}: SearchInputProps) => {
    const [text, setText] = useState("");

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
    }

    const filter = () => {
        filterHandler(solicitacoes.filter(
            solicitacao => (
                solicitacao.categoria.toLowerCase().includes(text.toLowerCase()) || 
                solicitacao.descricao.toLowerCase().includes(text.toLowerCase()) || 
                solicitacao.id.toString().toLowerCase().includes(text.toLowerCase()) ||
                `${solicitacao.categoria.toLowerCase()} #${solicitacao.id}`.includes(text.toLowerCase())
            ))
        );
    }

    useEffect(() => {
        filter();
        console.log(text)
    }, [text])

    return (
        <div className="search-input-container">
            <input 
             type="text" 
             name="search-input" 
             id="search-input" 
             value={text}
             placeholder="Barra de Pesquisa"
             onInput={handleInput}
             className="search-input" 
            />
        </div>
    )
}

export default SearchInput;