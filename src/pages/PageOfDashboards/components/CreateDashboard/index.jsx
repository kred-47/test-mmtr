import {Button, Grid, IconButton, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import './CreateDashboard.scss';
import CloseIcon from '@mui/icons-material/Close';
import { nanoid } from "nanoid";
import { setList } from "../../../../toolkit/listDashboard/data";
import { useDispatch } from "react-redux";

const CreateDashboard = () => {

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onClickOpen = () => {
        setOpen(true)
    }

    const onClickClose = () => {
        setOpen(false)
    }

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const onClickCancel = () => {
        setOpen(false)
    }

    const onClickSave = () => {
        onClickAddDashboard(inputValue)
        setOpen(false);
    }

    const dispatch = useDispatch();

    const onClickAddDashboard = (item = '') => {
        const obj = {
            title: item,
            color: '#' + Math.floor(Math.random()*16777215).toString(16),
            id: nanoid(12)
        }
        dispatch(setList(obj));
    }

    return (
        <div className='new-item-container'>
            <Grid
                container
                className={`new-dashboard ${!open ? 'new-dashboard_closed' : ''}`}
                justifyContent={"space-between"}
                alignItems={"center"}
                onClick={!open ? onClickOpen : () => {}}
            >
                <Grid item>
                    <Grid container
                          className='new-dashboard'
                          alignItems={"center"}
                    >
                        <Grid item>
                            <AddIcon fontSize='large'/>
                        </Grid>
                        <Grid item>
                            Новая доска
                        </Grid>
                    </Grid>
                </Grid>
                {open && <Grid item>
                    <IconButton onClick={onClickClose}>
                        <CloseIcon fontSize={"large"}/>
                    </IconButton>
                </Grid>}
            </Grid>
            {open && <Grid
                container
                className={'new-dashboard-form'}
                direction={"column"}
                justifyContent={'space-between'}
                wrap={"nowrap"}
                alignItems={"center"}
            >
                <Grid item>
                    <TextField
                        onChange={onChangeInput}
                        size={"small"}
                        label="Название доски"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Button onClick={onClickCancel}>Отмена</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={onClickSave}>Сохранить</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>}
        </div>
    )
}

export default CreateDashboard;