
import React, {useContext, useEffect} from 'react';
import { GlobalStoreContext} from '../store';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import CommentCards from './CommentCards';
export default function CommentTab() {
    const { store } = useContext(GlobalStoreContext);
    function handleComment(event) {
        if(event.keyCode ==13){
            store.addComment(event.target.value) 
            document.getElementById("outlined-text").value=null
        }
    }
    let comments=""
    if(store.currentList){
        comments= 
        store.currentList.comments.map((pair)=>(
            <CommentCards
                name={pair.name}
                comments={pair.comment}
            />       
        ))
        
    }
    
    return <>
    <Grid container direction='column' spacing={2} justifyedContent='centered' alignItems='stretch'>
        <Grid item xs={8}>
            <List sx={{overflow: 'scroll', overflowX: "hidden", height: 537, width: '100%', bgcolor: 'white'}}>
             {comments}
                 </List>  
        </Grid>
        <Grid item xs={4}>
                <TextField onKeyDown={handleComment} id="outlined-text" label="Add Comment" variant="outlined" fullWidth />
        </Grid>
    </Grid>
    </>
}