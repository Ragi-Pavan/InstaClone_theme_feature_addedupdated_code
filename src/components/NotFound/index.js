import './index.css'

import {withRouter} from 'react-router-dom'

import ContexForTheme from '../../Context/ContexForTheme'

const PageNotFound = props => {
  const clikedonhomepagebutton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <ContexForTheme.Consumer>
      {value => {
        const {isDark} = value
        const MainContent = isDark ? 'main-content-dark' : 'main-content'
        const Heddy = isDark ? 'headDark' : 'head'
        return (
          <div className={MainContent}>
            <div>
              <div className="image-content">
                <img
                  className="Not-found-image"
                  src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1698131758/kbjkm1vrtpn1czlrdpyp.jpg"
                  alt="page not found"
                />
              </div>
              <h1 className={Heddy}>Page Not Found</h1>
              <div>
                <p className="papa">
                  we are sorry, the page you requested could not be found.
                  <br />
                  Please go back to home page
                </p>
              </div>
              <div className="button-container">
                <button
                  className="h-button"
                  type="button"
                  onClick={clikedonhomepagebutton}
                >
                  Home Page
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </ContexForTheme.Consumer>
  )
}

export default withRouter(PageNotFound)
