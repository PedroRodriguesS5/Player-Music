import './style.css';
import CubosLogo from '../../assets/logo.svg';
import ProfilePic from '../../assets/profile.jpg'

export default function header() {
    return (
        <header>

            <div className="logo">
                <img src={CubosLogo} alt="logo" />
            </div>
            <div className="profile-icon">
                <img src={ProfilePic} alt="" />
                <span>Bem Vindo, Marquinhos</span>
            </div>

        </header>
    )
}