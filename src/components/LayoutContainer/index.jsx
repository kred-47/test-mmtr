import HomeFace from "../HomeFace";
import ClearAll from "../ClearAll";
import { Grid } from "@mui/material";
import './LayoutContainer.scss'

const LayoutContainer = ({children}) => {
    return (
        <Grid container direction={"column"} spacing={2}>
            <Grid item>
                <Grid container className={'layout-buttons'}>
                   <Grid item xs={6} className={'central-element'}>
                       <HomeFace />
                   </Grid>
                   <Grid item xs={6} className={'right-element'}>
                       <ClearAll />
                   </Grid>
                </Grid>
            </Grid>
            <Grid item>
                {children}
            </Grid>
        </Grid>

    )
}

export default LayoutContainer;