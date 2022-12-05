import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import AccountCircle from '@mui/icons-material/AccountCircle';
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

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleHouseClick = () => {
        
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
            <MenuItem onClick={handleMenuClose}><Link >Name(A-Z)</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link >Publish Date(Newest)</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link >Listens(High-Low)</Link></MenuItem>
        </Menu>
    );
    return (
        <Box >
            <AppBar position="sticky">

                <Toolbar>
                <Typography       
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{width:.05, display: { xs: 'none', sm: 'block' } }}
                >
                     <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'><HouseIcon/></Link>
                </Typography>
                <Typography       
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{width:.05, display: { xs: 'none', sm: 'block' } }}
                >
                     <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'><GroupsIcon/></Link>
                </Typography>
                <Typography       
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{width:.05, display: { xs: 'none', sm: 'block' } }}
                >
                     <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'><PersonIcon/></Link>
                </Typography>
                <Typography       
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{width:.15, display: { xs: 'none', sm: 'block' } }}
                >
                </Typography>
                
                <TextField
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
                            aria-label="account of current user"
                            aria-controls={menuId}
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
        
    );
    }
