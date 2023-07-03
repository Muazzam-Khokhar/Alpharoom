import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment'


const HomeScreen = () => {
  const [data, setData] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const { RangePicker } = DatePicker;
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [duplicateRoom, setDuplicateRoom] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [type, setType] = useState('all')



  const getData = async () => {
    try {
      setLoading(true)
      let response = await axios.get('http://localhost:5000/api/rooms')
      response = await response.data;
      setRooms(response)
      setDuplicateRoom(response)
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

  const filterByDate = (dates)=> {

    
      setFromDate(moment(dates[0].$d).format('MM-DD-YYYY'))
      setToDate(moment(dates[1].$d).format('MM-DD-YYYY'))

      var tempRooms = [];
      var avaibility = false;

      for(const room of duplicateRoom){
        
        if (room.currentBookings.length>0){

          for(const booking of room.currentBookings){
            if(!moment(moment(dates[0].$d).format('MM-DD-YYYY')).isBetween(booking.fromDate, booking.toDate)
            && !moment(moment(dates[1].$d).format('MM-DD-YYYY')).isBetween(booking.fromDate, booking.toDate)
            ){
              if(
                moment(dates[0].$d).format('MM-DD-YYYY') !== booking.fromDate &&
                moment(dates[0].$d).format('MM-DD-YYYY') !== booking.toDate &&
                moment(dates[1].$d).format('MM-DD-YYYY') !== booking.fromDate &&
                moment(dates[1].$d).format('MM-DD-YYYY') !== booking.toDate
              ){
                avaibility=true
              }
            }
          }
        }
        console.log(room)
        if(avaibility == true || room.currentBookings.length==0) {
          tempRooms.push(room)
        }
        setRooms(tempRooms);
      }
  }
  const filterBySearch = () => {
    const tempRooms = duplicateRoom.filter(room=> room.name.toLowerCase().includes(searchKey.toLowerCase()))

    setRooms(tempRooms)
  }
  
  const filterByType = (e) => {
    setType(e)
    console.log(e)
    if (e!=='all') {
      const tempRooms = duplicateRoom.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setRooms(tempRooms)
    } else {
      setRooms(duplicateRoom)
    }
  }


  return (
    <div className='container'>

      <div className="row mt-5 bs">
        <div className="col-md-3">
        <RangePicker format='MM-DD-YYYY' onChange={(dates) => filterByDate(dates)}/>
        </div>
        <div className="col-md-5">
          <input 
              type="text" 
              className='form-control' 
              placeholder='Search rooms'
              value={searchKey} 
              onChange={(e)=> {setSearchKey(e.target.value)}}  
              onKeyUp={filterBySearch} 
            />
        </div>

        <div className="col-md-3">
        <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">All</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
          ) : (
          rooms.map((room) => {
            return <div className="col-md-9 mt-2">
              <Room room={room} fromDate={fromDate} toDate={toDate}/>
            </div>
          })
        )}
      </div>
    </div>
  )
}

export default HomeScreen
















    //Access date 
    // const start = moment(dates[0]).format('MM-DD-YYYY')
    // const end = moment(dates[1]).format('MM-DD-YYYY')
    // console.log(start);
    // console.log(end);

    //Access date 
    // if (dates && dates.length > 0) {
    //   const start = moment(dates[0]).format('MM/DD/YYYY');
    //   const end = moment(dates[1]).format('MM/DD/YYYY');
    //   console.log(start);
    //   console.log(end);
    // }
    //Access date 
    // if (dates && dates.length > 0) {
    //   const start = moment(dates[0]).format('MM/DD/YYYY');
    //   const end = moment(dates[1]).format('MM/DD/YYYY');
    //   console.log(start);
    //   console.log(end);
    // }