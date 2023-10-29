import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import ContexForTheme from '../../Context/ContexForTheme'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    userData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const UpdatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }
      this.setState({
        userData: UpdatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderprofile = () => {
    const {userData} = this.state
    const {
      followersCount,
      followingCount,
      posts,
      postsCount,
      profilePic,
      stories,
      userBio,
      userId,
      userName,
    } = userData
    const lenghtofPosts = posts.length
    return (
      <ContexForTheme.Consumer>
        {value => {
          const {isDark} = value
          const MainProfile = isDark
            ? 'main-for-profile-user-dark'
            : 'main-for-profile-user'

          const Username = isDark ? 'nameforuser-dark' : 'nameforuser'

          const PostCount = isDark ? 'posts-count-dark' : 'posts-count'

          const POSTA = isDark ? 'posta-dark' : 'posta'

          const useridClass = isDark ? 'user-id-dark' : 'user-id'

          const UserIdBio = isDark ? 'user-bio-dark' : 'user-bio'

          const GRID = isDark ? 'griddark' : 'grid'

          const POSTPARA = isDark ? 'posts-para-dark' : 'posts-para'

          const NoPostIcon = isDark ? 'iconxdark' : 'iconx'

          const NoPIcon = isDark ? 'no-p-icon-dark' : 'no-p-icon'

          const NPY = isDark ? 'npydark' : 'npy'

          return (
            <div className={MainProfile}>
              <div className="container-for-overall">
                <div className="profle-container">
                  <h1 className={Username}>{userName}</h1>
                  <div className="profile-for-user-specific">
                    <img
                      className="profile-for-user"
                      src={profilePic}
                      alt="user profile"
                    />
                    <div className="posts-info-container">
                      <p className={PostCount}>{userData.postsCount}</p>
                      <p className={POSTA}>posts</p>
                    </div>
                    <div className="posts-info-container">
                      <p className={PostCount}>{followersCount}</p>
                      <p className={POSTA}>followers</p>
                    </div>
                    <div className="posts-info-container">
                      <p className={PostCount}>{followingCount}</p>
                      <p className={POSTA}>following</p>
                    </div>
                  </div>
                  <div>
                    <p className={useridClass}>{userId}</p>
                    <p className={UserIdBio}>{userBio}</p>
                  </div>
                </div>

                <div className="profile-container-for-lg">
                  <div>
                    <img
                      className="profile-for-user"
                      src={profilePic}
                      alt={userId}
                    />
                  </div>
                  <div className="clear-info-for-lg">
                    <h1 className={Username}>{userName}</h1>
                    <div className="ínfo-for-lg">
                      <div className="posts-info-container">
                        <p className={PostCount}>{postsCount}</p>
                        <h1 className={POSTA}>posts</h1>
                      </div>
                      <div className="posts-info-container">
                        <p className={PostCount}>{followersCount}</p>
                        <p className={POSTA}>followers</p>
                      </div>
                      <div className="posts-info-container">
                        <p className={PostCount}>{followingCount}</p>
                        <p className={POSTA}>following</p>
                      </div>
                    </div>

                    <div>
                      <p className={useridClass}>{userId}</p>
                      <p className={UserIdBio}>{userBio}</p>
                    </div>
                  </div>
                </div>

                <div className="stories-container">
                  <ul className="ul-for-story">
                    {stories.map(each => (
                      <li key={each.id} className="list-item-for-story">
                        <img
                          className="story-img"
                          src={each.image}
                          alt="user story"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="hori" />
                <div className="posts-container">
                  <div className="grids">
                    <BsGrid3X3 className={GRID} />
                    <h1 className={POSTPARA}>Posts</h1>
                  </div>
                  {lenghtofPosts === 0 ? (
                    <div className="no-posts-view-for-user">
                      <div className={NoPostIcon}>
                        <p className={NoPIcon}>
                          <BiCamera />
                        </p>
                      </div>
                      <h1 className={NPY}>No Posts</h1>
                    </div>
                  ) : (
                    <div>
                      <ul className="ul-for-post">
                        {posts.map(each => (
                          <li className="list-for-post" key={each.id}>
                            <img
                              className="image-for-post"
                              src={each.image}
                              alt="user post"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </ContexForTheme.Consumer>
    )
  }

  renderLoader = () => (
    <ContexForTheme.Consumer>
      {value => {
        const {isDark} = value
        const LoaderContainer = isDark
          ? 'loader-container-home-dark'
          : 'loader-container-home'

        return (
          <div className={LoaderContainer} data-testid="loader">
            <Loader
              type="TailSpin"
              color={isDark ? 'white' : '#4094EF'}
              height={50}
              width={50}
            />
          </div>
        )
      }}
    </ContexForTheme.Consumer>
  )

  renderFailureView = () => (
    <ContexForTheme.Consumer>
      {value => {
        const {isDark} = value
        const failureContainer = isDark
          ? 'failure-container-dark'
          : 'failure-container'

        const ErrorMsg = isDark ? 'err-msg-server-dark' : 'err-msg-server'
        return (
          <div className={failureContainer}>
            <div>
              <img
                className="eoorr-image"
                src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1698141049/rqosmibopf2zr2mpi374.jpg"
                alt="failure view"
              />
            </div>
            <p className={ErrorMsg}>Something went wrong. Please try again</p>
            <button
              type="button"
              className="retryButton"
              onClick={this.getUserProfileData}
            >
              Try Again
            </button>
          </div>
        )
      }}
    </ContexForTheme.Consumer>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderprofile()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-main-container">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default UserProfile
