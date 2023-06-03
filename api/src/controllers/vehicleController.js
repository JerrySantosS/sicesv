const services = require("../services/vehicleServices");

const getAll = async (req, res) => {
	try {
		const vehicles = await services.getAll();
		res.status(200).json(vehicles).end();
	} catch (err) {
		res.status(500).json(err).end();
	}
};

const getInactive = async (req, res) => {
	try {
		const vehicles = await services.getInactive();
		res.status(200).json(vehicles).end();
	} catch (err) {
		res.status(500).json(err).end();
	}
};

const getById = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			const vehicle = await services.getById(id);
			res.status(200).json(vehicle).end();
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

const create = async (req, res) => {
	try {
		const vehicle = await services.create(req.body);
		// o código HTTP 201 inidica que um conteúdo foi criado com sucesso no servidor
		res
			.status(201)
			.send(`Vehicle added with vehicle paca: ${vehicle.paca}`)
			.end();
	} catch (err) {
		//422 Unprocessable Entity
		//O codigo de resposta HTTP 422 Unprocessable Entity indica que o servidor entende o tipo de
		//conteúdo da entidade da requisição, e a sintaxe da requisição esta correta,
		//mas não foi possível processar as instruções presentes.
		res.status(422).send(`cannot create vehicle: ${err}`).end();
	}
};

const update = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			req.body.id = id;
			const qtd = await services.update(req.body);
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
		res.status(422).send(`cannot update vehicle: ${err}`).end();
	}
};

const restore = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			const reslut = await services.restore(id);
			res.status(200).json("Veículo reativado com sucesso.").end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Errro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		res.status(422).send(`Cannot restore vehicle: ${err}`).end();
	}
};

const remove = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			const reslut = await services.remove(id);
			res.status(200).json("Veículo deletado com sucesso.").end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Errro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		res.status(422).send(`Cannot delete vehicle: ${err}`).end();
	}
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
	getInactive,
	restore,
};
