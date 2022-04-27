import React, {useState} from "react";
import {Grid} from "@mui/material";
import './TodoList.scss'
import NewDashBoard from "./components/NewDashBoard";
import DashboardList from "./components/DashboardList";
import LayoutContainer from "../../components/LayoutContainer";
import {nanoid} from "nanoid";

const TodoList = () => {
    const [listData, setListData] = useState([]);   // состояние досок

    const addBoardInListData = (item = '') => { // ?????????
        const obj = {                                   // создаем объект со св-вами:
            title: item,
            color: '#' + Math.floor(Math.random()*16777215).toString(16),
            id: nanoid(12)
        }

        setListData(prevState => {
            return [...prevState, obj]       // к пред. состоянию массива досок прибавляем еще один объект(новую доску)
        })
    }

    return (
       <LayoutContainer>
           <Grid container
                 direction={"column"}
                 spacing={2}
                 className='container'
           >
               <Grid item>
                   <Grid container>
                       <Grid item xs={6}>
                           <NewDashBoard addBoardInListData={addBoardInListData} />
                       </Grid>
                       <Grid item xs={6}>
                           <DashboardList data={listData}/>
                       </Grid>
                   </Grid>
               </Grid>
           </Grid>
       </LayoutContainer>
    )
}

export default TodoList;