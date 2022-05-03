import React from "react";
import { Grid } from "@mui/material";
import './PageOfCards.scss'
import LayoutContainer from "../../components/LayoutContainer";
import CreateCardList from "./copmonents/CreateCardList";
import {cardSelector} from "../../toolkit/listDashboard/data";
import {useSelector} from "react-redux";

const PageOfCards = () => {

    const currentCard = useSelector(cardSelector);

    return (
        <LayoutContainer>
            <Grid container
                  className={'todo-card-container'}
                  direction={"column"}
            >
                <Grid item className={'card'} style={{backgroundColor: `${currentCard.color}`}}>
                    {currentCard?.title}
                </Grid>
                <Grid item>
                    <CreateCardList />
                </Grid>
            </Grid>
        </LayoutContainer>
    )
}

export default PageOfCards;