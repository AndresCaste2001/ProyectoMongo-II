import { connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";


/**
 * Clase que representa las operaciones relacionadas con boletas.
 * @extends connect
 */
export class boletas extends connect {
    static instance
    /**
     * Crea una instancia de boletas.
     * Si ya existe una instancia, retorna esa instancia.
     * Configura la conexión a la base de datos y la colección "boletas".
     */
    constructor() {
        if (typeof boletas.instance === "object"){
            return boletas.instance
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection("boleta");
        boletas.instance = this;
        return this;
    }

    /**
   * Obtiene todas las boletas de la colección.
   * 
   * @async
   * @returns {Promise<Array>} Una promesa que resuelve a un array de todas las boletas.
   */

    async getAllMatch() {
        let activities  = await this.collection.find({}).toArray()
        return activities
    }


    /**
   * Agrega boletos para una función de película.
   * 
   */

    async comprarAsientos(asiento,obj1,obj2,metPago, fila){
      const ingresar = await this.collectioninsertOne(
        {
          "asiento": asiento,
          "id_funcion": ObjectId(obj1),
          "id_cliente": ObjectId(obj2),
          "metodoPago": metPago,
          "fila": fila
      }
      )
    }

    /**
   * Verificar Disponibilidad de Asientos.
   * 
   * @async
   * @param {string} idBoleto - El ID del boleto.
   * @returns {Promise<Object>} Una promesa que resuelve a un objeto que contiene el resultado de la operación o un error si la validación falla.
   */

    async validarReserva(idBoleto){
      const boletoExiste = await this.collection.findOne({_id : new ObjectId(idBoleto)})
        if(!boletoExiste){
            return { error : "El boleto no existe"}
      }
    }

    /**
   * Elimina una reserva de boleto.
   * 
   * @async
   * @param {string} idBoleto - El ID del boleto a eliminar.
   * @returns {Promise<Object>} Una promesa que resuelve a un objeto que contiene el resultado de la operación o un error si la eliminación falla.
   */

    async eliminarReserva(idBoleto){
      let res = await this.collection.deleteOne({
        _id : idBoleto
      })

      if(res.acknowledged === true){
        return {sucess: "La reserva se ha eliminado de forma correcta"}
      }
      
    }

/**
   * **API para Verificar Disponibilidad de Asientos:** Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
   * 
   * @async
   * @returns {Promise<Object>} Una promesa que resuelve a un objeto que contiene las sillas ocupadas por funcion.
   */

    async verificarDisponibilidad(){
        let res = await this.collection.aggregate(
            [
                {
                  "$group": {
                    "_id": "$id_funcion",
                    "asientos_y_filas": {
                      "$push": {
                        "asiento": "$asiento",
                        "fila": "$fila"
                      }
                    }
                  }
                }
              ]
        ).toArray();
        
        let resultados = await res;
        resultados.forEach(result => {
            console.log(`ID Función: ${result._id}`);
            result.asientos_y_filas.forEach(asientoFila => {
                console.log(`Asiento: ${asientoFila.asiento}, Fila: ${asientoFila.fila}`);
            });
            console.log(''); // Adds a blank line for better readability
        });

    
    }
    
}