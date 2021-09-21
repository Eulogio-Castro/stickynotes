import react from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Delete from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import firebase from 'firebase/compat/app/';
import 'firebase/compat/firestore';
import { deleteDoc, doc } from '@firebase/firestore';








const Item = (props) =>{


    const {uid, body, title, docID} = props.info;
    const fs = props.firestore;

    
    const deleteCard = async(e) =>{
        fs.collection('todoitems').doc(docID).delete();
    }






    return(
        <Card  sx={{ backgroundColor:"ivory", width: "fit-content", margin: 5}}>
            <CardContent >
                <Typography variant="h5" component="div" bgcolor ="lightsteelblue">
                {title}
                </Typography>
                <Typography variant="body2" whiteSpace ="pre-wrap">
                {body}
                <br />
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={deleteCard}><Delete size="small"/></IconButton>
            </CardActions>
        </Card>
    );



}

export default  Item;