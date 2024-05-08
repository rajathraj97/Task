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
import { Drawer } from "@mui/material";


function App() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Sidebar />
    </Box>
  );
  
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
             
                <MenuIcon ><Drawer >{DrawerList}  </Drawer></MenuIcon>
            
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <MainPage />
    </div>
  
  );
}

export default App;
