import { connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class cliente extends connect {
    static instance
    constructor() {
        if (typeof cliente.instance === "object"){
            return cliente.instance
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection("cliente");
        cliente.instance = this;
        return this;
    }
    async getAllMatch() {
        let users  = await this.collection.find({}).toArray()
        return users
    }
    async listUsers() {
        let users  = await this.collection.aggregate(
            [
                {
                    "$project": {
                        "nombre": 1,
                        "tipoCategoria": 1,
                        "_id": 0
                    }
                }
            ]
        ).toArray()
        return users
    }
    async createUser(tipoCategoria,nombre,apellido,email,telefono) {
        let users  = await this.collection.insertOne(
            {
                "tipoCategoria": tipoCategoria,
                "nombre": nombre,
                "apellido": apellido,
                "email": email,
                "telefono": telefono
              }
        )
        return users
    }
    async detailsUser(Iduser){
        const user = await this.collection.findOne({_id : new ObjectId(Iduser)})
        return user;
    }
}