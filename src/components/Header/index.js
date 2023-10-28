import './index.css'
import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import {GiHamburgerMenu} from 'react-icons/gi'

import {IoCloseCircle} from 'react-icons/io5'

import {FaSearch} from 'react-icons/fa'

import ContextForTheme from '../../Context/ContexForTheme'

class Header extends Component {
  state = {
    showHumberMenu: false,
    showSearchBar: false,
    searchInput: '',
  }

  clikedOnHumberberg = () => {
    this.setState({
      showHumberMenu: true,
      showSearchBar: false,
    })
  }

  clikedOnCloseHumberberg = () => {
    this.setState({
      showHumberMenu: false,
    })
  }

  clickOnSearch = () => {
    const {showSearchBar} = this.state
    this.setState({showSearchBar: !showSearchBar, showHumberMenu: false})
  }

  changeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  clikedonSearchIcon = () => {
    const {searchedforResult} = this.props
    const {searchInput} = this.state
    searchedforResult(searchInput)
  }

  clikedonLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showHumberMenu, showSearchBar, searchInput} = this.state
    return (
      <ContextForTheme.Consumer>
        {value => {
          const {isDark} = value
          const HeadContainer = isDark
            ? 'heade-container-dark'
            : 'heade-container'
          const Heading = isDark ? 'headingDArk' : 'heading'
          const HumberGerMenu = isDark ? 'humber-button-Dark' : 'humber-button'
          const LinkColor = isDark ? 'link-Dark' : 'link'
          const ListForHeader = isDark
            ? 'list-for-header-Dark'
            : 'list-for-header'
          const Wrong = isDark ? 'wrong-button-Dark' : 'wrong-button'
          const ButtonColor = isDark ? 'buttunDark' : 'buttun'
          return (
            <div className={HeadContainer}>
              <div className="heder-for-small">
                <div className="header-for-small-devices">
                  <div className="icon-cont">
                    <Link to="/" className="link">
                      <img
                        className="icon-in-header"
                        src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1697451367/logo_zyucph.jpg"
                        alt="website logo"
                      />
                    </Link>

                    <h1 className={Heading}>Insta Share</h1>
                  </div>
                  <div className="humberber-container" data-testid="Humberger">
                    <p
                      className={HumberGerMenu}
                      onClick={this.clikedOnHumberberg}
                    >
                      <GiHamburgerMenu />
                    </p>
                  </div>
                </div>

                {showHumberMenu && (
                  <div className="humberger-menu">
                    <ul className="ul">
                      <Link to="/" className={LinkColor}>
                        <li
                          className={ListForHeader}
                          key="home"
                          onClick={this.clikedOnCloseHumberberg}
                        >
                          Home
                        </li>
                      </Link>
                      <Link to="/my-profile" className={LinkColor}>
                        <li
                          className={ListForHeader}
                          key="profile"
                          onClick={this.clikedOnCloseHumberberg}
                        >
                          Profile
                        </li>
                      </Link>
                      <li
                        className={ListForHeader}
                        onClick={this.clickOnSearch}
                        key="search"
                      >
                        Search
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="log-button"
                      onClick={this.clikedonLogout}
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      className={Wrong}
                      onClick={this.clikedOnCloseHumberberg}
                      data-testid="searchIcon"
                    >
                      <IoCloseCircle />
                    </button>
                  </div>
                )}
                {showSearchBar && (
                  <div className="search-Out">
                    <div
                      className="search-container-for-small"
                      data-id="search"
                    >
                      <input
                        type="search"
                        className="input-search"
                        placeholder="Search Caption"
                        onChange={this.changeSearchInput}
                        value={searchInput}
                      />
                      <p
                        className="search-icon"
                        onClick={this.clikedonSearchIcon}
                        data-testid="searchIcon"
                      >
                        <FaSearch />
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="larger-two">
                <div className="header-for-larger-devices">
                  <div className="larger-icon-container">
                    <Link to="/" className="link">
                      <img
                        className="icon-in-header"
                        src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1697451367/logo_zyucph.jpg"
                        alt="website logo"
                      />
                    </Link>
                    <h1 className={Heading}>Insta Share</h1>
                  </div>
                  <div className="Search-and-logout-container">
                    <div className="search-container">
                      <input
                        type="search"
                        className="input-search"
                        placeholder="Search Caption"
                        onChange={this.changeSearchInput}
                        value={searchInput}
                      />
                      <p
                        className="search-icon"
                        onClick={this.clikedonSearchIcon}
                        data-testid="searchIcon"
                      >
                        <FaSearch />
                      </p>
                    </div>
                    <Link to="/" className="link">
                      <button type="button" className={ButtonColor}>
                        Home
                      </button>
                    </Link>
                    <Link to="/my-profile" className="link">
                      <button type="button" className={ButtonColor}>
                        Profile
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="log-button"
                      onClick={this.clikedonLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ContextForTheme.Consumer>
    )
  }
}

export default withRouter(Header)
