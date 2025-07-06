import { useEffect, useState } from "react";
import "./TextAreaInput.css";

interface TextAreaInputProps {
    title: string,
    name: string,
    placeholder: string,
    max: number,
    handler: (name: string, value: string | number) => void
}

const TextAreaInput = ({title, name, placeholder, max, handler}: TextAreaInputProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const adjustSize = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    }

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value);
        adjustSize(e);
    }

    useEffect(() => {
        if (inputValue) {
            handler(name, inputValue);
        };
    }, [inputValue]);

    return (
        <div className="slider-text-area-input-container">
            <h4>{title}</h4>
            <textarea 
             maxLength={max} 
             name={name} 
             placeholder={placeholder}
             className="slider-text-area-input"
             onInput={handleInput}
            >
            </textarea>
            <h5>Máximo de {max} caracteres</h5>
        </div>
    )
}

export default TextAreaInput;