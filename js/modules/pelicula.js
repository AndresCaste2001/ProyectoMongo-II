import { connect } from "../../helpers/db/connect.js";
import { ObjectId } from "mongodb";


export class Pelicula extends connect{

    constructor(){
        if (typeof Pelicula.instance === "object") {
            return Pelicula.instance;
        }
        super();
        this.collection = this.db.collection('pelicula');
        this.funcionP = this.db.collection('funcion');
        Pelicula.instance = this;
        return this;
    }


    async findBoletas() {
        let res = await this.collection.find({}).toArray();
        return res;
    }
}