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
  '': [
    { title: 'About', path: 'about' },
    { title: 'Contact', path: 'contact' },
  ],
  '/about': [
    { title: 'People', path: 'people' },
    { title: 'History', path: 'history' },
    { title: 'What', path: 'what' },
  ],
  '/contact': [
    { title: 'Places', path: 'places' },
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
      paths: [''],
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
    const currentPath = this.state.paths.join('/');

    return (
      <ul className={ 'menu-panel ' + props.className }>
        { props.menus.map((menu, index) => {
          const nextClass = !!menus[currentPath + '/' + menu.path] ? ' with-next' : '';

          return (
            <li className={ `menu-item ${nextClass}` } key={ index } onClick={ () => { this.onPath(menu.path) } }>{ menu.title }</li>
          );
        })}
      </ul>
    );
  }

  renderMenu() {
    let prevPath = this.state.paths.slice(0, this.state.paths.length - 1).join('/');
    let currentPath = this.state.paths.join('/');

    const currentMenus = menus[currentPath] || [];
    const parentMenus = menus[prevPath] || [];
    const parentMenuPath = prevPath.split('/').pop();
    const currentMenuPath = this.state.paths.slice(this.state.paths.length - 1)[0];
    const parentMenu = parentMenus.filter(menu => menu.path === currentMenuPath)[0] || {};
    const currentTitle = parentMenu && parentMenu.title || 'Menu';

    const visibleBack = this.state.paths.length > 1;
    const settings = {
      className: 'material-icons back',
    };
    
    if (visibleBack) {
      settings.onClick = this.onUp;
    } else {
      settings.className += ' placeholder-button';
      settings.onClick = () => {};
    }

    const backButton = <div { ...settings }>keyboard_arrow_left</div>;

    return (
      <div className="menu-container">
        <div className="menu-header">
          { backButton }
          <div className="title">
            <p className="menu-current">{ currentTitle }</p>
          </div>
          <div className="material-icons">close</div>
        </div>
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
