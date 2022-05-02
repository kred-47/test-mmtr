import React, {useEffect, useState} from "react";
import {Grid, TextField, Divider} from "@mui/material";
import './CardList.scss'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {nanoid} from "nanoid";
import CheckIcon from '@mui/icons-material/Check';
import ComponentMyMenu from "./ComponentMyMenu";

const onDragEnd = (result,  columns, setColumns) => {
    if (!result.destination) return;        // если нет конечного пути драга - return.
    const { source, destination } = result; // источник и конечный путь деструктурируются из резулт

    if (source.droppableId !== destination.droppableId) { // если не совпадают айди источника и конечного пункта, то
        const sourceColumn = columns.find(column => column.id === source.droppableId); // объявляем колонки-источники
        const destColumn = columns.find(column => column.id === destination.droppableId); // объявляем колонки-конечные
        const sourceItems = [...sourceColumn.elements];     // объявляем элементы колонки-источника
        const destItems = [...destColumn.elements];         // объявляем элементы колонки-конечной
        const [removed] = sourceItems.splice(source.index, 1); // (метод)выним. по индексу элемент из колонки-ист
        destItems.splice(destination.index, 0, removed);    // (метод)помещ. этот элемент в колонку-конечную
        const res = columns.map(el => {
            if (el.id === source.droppableId) {     // айди элемента совпал с айди источника
                return {...el, elements: sourceItems}  //  добавляем в массив элемент из источника
            }

            if (el.id === destination.droppableId) {    // айди элемента совпал с айди конечного
                return  {...el, elements: destItems}    // добавляем в масив элемент из конца
            }

            return el; // нет совпадений по условию - возвращаем массив в прежнем виде
        })
        setColumns(res); // вызов вышеописанной ф-и
    } else {    // иначе
        const column = columns.find(column => column.id === source.droppableId); // объявляем колонку источник
        const copiedItems = [...column?.elements];  // копирование массива column
        const [removed] = copiedItems.splice(source.index, 1);  // (метод)выним. по индексу элемент из колонки-ист
        copiedItems.splice(destination.index, 0, removed);  // (метод)помещ. этот элемент в колонку-конечную
        const res = columns.map(el => {
            if (el.id === source.droppableId) {     // айди элемента совпал с айди источника
                return {...el, elements: copiedItems}  //  добавляем в массив элемент из копии массива column
            }

            return el; // нет совпадений - возвращаем массив в прежнем виде
        })
        setColumns(res); // вызов вышеописанной функции
    }
};

const CardList = (props) => {

    const {addElements, columns, setColumns, onClickToggleElement, onClickColorTheme} = props;  // передаю массив колонок, добавление элементов, ф-я нажатия галочки

    const addNewElementByList = (columnId, event) => { // ф-я добавления елемента в карточку
        if (event.key === 'Enter') {                   // если ключ события 'Enter' (мы нажали Enter)

            const newElement = {                                // создаем элемент: {id: (здесь id из 3 символов)
                id: nanoid(3), title: event.target.value, active: true  // title: (событие.поле.значениеПоля)
            }

           addElements(columnId, newElement)  // вызываю ф-ю добавления элемента, передаю туда id и объект из ф-и

            event.target.value = '';  // ???????
        }
    }

    const onClickMenuItem = (color, columnId) => {
        onClickColorTheme(color, columnId)
    }

    const menuOptions = [
        {id: 'cor', title: 'коралловый', color: 'lightcoral'},
        {id: 'laz', title: 'лазурный', color: 'lightblue'},
        {id: 'sz', title: 'светло-зеленый', color: 'lightgreen'},
        {id: 'bz', title: 'бледно-желтый', color: 'lightyellow'}
    ]

    return (
        <DragDropContext
            onDragEnd={(result) => {                    // резулт достаю из-под капота
                onDragEnd(result, columns, setColumns)  // передаю еще стейт и юзстейт карточек
            }}
        >
            {columns.map((column) => {           // перебор карточки
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                        key={column.id}>
                        <Grid item>
                            <div className={'new-list'}
                                 style={column.color ? {backgroundColor: `${column.color}`} : {backgroundColor: 'none'}}
                            >
                                <Grid
                                    container
                                    className={'my-card'}
                                    spacing={2}
                                    direction={"column"}
                                >
                                    <Grid item className={'new-list-title'}>
                                        {column?.title}
                                    </Grid>
                                    <Grid item>
                                        <Divider />
                                    </Grid>
                                    <Grid item>
                                        <ComponentMyMenu
                                            menuOptions={menuOptions}
                                            onClickMenuItem={onClickMenuItem}
                                            columnId={column.id}/>

                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            onKeyPress={(event) =>
                                                addNewElementByList(column.id, event)}
                                            label="Название элемента списка"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Droppable droppableId={column.id.toString()} key={column.id.toString()}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    style={{
                                                        //backgroundColor: snapshot.isDragging ? 'green' : 'lightgreen',
                                                    }}
                                                    {... provided.droppableProps}
                                                >
                                                    {column?.elements.map((element, idx) => {
                                                        return (
                                                            <Draggable
                                                                key={element.id}
                                                                draggableId={`draggable-${element.id}`}
                                                                index={idx}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <div className={'new-list-element'}
                                                                             style={element.active ? {textDecoration: "none"} : {textDecoration: "line-through", backgroundColor: "grey"} }
                                                                        >

                                                                            <div className={'my-element'}>
                                                                                {element?.title}
                                                                            </div>
                                                                            <CheckIcon
                                                                                className={'check-of-element'}
                                                                                onClick={() => {
                                                                                    onClickToggleElement(column.id, element.id, element.active)  // повесил на онклик ф-ю, которая меняет состояние свойства active
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    })
                                                    }
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                )
            })}
        </DragDropContext>
    )
}

export default CardList;