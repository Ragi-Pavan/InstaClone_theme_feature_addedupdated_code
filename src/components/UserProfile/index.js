import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

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
      <div className="main-for-profile-user">
        <div className="container-for-overall">
          <div className="profle-container">
            <h1 className="nameforuser">{userName}</h1>
            <div className="profile-for-user-specific">
              <img
                className="profile-for-user"
                src={profilePic}
                alt="user profile"
              />
              <div className="posts-info-container">
                <p className="posts-count">{userData.postsCount}</p>
                <p className="posta">posts</p>
              </div>
              <div className="posts-info-container">
                <p className="posts-count">{followersCount}</p>
                <p className="posta">followers</p>
              </div>
              <div className="posts-info-container">
                <p className="posts-count">{followingCount}</p>
                <p className="posta">following</p>
              </div>
            </div>
            <div>
              <p className="user-id">{userId}</p>
              <p className="user-bio">{userBio}</p>
            </div>
          </div>

          <div className="profile-container-for-lg">
            <div>
              <img className="profile-for-user" src={profilePic} alt={userId} />
            </div>
            <div className="clear-info-for-lg">
              <h1 className="nameforuser">{userName}</h1>
              <div className="ínfo-for-lg">
                <div className="posts-info-container">
                  <p className="posts-count">{postsCount}</p>
                  <h1 className="posta">posts</h1>
                </div>
                <div className="posts-info-container">
                  <p className="posts-count">{followersCount}</p>
                  <p className="posta">followers</p>
                </div>
                <div className="posts-info-container">
                  <p className="posts-count">{followingCount}</p>
                  <p className="posta">following</p>
                </div>
              </div>

              <div>
                <p className="user-id">{userId}</p>
                <p className="user-bio">{userBio}</p>
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
              <BsGrid3X3 className="grid" />
              <h1 className="posts-para">Posts</h1>
            </div>

            {lenghtofPosts === 0 ? (
              <div className="no-posts-view">
                <div className="iconx">
                  <p className="no-p-icon">
                    <BiCamera />
                  </p>
                </div>
                <h1 className="npy">No Posts</h1>
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
  }

  renderLoader = () => (
    <div className="loader-container-home" data-testid="loader">
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
        onClick={this.getUserProfileData()}
      >
        Try Again
      </button>
    </div>
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
