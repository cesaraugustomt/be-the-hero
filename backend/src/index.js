const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express();
app.use(cors()) //modulo de segurança
app.use(express.json())
app.use(routes)



app.listen(3333);




/*
* Rotas e recurso  /users
*/

/*
* Métodos HTTP:

GET: Buscar/listar uma informação no back-end
POST: Criar uma informação no back-end
PUT: Alterar uma informação no back-end
DELETE: Deletar uma informação no back-end
*/


/*
* Tipos de parâmentros
*
* Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
* Route Params: Parâmetros utilizados para indentificar recursos
* Request Body: Corpo da requisição, utilizado para 
*/

/*
SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
NoSQL: MongoDB, CouchDB, etc.
*/

/*
Driver: SELECT * FROM users
Query Builder: table('users').select('*').where()
*/
