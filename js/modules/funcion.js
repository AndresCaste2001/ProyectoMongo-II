import { connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class funcion extends connect {
    static instance
    constructor() {
        if (typeof peliculas.instance === "object"){
            return peliculas.instance
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection("funcion");
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
}