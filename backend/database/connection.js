const mongoose = require('mongoose');

const connection = async (url) => {
    try {
        
        await mongoose.connect(url);

        console.log("conexion exitosa");
    } catch(error) {
        console.log("no se ha podido conectar: ", error);
    }
} 

module.exports = connection;