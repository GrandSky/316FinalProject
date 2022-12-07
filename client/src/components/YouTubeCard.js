
export default function YouTubeCard(prop){
    const { currentList, songName,artist,songNumber,currentSong } = prop;
    
    return <>
                    <h3 style={{fontFamily:'sans-serif'}}>Playlist:{currentList}</h3>
                    <h3 style={{fontFamily:'sans-serif'}}>Song #:{songNumber}</h3>
                    <h3 style={{fontFamily:'sans-serif'}}>Title:{songName[currentSong]}</h3>
                    <h3 style={{fontFamily:'sans-serif'}}>Artist:{artist[currentSong]}</h3>
</>
}

