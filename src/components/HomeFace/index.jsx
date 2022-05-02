import React from "react";
import {useNavigate} from "react-router-dom";
import SentimentSatisfiedSharpIcon from "@mui/icons-material/SentimentSatisfiedSharp";
import './HomeFace.scss';

const HomeFace = () => {

    let navigate = useNavigate();   // ф-я для навигации
    function handleClick() {
        navigate('/')               // при нажатии на смайлик возвращает нас на домашнюю страницу
    }

    return (
        <div className={'home-face'}>
            <SentimentSatisfiedSharpIcon fontSize={"large"} onClick={handleClick} style={{cursor: "pointer"}} />
        </div>
    )
}

export default HomeFace;