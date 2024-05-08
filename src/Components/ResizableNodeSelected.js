import { memo, useRef } from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import Paper from '@mui/material/Paper';

const ResizableNodeSelected = ({ data, selected }) => {
  return (
    <Paper elevation={6}>
    <>
    
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={200}
        minHeight={50}
      />
      
      <Handle type="target" isConnectable={true} isConnectableStart={true} isConnectableEnd={true}position={Position.Top} />
      <div className="">
        {data.icon === "email success" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <EmailOutlinedIcon sx={{ color: "#5CFF46" }} />
            <span>Email sent</span>
          </div>
        ) : null}
         {data.icon === "email failure" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <EmailOutlinedIcon sx={{ color: "red" }} />
            <span>Email sent</span>
          </div>
        ) : null}
        
        {data.icon === "done" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
              <DoneOutlineOutlinedIcon  sx={{color:"#5CFF46 "}}/>
                  
            <span>Done</span>
          </div>
        ) : null}
        {data.icon === "waitlisted" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
              <HourglassBottomOutlinedIcon sx={{color:"yellow"}}/>
                  
            <span>Waitlisted</span>
          </div>
        ) : null}
         {data.icon === "person" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
              <PersonOutlineOutlinedIcon sx={{color:"blue"}}/>
                  
            <span>Lead</span>
          </div>
        ) : null}
      </div>
      <div style={{ padding: 10 }}>{data.label}</div>
        
      <Handle type="source" isConnectable={true}isConnectableStart={true} isConnectableEnd={true} position={Position.Bottom} />
    </>
    </Paper>
  );
};

export default memo(ResizableNodeSelected);
