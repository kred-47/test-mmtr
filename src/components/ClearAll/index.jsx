import React from "react";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import './ClearAll.scss';
import { useDispatch } from "react-redux";
import { clearColumns } from "../../toolkit/cardDashboard/data";
import { clearAllStates } from "../../toolkit/listDashboard/data";


const ClearAll = () => {

    const dispatch = useDispatch()

    const onClickClear = () => {

        localStorage.clear()

        dispatch(clearColumns())

        dispatch(clearAllStates())
    }

    return (
        <div className={'clear-all'}>
            <CancelPresentationIcon fontSize={'large'} onClick={onClickClear} style={{cursor: 'pointer'}} />
        </div>
    )
}

export default ClearAll;