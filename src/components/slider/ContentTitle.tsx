import "./ContentTitle.css";

interface ContentTitleProps {
    title: string,
    subtitle?: string
}

const ContentTitle = ({title, subtitle}: ContentTitleProps) => {
    return (
        <header className="slider-content-title">
            <h2>{title}</h2>
            {subtitle && <h3>{subtitle}</h3>}
        </header>
    )
}

export default ContentTitle;