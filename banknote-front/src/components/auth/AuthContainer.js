import React, { Component } from 'react'
import LoginDisplay from './LoginDisplay';
import SignupDisplay from './SignupDisplay';
import squareLogo from '../../assets/rectangled_logo.png'
import { loginUser, signupUser } from '../../API/Auth';
import { notification, message } from 'antd'

class AuthContainer extends Component {
  state = {
    user: {},
    isAuth: false
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return this.setState({ user: {}, isAuth: false });
    this.props.history.push('/dashboard')
  }

  onLogin = (e) => {
    e.preventDefault()
    const { user } = this.state
    loginUser(user)
      .then(r => {
        if (r.status !== 200) {
          notification['error']({
            message: '¡Algo salió mal!',
            description: r.data.message,
          })
        } else {
          localStorage.setItem('user', JSON.stringify(r.data))
          message.success('¡Bienvenido! Iniciaste sesión correctamente')
          this.props.history.push('/dashboard')
        }
      }).catch(err => {
        message.error(`¡Algo salió mál! ${err}`)
      })
  }

  onRegister = (e) => {
    e.preventDefault()
    const { user } = this.state
    signupUser(user)
      .then(r => {
        if (r.status !== 200) {
          return message.error(r.data.message)
        } else {
          message.success('Usuario registrado, ahora puedes iniciar sesión. 🤙🏽')
          user.password = ''
          this.setState({ user })
          return this.props.history.push('/login')
        }
      })
  }
  handleInput = (e) => {
    const { user } = this.state
    user[e.target.name] = e.target.value
    this.setState({ user })
  }

  render() {
    const { pathname } = this.props.location
    const { user } = this.state
    const { handleInput, onLogin, onRegister } = this
    return (
      <div className="d-flex fw jcc aic vh90">
        {
          pathname === '/login' ?
            <LoginDisplay squareLogo={squareLogo} handleInput={handleInput} onLogin={onLogin} {...user} />
            :
            <SignupDisplay squareLogo={squareLogo} handleInput={handleInput} onRegister={onRegister} {...user} />
        }
      </div>
    )
  }
}

export default AuthContainer