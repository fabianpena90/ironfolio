import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';
//Importing Components
import Footer from './components/Footer';

import Archive from './components/Archive';
import ArchiveDetail from './components/ArchiveDetail';
import Favorites from './components/Favorites';
import AddNew from './components/AddNew';
import Profile from './components/Profile';
import NotFound from './components/404/NotFound';
import FormUpdate from './components/FormUpdate';
import AddNewClass from './components/AddNewClass';
import loader from './loader.gif';
// Auth Components
import TheContext from './TheContext';
import { SocketProvider } from './SocketContext';
import actions from './api/index';
import GoogleAuth from './components/auth/GoogleAuth';
import GoogleAuthLogin from './components/auth/GoogleAuthLogin';
import { NotificationContainer } from 'react-notifications';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArchiveRoundedIcon from '@material-ui/icons/ArchiveRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import SlideInAlert from './components/SlideInAlert';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 15,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    fontSize: '1.1rem',
    padding: theme.spacing(3),
  },
}));

function App() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  let [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      setUser(user?.data);
    }
    getUser();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOut = async () => {
    await actions.logOut();
    setUser(null);
    history.push('/');
  };

  const history = useHistory();

  return user === null || // if statement to see if user is register or not. if it is page will go to the profile
    user === undefined || // if not, 404 will display
    JSON.stringify(user) === '{}' ? (
    <div className="google">
      <div className="header">
        <h1>IRONFOLIO</h1>
        <p>Where you can explore and collaborate...</p>
      </div>
      {loading ? (
        <img src={loader} alt="Loading..." />
      ) : (
        <>
          {!user && <GoogleAuth setUser={setUser} setLoading={setLoading} />}
          {!user && (
            <GoogleAuthLogin setUser={setUser} setLoading={setLoading} />
          )}
          {JSON.stringify(user) === '{}' && <Route component={NotFound} />}
        </>
      )}
      <NotificationContainer />
    </div>
  ) : (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <SocketProvider id={user._id} name={user.name} imageUrl={user.imageUrl}>
        <TheContext.Provider value={{ history, user, setUser }}>
          <div className={classes.root} style={{ paddingBottom: '20px' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                  variant="h6"
                  noWrap
                >
                  <span style={{ fontSize: '1.5rem' }}>Ironfolio</span>
                  <div style={{ display: 'flex' }}>
                    <span style={{ paddingRight: '20px' }}>{user?.name}</span>
                    <Avatar src={user?.imageUrl} />
                  </div>
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              })}
              classes={{
                paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                }),
              }}
            >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                <Link component={RouterLink} to="/">
                  <ListItem button key="Profile">
                    <ListItemIcon>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Profile"
                        placement="right"
                        arrow
                      >
                        <AccountBoxRoundedIcon style={{ color: '#120078' }} />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                </Link>
                {user.userType === 'admin' ? (
                  <Link component={RouterLink} to="/addNewClass">
                    <ListItem button key="Add New Class">
                      <ListItemIcon>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title="Add New Class"
                          placement="right"
                          arrow
                        >
                          <GroupAddIcon style={{ color: '#0d85ef' }} />
                        </Tooltip>
                      </ListItemIcon>
                      <ListItemText primary="Add New Class" />
                    </ListItem>
                  </Link>
                ) : null}
                <Link component={RouterLink} to="/newproject">
                  <ListItem button key="Add New Project">
                    <ListItemIcon>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Add New Project"
                        placement="right"
                        arrow
                      >
                        <AddBoxIcon style={{ color: '#34626c' }} />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Add New Project" />
                  </ListItem>
                </Link>
                <Link component={RouterLink} to="/archive">
                  <ListItem button key="Archives">
                    <ListItemIcon>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Archives"
                        placement="right"
                        arrow
                      >
                        <ArchiveRoundedIcon style={{ color: '#9088d4' }} />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Archives" />
                  </ListItem>
                </Link>
                <Link component={RouterLink} to="/favorites">
                  <ListItem button key="Favorites">
                    <ListItemIcon>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Favorites"
                        placement="right"
                        arrow
                      >
                        <FavoriteRoundedIcon style={{ color: '#f05454' }} />
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                  </ListItem>
                </Link>
                <SlideInAlert logOut={logOut} />
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/" render={() => <Profile user={user} />} />
                <Route
                  exact
                  path="/addNewClass"
                  render={() => <AddNewClass user={user} />}
                />
                <Route
                  exact
                  path="/editProject/:id"
                  render={(props) => <FormUpdate {...props} user={user} />}
                />
                <Route
                  exact
                  path="/newproject"
                  render={() => <AddNew user={user} />}
                />
                <Route
                  exact
                  path="/archive"
                  render={(props) => <Archive {...props} user={user} />}
                />
                <Route
                  exact
                  path="/archive/:id"
                  render={(props) => <ArchiveDetail {...props} user={user} />}
                />
                <Route
                  exact
                  path="/favorites"
                  render={(props) => <Favorites {...props} user={user} />}
                />
              </Switch>
            </main>
          </div>
        </TheContext.Provider>
      </SocketProvider>
      <Footer />
      <NotificationContainer />
    </div>
  );
}

export default App;
