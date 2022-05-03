import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useMenu } from "../hooks/hooks";

const ComponentMyMenu = (props) => {

    const { anchorEl, open, handleClick, handleClose } = useMenu();
    const {menuOptions, onClickMenuItem, columnId} = props;

    return (
        <>
            <Button
                aria-controls="simple-list"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Выбери цвет карточки
            </Button>
            <Menu
                id="simple-list"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {menuOptions.map(c => {
                    return (
                        <MenuItem
                            onClick = {() => {
                                onClickMenuItem(c.color, columnId)
                                handleClose()
                            }}
                            key={c.id}
                        >
                            <div style={{
                                marginRight: '10px',
                                width: '15px',
                                height: '15px',
                                backgroundColor: `${c.color}`,
                                border: '1px solid black'
                            }}>
                            </div>
                            {c.title}
                        </MenuItem>
                    )
                })}
            </Menu>
        </>
    )
}

export default ComponentMyMenu;