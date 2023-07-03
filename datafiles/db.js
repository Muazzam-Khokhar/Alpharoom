import mongoose from 'mongoose'
import color from 'colors'

var mongoURL = 'mongodb+srv://alpharooms:alpha123@cluster0.ojharly.mongodb.net/alpharooms';

const connectDB = async()=> {
    try {
        const conn = await mongoose.connect(mongoURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            
          
           // userCreateIndex: true,
        })
        mongoose.set("strictQuery", false);

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch(error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB




// import mongoose from "mongoose";

// // mongoose get 3 parameters 1) URL 2)safety parameters 3) safety parameters
//  mongoose.connect(mongoURL,  {useUnifiedTopology : true, useNewUrlParser: true})

// //  verify connection either is on or off
//  var connection = mongoose.connection
//  connection.on('error', ()=> {
//     console.log('Connection Field')
//  })

//  connection.on('connected', ()=> {
//     console.log('Mongo DB Connected Successful')
//  })

//  export default mongoose