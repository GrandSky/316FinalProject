import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid  from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Undo from '@mui/icons-material/Undo';
import Redo from '@mui/icons-material/Redo';
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
            store.incListen(idNamePair._id);
        }
    }
    const handleChange = () => (event) => {
        if (store.currentList){
            if (store.currentList._id == idNamePair._id){store.closeCurrentList()} 
            
        }
        else handleLoadList(event, idNamePair._id)
    };
    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    function handleAddNewSong(){
        store.addNewSong()
    }
    function handleUndo(){
        store.undo()
    }
    function handleRedo(){
        store.redo()
    }
    function handleDuplicate(){
        store.duplicateList()
    }
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    // LIST OF SONGS IN THE PLAYLIST
    let songListJSX = ""
    if (store.currentList != null) {
        songListJSX = 
            <Box id="list-selector-list">
                <List id="playlist-cards" sx={{overflow: 'scroll', overflowX: "hidden", height: '100%', width: '100%', bgcolor: '#8000F00F'}}>
                    {store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))}
                </List>            
                {modalJSX}

            </Box>
    }
    let open = false
    
    function handleLike(){
        store.addLike(idNamePair._id)
    }
    function handleDislike(){
        store.addDislike(idNamePair._id)

    }
    function handlePublish(){
        store.publishList(idNamePair._id)
    }
    let publishButton=""
    let likesAndDislikes=""
    let publishedDate=""
    let author=""
    if (store.currentList){
        if (store.currentList._id == idNamePair._id) open = true
        else open = false
        console.log(store.currentList.publishDate)
        
    }
    if(idNamePair.publishTime==0){
        publishButton=<Button onClick={handlePublish} variant="text" color='secondary'>Publish</Button>
    }else{
        author=<Box style={{fontSize: '12pt'}}>By:{idNamePair.ownerUsername}</Box>
        publishedDate=<Box style={{fontSize: '12pt'}}>Publish Date:{idNamePair.publishDate}</Box>
        likesAndDislikes=
        <><Box sx={{ p: 1 }}>
        <IconButton onClick={handleLike} aria-label='edit'>
            <ThumbUpOffAltIcon style={{fontSize:'28pt'}} />{idNamePair.likes}
        </IconButton>
    </Box>
    <Box sx={{ p: 1 }}>
        <IconButton onClick={handleDislike} aria-label='edit'>
            <ThumbDownOffAltIcon style={{fontSize:'28pt'}} />{idNamePair.dislikes}
        </IconButton>
    </Box></>
    }
    
    let cardElement =
    <Accordion
        expanded={open}
        onChange={handleChange()} 
        elevation={3}
        disableGutters={true}
        sx={{borderRadius:"4px", margin: "20px", mt: '10px',bgcolor: '#8000F00F'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
            button
    
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>
            <Box >{idNamePair.name}</Box>
            {author}
            <Box style={{fontSize: '12pt'}}>Listens:{idNamePair.listens}</Box>
            {publishedDate}
            </Box>
            
            {likesAndDislikes}
            
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'28pt'}} />
                </IconButton>
            </Box>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <Grid item xs={12} overflow='hidden' height='398px' style={{transform:"translate(0%,-10%)"}}>
                {songListJSX}
            </Grid>
            <Grid item xs={12} style={{transform:"translate(0%,-10%)"}}>
                <IconButton color='secondary' onClick={handleAddNewSong}>
                    <Add style={{fontSize:'28pt'}} />
                </IconButton>
                <IconButton color='secondary'  onClick={handleUndo} >
                    <Undo style={{fontSize:'28pt'}} />
                </IconButton>
                <IconButton color='secondary' onClick={handleRedo} >
                    <Redo style={{fontSize:'28pt'}} />
                </IconButton>
                {publishButton}
                <Button onClick={handleDuplicate} variant="text"color='secondary'>Duplicate</Button>

                
            </Grid>
        </AccordionDetails>
        </Accordion>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;