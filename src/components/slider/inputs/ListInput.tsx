import "./ListInput.css";

interface ListInputProps {
    title: string,
    name: string,
    list: {
        id: number,
        nome: string
    }[],
    placeholder: string,
    popUpTitle: string,
    popUpContext: {
        setPopUpTitle: React.Dispatch<React.SetStateAction<string>>,
        popUpContent: React.RefObject<React.ReactNode>,
        setPopUp: React.Dispatch<React.SetStateAction<boolean>>
    },
    handler: (name: string, value: string | number | Date) => void
}

const ListInput = ({title, name, list, popUpTitle, placeholder, popUpContext, handler}: ListInputProps) => {
    const handleClick = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();

        popUpContext.setPopUpTitle(popUpTitle);
        popUpContext.popUpContent.current = (
            <div className="pop-up-content-list">
                {list && list.map(item => (
                    <button 
                     key={item.id} 
                     className="pop-up-content-list-item"
                     onClick={() => submitInput(item.id)}
                    >
                        {item.nome}
                    </button>
                ))}
            </div>
        );

        popUpContext.setPopUp(true);
    }

    const submitInput = (val: string | number) => {
        handler(name, val);

        popUpContext.setPopUp(false);
    }

    return (
        <div className="slider-list-input-container">
            <h4>{title}</h4>
            <div 
             className="slider-list-input" 
             onClick={handleClick}
            >
                <p>{placeholder}</p>
            </div>
        </div>
    )
}

export default ListInput;