import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';


function AdminScreen() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentUser')).data.isAdmin) {
            window.location.href = '/'
        }
    }, [])

    return (
        <div className='ml-3 mt-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}>Admin Panel</h2>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Rooms" key="3">
                    <AddRoom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminScreen

export const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("first")
                const { data } = await axios.get('http://localhost:5000/api/bookings/getallbookings')
                setBookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                setError(true)
            }
        }
        fetchData();
    }, [])

    return (
        <div className="row">
            <div className="col-md-12">
                {loading && (<Loader />)}
                <table className="table table-bordered table-dark">
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userId}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromDate}</td>
                                <td>{booking.toDate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("first")
                const { data } = await axios.get('http://localhost:5000/api/rooms/')
                setRooms(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                setError(true)
            }
        }
        fetchData();
    }, [])

    return (
        <div className="row">
            <div className="col-md-12">
                {loading && (<Loader />)}
                <table className="table table-bordered table-dark">
                    <thead className='bs'>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const AddRoom = () => {
    const [roomData, setRoomData] = useState({ name: '', rentperday: '', maxcount: '', description: '', phoneNumber: '', type: '', imageurl1: '', imageurl2: '', imageurl3: '' })
    const handleSubmit = (e) => {
        const { name, value } = e.target
        setRoomData({ ...roomData, [name]: value })
    }
    const addRoom = async()=> {
        const newRoom = {
            name: roomData.name,
            rentPerDay: roomData.rentperday,
            maxCount: roomData.maxcount,
            description: roomData.description,
            phoneNumber: roomData.phoneNumber,
            type: roomData.type,
            imageUrls: [{ imageurl1: roomData.imageurl1 }, { imageurl2: roomData.imageurl2 }, { imageurl3: roomData.imageurl3 }]
        }
        console.log(newRoom)
        try {
            const result = await axios.post('http://localhost:5000/api/rooms/addroom', newRoom)
            console.log(result)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="row">
            <div className="col-md-5">
                <input type="text"
                    name='name'
                    className='form-control'
                    placeholder='enter room name'
                    value={roomData.name}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <input type="number"
                    name="rentperday"
                    className='form-control'
                    placeholder='enter rent per day'
                    value={roomData.rentperday}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <input type="number"
                    name="maxcount"
                    className='form-control'
                    placeholder='enter maximum rooms'
                    value={roomData.maxcount}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <input type="text"
                    name="description"
                    className='form-control'
                    placeholder='enter description'
                    value={roomData.description}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <input type="number"
                    name="phoneNumber"
                    className='form-control'
                    placeholder='enter phonenumber'
                    value={roomData.phoneNumber}
                    onChange={(e) => { handleSubmit(e) }}
                />
            </div>
            <div className="col-md-5">
                <input type="text"
                    name="type"
                    className='form-control'
                    placeholder='enter type'
                    value={roomData.type}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <input type="text"
                    name="imageurl1"
                    className='form-control'
                    placeholder='enter image url'
                    value={roomData.imageurl1}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <input type="text"
                    name="imageurl2"
                    className='form-control'
                    placeholder='enter image url'
                    value={roomData.imageurl2}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <input type="text"
                    name="imageurl3"
                    className='form-control'
                    placeholder='enter image url'
                    value={roomData.imageurl3}
                    onChange={(e) => { handleSubmit(e) }}
                />
                <div className="text-right">
                    <button className="btn btn-primary mt-2" onClick={addRoom}>Add Room</button>
                </div>
            </div>

        </div>
    )
}



export const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("first")
                const { data } = await axios.get('http://localhost:5000/api/users/getallusers')
                setUsers(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                setError(true)
            }
        }
        fetchData();
    }, [])
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Users</h1>
                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "YES" : "NO"}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
