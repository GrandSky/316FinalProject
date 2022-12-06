import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import YouTube from 'react-youtube';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function YouTubePlayerExample() {
    const { store } = useContext(GlobalStoreContext);
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];
    let currentList=""
    let songName=[]
    let artist=[]
    let songNumber=""

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;
    const playerOptions = {
        height: '400',
        width: '565',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        },
    };
    if(store.currentList){
        currentList= store.currentList.name  
        songNumber=currentSong+1
        for(let x=0;x<store.currentList.songs.length;x++ ){
            playlist.push(store.currentList.songs[x].youTubeId)
            songName.push(store.currentList.songs[x].title)
            artist.push(store.currentList.songs[x].artist)
        }
    }
    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    let eventTarget=""
    function onPlayerReady(event) {
        if(store.currentList){
            eventTarget= event.target
        }
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
        
    }
    function decreSong(){
        currentSong--;
        if(currentSong<0){
            currentSong+=playlist.length
        }
    }
    const handlePreviousSong = () => {
        console.log("handlePrevious")
        decreSong();
        loadAndPlayCurrentSong(eventTarget);
    }
    const handlePause = () => {
        eventTarget.pauseVideo();
    }
    const handlePlay = () => {
        eventTarget.playVideo();
    }
    const handleNextSong = () => {
        
        incSong();
        loadAndPlayCurrentSong(eventTarget);
    }
    

    return <>
        <Typography>
        <YouTube
    videoId={playlist[currentSong]}
    opts={playerOptions}
    onReady={onPlayerReady}
    onStateChange={onPlayerStateChange} />
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily:'sans-serif'
                        }}>
                            <h1 >Now Playing</h1>
                    </div>
                    <h3 style={{fontFamily:'sans-serif'}}>Playlist:{currentList}</h3>
                    <h3 style={{fontFamily:'sans-serif'}}>Song #:{songNumber}</h3>
                    <h3 style={{fontFamily:'sans-serif'}}>Title:{songName[currentSong]}</h3>
                    <h3 style={{fontFamily:'sans-serif'}}>Artist:{artist[currentSong]}</h3>
                        <br></br>
                        <br></br>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth onClick={handlePreviousSong} style={{color:'white',backgroundColor:'black'}}><SkipPreviousIcon></SkipPreviousIcon></Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth onClick={handlePause} style={{color:'white',backgroundColor:'black'}}><StopIcon></StopIcon></Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth onClick={handlePlay} style={{color:'white',backgroundColor:'black'}}><PlayArrowIcon></PlayArrowIcon></Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant='text' fullWidth onClick={handleNextSong} style={{color:'white',backgroundColor:'black'}}><SkipNextIcon></SkipNextIcon></Button>
                        </Grid>
                    </Grid>
                    </Typography>
    </>
}