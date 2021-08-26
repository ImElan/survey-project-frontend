
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( () =>
    createStyles({
        footerStyle:{
            alignItems: 'center',
            // marginTop:570 
            marginTop:590 
        }
    })
)

const Footer = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar className = {classes.footerStyle} >
                <Toolbar>
                        <Typography variant = "h6">
                            Welcome To Accolite Admin Portal
                        </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Footer;