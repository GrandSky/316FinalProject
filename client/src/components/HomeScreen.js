import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Searchbar from './Searchbar'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import YouTubePlayerExample from './YoutubePlaylister.js'
import { Button, Typography } from '@mui/material'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let searchBar=""
    searchBar= <Searchbar/>;
    if (store.currentList) {
            searchBar="";
        }
        
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
            </List>;
    }
    let playerTab= 
    <Typography>
                    <YouTubePlayerExample sx={{justifyContent:'center',alignItems:'center'}}/>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily:'cursive'
                        }}>
                            <h1 >Now Playing</h1>
                        </div>
                    <h3 style={{fontFamily:'cursive'}}>Playlist:</h3>
                    <h3 style={{fontFamily:'cursive'}}>Song #:</h3>
                    <h3 style={{fontFamily:'cursive'}}>Title:</h3>
                    <h3 style={{fontFamily:'cursive'}}>Artist</h3>
                        <br></br>
                        <br></br>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth style={{color:'white',backgroundColor:'black'}}><SkipPreviousIcon></SkipPreviousIcon></Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth style={{color:'white',backgroundColor:'black'}}><StopIcon></StopIcon></Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth style={{color:'white',backgroundColor:'black'}}><PlayArrowIcon></PlayArrowIcon></Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth style={{color:'white',backgroundColor:'black'}}><SkipNextIcon></SkipNextIcon></Button>
                        </Grid>
                    </Grid>
                    </Typography>
    let commentTab=
    <Typography>hello</Typography>

    const[tab,setTab] =useState(playerTab);
    function handlePlayerButton(){
        setTab(playerTab)
    }
    function handleCommentButton(){
        setTab(commentTab)
    }
    return (

        <div id="playlist-selector">
            <div id="list-selector-heading">
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
            {searchBar}
            <Grid container component="main" sx={{ height: '100vh' }}>
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
                     <MUIDeleteModal />
                 </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <br></br>
                    
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6}>
                            <Button variant='text' onClick={handlePlayerButton} fullWidth style={{color:'white',backgroundColor:'#007fff'}}>Player</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant='text' onClick={handleCommentButton} fullWidth style={{color:'white',backgroundColor:'#007fff'}}>Comments</Button>
                        </Grid>
                    </Grid>
                    {tab}
                </Grid>
            </Grid>        
        </div>)
}

export default HomeScreen;