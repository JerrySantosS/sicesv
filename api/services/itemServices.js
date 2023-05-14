const Item = require("../models/item");
const rules = require("../rules/itemRules");

async function getItems() {
	return Item.findAll()
		.then((items) => {
			return items;
		})
		.catch((err) => {
			throw `itemServices: DB Error: ${err}`;
		});
}

async function getItemById(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Item.findByPk(id)
			.then((item) => {
				return item;
			})
			.catch((err) => {
				throw `itemServices: DB Error: ${err}`;
			});
	} else {
		throw `userSeritemServices: id is not valid.`;
	}
}

async function createItem(data) {
	const result = await rules.createRules(data);

	if (result.name) {
		return Item.create(result)
			.then((item) => {
				return item;
			})
			.catch((err) => {
				throw `itemServices: DB Error: ${err}`;
			});
	} else {
		throw `itemServices: ${result}`;
	}
}

async function updateItem(data) {
	const result = await rules.updateRules(data);

	if (result.id) {
		return Item.update(result, { where: { id: result.id } })
			.then((item) => {
				return item;
			})
			.catch((err) => {
				throw `itemServices: DB Error: ${err}`;
			});
	} else {
		throw `userServices: ${result}`;
	}
}

async function deleteItem(id) {
	const isId = await rules.isId(id);

	if (isId) {
		return Item.update({ active: false }, { where: { id: id } })
			.then((item) => {
				return item;
			})
			.catch((err) => {
				throw `itemServices: DB Error: ${err}`;
			});
	} else {
		throw `itemServices: id is not valid.`;
	}
}

module.exports = {
	getItems,
	createItem,
	getItemById,
	updateItem,
	deleteItem,
};
