import React from "react";
import { Box, Typography, Link, Paper, Divider } from "@mui/material";
import { styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Tile = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 150,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

function DashboardTile(props) {
  const title = props.title;
  const body = props.body;
  const bgColor = props.bgColor;
  const textColor = props.textColor;
  const tileLink = props.linkTo;

  return (
    <Tile square={false} sx={{ background: bgColor }}>
      <Box>
        <Typography variant="h2" color={textColor}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color={textColor}>
          {body}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ textAlign: "right" }} my={1}>
        <Link
          underline="none"
          color={textColor}
          component={RouterLink}
          to={tileLink}
        >
          View All
        </Link>
      </Box>
    </Tile>
  );
}

export default DashboardTile;
