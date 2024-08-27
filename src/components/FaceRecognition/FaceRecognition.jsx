/* eslint-disable react/prop-types */
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl , displayImage, box }) => {
    return (
        <div className='center ma'>
          <div className='absolute mt2'>
            {displayImage && <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />}
            {displayImage && box.leftCol && (
              <div
                className='bounding-box'
                style={{
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol,
                }}
              ></div>
            )}
          </div>
        </div>
      );
}

export default FaceRecognition;