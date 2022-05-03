import React, { useState } from "react";
import { Grid, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './CreateCardList.scss'
import CardList from "../CardList";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { columnsSelector, addColumns, updateColumns } from "../../../../toolkit/cardDashboard/data";


const CreateCardList = () => {

    const [isVisibleAddList, setIsVisibleAddList] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const columns = useSelector(columnsSelector);

    const AddItemList = () => {
        setIsVisibleAddList(true);
    }

    const onClickHidden = () => {
        setIsVisibleAddList(false);
    }

    const dispatch = useDispatch();

    const onPressEnter = (event) => {
        if (event.key === 'Enter') {

            const obj = {
                title: event.target.value,
                id: nanoid(5),
                elements: [],
                color: ''
            }

            dispatch(addColumns(obj));

            setInputValue('');
        }
    }

    const addElements = (columnId, newElement) => {
        const res = columns.map(el => {
            if (el.id === columnId) {
                return {...el, elements: [...el.elements, newElement] }
            }

            return el;
        })

        dispatch(updateColumns(res))
    }

    const onClickToggleElement = (columnId, elementId, active) => {
        const col = columns.map(c => {
            if (c.id === columnId) {
                return {...c, elements: c.elements.map(e => {
                    if (e.id === elementId) {
                        return {...e, active: !active}
                    }

                    return e
                })
                }
            }
            return c;
        })

        dispatch(updateColumns(col))
    }

    const onClickColorTheme = (currentColor, columnId) => {
        const res = columns.map(c => {
            if (c.id === columnId) {
                return  {...c, color: currentColor}
            }
            return c;
        })
        dispatch(updateColumns(res));
    }

    const setColumns = (res) => {
        dispatch(updateColumns(res));
    }

    return (
        <Grid container
              className={'add-list'}
              spacing={1}
        >
            <Grid item className={'columns'}>
                <CardList columns={columns}
                          setColumns={setColumns}
                          addElements={addElements}
                          onClickToggleElement={onClickToggleElement}
                          onClickColorTheme={onClickColorTheme}
                />
            </Grid>
            <Grid item>
                {!isVisibleAddList && <Grid item className={'add-list_button'}>
                    <Button variant="contained"
                            onClick={AddItemList}
                            size={"large"}
                            color={"secondary"}
                    >
                        Добавить список
                    </Button>
                </Grid>}
                {isVisibleAddList && <div className={'add-list-card'}>
                    <Grid container direction={"column"}>
                        <IconButton className={'icon-button'} onClick={onClickHidden}>
                            <CloseIcon/>
                        </IconButton>
                        <Grid item>
                            <TextField
                                onChange={event => setInputValue(event.target.value)}
                                value={inputValue}
                                onKeyPress={onPressEnter}
                                size={'small'}
                                label="Название списка"
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                </div>}
            </Grid>
        </Grid>
    )
}

export default CreateCardList;