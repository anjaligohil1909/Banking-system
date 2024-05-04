import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {Link} from "react-router-dom";
const drawerWidth = 260;

export default function Sidebar({sideBarList}) {
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#F0F8FF",
        //   color: "white",
        },
      }}
      sx={{
        width: drawerWidth,
        backgroundColor: "#57068C",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      {/* <Divider /> */}
      <Box sx={{ overflow: "auto", mt: 6, mx: 3}}>
        <List>
          {sideBarList != null ? Object.keys(sideBarList).map((key, index) => (
             <ListItem key={key} disablePadding sx={{ my: 2 }} button component={Link} to={sideBarList[key]}>
                <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={key} />
              </ListItemButton>
             
            </ListItem>
          )) : null}          
        </List>
      </Box>
    </Drawer>
  );
}
