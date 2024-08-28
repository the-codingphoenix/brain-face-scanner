/* eslint-disable react/prop-types */
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div>
            <p className="f4 white i">
                {'This Magic Scanner will detect faces in your pictures. Give it a try!'}
            </p>
            </div>
            <div className="white f3">
                <span className='i b'>{name}</span>{', the number of pictures you scanned ...'}
            </div>
            <div className="f1 custom-num b ma2">
                {entries}
            </div>
        </div>
    );
}

export default Rank;