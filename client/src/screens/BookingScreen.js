import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';



const BookingScreen = () => {
  const [room, setRoom] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [totalAmount, setTotalAmount] = useState()

  const id = useParams();

  const toDate = moment(id.toDate);
  const fromDate = moment(id.fromDate);
  const totalDays = toDate.diff(fromDate, 'days') + 1;



  const getData = async () => {
    try {
      if(localStorage.getItem('currentUser')){
        window.location.reload='/login'
      }
      setLoading(true)
      let response = await axios.get(`http://localhost:5000/api/rooms/${id.roomId}`)
      response = await response.data;
      setTotalAmount(response.rentperday * totalDays);
      setRoom(response)
      setLoading(false)
    } catch (error) {
      setError(true)
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getData();
  }, [])
  
  
  const bookRoom = async () => {
    
  }
  
  const onToken = async(token) => {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem('currentUser')).data._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    }
    
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:5000/api/bookings/bookroom/', bookingDetails)
      setLoading(false)
      Swal.fire('Congratulations' , "Your Room Booked Successfully" , "success").then(result=> {
        window.location.href='/bookings'
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
      Swal.fire('Oopss...' , 'Something went wrong' , 'error')
    }
    
  }
  return (
    <>
      <div className='m-5'>
        <div>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />

          ) : (

            <div className='row justify-content-center mt-5 bs'>
              <div className="col-md-6">
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} className='bigimg' />
              </div>

              <div className="col-md-6" >
                <div style={{ textAlign: 'right' }}>
                  <h1>Booking Details</h1><hr />
                  <b>
                    <p>Name : {JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
                    <p>From Date : {id.fromDate}</p>
                    <p>To Date : {id.toDate}</p>
                    <p>Max Count : {room.maxcount}</p>
                  </b>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days : {totalDays}</p>
                  <p>Rent Per Day : ${room.rentperday}</p>
                  <p>Total Amount : ${totalAmount}</p>
                </div>

                <div style={{ float: 'right' }}>
                  <StripeCheckout
                    amount={totalAmount * 100}
                    currency='USD'
                    token={onToken}
                    stripeKey="pk_test_51NFv7oDOUReDh0bm5TyG8QRrtsiUE7pSmbDi9SZYnDovY89ugEl6Mm3Ol5VjPc8Th1e0qBwgcfEj0jQ0UsgR98UM00sb8B4uXC"
                  >
                  <button className="btn btn-primary">Pay Now</button>

                  </StripeCheckout>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookingScreen
