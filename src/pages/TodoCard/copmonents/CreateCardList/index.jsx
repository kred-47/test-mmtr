import React, {useState} from "react";
import {Grid, Button, TextField, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './CreateCardList.scss'
import CardList from "../CardList";
import {nanoid} from "nanoid";


const CreateCardList = () => {

    const [isVisibleAddList, setIsVisibleAddList] = useState(false);
    const [arrayOfLists, setArrayOfLists] = useState([   //это наш массив колонок, он проинициализирован для наглядности
        {
            title: 'spisok 1',
            id: 'raz',
            elements: [
                {id: 'first', title: 'element 1', active: true},
                {id: 'second', title: 'element 2', active: true},
                {id: 'third', title: 'element 3', active: true},
                {id: 'fourth', title: 'element 4', active: true}
            ],
            color: ''
        },
        {
            title: 'spisok 2',
            id: 'dva',
            elements: [

            ],
            color: ''
        },
        {
            title: 'spisok 3',
            id: 'tri',
            elements: [

            ],
            color: ''
        },
        {
            title: 'spisok 4',
            id: 'chetyre',
            elements: [

            ],
            color: ''
        }
    ])
    const [inputValue, setInputValue] = useState('');   // это состояние поля ввода(при вводе оно очищается)

    const AddItemList = () => {                                  // это ф-я, открывающая при нажатии на "добавить список" невидимую часть этого компонента и прячущая эту кнопку
        setIsVisibleAddList(true);                         // изменяет состояние на тру
    }

    const onClickHidden = () => {                               // это для крестика, действие обратное предыдущей ф-и
        setIsVisibleAddList(false);
    }

    // const setElements = (elements, idx) => {                    //
    //     setArrayOfLists(prevState => {
    //         prevState[idx].elements = [...prevState[idx].elements, elements] //
    //
    //         return prevState;
    //     })
    // }

    const onPressEnter = (event) => {                  // создаем ф-ю "нажатие на Enter"
        if (event.key === 'Enter') {                   // если нажимается Enter
            setArrayOfLists(prevState => {
                return [...prevState, {                // предыдущее состояние массива дополняется элементом со св-вами:
                    title: event.target.value,         // свойство title будет такое, которое находится в инпуте
                    id: nanoid(5),                // id генерируется из 5 символов
                    elements: [],                       // свойство elements приходит в виде пустого массива
                    color: ''                           // цвет колонки
                }]
            })

            setInputValue('');
        }
    }

    const addElements = (columnId, newElement) => {
        const res = arrayOfLists.map(el => {                        // мапим наш массив
            if (el.id === columnId) {                               // если айди колонки совпадает с переданным айди
                return {...el, elements: [...el.elements, newElement] } // вернем колонку, в ней добавляем новую строку
            }

            return el;                                              // возвращаем элемент без изменений(усл-е не выполн)
        })
        setArrayOfLists(res)
    }

    const onClickToggleElement = (columnId, elementId, active) => {
        const col = arrayOfLists.map(c => {                         // мапим наш массив
            if (c.id === columnId) {                                // если айди колонки совпадет с переданным айди
                return {...c, elements: c.elements.map(e => {       // вернем клонку, в ней мапим свойство elements
                    if (e.id === elementId) {                       // если айди элемента совпадает с переданным айди
                        e.active = !active                          // меняем в свойстве active булево значение
                    }

                    return e                                        // возвращаем элемент без изменений(усл-е не выполн)
                })
                }
            }
            return c                                                // возвращаем колонку без изменений(усл-е не выполн)
        })
        setArrayOfLists(col)                                        // изменяем useState нашего setArrayOfLists
    }

    const onClickColorTheme = (currentColor, columnId) => {     //
        const res = arrayOfLists.map(c => {                     // перебор нашего массива
            if (c.id === columnId) {                            // если айди колонки = айди переданному
                return  {...c, color: currentColor}             // возвращаем переданный цвет колонке
            }
            return c;                                           // если нет - оставляем текущий цвет
        })
        setArrayOfLists(res);                                   // вызов ф-и
    }

    return (
        <Grid container
              className={'add-list'}
              paddingTop={'20px'}
        >
            <Grid container spacing={1}>

                <CardList arrayOfLists={arrayOfLists}
                          setArrayOfLists={setArrayOfLists}
                          activeOfElement={arrayOfLists.keys}
                          //setElements={setElements}
                          addElements={addElements}
                          onClickToggleElement={onClickToggleElement}
                          onClickColorTheme={onClickColorTheme}
                />

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
        </Grid>
    )
}

export default CreateCardList;