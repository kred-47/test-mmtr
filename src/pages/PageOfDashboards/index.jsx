import React from "react";
import { Grid } from "@mui/material";
import './PageOfDashboards.scss'
import CreateDashboard from "./components/CreateDashboard";
import DashboardList from "./components/DashboardList";
import LayoutContainer from "../../components/LayoutContainer";


const PageOfDashboards = () => {

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
                           <CreateDashboard />
                       </Grid>
                       <Grid item xs={6}>
                           <DashboardList />
                       </Grid>
                   </Grid>
               </Grid>
           </Grid>
       </LayoutContainer>
    )
}

export default PageOfDashboards;