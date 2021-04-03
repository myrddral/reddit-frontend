import SubredditAvatar from '../assets/subreddit_avatar.png'

const Title = () => {
    return ( 
        <>
        <div className="title-container">
            <img className="title-avatar" alt ="avatar" src={SubredditAvatar}  style={{ height: 90, width: "auto"}}/>
            <div className="title-text">
            <h2 className="title">/r/space: news, articles and discussion</h2>
            <p className="mini-title">r/space</p>
            </div>
        </div>
        </>
     );
}
 
export default Title;