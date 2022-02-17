import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export const Sidebar = () => {
  return (
    <Drawer
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
      <List>
        <Link to="/">
          <ListItem button>Table</ListItem>
        </Link>
        <Divider />
        <Link to="charts">
          <ListItem button>Chart</ListItem>
        </Link>
      </List>
    </Drawer>
  );
};
