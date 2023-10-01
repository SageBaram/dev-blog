const router = require("express").Router();

router.get("/ping", (_, res) => res.status(200).json({ message: "pong" }));

module.exports = router;
