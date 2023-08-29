# SwaggerProject

## Project

# Configuração do Swagger no NodeJS

## 1. Instalar os pacotes

```
    yarn add swagger-autogen
    yarn add swagger-ui-express
```

## 2. Criar o config em config/swagger.js

```javascript
module.exports = {
	info: {
		version: "1.0.0",
		title: "Growdev API",
		description: "Documentação da API da growdev",
	},
	host: "localhost:3000",
	schemes: ["http", "https"],
	consumes: ["application/json"],
	produces: ["application/json"],
	securityDefinitions: {
		JWT: {
			description: "JWT token",
			type: "apiKey",
			in: "header",
			name: "Authorization",
		},
	},
	definitions: {},
};
```

## 2. Criar o arquivo src/swagger.js

```javascript
const swaggerAutogen =
	require("swagger-autogen")();
const doc = require("./config/swagger");

const outputFile =
	"./src/swagger_documentation.json";
const endpoints = ["./src/app/routes/estadio.js"];

swaggerAutogen(outputFile, endpoints, doc);
```

## 3. Criar o script para criação da documentação no package.json

```json
  "scripts": {
    "doc": "node src/swagger.js"
  }
```

## 4. Criar um arquivo nas rotas para a documentação

```javascript
import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "../../swagger_documentation.json";

const routes = new Router();

routes.use(
	"/docs",
	swaggerUI.serve,
	swaggerUI.setup(swaggerFile)
);

export default routes;
```

## 5. Adicionar a rota no app.js

```javascript
    routers() {
        this.server.use(DocsRoute);
    }
```

## 6. Acessar o site http://localhost:3000/doc

## 7. Criar na pasta documentation as informações de objetos

```javascript
exports.Estadio = {
	id: 1212,
	name: "Arena do Gremio",
	capacity: 55000,
	time_id: 12,
};

exports.EstadioUpdate = {
	name: "Arena do Gremio",
	capacity: 55000,
	time_id: 12,
};
```

## 8. Importar definições no arquivo de configurações swagger.js

```javascript
const {
	Estadio,
	EstadioUpdate,
} = require("../app/documentation/Estadio");

module.exports = {
	info: {
		version: "1.0.0",
		title: "Growdev API",
		description: "Documentação da API da growdev",
	},
	host: "localhost:3000",
	schemes: ["http", "https"],
	consumes: ["application/json"],
	produces: ["application/json"],
	securityDefinitions: {
		JWT: {
			description: "JWT token",
			type: "apiKey",
			in: "header",
			name: "Authorization",
		},
	},
	definitions: {
		Estadio,
		EstadioUpdate,
	},
};
```

## 9. Documentação de rotas

```javascript
routes.get(
	"/estadios/:id",
	EstadioController.show
	// #swagger.tags = ['Estadios']
	// #swagger.description = 'Obtem um estádio pelo ID'

	/* #swagger.parameters['id'] = {
      in:'path',
      description:'Id do estádio',
      required: true,
      type: 'integer'
    } */
	// #swagger.security = [{JWT: []}]
	/* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Estadio" } } 
    */
	/* #swagger.responses[404] = { 
       schema: { msg: "Estadio não encontrado." } 
    } */
);
```

## 10. Rodar comando para gerar a documentação automática

```bash
yarn doc
```
