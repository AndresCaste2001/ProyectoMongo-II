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

}