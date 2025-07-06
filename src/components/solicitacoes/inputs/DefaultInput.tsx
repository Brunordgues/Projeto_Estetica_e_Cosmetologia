import "./DefaultInput.css";

interface DefaultInputProps {
    title: string,
    type: "text" | "number",
    value: string | number,
    name: string,
    step?: number,
    placeholder: string,
    handler: (name: string, value: string | number) => void
}

const DefaultInput = ({title, type, value, name, step, placeholder, handler}: DefaultInputProps) => {
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        handler(name, e.currentTarget.value);
    }

    return (
        <div className="slider-default-input-container">
            <h4>{title}</h4>
            <input 
             type={type}
             name={name}
             step={step}
             value={value}
             placeholder={placeholder}
             className="slider-default-input"
             onInput={handleInput}
            />
        </div>
    )
}

export default DefaultInput;