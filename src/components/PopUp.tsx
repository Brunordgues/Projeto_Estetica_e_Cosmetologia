import "./PopUp.css";

interface PopUpProps {
    title: string,
    titleStyle: "left" | "center",
    children: React.ReactNode,
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUp = ({title, titleStyle, children, setPopUp}: PopUpProps) => {
    const close = () => {
        setPopUp(false);
    }

    return (
        <div 
         className="pop-up-background" 
         onClick={close}
        >
            <div 
             className="pop-up"
             onClick={e => e.stopPropagation()}
            >
                <header className={`pop-up-header ${titleStyle}`}>
                    <h2>{title}</h2>
                    <hr />
                </header>
                <div className="pop-up-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PopUp;