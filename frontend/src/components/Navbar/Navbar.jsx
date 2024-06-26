// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import Sidebar from "../Sidebar/Sidebar";
// import CssBaseline from "@mui/material/CssBaseline";
// import { Outlet } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


// const pages = ["Checkings", "Saving", "Loan"];
// const settings = ["Dashboard", "Logout"];

// function Navbar(props) {
//   const navigate = useNavigate();

// 	const user = "customer";
// 	const sideBarList = props.sideBarList;

// 	const [anchorElNav, setAnchorElNav] = React.useState(null);
// 	const [anchorElUser, setAnchorElUser] = React.useState(null);

// 	const handleOpenNavMenu = (event) => {
// 		setAnchorElNav(event.currentTarget);
// 	};
// 	const handleOpenUserMenu = (event) => {
// 		setAnchorElUser(event.currentTarget);
// 	};

// 	const handleCloseNavMenu = () => {
// 		setAnchorElNav(null);
// 	};

// 	const handleCloseUserMenu = () => {
// 		setAnchorElUser(null);
// 	};

// 	return (
// 		<Box sx={{ display: "flex" }}>
// 			<CssBaseline />
// 			<AppBar
// 				position="fixed"
// 				sx={{
// 					backgroundColor: "#0076CE",
// 					zIndex: (theme) => theme.zIndex.drawer + 1,
// 				}}
// 			>
// 				<Container maxWidth="xl">
// 					<Toolbar
// 						sx={{ mx: 6, display: "flex", justifyContent: "space-between" }}
// 					>
// 						{/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
// 						<Typography
// 							variant="h4"
// 							noWrap
// 							component="a"
// 							href={user === "customer" ? "/customer" : "/employee"}
// 							sx={{
// 								display: { xs: "none", md: "flex" },
// 								fontFamily: "monospace",
// 								fontWeight: 700,
// 								letterSpacing: ".3rem",
// 								color: "inherit",
// 								textDecoration: "none",
// 							}}
// 						>
// 							SAFE
// 						</Typography>

// 						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
// 							<IconButton
// 								size="large"
// 								aria-label="account of current user"
// 								aria-controls="menu-appbar"
// 								aria-haspopup="true"
// 								onClick={handleOpenNavMenu}
// 								color="inherit"
// 							>
// 								<MenuIcon />
// 							</IconButton>
// 							<Menu
// 								id="menu-appbar"
// 								anchorEl={anchorElNav}
// 								anchorOrigin={{
// 									vertical: "bottom",
// 									horizontal: "left",
// 								}}
// 								keepMounted
// 								transformOrigin={{
// 									vertical: "top",
// 									horizontal: "left",
// 								}}
// 								open={Boolean(anchorElNav)}
// 								onClose={handleCloseNavMenu}
// 								sx={{
// 									display: { xs: "block", md: "none" },
// 								}}
// 							>
// 								{pages.map((page) => (
// 									<MenuItem key={page} onClick={handleCloseNavMenu}>
// 										<Typography textAlign="center">{page}</Typography>
// 									</MenuItem>
// 								))}
// 							</Menu>
// 						</Box>
// 						<Typography
// 							variant="h5"
// 							noWrap
// 							component="a"
// 							href="#app-bar-with-responsive-menu"
// 							sx={{
// 								mr: 2,
// 								display: { xs: "flex", md: "none" },
// 								flexGrow: 1,
// 								fontFamily: "monospace",
// 								fontWeight: 700,
// 								letterSpacing: ".3rem",
// 								color: "inherit",
// 								textDecoration: "none",
// 							}}
// 						>
// 							SAFE
// 						</Typography>
// 						{/* <Box
//               sx={{
//                 display: { xs: "none", md: "flex" },
//                 flexDirection: "row",
//                 gap: "6rem",
//               }}
//             >
//               {pages.map((page) => (
//                 <Button
//                   key={page}
//                   onClick={handleCloseNavMenu}
//                   sx={{
//                     my: 2,
//                     color: "white",
//                     display: "block",
//                     fontSize: "1.2rem",
//                   }}
//                 >
//                   {page}
//                 </Button>
//               ))}
//             </Box> */}

// 						<Box>
// 							<Tooltip title="Open settings">
// 								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
// 									<Avatar
// 										alt="Anjali Gohil"
// 										src="/static/images/avatar/2.jpg"
// 										sx={{ backgroundColor: "white", color: "black" }}
// 									/>
// 								</IconButton>
// 							</Tooltip>
// 							<Menu
// 								sx={{ mt: "45px" }}
// 								id="menu-appbar"
// 								anchorEl={anchorElUser}
// 								anchorOrigin={{
// 									vertical: "top",
// 									horizontal: "right",
// 								}}
// 								keepMounted
// 								transformOrigin={{
// 									vertical: "top",
// 									horizontal: "right",
// 								}}
// 								open={Boolean(anchorElUser)}
// 								onClose={handleCloseUserMenu}
// 							>
// 								<MenuItem key="Dashboard" onClick={handleCloseUserMenu}>
// 									<Typography
// 										textAlign="center"
// 										onClick={() =>
// 											navigate(`/${user}`)
// 										}
// 									>
// 										Dashboard
// 									</Typography>
// 								</MenuItem>
// 								<MenuItem key="Logout" onClick={handleCloseUserMenu}>
// 									<Typography
// 										textAlign="center"
										
//                     onClick={() =>
// 											navigate(`/`)
// 										}
// 									>
// 										Logout
// 									</Typography>
// 								</MenuItem>
// 							</Menu>
// 						</Box>
// 					</Toolbar>
// 				</Container>
// 			</AppBar>
// 			<Sidebar sideBarList={sideBarList} />
// 			<Box
// 				component="main"
// 				sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
// 			>
// 				<Toolbar />
// 				<Outlet />
// 			</Box>
// 		</Box>
// 	);
// }
// export default Navbar;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Sidebar from "../Sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const pages = ["Checkings", "Saving", "Loan"];
const settings = ["Dashboard", "Logout"];

function Navbar(props) {
  const navigate = useNavigate();
  const user = "customer";
  const sideBarList = props.sideBarList;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Clear any stored authentication data (if any)
    localStorage.removeItem('userToken'); // Adjust as per your storage keys

    // Navigate to the root/home page
    navigate('/');
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#0076CE",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ mx: 6, display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href={user === "customer" ? "/customer" : "/employee"}
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SAFE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Anjali Gohil"
                    src="/static/images/avatar/2.jpg"
                    sx={{ backgroundColor: "white", color: "black" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Sidebar sideBarList={sideBarList} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;
