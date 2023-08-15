const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerAutogen = require("swagger-autogen");

const app = express();

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "API Teste",
			version: "1.0.0",
		},
	},
	apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// console.log(swaggerDocs);
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocs)
);

/**
 * @swagger
 * /music:
 *  get:
 *    description: Get all music
 *    responses:
 *      200:
 *        description: Success
 */
app.get("/music", (req, res) => {
	res.send([
		{
			id: 1,
			name: "Manoel Gomes",
			music: "Lá ele",
		},
	]);
});

/**
 * @swagger
 * /music:
 *  post:
 *    description: create new music
 *    responses:
 *      201:
 *        description: Success
 */
app.post("/music", (req, res) => {
	res.status(201).send();
});

app.listen(5000, () =>
	console.log("listening on 5000")
);
