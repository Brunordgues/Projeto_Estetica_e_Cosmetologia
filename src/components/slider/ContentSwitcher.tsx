import type { pages } from "../../pages/slider/Slider";
import "./ContentSwitcher.css";

interface ContentSwitcherProps {
    page: (typeof pages)[number]["name"],
    newPageId: number,
    title: string,
    description: string,
    handler: (page: (typeof pages)[number]["name"], id: number) => void
}

const ContentSwitcher = ({page, newPageId, title, description, handler}: ContentSwitcherProps) => {
    const switchPage = () => {
        handler(page, newPageId);
    }

    return (
        <button className="slider-content-page-switcher" onClick={switchPage}>
            <div className="slider-content-page-switcher-image-container">
                <div className="slider-content-page-switcher-image"></div>
            </div>
            <div className="slider-content-page-switcher-body">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div className="slider-content-page-switcher-arrow-container">
                <div className="slider-content-page-switcher-arrow"></div>
            </div>
        </button>
    )
}

export default ContentSwitcher;