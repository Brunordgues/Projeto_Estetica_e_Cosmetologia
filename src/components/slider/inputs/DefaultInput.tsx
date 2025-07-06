import "./DefaultInput.css";
import { useEffect, useState } from "react";

interface DefaultInputProps {
    title: string,
    type: "text" | "number",
    name: string,
    step?: number,
    placeholder: string,
    handler: (name: string, value: string | number | Date) => void
}

const DefaultInput = ({title, type, name, step, placeholder, handler}: DefaultInputProps) => {
    const [inputValue, setInputValue] = useState<string | number>("");

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
        console.log(e);
    }

    useEffect(() => {
        if (inputValue) {
            handler(name, inputValue);
        };
    }, [inputValue]);

    return (
        <div className="slider-default-input-container">
            <h4>{title}</h4>
            <input 
             type={type}
             name={name}
             step={step}
             value={inputValue}
             placeholder={placeholder}
             className="slider-default-input"
             onInput={handleInput}
            />
        </div>
    )
}

export default DefaultInput;