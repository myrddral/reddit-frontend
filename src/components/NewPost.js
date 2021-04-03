import Avatar from '../assets/avatar.png'
// import InsertPicture from './assets/insert-image.png'
// import InsertLink from './assets/insert-link.png'
import { Link } from "react-router-dom"

const NewPost = () => {
    return ( 
        <>
        <div className="new-post">
            <img alt ="avatar" src={Avatar}  style={{ height: 46, width: "auto", paddingTop: 6, marginRight: 10, marginLeft: 10 }}/>
            <Link to="/submit" style={{width: '100%'}}>
            <input className="new-post-input" type="text" placeholder="Create Post"></input>
            </Link>
            {/* <img alt="insert pic" src={InsertPicture} style={{ height: 22, marginTop: 15}}></img>
            <img alt="insert link" src={InsertLink} style={{ height: 22, marginTop: 15}}></img> */}
        </div>
        </>
     );
}
 
export default NewPost;