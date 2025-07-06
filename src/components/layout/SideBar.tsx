import { Outlet, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import leave from "../../assets/leave.svg";
// import help from "../../assets/help.svg";
// import privacy from "../../assets/privacy.svg";

import "./SideBar.css";
import { UserContext } from "../auth/AuthContext";

interface Position {
    x: number,
    y: number
}

const SideBar = () => {
    const userContext = useContext(UserContext);
    const touching = useRef<Boolean>(false);
    const openRegion = useRef<HTMLDivElement>(null);
    const startPos = useRef<Position>(null);
    const endPos = useRef<Position>(null);
    const region = useRef<HTMLDivElement>(null);
    const sidebar = useRef<HTMLDivElement>(null);
    const offset = useRef<Number>(-100);
    const navigate = useNavigate();

    const maxRegionTransparency = 0.452;

    const leavePage = () => {
        userContext?.setUser({nome: "", role: "", token: ""});
        navigate("/");
    }

    useEffect(() => {
        const handleDown = (e: TouchEvent) => {
            if (!sidebar.current || !region.current || !openRegion.current) return;
            const touch = e.touches[0];
            const rect = openRegion.current.getBoundingClientRect();

            console.log(offset.current, offset.current === -100);
            if (offset.current == -100 && !(touch.clientX <= rect.right && touch.clientX >= rect.left)) return;

            touching.current = true;
            console.log("pode abrir")
            startPos.current = {x: touch.clientX, y: touch.clientY};
            console.log("entrou", touch.clientX);
            sidebar.current.style.transition = "0.05s linear";
            region.current.style.transition = "0.05s linear";
        }

        const handleUp = (e: TouchEvent) => {
            if (!startPos.current || !sidebar.current || !region.current || touching.current == false) return;
            console.log("nao pode")
            touching.current = false;
            sidebar.current.style.transition = "0.4s";
            region.current.style.transition = "0.4s";

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startPos.current.x;
            const barWidth = sidebar.current.clientWidth;

            endPos.current = {x: touch.clientX, y: touch.clientY};
            
            if (offset.current == -100) {
                if (deltaX >= barWidth / 4) {
                    console.log("abrindo menu");
                    offset.current = 0;
                    sidebar.current.style.transform = "translateX(0%)";
                    region.current.style.backgroundColor = `rgba(0, 0, 0, ${maxRegionTransparency})`;
                    region.current.style.pointerEvents = "auto";
                } else {
                    console.log("fechando menu");
                    offset.current = -100;
                    sidebar.current.style.transform = "translateX(-100%)";
                    region.current.style.backgroundColor = "rgba(0, 0, 0, 0)";
                    region.current.style.pointerEvents = "none";
                }
            } else {
                if (Math.abs(deltaX) >= barWidth / 4) {
                    console.log("fechando menu");
                    offset.current = -100;
                    sidebar.current.style.transform = "translateX(-100%)";
                    region.current.style.backgroundColor = "rgba(0, 0, 0, 0)";
                    region.current.style.pointerEvents = "none";
                } else {
                    console.log("abrindo menu");
                    offset.current = 0;
                    sidebar.current.style.transform = "translateX(0%)";
                    region.current.style.backgroundColor = `rgba(0, 0, 0, ${maxRegionTransparency})`;
                    region.current.style.pointerEvents = "auto";
                }
            }
        }

        const handleMove = (e: TouchEvent) => {
            if (!startPos.current || !sidebar.current || !region.current || touching.current == false) return;
            const touch = e.touches[0];
            let deltaX = touch.clientX - startPos.current.x;
            let regionTransparency;

            if (offset.current == -100) {
                if (deltaX < 0) {
                    startPos.current.x = touch.clientX;
                } 
                
                if (deltaX > sidebar.current.clientWidth) {
                    startPos.current.x = touch.clientX - sidebar.current.clientWidth;
                }
                deltaX = touch.clientX - startPos.current.x;
                regionTransparency = deltaX / sidebar.current.clientWidth * maxRegionTransparency;
            } else {
                deltaX = touch.clientX - startPos.current.x;
                
                if (deltaX > 0) {
                    deltaX = 0;
                }

                if (Math.abs(deltaX) > sidebar.current.clientWidth) {
                    deltaX = sidebar.current.clientWidth * -1;
                }

                regionTransparency = (sidebar.current.clientWidth + deltaX) / sidebar.current.clientWidth * maxRegionTransparency;
            }
            
            console.log("movendo", deltaX, sidebar.current.clientWidth);
            region.current.style.backgroundColor = `rgba(0, 0, 0, ${regionTransparency})`;
            sidebar.current.style.transform = `translateX(calc(${offset.current}% + ${deltaX}px))`;
        }

        window.addEventListener("touchstart", handleDown, true);
        window.addEventListener("touchend", handleUp, true);
        window.addEventListener("touchmove", handleMove, true);

        return () => {
            window.removeEventListener("touchstart", handleDown, true);
            window.removeEventListener("touchend", handleUp, true);
            window.removeEventListener("touchmove", handleMove, true);
        }
    }, []);


    return (
        <>
            <div id="side-bar-background" ref={region}>
                <div id="side-bar-open-region" ref={openRegion}></div>
                <div id="side-bar" ref={sidebar}>
                    <header id="side-bar-header">
                        <div id="side-bar-header-icon"></div>
                        <h2 id="side-bar-header-name">{userContext?.user.nome}</h2>
                    </header>
                    <div id="side-bar-body">
                        {/* <div className="side-bar-body-button">
                            <img src={privacy} alt="Privacidade" className="side-bar-body-button-icon" />
                            <p className="side-bar-body-button-text">Privacidade</p>
                        </div>
                        <div className="side-bar-body-button">
                            <img src={help} alt="Ajuda" className="side-bar-body-button-icon" />
                            <p className="side-bar-body-button-text">Ajuda</p>
                        </div> */}
                        <button className="side-bar-leave-button" onClick={leavePage}>
                            <img src={leave} alt="Botão de Sair" />
                            <p>Sair</p>
                        </button>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default SideBar;