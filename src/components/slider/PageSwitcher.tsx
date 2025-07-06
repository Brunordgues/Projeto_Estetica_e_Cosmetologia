interface PageSwitcherProps {
    page: string,
    title: string,
    description: string,
    handler: (page: string) => void
}


const PageSwitcher = ({page, title, description, handler}: PageSwitcherProps) => {
    const switchPage = () => {
        handler(page);
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

export default PageSwitcher;