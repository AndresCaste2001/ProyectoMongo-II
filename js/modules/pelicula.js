import { connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class peliculas extends connect {
    static instance
    constructor() {
        if (typeof peliculas.instance === "object"){
            return peliculas.instance
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection("pelicula");
        this.function = this.db.collection("funcion")
        peliculas.instance = this;
        return this;
    }

    /**
     * Obtiene todos los documentos de la colección.
     * 
     * @async
     * @returns {Promise<Array<Object>>} Una promesa que resuelve a un array de objetos que representan todos los documentos en la colección.
     */


    async getAllMatch() {
        let activities  = await this.collection.find({}).toArray()
        return activities
    }

    /**
     * Obtiene todas las películas que tienen funciones futuras programadas.
     * 
     * @async
     * @returns {Promise<string>} Una promesa que resuelve a una cadena JSON que representa las películas con funciones futuras, excluyendo ciertos campos específicos.
     */

    async getAllMovies(){
        let res = await this.function.aggregate(
            [
              {
                $lookup: {
                  from: "pelicula",
                  localField: "id_pelicula",
                  foreignField: "_id",
                  as: "pelicula_info"
                }
              },
              {
                $unwind: "$pelicula_info"
              },
              {
                $group: {
                  _id: "$id_pelicula",
                  fechaInicio: {
                    $first: "$fechaInicio"
                  },
                  fechaFin: {
                    $first: "$fechaFin"
                  },
                  nombrePelicula: {
                    $first: "$pelicula_info.nombre"
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  fechaInicio: 1,
                  fechaFin: 1,
                  nombrePelicula: 1
                }
              }
            ]
            ).toArray()
        return(JSON.stringify(res, null, 2))    
    }

    /**
     * Obtiene los detalles de una película específica por su ID.
     * 
     * @async
     * @param {string} idPelicula - El ID de la película que se desea obtener.
     * @returns {Promise<Object>} Una promesa que resuelve a un objeto que contiene los detalles de la película solicitada, excluyendo ciertos campos específicos.
     */


    async getOneMovie(idPelicula){

        const peliculaExiste = await this.collection.findOne({_id : new ObjectId(idPelicula)})
        if(!peliculaExiste){
            return { error : "La pelicula no existe"}
        }

        let res = await this.collection.aggregate([
            {
                $match: {
                _id: new ObjectId(idPelicula)
                }
            }
        ]).toArray()
        return res
    }
}