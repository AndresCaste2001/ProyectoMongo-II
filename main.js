
import { connect } from "./helpers/db/connect.js";
import { peliculas } from "./js/modules/pelicula.js";
import { boletas } from "./js/modules/boleta.js";
import { tarjeta } from "./js/modules/tarjeta.js"
import { cliente } from "./js/modules/cliente.js"
import { funcion } from "./js/modules/funcion.js"

let ejemplo = new boletas()
   console.log(await ejemplo.comprarAsientos(2,"66a9f1e4bf588d10e961be61","66a9cf27bf588d10e961be5e","tarjeta","G"));