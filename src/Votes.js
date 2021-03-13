import {useState} from 'react';
import upvoteArrow from './assets/upvote.png'
import upvotedArrow from './assets/upvoted.png'
import downvoteArrow from './assets/downvote.png'
import downvotedArrow from './assets/downvoted.png'

const Votes = (props) => {
    let [votecount, setVotecount] = useState(props.votecount);

    const handleClick = (modifier) => {
      setVotecount(votecount+modifier);
    }

    const voteCountFormatter = () => {
      if (votecount >= 1000) {
        return `${Math.round((votecount/1000)*10)/10}k`
      } else {
        return votecount;
      }
    }

    const drawUpvoteArrow = () => {
      if (props.vote === 1) {
        return upvotedArrow
      } else {
        return upvoteArrow
      }
    }
    const drawDownvoteArrow = () => {
      if (props.vote === -1) {
        return downvotedArrow
      } else {
        return downvoteArrow
      }
    }

    return ( 
      <>
      <img src={drawUpvoteArrow()} onClick={() => {handleClick(+1)}} alt="upvote-button" />
      <div className="counter">{voteCountFormatter()}</div>
      <img src={drawDownvoteArrow()} onClick={() => {handleClick(-1)}} alt="downvote-button" />
      </>
    );
}
 
export default Votes;