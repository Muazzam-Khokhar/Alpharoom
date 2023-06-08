import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';


const ProfileScreen = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [user])

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>

                    <br />
                    <h1>Name : {user.data.name}</h1>
                    <h1>Email: {user.data.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? 'YES' : 'NO'}</h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default ProfileScreen



export const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const rooms = await axios.post('http://localhost:5000/api/bookings/getbookingbyuserid', { userId: user.data._id });
                const { data } = rooms
                setBookings(data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(true)
            }
        };

        fetchData();
    }, [user.data._id]);

    const cancelBooking = async (bookingId, roomId) => {
        try {
            setLoading(true)
            const result = await axios.post('http://localhost:5000/api/bookings/cancelbooking', { bookingId, roomId })
            console.log(result)
            setLoading(false)
            Swal.fire('Congrats', "Your booking has been cancelled", 'success').then(result => {
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            Swal.fire('Oopss...', "Something went wrong", 'error')
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>Booking Id : </b>{booking.bookingId}</p>
                            <p><b>Transaction Id : </b>{booking.transactionId}</p>
                            <p><b>Check In : </b>{booking.fromDate}</p>
                            <p><b>Check Out : </b>{booking.toDate}</p>
                            <p><b>Amount : </b>${booking.totalAmount}</p>
                            <p><b>Status : </b>{booking.status =='cancelled' ? (<Tag color='red'>CANCELLED</Tag>) : (<Tag color='green'>CONFIRM</Tag>)}</p>
                            {booking.status !== 'cancelled' && (
                                <div className='text-right'>
                                    <button className='btn  btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomId) }}>CANCEL BOOKING</button>
                                </div>

                            )}
                        </div>
                    }))}
                </div>
            </div>
        </>
    )
}
