import React from 'react';

export const useMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return { anchorEl, open, handleClick, handleClose };
};