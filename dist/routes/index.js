"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = require("../controllers/index");
router.post('/characters', index_1.getCharacters);
router.get('/get-single-character/:id', index_1.getSingleCharacter);
exports.default = router;
