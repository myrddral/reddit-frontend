import Avatar from './assets/avatar.png'
import InsertPicture from './assets/insert-image.png'
import InsertLink from './assets/insert-link.png'

const NewPost = () => {
    return ( 
        <>
        <div className="new-post">
            <img alt ="avatar" src={Avatar}  style={{ height: 46, width: "auto", paddingTop: 6 }}/>
            <input className="new-post-input" type="text" placeholder="Create Post"></input>
            <img alt="insert pic" src={InsertPicture} style={{ height: 22, marginTop: 15}}></img>
            <img alt="insert link" src={InsertLink} style={{ height: 22, marginTop: 15}}></img>
        </div>
        </>
     );
}
 
export default NewPost;