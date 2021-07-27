import {  Hidden,Drawer } from '@material-ui/core'
import React from 'react'

export default function DrawerComponent({classes,mobileOpen,handleDrawerToggle}) {
    return (
        <div>
            <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
           
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClose={()=>{handleDrawerToggle(false)}}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
             <h1>Drawer vvhgughfgjfhc</h1>
          </Drawer>
        </Hidden>
        {/* For Size Bigger than 600xp */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
              <h1>Drawer 2 vvhgugh</h1>
          </Drawer>
        </Hidden>
      </nav>
        </div>
    )
}
