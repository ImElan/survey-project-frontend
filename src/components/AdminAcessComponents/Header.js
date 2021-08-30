

import { AppBar, IconButton, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Navbar,NavbarBrand } from 'reactstrap';

const useStyles = makeStyles( () =>
    createStyles({
        footerStyle:{
            align: 'center'
        }
    })
)


const Header = () => {
    const classes = useStyles();
    return (
        <div>
            {/* <AppBar position = "fixed"  >
                <Toolbar>
                    <IconButton edge = "start" color = "inherit" aria-label = "menu">
                    style={{margin:100}}
                    className="d-flex justify-content-center"
                        <Typography variant = "h6">
                            Admin
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            <Navbar dark color="primary">
                <div className="container" >
                    <div>
                        <NavbarBrand href="/">Admin</NavbarBrand>
                    </div>
                    
                </div>
            </Navbar>
            
        
        </div>
    )
}

export default Header;


