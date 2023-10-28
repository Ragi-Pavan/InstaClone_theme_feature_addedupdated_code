import './index.css'

import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import {FcLike} from 'react-icons/fc'

import ContexForTheme from '../../Context/ContexForTheme'

class PostCard extends Component {
  state = {
    comment: '',
  }

  clikedOnLike = () => {
    const {postData, ClikedOnLikeOrUnlike} = this.props
    const {postId} = postData
    ClikedOnLikeOrUnlike(postId, true)
  }

  clikedOnUnLike = () => {
    const {postData, ClikedOnLikeOrUnlike} = this.props
    const {postId} = postData
    ClikedOnLikeOrUnlike(postId, false)
  }

  changeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {postData, clikedOnCommenttoHome} = this.props

    const {
      userId,
      profilePic,
      userName,
      imageUrl,
      likesCount,
      caption,
      comments,
      createdAt,
      postId,
      message,
      showCommentbox,
    } = postData

    const Islike = message === 'Post has been liked'

    const clikedOnComment = () => {
      clikedOnCommenttoHome(postId)
    }

    const clikedonAddComment = () => {
      const {addComment} = this.props
      const {comment} = this.state
      addComment(comment, postId)
    }

    return (
      <ContexForTheme.Consumer>
        {value => {
          const {isDark} = value
          const ListItem = isDark ? 'list-item-dark' : 'list-item'

          const IconColor = isDark ? 'iconzDark' : 'iconz'
          const userNameColor = isDark ? 'user-name-dark' : 'user-name'

          const LikesPara = isDark ? 'likes-para-dark' : 'likes-para'

          const discriptionPara = isDark ? 'discription-dark' : 'discription'

          const commnetsPara = isDark ? 'commnetsdark' : 'commnets'

          const SPAN = isDark ? 'spanldark' : 'spanl'

          return (
            <li key={userId} className={ListItem}>
              <div className="larger-one">
                <div className="profilePicContainer">
                  <img
                    src={profilePic}
                    alt="post author profile"
                    className="profilepic"
                  />
                  <Link to={`/users/${userId}`} className="link">
                    <p className={userNameColor}>{userName}</p>
                  </Link>
                </div>

                <div>
                  <img src={imageUrl} alt="post" className="Image" />
                </div>
                <div className="informaton">
                  <div className="icons-container">
                    {Islike ? (
                      <FcLike
                        testid="unLikeIcon"
                        className={IconColor}
                        onClick={this.clikedOnUnLike}
                      />
                    ) : (
                      <BsHeart
                        testid="likeIcon"
                        className={IconColor}
                        onClick={this.clikedOnLike}
                      />
                    )}
                    <FaRegComment
                      className={IconColor}
                      onClick={clikedOnComment}
                    />
                    <BiShareAlt className={IconColor} />
                  </div>
                  <div className="info">
                    <p className={LikesPara}>{likesCount} Likes</p>
                    <p className={discriptionPara}>{caption}</p>

                    {showCommentbox && (
                      <div className="comment-container">
                        <input
                          type="text"
                          className="input-for-comment"
                          onChange={this.changeComment}
                        />
                        <button
                          type="button"
                          className="button-for-comment"
                          onClick={clikedonAddComment}
                        >
                          Add comment
                        </button>
                      </div>
                    )}

                    <ul className="ul-for-comments">
                      {comments.map(each => (
                        <li key={each.user_id} className="list-for-comment">
                          <p className={commnetsPara}>
                            <span className={SPAN}>{each.user_name}</span>_
                            {each.comment}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <p className="time">{createdAt}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        }}
      </ContexForTheme.Consumer>
    )
  }
}

export default PostCard
