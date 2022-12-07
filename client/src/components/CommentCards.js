import Box from '@mui/material/Box';
import List from '@mui/material/List';

export default function CommentCards(props) {
    const { name, comments } = props;
    let cardClass = "list-card unselected-list-card";
    return<>
    
     <List overflow spacing={2} style={{background:"#8000F00F"}}>
        <Box className={cardClass} >
        <Box style={{fontSize:"12pt",textDecorationLine:"underline"}}>
            {name}:
            </Box>
        
        <Box style={{fontSize:"24pt"}}>
                {comments}
            </Box>
        </Box>
        
        
     </List>
        
    </>

}