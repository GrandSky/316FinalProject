import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import YouTube from 'react-youtube';
import ListCard from './ListCard.js'
import { useHistory } from 'react-router-dom'
import MUIDeleteModal from './MUIDeleteModal'
import AuthContext from '../auth'
import Searchbar from './Searchbar'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material'

import YouTubePlayerExample from './YoutubePlaylister';
import CommentTab from './CommentTab';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    store.history = useHistory();
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let searchBar=""
    searchBar= <Searchbar/>;
    
    
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            <Fab sx={{transform:"translate(1150%, 10%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            <MUIDeleteModal />
            </List>;
    }
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let addListButton=<div id="list-selector-heading">
    <Fab sx={{transform:"translate(-20%, 0%)"}}
        color="primary" 
        aria-label="add"
        id="add-list-button"
        onClick={handleCreateNewList}
    >
        <AddIcon />
    </Fab>
        Your Playlists
    </div>
    if(auth.user.username=="Guest"){
        addListButton=""
        listCard =<List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
        {
            store.idNamePairs.map((pair) => (
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />
            ))
            
        }
        <MUIDeleteModal />
        </List>;
    }
    

    let playerTab= <YouTubePlayerExample/>
    
    let commentTab=<CommentTab/>

    const[tab,setTab] =useState(playerTab);
    
    function handlePlayerButton(){
        setTab(playerTab)
    }
    function handleCommentButton(){
        setTab(commentTab)
    }

    let text ="";
    let disableComments=true
    if (auth.loggedIn && store.currentList){
        text = store.currentList.name;
        if(store.currentList.publishTime!=0){
            disableComments=false
        }
    }

    return (

        <div id="playlist-selector">
            {addListButton}
            {searchBar}
            <Grid container component="main" sx={{ height: '110vh' }}>
                <Grid item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    background:'white',
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',
                    backgroundPosition:'center',
                    overflow: 'scroll',
                    height: '100%'
                }}>
                    
                    {
                    listCard
                    }
                     
                 </Grid>
                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <br></br>
        <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
                <Button variant='contained' onClick={handlePlayerButton} fullWidth style={{color:'white',backgroundColor:'#007fff'}}>Player</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button variant='contained' disabled={disableComments} onClick={handleCommentButton} fullWidth style={{color:'white',backgroundColor:'#007fff'}}>Comments</Button>
            </Grid>
        </Grid>
        {tab}
        </Grid> 
                <div id="playlister-statusbar">
            {text}
        </div>
            </Grid> 
                
        </div>)
}

export default HomeScreen;