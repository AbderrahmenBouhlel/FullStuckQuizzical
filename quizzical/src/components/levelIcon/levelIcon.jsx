import { FaSnowman } from "react-icons/fa";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import "./levelIconCss/levelIcon.css";
import { useEffect, useState } from "react";

const starLevels = {
    1: [<MdOutlineStarPurple500 key={1}  className="icon filled"/>, <MdOutlineStarOutline key={2} className="icon"/>, <MdOutlineStarOutline key={3} className="icon"/>],
    2: [<MdOutlineStarPurple500 key={1} className="icon filled"/>, <MdOutlineStarPurple500 key={2} className="icon filled" />, <MdOutlineStarOutline key={3} className="icon"/>],
    3: [<MdOutlineStarPurple500 key={1} className="icon filled"/>, <MdOutlineStarPurple500 key={2} className="icon filled"/>, <MdOutlineStarPurple500 key={3} className="icon filed" />]
};

export default function LevelIcon(props) {
    const [starArray, setStarArray] = useState([]);

    useEffect(() => {
        setStarArray(starLevels[props.levelNumber] || starLevels[3]);
    }, [props.levelNumber]);

    return (
        <div className="levelIconCont">
            <FaSnowman className="snowIcon" />
            <div className="starRow">
                {starArray}
            </div>
        </div>
    );
}
