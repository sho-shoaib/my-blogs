import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Container, useMediaQuery } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

const NavBar = (props) => {
  const { history } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const pages = [
    { page: "Blogs", url: "/" },
    { page: "Create", url: "/create" },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageUrl) => {
    history.push(pageUrl);
    setAnchorEl(null);
  };

  const handleNavClick = (pageUrl) => {
    history.push(pageUrl);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        elevation={0}
        sx={{
          backgroundColor: "var(--light-black)",
          color: "var(--nav-font)",
        }}
      >
        <Toolbar sx={{ paddingInline: theme.spacing(3) }}>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant='h6'
              component='div'
              sx={{ fontFamily: "Raleway", cursor: "pointer" }}
              onClick={() => handleNavClick("/")}
            >
              MyBlogs
            </Typography>
            {matches ? (
              <div>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 2 }}
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => handleMenuClick("/")}>
                    Blogs
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/create")}>
                    Create
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Stack spacing={2} direction='row'>
                {pages.map((page) => (
                  <Button
                    key={uuidv4()}
                    variant='text'
                    sx={{ color: "var(--nav-font)" }}
                    onClick={() => handleNavClick(page.url)}
                  >
                    {page.page}
                  </Button>
                ))}
              </Stack>
            )}
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withRouter(NavBar);
