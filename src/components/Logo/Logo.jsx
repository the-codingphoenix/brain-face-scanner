import Tilt from 'react-parallax-tilt';
import logo from './logo.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2">
                <div className="Tilt-inner">
                    {/* <h1>React Parallax Tilt 👀</h1> */}
                    <img src={logo} alt="logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;