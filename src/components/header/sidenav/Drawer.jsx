import { Hidden, Drawer } from "@material-ui/core";
import React from "react";
import SideNavList from "./SideNavList";

export default function DrawerComponent({
  classes,
  mobileOpen,
  handleDrawerToggle,
}) {
  return (
    <div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={() => {
              handleDrawerToggle(false);
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <SideNavList handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </Hidden>
        {/* For Size Bigger than 600xp */}
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <SideNavList handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
