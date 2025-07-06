import { useNavigate } from "react-router";
import { dateFormat } from "../helper/DateFormat";
import ContentBody from "../slider/ContentBody";

import "./SolicitacaoCard.css";

interface SolicitacaoCard {
    id: number,
    categoria: string,
    descricao: string,
    status: string,
    data: Date
    delayPosition?: number
}

const SolicitacaoCard = ({id, categoria, descricao, status, delayPosition, data}: SolicitacaoCard) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/minhas-solicitacoes/${id}`);    
    }

    return (
        <ContentBody 
         spaced={true} 
         animated={true} 
         delay={delayPosition && 0.2 * delayPosition}
         handler={handleClick}
        >
            <div className="solicitacao-card">
                <div className={`solicitacao-card-body-container ${status}`}>
                    <h4>{categoria} #{id}</h4>
                    <h5>{descricao}</h5>
                    <p>{dateFormat(data)}</p>
                </div>
                <div className="solicitacao-card-status-container">
                    <p className={`solicitacao-card-status ${status}`}>{status}</p>
                </div>
            </div>
        </ContentBody>
    )
}

export default SolicitacaoCard;