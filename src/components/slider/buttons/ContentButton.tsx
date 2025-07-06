import "./ContentButton.css";

interface ContentButtonProps {
    text: string,
    handler?: () => void
}

const ContentButton = ({text, handler}: ContentButtonProps) => {
    return (
        <button className="slider-content-button" onClick={handler}>
            {text}
        </button>
    )
}

export default ContentButton;