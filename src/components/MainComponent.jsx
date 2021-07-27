import React, { useState } from 'react'
import  NavAppBar from './header/AppBar'
import DrawerComponent from './header/sidenav/Drawer'
import useStyles from './header/HeaderStyle';
import MainContainer from './MainContainer';
export default function MainComponent() {
    const classes = useStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)
    return (
        <div> 
            <NavAppBar setDrawerOpen={setDrawerOpen} />
            <DrawerComponent classes={classes} mobileOpen={drawerOpen} handleDrawerToggle={setDrawerOpen} />
            <MainContainer classes={classes} />
        </div>
    )
}
