import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import loader from '../assets/images/boat_wave_loader.gif';

function LoaderComponent(props) {
    return props.loader ? <div className="loader-wrap">
        <img src={loader} />
    </div> : null
}
const mapStateToProps = ({ LoaderReducer }) => {
    return {
        loader: LoaderReducer.loader
    }

}
export default connect(mapStateToProps, null)(LoaderComponent)
