import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Components/MainPage";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Sidebar from "./Components/sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import axios from 'axios'
import { Dialog, DialogActions, DialogContent, DialogTitle, Drawer } from "@mui/material";


function App() {
  const [openLog, setOpenLog] = React.useState(false);
  const [nodes,setNodes] = React.useState([])
  const [edges,setEdges] = React.useState([])
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('nodes')
    localStorage.removeItem('edges')
    window.location.href = "/login"
  };

  

  const fetchNodes = (nodes,edges) =>{
    setNodes(nodes)
    setEdges(edges)
  }
console.log(nodes,"nodes in home")

  const handleClosewithSave = () =>{
    axios.post('https://future-blink-task-backend.onrender.com/api/save',{email:localStorage.getItem('email'),nodes,edges})
    .then((res)=>{
      if(res.data.hasOwnProperty('msg')){
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('nodes')
        localStorage.removeItem('edges')
        handleClose()
        window.location.href = "/login"
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

  const renderSaveModal = () =>{
    return( <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         Do you want to save your changes 
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClosewithSave} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>)
  }

  const handleLogout = () =>{
    handleClickOpen()
  }
  
  return (
    localStorage.getItem('token')&&
    <div
      className="App"
      style={{ backgroundColor: "#E2D7D7", width: "100%", height: "100vh" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
             
            
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {!!localStorage.getItem('token') ? <Button color="inherit" onClick={()=>{handleLogout()}}>Logout</Button>:<Button color="inherit">Login</Button>}
          </Toolbar>
        </AppBar>
      </Box>
      <MainPage fetchNodes={fetchNodes}/>
      {renderSaveModal()}
    </div>
  
  );
}

export default App;
