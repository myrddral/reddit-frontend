import './profile.css'
import { useAuth } from './auth.js'

const Profile = () => {
    const { currentUser } = useAuth();
    return ( 
        <>
        <div className="profile-main">
            <strong>Email: </strong> {currentUser.email}
        </div>
        </>
     );
}
 
export default Profile;