import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

function OrderHistory(props) {
    const orderMinelist = useSelector(state => state.orderMineList)
    const {loading, error, orders} = orderMinelist;

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listOrderMine());
    },[dispatch])

  return (
    <div>
      <h1>Order History</h1>
      {loading? <LoadingBox></LoadingBox>: error? <MessageBox variant="danger">{error}</MessageBox>: (
          <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order)=> (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid? order.paidAt.substring(0,10): 'No'}</td>
                        <td>{order.isDelivered? order.deliveredAt.substring(0,10): 'No'}</td>
                        <td>
                            <button type="button" className="small" onClick={()=>{
                                props.history.push(`/order/${order._id}`);
                            }}>Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
      )}
    </div>
  )
}

export default OrderHistory
