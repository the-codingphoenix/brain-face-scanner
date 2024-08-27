import './Navigation.css'

// eslint-disable-next-line react/prop-types
const Navigation = ({ onRouteChange, route }) => {
    if (route === 'home') {
        // Show "Sign Out" when signed in and on the home screen
        return (
            <nav className='nav'>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer white'>Sign Out</p>
            </nav>
        );
    } else {
        // Show "Sign Up" on Sign In screen and "Sign In" on Sign Up screen
        return (
            <nav className='nav'>
                {route === 'signin' ? (
                    <p onClick={() => onRouteChange('signup')} className='f3 link dim black underline pa3 pointer white'>Sign Up</p>
                ) : route === 'signup' ? (
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer white'>Sign In</p>
                ) : null}
            </nav>
        );
    }
}

export default Navigation;