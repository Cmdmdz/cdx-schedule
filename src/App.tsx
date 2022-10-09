import * as React from "react";
import { createTheme, styled, ThemeProvider, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import * as loginActions from "./actions/login.action";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./components/page/LoginPage";
import RegisterPage from "./components/page/RegisterPage";
import Course from "./components/page/Course";
import TimeTable from "./components/page/TimeTable";
import AboutUs from "./components/page/AboutUs";
import { blue, blueGrey } from "@mui/material/colors";
import { RootReducers } from "./reducers";
import { useSelector } from "react-redux";
import { useAppDispatch } from ".";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "url(" + `${process.env.PUBLIC_URL}/images/background_menu.jpg` + ")",
          width: drawerWidth,
        },
      },
    },
  },
  typography: {
    fontFamily: "Fredoka",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  spacing: 8,
  palette: {
    primary: process.env.REACT_APP_IS_PRODUCTION == "0" ? blue : blueGrey,
    background: {
      default: "#CFD2D6",
    },
  },
});

export default function App() {
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {loginReducer.result && <Header open={open} onDrawerOpen={handleDrawerOpen} />}
        {loginReducer.result && <Menu open={open} onDrawerClose={handleDrawerClose} />}
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/course" element={<Course />} />
            <Route path="/timetable" element={<TimeTable />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
