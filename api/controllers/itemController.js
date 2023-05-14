const services = require("../services/itemServices");

const getItems = async (req, res) => {
	try {
		const items = await services.getItems();
		res.status(200).json(items).end();
	} catch (err) {
		res.status(500).json(err).end();
	}
};

const getItemById = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			const item = await services.getItemById(id);
			res.status(200).json(item).end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Errro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		// 404 not found. significa que o servidor não encontrou um veículo com o id especificado
		res.status(404).json(`Erro: ${err}`).end();
	}
};

const createItem = async (req, res) => {
	try {
		const item = await services.createItem(req.body);
		// o código HTTP 201 inidica que um conteúdo foi criado com sucesso no servidor
		res.status(201).send(`Item added with item : ${item.name}`).end();
	} catch (err) {
		//422 Unprocessable Entity
		//O codigo de resposta HTTP 422 Unprocessable Entity indica que o servidor entende o tipo de
		//conteúdo da entidade da requisição, e a sintaxe da requisição esta correta,
		//mas não foi possível processar as instruções presentes.
		res.status(422).send(`cannot create item: ${err}`).end();
	}
};

const updateItem = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			req.body.id = id;
			const qtd = await services.updateItem(req.body);
			res
				.status(200)
				.json("Veículo atualizado com sucesso." + qtd)
				.end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Erro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		res.status(422).send(`cannot update item: ${err}`).end();
	}
};

const deleteItem = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			const reslut = await services.deleteItem(id);
			res.status(200).json("Veículo deletado com sucesso.").end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Errro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		res.status(422).send(`Cannot delete item: ${err}`).end();
	}
};

module.exports = {
	getItems,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
};
