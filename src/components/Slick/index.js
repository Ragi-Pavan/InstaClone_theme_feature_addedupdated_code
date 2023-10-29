import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import './index.css'

import ContexForTheme from '../../Context/ContexForTheme'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {
    storiesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStoriesData()
  }

  getStoriesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/stories`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(each => ({
        storyUrl: each.story_url,
        userId: each.user_id,
        userName: each.user_name,
      }))
      this.setState({
        storiesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSlider = () => {
    const {storiesList} = this.state
    return (
      <ContexForTheme.Consumer>
        {value => {
          const {isDark} = value
          const Name = isDark ? 'nameDark' : 'name'
          return (
            <Slider {...settings}>
              {storiesList.map(eachLogo => {
                const {userId, storyUrl, userName} = eachLogo
                return (
                  <div className="slider_item" key={userId}>
                    <div className="slick-item">
                      <div>
                        <img
                          className="logo-image"
                          src={storyUrl}
                          alt="user story"
                        />
                      </div>
                      <p className={Name}>{userName}</p>
                    </div>
                  </div>
                )
              })}
            </Slider>
          )
        }}
      </ContexForTheme.Consumer>
    )
  }

  renderLoadingViewfoSlider = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <div>
        <img
          className="eoorr-image"
          src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1698141049/rqosmibopf2zr2mpi374.jpg"
          alt="failure view"
        />
      </div>
      <p className="err-msg-server">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retryButton"
        onClick={this.getStoriesData}
      >
        Try again
      </button>
    </div>
  )

  renderViewBasedonApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSlider()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingViewfoSlider()
      default:
        return null
    }
  }

  render() {
    return (
      <ContexForTheme.Consumer>
        {value => {
          const {isDark} = value
          const ConatinerMain = isDark
            ? 'main-container-Dark'
            : 'main-container'
          return (
            <div>
              <div className={ConatinerMain}>
                <div className="slick-container">
                  {this.renderViewBasedonApi()}
                </div>
              </div>
              {!isDark && <hr className="hr" />}
            </div>
          )
        }}
      </ContexForTheme.Consumer>
    )
  }
}

export default ReactSlick
