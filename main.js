
import { connect } from "./helpers/db/connect.js";
import { peliculas } from "./js/modules/pelicula.js";
import { boletas } from "./js/modules/boleta.js";
let yuo = new boletas()

console.log(await yuo.verificarDisponibilidad());