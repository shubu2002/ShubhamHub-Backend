const mongoose = require("mongoose")


const URI = process.env.MONGODB_URI;


// mistake was with env file .. ( delete file and create new file )



// mongoose.connect(URI)

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successful to the database");
        
        
    } catch (error) {
        console.error("database connection failed");
        console.log(error);
        
        process.exit(0);
    }
}
module.exports = connectDb;