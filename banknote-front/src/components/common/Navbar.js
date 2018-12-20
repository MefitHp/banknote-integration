import React, { Component, Fragment } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  state = {
    current: 'home',
    loggedUser: null
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Fragment>
        <nav className="d-flex" style={{ justifyContent: 'space-between', outline: '2px solid #e8e8e8' }}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal">
            <Menu.Item key="home">
              <Link to="/"><Icon type="home" />Inicio</Link>
            </Menu.Item>
          </Menu>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style={{ display: 'flex' }}
          >
            <Menu.Item key="login">
              <Link to="/login"><Icon type="user" />Iniciar sesión</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/signup"><Icon type="form" />Registrarse</Link>
            </Menu.Item>
          </Menu>
        </nav>
      </Fragment>
    )
  }
}

export default Navbar