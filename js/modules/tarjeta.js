import { connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";

export class tarjeta extends connect {
    static instance
    constructor() {
        if (typeof tarjeta.instance === "object"){
            return tarjeta.instance
        }
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection("tarjeta");
        tarjeta.instance = this;
        return this;
    }
    async getAllMatch(){
        let tarj = await this.collection.find({}).toArray()
        return tarj
    }
    async getVIPUsers(){
        let vip = await this.collection.aggregate(
            [
                {
                  $match: {
                    status: "activo"
                  }
                },
                {
                  $lookup: {
                    from: "cliente",
                    localField: "id_cliente",
                    foreignField: "_id",
                    as: "cliente_info"
                  }
                },
                {
                  $unwind: "$cliente_info"
                },
                {
                  $project: {
                    _id: 0,
                    cliente: "$cliente_info"
                  }
                }
              ]
        ).toArray()
        return vip;
    }
}