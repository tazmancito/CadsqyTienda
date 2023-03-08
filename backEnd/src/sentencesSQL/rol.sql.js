const cdb = require("../config/conexion");

const getRolById = async (rolId) => {
    try {
        let sentence = "SELECT * FROM `Roles` WHERE `RolId` = " + rolId + ";";
        let result = await cdb.query(sentence);
        if(result.length == 0){
            return null;
        }
        return result[0];
    } catch (error) {
        console.log(error);
        return
    }

};

const getRolIdByName = async (rolName) =>{
    try {
        let sentence = "SELECT * FROM `Roles` WHERE `Nombre` = '" + rolName + "';";
        let result = await cdb.query(sentence);
        if(result.length == 0){
            return null;
        }
        return result[0]; 
        
    } catch (error) {
        console.log(error);
        return
    }

    
}

module.exports = { getRolById, getRolIdByName };
