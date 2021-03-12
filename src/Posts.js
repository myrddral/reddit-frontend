import Votes from './Votes.js';

const Posts = () => {
  return (
    <>
      <div className="post-container">
        <div className="vote-container">
            <Votes />
        </div>
        <div className="post-text">
          <small>Posted by u/user 3 hours ago</small>
          <h3>
            Astronomers find a nearby super-Earth whose first atmosphere was
            burned away by its host star. Then, thanks to volcanism, the planet
            created an entirely new atmosphere.
          </h3>
          <div className="post-actions">
            <small>123 Comments</small>
            <small>Award</small>
            <small>Share</small>
            <small>Save</small>
          </div>
        </div>
        <div className="post-image">
          <img
            className="post-image"
            alt="post-content"
            src="https://dummyimage.com/140x110.jpg/dddddd/000000"
          />
        </div>
      </div>
      <div className="post-container">
      <div className="vote-container">
            <Votes />
        </div>
        <div className="post-text">
          <small>Posted by u/user 4 hours ago</small>
          <h3>
            For the first time, scientists using HUBBLE have found evidence of
            volcanic activity reforming the atmosphere on a rocky planet around
            a distant star.
          </h3>
          <div className="post-actions">
            <small>43 Comments</small>
            <small>Award</small>
            <small>Share</small>
            <small>Save</small>
          </div>
        </div>
        <div className="post-image">
          <img
            className="post-image"
            alt="post-content"
            src="https://dummyimage.com/140x110.jpg/dddddd/000000"
          />
        </div>
      </div>
      <div className="post-container">
      <div className="vote-container">
            <Votes />
        </div>
        <div className="post-text">
          <small>Posted by u/user 6 hours ago</small>
          <h3>
            Giant gravitational wave detectors could hear murmurs from across
            universe. Researchers want a detector 10x more sensitive - that
            could spot all black hole mergers within the observable universe &
            peer back to the time before the first stars to search for black
            holes that formed in the big bang.
          </h3>
          <div className="post-actions">
            <small>230 Comments</small>
            <small>Award</small>
            <small>Share</small>
            <small>Save</small>
          </div>
        </div>
        <div className="post-image">
          <img
            className="post-image"
            alt="post-content"
            src="https://dummyimage.com/140x110.jpg/dddddd/000000"
          />
        </div>
      </div>
    </>
  );
};

export default Posts;
