const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	console.log(req.body);
	res.send({message: 'hello all'});
});

router.get("/:id", async (req, res) => {
	console.log(req.body);
	res.send({message: 'hello' + req.params.id});
});

router.post("/:id", async (req, res) => {
	console.log(req.body);
	res.send({message: 'hello'});
});

module.exports = router;