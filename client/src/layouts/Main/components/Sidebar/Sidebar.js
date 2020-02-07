import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {

  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: localStorage.getItem("word19"),
      href: '/dashboard',
      role:['1', '2'],
      icon: <DashboardIcon />
    },
    {
      title: localStorage.getItem("word20"),
      href: '/users',
      role:['2'],
      icon: <TextFieldsIcon />
    },
    {
      title: localStorage.getItem("word21"),
      href: '/products',
      role:['2'],
      icon: <TextFieldsIcon />
    },
    {
        title: localStorage.getItem("word22"),
        href: '/typography',
        role:['2'],
        icon: <PeopleIcon />
      },
      // {
      //   title: 'Account',
      //   href: '/account',
      //   role:['1' , '2'],
      //   icon: <AccountBoxIcon />
      // },
      // {
      //   title: localStorage.getItem("word23"),
      //   href: '/settings',
      //   role:['1' , '2'],
      //   icon: <SettingsIcon />
      // },
    // {
    //   title: 'Settings',
    //   href: '/icons',
    //   role:['1' , '2'],
    //   icon: <ImageIcon />
    // },
    // {
    //   title: 'Typography',
    //   href: '/typography',
    //   role:['1' , '2'],
    //   icon: <TextFieldsIcon />
    // },
    // {
    //   title: 'Icons',
    //   href: '/icons',
    //   role:['1' , '2'],
    //   icon: <ImageIcon />
    // }
    
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        {/* {
          if (localStorage.getItem("key") == 0 || localStorage.getItem("key") == 1) {
           return( <div>
            </div>);
          } else {
      
          }
        } */}

        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        <UpgradePlan />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
