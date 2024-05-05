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
import { Link, useLocation } from "react-router-dom";
const drawerWidth = 290;

export default function Sidebar({ sideBarList }) {
  const location = useLocation();
  const user = "customer";
  const pathAfterEmployeeArray  = location.pathname.split(`${user}/`)[1];
  // const lastName = pathAfterEmployeeArray.length > 1 ? pathAfterEmployeeArray[1] : "";
  const lastName = pathAfterEmployeeArray? pathAfterEmployeeArray: ""
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
      <Box sx={{ overflow: "auto", mt: 6, mx: 2 }}>
        <List>
          {sideBarList != null
            ? Object.keys(sideBarList).map((key, index) => (
                <ListItem
                  key={key}
                  disablePadding
                  sx={{
                    my: 2,
                    ...(lastName === sideBarList[key] && {
                      "& .MuiButtonBase-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }),
                  }}
                  button
                  component={Link}
                  to={sideBarList[key]}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={key} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
        </List>
      </Box>
    </Drawer>
  );
}
