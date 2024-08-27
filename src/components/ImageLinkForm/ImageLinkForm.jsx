import './ImageLinkForm.css';

// eslint-disable-next-line react/prop-types
const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className="f4 white">
                {'This Magic Scanner will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" placeholder='Enter URL for image'
                    onChange={onInputChange}/>
                    <button 
                        className="f4 w-30 grow link ph3 pv2 custom-btn"
                        onClick={onSubmit}
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;