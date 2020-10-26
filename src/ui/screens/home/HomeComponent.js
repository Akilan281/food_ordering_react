import React, { useState, useEffect } from 'react'
import './styles/home.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import veg from "../../../assets/images/veg.png"
import non from "../../../assets/images/nonveg.png"
import { connect } from 'react-redux';
import { homeData, loaderAction } from '../../../redux/action/Action'
import { SCREENS } from '../../../common/Constant'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

function HomeComponent(props) {

    const [homeList, setHomeList] = useState([])
    const [dishes, setDishes] = useState([])
    const [cart, setCart] = useState(props.homestore)

    useEffect(() => {
        props.loaderAction(true)
        fetch('https://www.mocky.io/v2/5dfccffc310000efc8d2c1ad', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Applicatiom-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(response => response.json())
            .then((data) => {
                // console.log("data", data[0].table_menu_list)
                setHomeList(data)
                setDishes(data[0].table_menu_list)
                props.loaderAction(false)
            })


    }, [])

    function handleClick(productItem, index) {
        let item = Object.assign({}, productItem);
        let cartdetails = Object.assign([], cart);
        let cartIndex = cart.findIndex((cartItem) => {
            return (cartItem.dish_name === item.dish_name)
        })
        if (cartIndex != -1) {
            var qty = cartdetails[cartIndex].quantity
            cartdetails[cartIndex].quantity = qty + 1
        } else {
            item.quantity = 1
            cartdetails.push(item)
        }
        props.homedata(cartdetails)
        setCart(cartdetails)

    }

    function handleSubClick(productItem) {

        let item = Object.assign({}, productItem);
        let cartdetails = Object.assign([], cart);
        console.log("cartdetails", cartdetails)
        let cartIndex = cart.findIndex((cartItem) => {
            return (cartItem.dish_name === item.dish_name)
        })
        if (cartIndex != -1) {
            var qty = cartdetails[cartIndex].quantity
            cartdetails[cartIndex].quantity = qty - 1
            if (qty <= 1) {
                cartdetails.splice(cartIndex, 1)
                props.homedata(cartdetails)
                setCart(cartdetails)
            }
        } else {
            props.homedata(cartdetails)
            setCart(cartdetails)
        }
        console.log("cartdetails", cartdetails)
    }
    function handleCart() {
        props.history.push({
            pathname: SCREENS.CART,
            state: cart
        })
    }

    return (
        <div >
            <div className="container hotel-title">
                {homeList.map((item) => {
                    return (
                        <div>
                            <div >
                                <div >
                                    <h4 className="restaraunt-title">{item.restaurant_name}</h4>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="cart-icon" onClick={handleCart} >
                    <div className="inner-number">{cart.length}</div> <i className="fa fa-shopping-cart"></i>My orders
               </div>
            </div>
            <div className="container">
                <div className="dishes-title">
                    {console.log('dishes', dishes)}
                    {dishes.length > 0 ?
                        <Tabs defaultIndex={0} >
                            <TabList>
                                {dishes.map((dishesItem) => {
                                    return (
                                        <Tab>
                                            {dishesItem.menu_category}
                                        </Tab>
                                    )
                                })}
                            </TabList>
                            <div className="container">
                                {dishes.map((dishesItem) => {
                                    return (
                                        <TabPanel>
                                            {dishesItem.category_dishes.map((item, index) => {
                                                var findCartItem = cart.find(cartItem => item.dish_id == cartItem.dish_id);
                                                var qty = findCartItem ? findCartItem.quantity : 0;
                                                return (
                                                    <div className="dishes col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                                            <div className="buttons"><button href="#" className="btn  btn-sm" onClick={() => { handleSubClick(item, index) }} disabled={item.quantity < 1}>-</button>
                                                                <div className="buttons">{qty}</div>
                                                                <button href="#" className="btn  btn-sm" onClick={() => { handleClick(item, index,) }}>+</button></div>
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
                                        </TabPanel>
                                    );
                                })
                                }
                            </div>
                        </Tabs> : null}
                </div>
            </div>


        </div>
    )
}
const mapStateToProps = ({ HomeReducer }) => {
    console.log("HomeReducer", HomeReducer)
    return {
        homestore: HomeReducer.homelist
    }

}

//! Getting the reducers and dispatch the action values in to the redux!//
const mapDispatchToProps = (dispatch) => {
    return {
        homedata: (data) => (dispatch(homeData(data))),
        loaderAction: (data) => (dispatch(loaderAction(data)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

