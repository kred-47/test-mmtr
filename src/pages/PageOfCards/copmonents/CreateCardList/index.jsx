import React, {useState} from "react";
import {Grid, Button, TextField, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './CreateCardList.scss'
import CardList from "../CardList";
import {nanoid} from "nanoid";
import {useDispatch, useSelector} from "react-redux";
import {columnsSelector, addColumns, updateColumns} from "../../../../toolkit/cardDashboard/data";


const CreateCardList = () => {

    const [isVisibleAddList, setIsVisibleAddList] = useState(false);
    const [inputValue, setInputValue] = useState('');   // это состояние поля ввода(при вводе оно очищается)

    const columns = useSelector(columnsSelector);

    const AddItemList = () => {                                  // это ф-я, открывающая при нажатии на "добавить список" невидимую часть этого компонента и прячущая эту кнопку
        setIsVisibleAddList(true);                         // изменяет состояние на тру
    }

    const onClickHidden = () => {                               // это для крестика, действие обратное предыдущей ф-и
        setIsVisibleAddList(false);
    }

    const dispatch = useDispatch();

    const onPressEnter = (event) => {                  // создаем ф-ю "нажатие на Enter"
        if (event.key === 'Enter') {                   // если нажимается Enter

            const obj = {                // предыдущее состояние массива дополняется элементом со св-вами:
                title: event.target.value,         // свойство title будет такое, которое находится в инпуте
                id: nanoid(5),                // id генерируется из 5 символов
                elements: [],                       // свойство elements приходит в виде пустого массива
                color: ''                           // цвет колонки
            }

            dispatch(addColumns(obj));

            setInputValue('');
        }
    }

    const addElements = (columnId, newElement) => {
        const res = columns.map(el => {                        // мапим наш массив
            if (el.id === columnId) {                               // если айди колонки совпадает с переданным айди
                return {...el, elements: [...el.elements, newElement] } // вернем колонку, в ней добавляем новую строку
            }

            return el;                                              // возвращаем элемент без изменений(усл-е не выполн)
        })

        dispatch(updateColumns(res))
    }

    const onClickToggleElement = (columnId, elementId, active) => {
        const col = columns.map(c => {                         // мапим наш массив
            if (c.id === columnId) {                                // если айди колонки совпадет с переданным айди
                return {...c, elements: c.elements.map(e => {       // вернем клонку, в ней мапим свойство elements
                    if (e.id === elementId) {                       // если айди элемента совпадает с переданным айди
                        return {...e, active: !active}                          // меняем в свойстве active булево значение
                    }

                    return e                                        // возвращаем элемент без изменений(усл-е не выполн)
                })
                }
            }
            return c;                            // возвращаем колонку без изменений(усл-е не выполн)
        })

        dispatch(updateColumns(col))                                        // изменяем useState нашего setArrayOfLists
    }

    const onClickColorTheme = (currentColor, columnId) => {     //
        const res = columns.map(c => {                     // перебор нашего массива
            if (c.id === columnId) {                            // если айди колонки = айди переданному
                return  {...c, color: currentColor}             // возвращаем переданный цвет колонке
            }
            return c;                                           // если нет - оставляем текущий цвет
        })
        dispatch(updateColumns(res));                                   // вызов ф-и
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