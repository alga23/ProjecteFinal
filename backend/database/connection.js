const mongoose = require('mongoose');

const connection = async (url) => {

    try {
        
        await mongoose.connection(url);

        console.log("conexion exitosa");
    } catch(error) {
        console.log("no se ha podido conectar: ", error);
    }
} 

export default connection;