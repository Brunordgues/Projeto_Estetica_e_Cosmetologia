import "./Title.css";

interface TitleProps {
    title: string
}

const Title = ({title}: TitleProps) => {
    return (
        <header className="title">
            <h3>{title}</h3>
        </header>
    )
}

export default Title;