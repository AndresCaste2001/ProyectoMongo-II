
import { connect } from "./helpers/db/connect.js";
import { peliculas } from "./js/modules/pelicula.js";
import { boletas } from "./js/modules/boleta.js";
import { tarjeta } from "./js/modules/tarjeta.js"
import { cliente } from "./js/modules/cliente.js"
let yuo = new cliente()

console.log(await yuo.getAllMatch());