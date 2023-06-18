import "./ShoppingBill.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart, useToast, useOrders } from "../../index"

function ShoppingBill()
{
    const navigate = useNavigate()
    const { userCart, dispatchUserCart } = useCart()
    const { showToast } = useToast()
    const { dispatchUserOrders }= useOrders()
    let totalDiscount = 0, totalBill = 0, finalBill = 0;
    const [ couponName, setCouponName ] = useState("")

    userCart.forEach(product=>{
        let discountOnCurrentProduct = ( (product.originalPrice - product.discountedPrice) * product.quantity )
        totalDiscount = totalDiscount + discountOnCurrentProduct
        totalBill = totalBill + ( product.discountedPrice * product.quantity )
    })

    if(couponName==="BOOKS200")
    {
        finalBill = totalBill - 200;
    }
    else
    {
        finalBill = totalBill;
    }

    async function displayRazorPay()
    {
               showToast("success","","Payment Successful! 😎")
                showToast("success","","Order added to your bag!")
    }

    return (
        <div className="cart-bill">
            <h2 className="bill-heading">Bill Details</h2>

            <hr></hr>
            {
                userCart.map(product=>{

                    return (
                        <div key={product._id} className="cart-price-container">
                            <div className="cart-item-bookname">
                                <p>{product.bookName}</p>
                            </div>
                            <div className="cart-item-quantity">
                                <p>X {product.quantity}</p>
                            </div>
                            <div className="cart-item-total-price" id="price-sum">
                                <p>&#8377;{product.discountedPrice * product.quantity}</p>
                            </div>
                        </div>
                    )
                })
            }
            
            <hr></hr>

            <div className="cart-discount-container">
                <div className="cart-item-total-discount">
                    <p>Discount</p>
                </div>
                <div className="cart-item-total-discount-amount" id="price-sum">
                    <p>&#8377; {totalDiscount}</p>
                </div>
            </div>

            <div className="cart-delivery-charges-container">
                <div className="cart-item-total-delivery-charges">
                    <p>Delivery Charges</p>
                </div>
                <div className="cart-item-total-delivery-charges-amount" id="price-sum">
                    <p id="delivery-charges">&#8377; 50</p>
                </div>
            </div>

            <hr></hr>

            <div className="cart-total-charges-container">
                <div className="cart-item-total-delivery-charges">
                    <p><b>Total Charges</b></p>
                </div>
                <div className="cart-item-total-delivery-charges-amount" id="price-sum">
                    <p id="total-charges"><b>&#8377; {finalBill}</b></p>
                </div>
            </div>

            <hr></hr>

            <div className="apply-coupon-container">
                <p>Apply Coupon</p>
                <input
                    value={couponName}
                    onChange={(event)=>setCouponName(event.target.value)}
                    placeholder="Try BOOKS200"
                ></input>
            </div>

            <button 
                className="place-order-btn solid-secondary-btn"
                onClick={displayRazorPay}
            >
                Place Order
            </button>
        </div>
    )
}

export { ShoppingBill }