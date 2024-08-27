/* eslint-disable react/prop-types */
import './Rank.css'

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="white f3">
                {`${name}, your current rank is...`}
            </div>
            <div className="f1 custom-num">
                {entries}
            </div>
        </div>
    );
}

export default Rank;