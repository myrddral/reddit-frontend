import {useState} from 'react';
import upvote from './assets/upvote.png'
import downvote from './assets/downvote.png'

const Votes = () => {

    let [amount, setAmount] = useState(0);

    const handleClick = (modifier) => {
      setAmount(amount+modifier)
  }

    return ( 
      <>
      <img src={upvote} onClick={() => {handleClick(+1)}} alt="upvote-button" />
      <div className="counter">{amount}</div>
      <img src={downvote} onClick={() => {handleClick(-1)}} alt="downvote-button" />
      </>
    );
}
 
export default Votes;