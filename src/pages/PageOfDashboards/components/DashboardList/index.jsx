import React from "react";
import {Grid} from "@mui/material";
import './DashboardList.scss';
import {useNavigate} from "react-router-dom";
import {APP_LINK} from "../../../../constants/general";
import {useDispatch, useSelector} from "react-redux";
import {listSelector, setCard} from "../../../../toolkit/listDashboard/data";

const Element = ({item = {}}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onclickOnCard = () => {
        navigate(`${APP_LINK.CARD}/${item.id}`)     // переход на страницу созданной доски
        dispatch(setCard(item));
    }

    return (
        <Grid item onClick={onclickOnCard}>
            <div className={'list-card'} style={{backgroundColor: item.color}}>
                {item.title}
            </div>
        </Grid>
    )
}

const DashboardList = () => {

    const data = useSelector(listSelector);

    return (
        <Grid
            container
            direction={"column"}
            alignItems={"center"}
            spacing={2}
        >
            {data.map((i, index) => {
                return <Element key={index} item={i}/>
            })}
        </Grid>
    )
}

export default DashboardList;