import { IoIosArrowBack } from "react-icons/io";

import "./Header.css";
import { useNavigate } from "react-router";

interface HeaderProps {
    title: string,
    backButton?: boolean
}

const Header = ({title, backButton}: HeaderProps) => {
    const navigate = useNavigate();

    const returnPage = () => {
        navigate(-1);
    }

    return (
        <header id="header">
            {backButton ? (
                <div id="header-button" onClick={returnPage}>
                    <IoIosArrowBack />
                    <p>Voltar</p>
                </div>
            ) : (
                <h2>{title}</h2>
            )}
        </header>
    )
}

export default Header;