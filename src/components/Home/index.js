import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import ReactSlick from '../Slick'

import PostCard from '../PostCard'

import ContexForTheme from '../../Context/ContexForTheme'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    postsData: [],
    apiStatus: apiStatusConstants.initial,
    showHeaingforSearchResult: false,
    showSlick: true,
  }

  componentDidMount() {
    this.getpostsData()
  }

  initaiatePostLike = async (id, status) => {
    const jwtToken = Cookies.get('jwt_token')
    const likedstaus = {
      like_status: status,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(likedstaus),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const response = await fetch(url, options)
    const data = await response.json()
    const {postsData} = this.state
    let userPostsData = postsData
    userPostsData = userPostsData.map(eachObject => {
      if (eachObject.postId === id && status) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount + 1,
        }
      }
      if (eachObject.postId === id && !status) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount - 1,
        }
      }

      return eachObject
    })

    this.setState({
      postsData: userPostsData,
    })
  }

  getpostsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.posts.map(each => ({
        userName: each.user_name,
        userId: each.user_id,
        profilePic: each.profile_pic,
        postId: each.post_id,
        caption: each.post_details.caption,
        imageUrl: each.post_details.image_url,
        createdAt: each.created_at,
        likesCount: each.likes_count,
        comments: each.comments,
        showCommentbox: false,
      }))
      this.setState({
        postsData: updatedData,
        apiStatus: apiStatusConstants.success,
        showHeaingforSearchResult: false,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        showHeaingforSearchResult: false,
      })
    }
  }

  updateCommentShoworhide = id => {
    const {postsData} = this.state
    const value = postsData.find(each => each.postId === id)
    const newUpdateData = postsData.map(each => {
      if (each.postId === id) {
        return {
          ...each,
          showCommentbox: !value.showCommentbox,
        }
      }
      return each
    })
    this.setState({postsData: newUpdateData})
  }

  commentAdded = (com, id) => {
    const {postsData} = this.state
    const value = postsData.find(each => each.postId === id)
    const newComment = {
      comment: com,
      user_id: value.comments.length + 1,
      user_name: 'Rahul',
    }

    const NewUpdateData = postsData.map(each => {
      if (each.postId === id) {
        return {
          ...each,
          comments: [...value.comments, newComment],
          showCommentbox: false,
        }
      }
      return each
    })

    this.setState({postsData: NewUpdateData})
  }

  renderPostsView = () => {
    const {postsData, showHeaingforSearchResult, showSlick} = this.state

    if (postsData.length >= 1) {
      return (
        <ContexForTheme.Consumer>
          {value => {
            const {isDark} = value
            const UlForPost = isDark ? 'ul-for-posts-Dark' : 'ul-for-posts'
            return (
              <div>
                {showSlick && <ReactSlick />}
                {showHeaingforSearchResult && (
                  <h1 className="heading-for-search">Search Results</h1>
                )}
                <ul className={UlForPost}>
                  {postsData.map(each => (
                    <PostCard
                      postData={each}
                      key={each.postId}
                      ClikedOnLikeOrUnlike={this.initaiatePostLike}
                      clikedOnCommenttoHome={this.updateCommentShoworhide}
                      addComment={this.commentAdded}
                    />
                  ))}
                </ul>
              </div>
            )
          }}
        </ContexForTheme.Consumer>
      )
    }
    return this.searchNotFoundView()
  }

  searchNotFoundView = () => (
    <div className="search-not-found">
      <h1 className="heading-for-search">Search Results</h1>
      <div>
        <img
          className="no-search-image"
          src="https://res.cloudinary.com/dytgpb4j5/image/upload/v1698138001/ja8hdtuomztjfuyqxmgw.jpg"
          alt="search not found"
        />
        <div>
          <h1 className="heeed">Search Not Found</h1>
          <p className="papi">Try different keyword or search again</p>
        </div>
      </div>
    </div>
  )

  renderLoadingView = () => {
    const {isDark} = this.state
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
  }

  updateSearchResult = async value => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${value}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (value !== '') {
      this.setState({showHeaingforSearchResult: true, showSlick: false})
    } else {
      this.setState({showHeaingforSearchResult: false, showSlick: true})
    }
    if (response.ok === true) {
      const data = await response.json()
      const NewData = data.posts.map(each => ({
        userName: each.user_name,
        userId: each.user_id,
        profilePic: each.profile_pic,
        postId: each.post_id,
        caption: each.post_details.caption,
        imageUrl: each.post_details.image_url,
        createdAt: each.created_at,
        likesCount: each.likes_count,
        comments: each.comments,
      }))
      this.setState({
        postsData: NewData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        showHeaingforSearchResult: false,
      })
    }
  }

  clickedonretry = () => {
    this.getpostsData()
    this.updateSearchResult()
  }

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
        onClick={this.clickedonretry}
      >
        Try Again
      </button>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPostsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-main-container">
        <Header searchedforResult={this.updateSearchResult} />
        {this.renderView()}
      </div>
    )
  }
}

export default Home
