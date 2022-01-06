const http = require("http");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const _ = require("lodash");
const chalk = require("chalk");

let usuarios = [];
let cantidadRegistros = 0;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
    //Registro de nuevo usuario mediante endpoint /registrar:
    if (req.url.includes("registrar")) {
      axios.get("https://randomuser.me/api/").then((data) => {
        const { name } = data.data.results[0];
        const { first: nombre, last: apellido } = name;
        cantidadRegistros++;
        const id = uuidv4().slice(0, 6);
        const fechaYHora = moment().format("MMMM Do YYYY, h:mm:ss a");
        const nuevoUsuario = `${cantidadRegistros}. Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${fechaYHora}`;
        usuarios.push(nuevoUsuario);
        console.log(chalk.green.bgWhite(`Usuari@ ${nombre} ${apellido} registrad@ con éxito.`))
        res.end(`Usuari@ ${nombre} ${apellido} registrad@ con éxito.`);
      });
    }
    //Consulta de usuarios registrados mediante endpoint /consultar:
    if (req.url.includes("consultar")) {
      res.write("Usuarios registrados: <br>");
      if (usuarios === []) {
        res.write("No hay usuarios registrados");
      } else {
        console.log(chalk.blue.bgWhite("Usuarios registrados:"));
        _.forEach(usuarios, (u) => {
          res.write(u + "<br>");
          console.log(chalk.blue.bgWhite(u));
        });
      }
      res.end();
    }
  })
  .listen(8080, () => {
    console.log("Server ON");
  });
