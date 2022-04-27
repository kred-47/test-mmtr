import React from "react";
import {Grid} from "@mui/material";
import './DashboardList.scss';
import {useNavigate} from "react-router";
import {APP_LINK} from "../../../../constants/general";

const Card = ({item = {}}) => {

    const navigate = useNavigate();                 // ф-я для навигации

    const onclickOnCard = () => {
        navigate(`${APP_LINK.CARD}/${item.id}`)     // навигация ????????????
    }

    return (
        <Grid item onClick={onclickOnCard}>
            <div className={'list-card'} style={{backgroundColor: item.color}}>
                {item.title}
            </div>
        </Grid>
    )
}

const DashboardList = ({data= []}) => {

    return (
        <Grid
            container
            direction={"column"}
            alignItems={"center"}
            spacing={2}
        >
            {data.map((i, index) => {
                return <Card key={index} item={i}/>
            })}
        </Grid>
    )
}

export default DashboardList;