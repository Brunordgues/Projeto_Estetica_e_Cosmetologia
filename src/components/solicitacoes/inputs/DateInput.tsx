import "./DateInput.css";

interface DateInput {
    title: string,
    name: string,
    value: string,
    handler: (name: string, value: string | number) => void
}

const DateInput = ({title, name, value, handler}: DateInput) => {
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        handler(name, e.currentTarget.value);
        console.log(e.currentTarget.value)
    }

    return (
        <div className="slider-date-input-container">
            <h4>{title}</h4>
            <input 
             type="date" 
             name="date" 
             value={value.substring(0, 10)}
             placeholder="dd/mm/aaaa"
             id="date" 
             className="slider-date-input"
             onInput={handleInput}
            />
        </div>
    )
}

export default DateInput;