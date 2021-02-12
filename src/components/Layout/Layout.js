import React, { Component } from "react";
import Aux from "../../hoc/Auxx";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideDrawer: false,
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  // sideDrawerToggleHandler = () => {
  //   this.setState({ showSideDrawer: !this.state.showSideDrawer });
  // };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer};
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closedSideDrawer={this.sideDrawerClosedHandler}
        />
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
