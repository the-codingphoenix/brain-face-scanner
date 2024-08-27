import { useCallback, useState } from "react";
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'      
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/Signup/SignUp";

const initialState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: ''
};


function App() {
  const [user, setUser] = useState(initialState);
  const [imageUrl, setImageUrl] = useState("");
  const [displayImage, setDisplayImage] = useState(false);
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  };

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // load the slim version of tsparticles
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.3 },
      },
    },
    particles: {
      color: { value: "#db2a4d" },
      links: { color: "#a91d3a", distance: 130, enable: true, opacity: 0.4, width: 1 },
      collisions: { enable: true },
      move: { direction: "none", enable: true, outMode: "out", random: false, speed: 2, straight: true },
      number: { density: { enable: true, value_area: 800 }, value: 200 },
      opacity: { value: 0.4 },
      shape: { type: "circle" },
      size: { random: true, value: 5 },
    },
    detectRetina: true,
  };

  const calculateFaceLocation = (data) => {
    if (data.outputs && data.outputs.length > 0 && data.outputs[0].data.regions && data.outputs[0].data.regions.length > 0) {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      if (image) {
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height),
        };
      }
    }
    return {}; // Return an empty object if the data is not in the expected format
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
    setDisplayImage(false);
  }

  const onSubmit = () => {
    setDisplayImage(true);
  
    fetch('http://localhost:3000/imageurl', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          imageUrl: imageUrl
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.outputs && result.outputs.length > 0 && result.outputs[0].data.regions){
        const faceData = calculateFaceLocation(result);
        displayFaceBox(faceData);

        //update user entries on the server
        fetch('http://localhost:3000/image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          // Update the user's entries in the state
          setUser(prevUser => ({ ...prevUser, entries: count }));
        })
        .catch(error => console.log('Error updating entries:', error));
      } else {
        console.log('No regions found in result');
      }
    })
    .catch(error => console.log('Error with Clarifai API:', error));
  };
  
  

  const handleRouteChange = (route) => {
  if (route === 'signout') {
    setUser(initialState); // Reset user state when signing out
    setImageUrl(""); // Clear image URL
    setBox({}); // Clear face detection box
    setDisplayImage(false); // Hide image
    setRoute('signin');   // Redirect to signin page
  } else {
    setRoute(route);      // Set route for other pages
  }
};

  return (
    <>
      <Particles className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <Navigation onRouteChange={handleRouteChange} route={route} />
      {
        route === 'home' ? (
          <><div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
            <FaceRecognition imageUrl={imageUrl} displayImage={displayImage} box={box} />
          </div>
          </>  // Pass setRoute as onRouteChange prop
        )
        : route === 'signin' ? (
          <SignIn loadUser={loadUser} onRouteChange={handleRouteChange} />
        )  // Pass setRoute as onRouteChange prop
          : (<SignUp loadUser={loadUser} onRouteChange={handleRouteChange} />  // Pass setRoute as onRouteChange prop
        ) 
      }
    </>
  )
}

export default App
