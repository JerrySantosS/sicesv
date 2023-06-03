const app = require("./config/express")();
const port = app.get("port");
const db = require("./config/sequelize");

// testing connection with database
(async () => {
	try {
		await db.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

// RODANDO NOSSA APLICAÇÃO
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
