
import { connect } from "./helpers/db/connect.js";

/***********************************Peliculas**********************************************/

 import {
    Pelicula

 } from "./js/modules/pelicula.js"
 
let cn = new Pelicula();

console.log(await cn.findBoletas())