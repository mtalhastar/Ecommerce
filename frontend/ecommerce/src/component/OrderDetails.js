import 'material-symbols';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'material-symbols'
import '../index.css'
import { useSelector,useDispatch } from 'react-redux';
import { incrementCount} from '../actions/action';
import { useState,useEffect,useContext } from 'react'

const OrderDetails = ({  order  }) => {

const dispatch = useDispatch()
const [status,orderStatus]=useState('')


const updateInfo = async(e) => {

         const application ={
            status:status
         }
         const token = JSON.parse(localStorage.getItem('token'))
         const update = await fetch('/delivery/UpdateDeliveryStatus/' + order._id, {
            method: 'PUT',
            body: JSON.stringify(application),
            headers: {
                'Content-Type': 'application/json'
                ,'token':token
            }
        })
        if(update.ok){
            dispatch(incrementCount())
        }
    }

 const handleOptionChange = (event) => {
     orderStatus(event.target.value);
 };

return (
        <div className="buyer-details">
            <h1>Order</h1>
            <p><strong>Buyer: </strong>{order.user.username}</p>
            {order.products.map((productz, index) => (
           <div key={index}>
            <p><strong>Product: </strong> {productz.product.name}</p>
            <p><strong>Quantity: </strong> {productz.quantity}</p>
           </div>
           ))}
            <p><strong>Status: </strong>{order.status}</p>
            <p><strong>Address: </strong>{order.address}</p>
            <p><strong>Amount: </strong>{order.amount}</p>
           <label className="label1">Change Status</label>
           <select className="dropdown1" onChange={handleOptionChange}>
            <option value="">Select Option</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
           </select>
        <button className='a' onClick={updateInfo} >Update</button>
        </div>
    )
}

export default OrderDetails