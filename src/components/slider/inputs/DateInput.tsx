import { useEffect, useState } from "react";
import "./DateInput.css";

interface DateInput {
    title: string,
    name: string,
    handler: (name: string, value: string | number | Date) => void
}

const DateInput = ({title, name, handler}: DateInput) => {
    const [inputValue, setInputValue] = useState<Date>();
    
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue(new Date(e.currentTarget.value));
    }

    useEffect(() => {
        if (inputValue) {
            handler(name, inputValue);
        };
    }, [inputValue]);

    return (
        <div className="slider-date-input-container">
            <h4>{title}</h4>
            <input 
             type="date" 
             name="date" 
             placeholder="dd/mm/aaaa"
             id="date" 
             className="slider-date-input"
             onInput={handleInput}
            />
        </div>
    )
}

export default DateInput;