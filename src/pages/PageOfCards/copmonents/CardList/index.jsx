import React from "react";
import { Grid, TextField, Divider } from "@mui/material";
import './CardList.scss'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import CheckIcon from '@mui/icons-material/Check';
import ComponentMyMenu from "./ComponentMyMenu";

const onDragEnd = (result,  columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns.find(column => column.id === source.droppableId);
        const destColumn = columns.find(column => column.id === destination.droppableId);
        const sourceItems = [...sourceColumn.elements];
        const destItems = [...destColumn.elements];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        const res = columns.map(el => {
            if (el.id === source.droppableId) {
                return {...el, elements: sourceItems}
            }

            if (el.id === destination.droppableId) {
                return  {...el, elements: destItems}
            }

            return el;
        })
        setColumns(res);
    } else {
        const column = columns.find(column => column.id === source.droppableId);
        const copiedItems = [...column?.elements];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        const res = columns.map(el => {
            if (el.id === source.droppableId) {
                return {...el, elements: copiedItems}
            }

            return el;
        })
        setColumns(res);
    }
};

const CardList = (props) => {

    const {addElements, columns, setColumns, onClickToggleElement, onClickColorTheme} = props;

    const addNewElementByList = (columnId, event) => {
        if (event.key === 'Enter') {

            const newElement = {
                id: nanoid(3), title: event.target.value, active: true
            }

           addElements(columnId, newElement)

            event.target.value = '';
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
            onDragEnd={(result) => {
                onDragEnd(result, columns, setColumns)
            }}
        >
            {columns.map((column) => {
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
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
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
                                                                                    onClickToggleElement(column.id, element.id, element.active)
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