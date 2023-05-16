const services = require("../services/inspectionServices");

const getInspections = async (req, res) => {
	try {
		const inspections = await services.getInspections();
		res.status(200).json(inspections).end();
	} catch (err) {
		res.status(500).json(err).end();
	}
};

const getInspectionById = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			const inspection = await services.getInspectionById(id);
			res.status(200).json(inspection).end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Errro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		// 404 not found. significa que o servidor não encontrou um usuário com o id especificado
		res.status(404).json(`Erro: ${err}`).end();
	}
};

const createInspection = async (req, res) => {
	try {
		const inspection = await services.createInspection(req.body);
		// o código HTTP 201 inidica que um conteúdo foi criado com sucesso no servidor
		res.status(201).send(`Inspection added with name: ${inspection.id}`).end();
	} catch (err) {
		//422 Unprocessable Entity
		//O codigo de resposta HTTP 422 Unprocessable Entity indica que o servidor entende o tipo de
		//conteúdo da entidade da requisição, e a sintaxe da requisição esta correta,
		//mas não foi possível processar as instruções presentes.
		res.status(422).send(`cannot create Inspection: ${err}`).end();
	}
};

const updateInspection = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			req.body.id = id;
			const qtd = await services.updateInspection(req.body);
			res.status(200).json(`Motorista atualizado com sucesso. ${qtd}`).end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Erro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		res.status(422).send(`cannot update Inspection: ${err}`).end();
	}
};

const deleteInspection = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (id) {
			const reslut = await services.deleteInspection(id);
			res.status(200).json(`Motorista inativado com sucesso. ${reslut}`).end();
		} else {
			// 400 Bad Request Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
			res
				.status(400)
				.json("Errro: o parâmetro especificado não é válido.")
				.end();
		}
	} catch (err) {
		res.status(422).send(`Cannot delete Inspection: ${err}`).end();
	}
};

module.exports = {
	getInspections,
	getInspectionById,
	createInspection,
	updateInspection,
	deleteInspection,
};
