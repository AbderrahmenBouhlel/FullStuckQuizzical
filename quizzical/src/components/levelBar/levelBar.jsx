import { useEffect, useRef } from "react";
import "./levelBar.css";

export default function LevelBar(props) {
    const fillBarRef = useRef(null);
    let scorePercentage = Math.floor((props.score * 100) / props.maxScore);

    useEffect(() => {
        if (fillBarRef.current) {
            scorePercentage = Math.floor((props.score * 100) / props.maxScore);
            fillBarRef.current.style.width = `${scorePercentage}%`;
        }
    }, [props.score]);

    return (
        <div className="levelBarCont">
            <div className="progress-bar">
                <div className="progress-bar-fill" ref={fillBarRef}></div>
            </div>
            <div className="progress_label">{scorePercentage}%</div>
        </div>
    );
}
