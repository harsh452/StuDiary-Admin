import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Panel() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'yellow',color:'black'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ADMIN PANEL
          </Typography>
          <a style={{color:'black',textDecoration:'none',margin:'10px'}} href="/blog">Blogs</a>
          <a style={{color:'black',textDecoration:'none',margin:'10px'}} href="/home">Videos</a>

        </Toolbar>
      </AppBar>
    </Box>
  );
}