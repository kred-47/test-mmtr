import HomeFace from "../HomeFace";
import {Grid} from "@mui/material";

const LayoutContainer = ({children}) => {   // ????????????????
    return (
        <Grid container direction={"column"} spacing={2}>
            <Grid item>
                <HomeFace />
            </Grid>
            <Grid item>
                {children}
            </Grid>
        </Grid>

    )
}

export default LayoutContainer;