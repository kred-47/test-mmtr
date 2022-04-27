import React from "react";
import {Grid} from "@mui/material";
import './TodoCard.scss'
import LayoutContainer from "../../components/LayoutContainer";
import CreateCardList from "./copmonents/CreateCardList";

const TodoCard = () => {

    return (
        <LayoutContainer>
            <Grid container
                  className={'todo-card-container'}
                  direction={"column"}
            >
                <Grid item className={'card'}>
                    Моя доска
                </Grid>
                <Grid item>
                    <CreateCardList />
                </Grid>
            </Grid>
        </LayoutContainer>
    )
}

export default TodoCard;