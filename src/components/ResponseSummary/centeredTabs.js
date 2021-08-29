import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    tab: {
        fontSize: 12,
        color: "#5f6368",
        textTransform: "capitalize",
        height: 10,
        fontWeight: "600",
        fontFamily: "Google Sans,Roboto, Arial, sans-serif"
    },
    tabs: {
        height: 10
    }
});

export default function CenteredTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        // console.log(newValue);
        // if(value)
        props.change(newValue);
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs className={classes.tabs}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Summary" className={classes.tab} />
                <Tab label="Responses" className={classes.tab} />
            </Tabs>
        </Paper>
    );
}
