import './index.css'

import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import ContexForTheme from '../../Context/ContexForTheme'

class LoginRoute extends Component {
  state = {
    showErrorMsg: false,
    showErrorMsgforUsername: false,
    username: '',
    password: '',
    ErroMsg: '',
  }

  changeUserName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onblurUsername = event => {
    if (event.target.value === '') {
      this.setState({
        showErrorMsgforUsername: true,
      })
    } else {
      this.setState({
        showErrorMsgforUsername: false,
      })
    }
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  submitFailure = msg => {
    this.setState({
      showErrorMsg: true,
      ErroMsg: msg,
    })
  }

  submitFrom = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userdetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {
      showErrorMsg,
      showErrorMsgforUsername,
      username,
      password,
      ErroMsg,
    } = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ContexForTheme.Consumer>
        {value => {
          const {isDark} = value
          const MaincontainerClassName = isDark
            ? 'mainContainerDark'
            : 'mainContainer'

          const darkformConatiner = isDark
            ? 'form-container-Dark'
            : 'form-container'

          const Labelname = isDark ? 'labelDark' : 'label'

          const iconHeading = isDark
            ? 'heading-for-icon-dark'
            : 'heading-for-icon'
          return (
            <div className={MaincontainerClassName}>
              <div className="Sub-Container">
                <div className="image-container">
                  <img
                    className="login_image"
                    src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1693834575/Illustration_lfahb5.png"
                    alt="website login"
                  />
                </div>
                <div className={darkformConatiner}>
                  <div className="icon-container">
                    <img
                      className="icon"
                      src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1697451367/logo_zyucph.jpg"
                      alt="website logo"
                    />
                    <h1 className={iconHeading}>Insta Share</h1>
                  </div>
                  <div className="form">
                    <form className="forms" onSubmit={this.submitFrom}>
                      <label htmlFor="USERNAME" className={Labelname}>
                        USERNAME
                      </label>
                      <input
                        type="text"
                        id="USERNAME"
                        className="input"
                        onChange={this.changeUserName}
                        onBlur={this.onblurUsername}
                        value={username}
                        placeholder="rahul"
                      />
                      {showErrorMsgforUsername && (
                        <p className="error_msg">* Required</p>
                      )}
                      <label htmlFor="PASSWORD" className={Labelname}>
                        PASSWORD
                      </label>
                      <input
                        type="password"
                        id="PASSWORD"
                        className="input"
                        onChange={this.changePassword}
                        value={password}
                        placeholder="rahul@2021"
                      />
                      {showErrorMsg && <p className="error_msg">{ErroMsg}</p>}
                      <button type="submit" className="login-button">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ContexForTheme.Consumer>
    )
  }
}

export default LoginRoute
