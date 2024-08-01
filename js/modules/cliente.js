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

    async crearUsuarioMongo(nick, pwd, categoria){

        let rol = ""
        if(categoria === "VIP"){
            rol = "VIPuser"
        }
        if(categoria === "estandar"){ 
            rol = "insertOnlyBoletaRole"
        }
        if(categoria === "administrador"){
            rol = "adminRole"
        }

        pwd = pwd.toString()

        const newUser = await this.db.command({
            createUser: nick,
            pwd: pwd, 
            roles: [
                { role: rol, db: this.getDbName}
            ]
        })

        return {nick: nick,
                pwd: pwd}
    }
/*
    async cambiarRol(nickname, nuevoRol) {
        try {
            // Actualiza el rol del usuario basado en el nickname
            const resultado = await this.collection.updateOne(
                { "user": nickname }, // Filtro para encontrar al usuario por su nickname
                { $set: { rol: nuevoRol } } // Actualizar el campo 'rol'
            );

            if (resultado.matchedCount > 0) {
                console.log(`Rol del usuario con user "${nickname}" cambiado a ${nuevoRol}.`);
            } else {
                console.log(`Usuario con user "${nickname}" no encontrado.`);
            }
        } catch (error) {
            console.error('Error al cambiar el rol del usuario:', error);
        }
    }*/

    }
    
