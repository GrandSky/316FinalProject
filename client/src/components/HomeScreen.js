import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import YouTube from 'react-youtube';
import ListCard from './ListCard.js'
import { useHistory } from 'react-router-dom'
import MUIDeleteModal from './MUIDeleteModal'
import AuthContext from '../auth'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button} from '@mui/material'
import { Link } from 'react-router-dom'
import YouTubePlayerExample from './YoutubePlaylister';
import CommentTab from './CommentTab';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [query, setQuery] = useState("");
    const[user,setUser]=useState(false)
    store.history = useHistory();
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOwned = () => {
        store.loadIdNamePairs()
        setUser(false)
    }
    const handlePublished =()=>{
        store.loadPublishedNamePairs()
        setUser(false)
        
    }
    const handleUser=()=>{
        store.loadPublishedNamePairs()
        setUser(true)
    }
    function handleSortName(){
        store.sortByChar()
        handleMenuClose();
    }
    function handleSortDate(){
        store.sortByPublishTime()
        handleMenuClose();
    }
    function handleSortListens(){
        store.sortByListens()
        handleMenuClose();
    }
    function handleSortLikes(){
        store.sortByLikes()
        handleMenuClose();
    }
    function handleSortDislikes(){
        store.sortByDislikes()
        handleMenuClose();
    }
    const menuId = 'primary-search-account-menu';
    const sortMenu=(
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortName}>Name(A-Z)</MenuItem>
            <MenuItem onClick={handleSortDate}>Publish Date(Newest)</MenuItem>
            <MenuItem onClick={handleSortListens}>Listens(High-Low)</MenuItem>
            <MenuItem onClick={handleSortLikes}>Likes(High-Low)</MenuItem>
            <MenuItem onClick={handleSortDislikes}>Dislikes(High-Low)</MenuItem>
        </Menu>
    );
    let searchBar=<Box >
    <AppBar position="sticky">

        <Toolbar>
        <Typography       
            variant="h4"
            noWrap
            component="div"
            sx={{width:.05, display: { xs: 'none', sm: 'block' } }}
        >
             <Link onClick={handleOwned} style={{ textDecoration: 'none', color: 'white' }} to='/'><HouseIcon/></Link>
        </Typography>
        <Typography       
            variant="h4"
            noWrap
            component="div"
            sx={{width:.05, display: { xs: 'none', sm: 'block' } }}
        >
             <Link onClick={handlePublished} style={{ textDecoration: 'none', color: 'white' }} to='/'><GroupsIcon/></Link>
        </Typography>
        <Typography       
            variant="h4"
            noWrap
            component="div"
            sx={{width:.05, display: { xs: 'none', sm: 'block' } }}
        >
             <Link onClick={handleUser} style={{ textDecoration: 'none', color: 'white' }} to='/'><PersonIcon/></Link>
        </Typography>
        <Typography       
            variant="h4"
            noWrap
            component="div"
            sx={{width:.15, display: { xs: 'none', sm: 'block' } }}
        >
        </Typography>
        
        <TextField
        onChange={handleQueryChange}
            id='search bar'
            label='search'
            name='searchbar'
            sx={{ width:.45,bgcolor: 'white'}}
        />
         <Typography       
            variant="h4"
            noWrap
            component="div"
            sx={{width:.15, display: { xs: 'none', sm: 'block' } }}
        >
        </Typography>
        <Typography       
            variant="h4"
            noWrap
            component="div"
            sx={{fontSize:18}}
        >
            Sort By
        </Typography>
        <Box sx={{ height: "90px", display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="sort"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <SortIcon/>
                </IconButton>
            </Box>
        
        </Toolbar>
    
    </AppBar>
    {
        sortMenu
    }
</Box>

    function handleCreateNewList() {
        store.createNewList();
    }

    
    let sortedList = ""

    if (store.idNamePairs) {
        sortedList = store.idNamePairs.filter(pair => pair.name.toUpperCase().includes(query.toUpperCase())).map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ));
    }
    if(store.idNamePairs &&user){
        sortedList = store.idNamePairs.filter(pair => pair.ownerUsername.toUpperCase().includes(query.toUpperCase())).map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ));
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                sortedList
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