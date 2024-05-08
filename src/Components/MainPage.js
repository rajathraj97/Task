import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Sidebar from "./sidebar";
import ResizableNodeSelected from "./ResizableNodeSelected";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from 'axios'
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./index.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const nodeTypes = {
  ResizableNodeSelected,
};

const styles = {
    border: "none"
  };

const initialNodes = [
  {
    id: "1",
    type: "ResizableNodeSelected",
    data: { label: "input node", name: "abc", icon: null },
    position: { x: 250, y: 5 },
    style: {
      background: "#fff",
      border: null,
      borderRadius: 15,
      fontSize: 12,
    },
  },
];


let id = 0;
const getId = () => `dndnode_${id++}`;

const MainPage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const[id,setId] = React.useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const handleText = (event) => {
    setTextValue(event.target.value);
  };
 
  const renderModal = () => {
    return (
      <div>
        <React.Fragment>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
             {!!edit ? <h3>Edit Node</h3>:<h3>Add New Node</h3>}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <FormControl fullWidth>
                <TextField
                  required
                  id="outlined-required"
                  label="Title"
                  value={textValue}
                  onChange={handleText}
                  defaultValue="Hello World"
                />
              </FormControl>
            </DialogContent>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={"email success"}>
                  <EmailOutlinedIcon sx={{color:"#5CFF46"}}/>
                  Email Success
                </MenuItem>
                <MenuItem value={"email failure"}>
                  <EmailOutlinedIcon sx={{color:"red"}}/>
                  Email Failure
                </MenuItem>
                <MenuItem value={"done"}>
                  <DoneOutlineOutlinedIcon  sx={{color:"#5CFF46 "}}/>
                  Done
                </MenuItem>
                <MenuItem value={"person"}>
                  <PersonOutlineOutlinedIcon  sx={{color:"blue"}}/>
                  Lead
                </MenuItem>
                <MenuItem value={"waitlisted"}>
                <HourglassBottomOutlinedIcon sx={{color:"yellow"}}/>
                waitlisted
                </MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button autoFocus onClick={createNewNode}>
                Create
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </React.Fragment>
      </div>
    );
  };

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [edit,setEdit] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  React.useEffect(()=>{
    if(localStorage.getItem('nodes') || localStorage.getItem('edges')){
      setNodes(JSON.parse(localStorage.getItem('nodes')))
      setEdges(JSON.parse(localStorage.getItem('edges')))
    }
  },[])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);



  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: "ResizableNodeSelected",
        position,
        data: {
          label: !!textValue ? textValue : "InputNode",
          icon: !!selected ? selected : null,
        },
        style: {
          background: "#fff",
          borderRadius: 15,
          fontSize: 12,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const addNewNode = () => {
    setOpen(!open);
  };
  const createNewNode = () => {
   if(edit === true){
    const updated_data = nodes.map((ele)=>{
        if(ele.id === id){
        ele.data={...ele.data , label:textValue,icon:selected }
        }
        return ele
    })
    setId("")
    setEdit(false)
    setNodes(updated_data)
   }
if(!edit){
    const newNode = {
      id: getId(),
      type: "ResizableNodeSelected",
      position: { x: 0, y: 0 },
      data: { label: !!textValue ? textValue : "InputNode",
      icon: !!selected ? selected : null, },
      style: {
        background: "#fff",
        borderRadius: 15,
        fontSize: 12,
      },
    
    };

    setNodes((nds) => nds.concat(newNode));
}
  };
  React.useEffect(()=>{
    if(!!nodes && !!edges){
    props.fetchNodes(nodes,edges)
    }
  },[nodes,edges])

  const handleDoubleClick = (e,val) =>{
    setEdit(true)
    setId(val.id)
    initialNodes.map((ele)=>{
        if(ele.id === val.id){
            setTextValue(ele?.data?.label)
            setSelected(ele?.data?.icon)
        }
    })
    setOpen(!open)
  }

  return (
    <div className="dndflow">
      <Button
        onClick={addNewNode}
        style={{ right: "850px", top: "55px" }}
        sx={{ backgroundColor: "gray" }}
        variant="contained"
        className="nodnd"
      >
        Add Label or Node
      </Button>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={(e,val)=>{handleDoubleClick(e,val)}}
            onConnect={onConnect}
            style={{ border:"none"}}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
        {renderModal()}
      </ReactFlowProvider>
    </div>
  );
};

export default MainPage;
