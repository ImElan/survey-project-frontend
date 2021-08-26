

import { AppBar, IconButton, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( () =>
    createStyles({
        footerStyle:{
            alignItems: 'center',
        }
    })
)


const Header = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position = "fixed"  className = {classes.footerStyle}>
                <Toolbar>
                    <IconButton edge = "start" color = "inherit" aria-label = "menu">
                    
                        <Typography variant = "h6">
                            Admin
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
        
        </div>
    )
}

export default Header;