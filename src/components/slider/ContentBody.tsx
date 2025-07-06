import { useEffect, useRef } from "react";
import "./ContentBody.css";

interface ContentBodyProps {
    spaced?: boolean,
    animated?: boolean,
    delay?: number,
    children: React.ReactNode,
    handler?: () => void
}

const ContentBody = ({spaced, animated, delay, children, handler}: ContentBodyProps) => {
    const body = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (animated && body.current) {
            body.current.style.animationDelay = `${delay}s`;
            body.current.classList.add("appearing");
        }
    }, [animated, body.current])

    return (
        <div className={`slider-content-body ${spaced} ${animated && "invis"}`} ref={body} onClick={handler}>
            {children}
        </div>
    )
}

export default ContentBody;