import "./AuthButton.css";

interface AuthButtonProps {
    text: string
}

const AuthButton = ({text}: AuthButtonProps) => {
    return (
        <button className="auth-button">
            {text}
        </button>
    )
}

export default AuthButton;