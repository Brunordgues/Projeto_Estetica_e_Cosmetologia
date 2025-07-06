import { useNavigate } from "react-router";
import ContentSwitcher from "../../../components/slider/ContentSwitcher";
import ContentTitle from "../../../components/slider/ContentTitle";
import type { PageProps, pages } from "../Slider";

import "./Home.css";
import PageSwitcher from "../../../components/slider/PageSwitcher";
import { useContext } from "react";
import { UserContext } from "../../../components/auth/AuthContext";
import { extendDateFormat } from "../../../components/helper/DateFormat";

const Home: React.FC<PageProps> = ({switcher}) => {
    const userContext = useContext(UserContext);
    const navigate= useNavigate();

    const handleSwitch = (name: (typeof pages)[number]["name"], id: number) => {
        switcher(name, id);
        console.log(name)
    }

    const handlePageSwitch = (page: string) => {
        navigate(page);
    }

    return (
        <section className="slider-content">
            <ContentTitle 
             title={`Olá, ${userContext?.user.nome}!`} 
             subtitle={extendDateFormat(new Date())} 
            />
            <ContentSwitcher 
             page="equipamentos"
             newPageId={2}
             title="Nova Reserva"
             description="Equipamentos, salas, recursos"
             handler={(handleSwitch)}
            />
            <ContentSwitcher 
             page="materiais"
             newPageId={1}
             title="Nova Solicitação"
             description="Materiais desejados"
             handler={(handleSwitch)}
            />
            <ContentSwitcher 
             page="manutencoes"
             newPageId={3}
             title="Nova Manutenção"
             description="Reportar problemas, solicitar reparos"
             handler={(handleSwitch)}
            />
            <PageSwitcher 
             title="Minhas Solicitações"
             description="Histórico de solicitações enviadas"
             page="/minhas-solicitacoes"
             handler={handlePageSwitch}
            />
            <ContentTitle title="Atividade Recente" />
        </section>
    )
}

export default Home;