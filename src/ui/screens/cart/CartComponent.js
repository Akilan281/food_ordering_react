import React, { useState, useEffect } from 'react'
import veg from "../../../assets/images/veg.png"
import non from "../../../assets/images/nonveg.png"
import './styles/cart.css'
import { connect } from 'react-redux';
import { homeData } from '../../../redux/action/Action'

function CartComponent(props) {


    const [cartInfo, setCartInfo] = useState(props.homestore)
    const [total, setTotal] = useState('0')
    useEffect(() => {
        console.log('cartifo uptaed')
        let dataupdate = cartInfo && cartInfo.reduce((accumulator, item) => {
            return accumulator + (item.quantity * item.dish_price)

        }, 0);
        setTotal(dataupdate)
    }, [cartInfo])

    function handleClick(item, index, type) {
        let cartdetails = Object.assign([], cartInfo);
        var qty = cartdetails[index].quantity
        if (type == "add") {
            cartdetails[index].quantity = qty + 1
            console.log("index", cartdetails)
            props.homedata(cartdetails)
            setCartInfo(cartdetails)
        } else {
            cartdetails[index].quantity = qty - 1
            if (qty <= 1) {
                cartdetails.splice(index, 1)
                props.homedata(cartdetails)
                setCartInfo(cartdetails)
            } else {
                props.homedata(cartdetails)
                setCartInfo(cartdetails)
            }
        }

    }


    { console.log("cartlis", props.homestore) }
    return (
        <div>
            {
                cartInfo.length > 0 ?
                    <div className="container cart-head">
                        {cartInfo.map((item, index) => {
                            return (
                                < div className="dishes col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                    <div className="dishes-body">
                                        <div className="dish-head">
                                            {
                                                item.dish_Type != 1 ?
                                                    <img className="icons" src={veg}></img> : <img className="icons" src={non}></img>
                                            }
                                            <h4 className="dishes-title">{item.dish_name}</h4>
                                        </div>
                                        <h6>{item.dish_currency} {item.dish_price}</h6>
                                        <p className="card-text">{item.dish_description}</p>
                                        <div className="buttons"><button href="#" className="btn  btn-sm" onClick={() => { handleClick(item, index) }}>-</button>
                                            <div className="buttons">{item.quantity}</div>
                                            <button href="#" className="btn  btn-sm" onClick={() => { handleClick(item, index, "add") }}>+</button> </div>
                                        <br />
                                        <div>Item Total: {item.dish_currency} {item.dish_price * item.quantity} </div>
                                        {
                                            item.addonCat.length > 0 ?
                                                <div>
                                                    <p className="custom">Customization available</p>
                                                </div> : null
                                        }
                                    </div>
                                    <img className="dish-img" src={item.dish_image} alt="Card image cap" />
                                </div>
                            )
                        })}



                    </div> : <div className="container cart-head"><h1 className="Cart-Text">Please Add Something in Your Cart</h1></div>
            }
            <div className="container cart-head">
                {
                    total >= 1 ?
                        <div>
                            <div className="fruits-card1">Total price: SAR {total}</div>

                        </div> : <div className="fruits-card1">
                            <h2 className="empty-text">Cart is empty</h2>
                            <button className="btn btn-success" onClick={()=>props.history.goBack()}>Back To Menu</button>
                            </div>
                }
            </div>

        </div >
    )
}

const mapStateToProps = ({ HomeReducer }) => {

    return {
        homestore: HomeReducer.homelist
    }

}

//! Getting the reducers and dispatch the action values in to the redux!//
const mapDispatchToProps = (dispatch) => {
    return {
        homedata: (data) => (dispatch(homeData(data))),
        //loaderAction: (data) => (dispatch(loaderAction(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent)


