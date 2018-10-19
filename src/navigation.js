import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import 'navigation.scss';

function SearchTrigger() {
  return (
    <div className="search-trigger">
      <span className="material-icons md-48">search</span>
    </div>
  );
}

function AccountMenu() {
  return (
    <div className="account-menu">
      Your Account
    </div>
  );
}

function LargeNav() {
  return (
    <div className="large-navigation">
      <NavLink className="menu-item" to="/"><span className="material-icons md-48">work</span></NavLink>
      <NavLink className="menu-item" to="/about">About</NavLink>
      <NavLink className="menu-item" to="/contact">Contact</NavLink>
      <div className="divider"></div>
      <SearchTrigger />
      <AccountMenu />
    </div>
  );
}

const menus = {
  '/': [
    { title: 'About', path: 'about/' },
    { title: 'Contact', path: 'contact/' },
  ],
  '/about': [
    { title: 'People', path: 'people' },
    { title: 'History', path: 'history' },
    { title: 'What', path: 'what' },
  ],
  '/contact': [
    { title: 'Places', path: 'places/' },
    { title: 'Offices', path: 'offices' },
    { title: 'Person', path: 'person' },
  ],
  '/contact/places': [
    { title: 'Chicago', path: 'chicago' },
    { title: 'New York', path: 'new-york' },
  ],
};

class SmallNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      paths: ['/'],
      title: '',
    };

    this.onToggle = this.onToggle.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
    this.onPath = this.onPath.bind(this);
    this.onUp = this.onUp.bind(this);
  }

  onToggle() {
    this.setState({ show: !this.state.show });
  }

  onPath(pathName) {
    this.setState({
      paths: [
        ...this.state.paths,

        pathName,
      ],
    });
  }

  onUp() {
    this.setState({
      paths: [
        ...this.state.paths.slice(0, this.state.paths.length - 1),
      ],
    });
  }

  renderPanel(props) {
    return (
      <ul className={ props.className }>
        { props.menus.map((menu, index) => <li key={ index } onClick={ () => { this.onPath(menu.path) } }>{ menu.title }</li>) }
      </ul>
    );
  }

  renderMenu() {
    let prevPath = this.state.paths.slice(0, this.state.paths.length - 1).join('');
    let currentPath = this.state.paths.join('');

    if (currentPath !== '/') {
      currentPath = currentPath.replace(/\/$/, '');
    }

    if (prevPath !== '/') {
      prevPath = prevPath.replace(/\/$/, '');
    }

    const prevMenus = menus[prevPath] || [];
    const currentMenus = menus[currentPath] || [];
    const nextMenus = [];
    const backButton = this.state.paths.length > 1 ? <div className="material-icons" onClick={ this.onUp }>keyboard_arrow_left</div> : null;
    let currentTitle = prevMenus.filter(menu => this.state.paths[this.state.paths.length - 1] === currentPath)[0];
    currentTitle = currentTitle && currentTitle.title || 'Menu';
    console.log(currentTitle);

    return (
      <div className="menu-container">
        <div className="menu-header">
          { backButton }
          <div className="title">
            <p className="menu-prev">{ this.state.prevTitle }</p>
            <p className="menu-current">{ currentTitle }</p>
            <p className="menu-next">{ this.state.nextTitle }</p>
          </div>
          <div className="material-icons">close</div>
        </div>
        <this.renderPanel className="menu-panel panel-prev" menus={ prevMenus || [] } />
        <this.renderPanel className="menu-panel panel-next" menus={ nextMenus || [] } />
        <this.renderPanel className="menu-panel panel-current" menus={ currentMenus || [] } />
      </div>
    );
  }

  render() {
    const menu = this.state.show ? <this.renderMenu /> : null;

    return (
      <Fragment>
        <div className="small-navigation">
          <NavLink className="menu-item" to="/"><span className="material-icons md-48">work</span></NavLink>
          <div className="divider"></div>
          <SearchTrigger />
          <div className="menu-item menu-accessor" onClick={ this.onToggle }><span className="material-icons md-48">menu</span></div>
        </div>
        { menu }
      </Fragment>
    );
  }
}

function Navigation(props) {
  return (
    <div className="navigation">
      <div className="d-none d-md-block d-lg-block d-xl-block">
        <LargeNav />
      </div>
      <div className="d-xs-block d-sm-block d-md-none">
        <SmallNav />
      </div>
    </div>
  );
}

export default Navigation;
