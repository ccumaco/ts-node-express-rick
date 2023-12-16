"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCharacter = exports.getCharacters = void 0;
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { species, page } = req.body;
        const response = yield fetch('https://rickandmortyapi.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query {
                    characters(page: ${page}, filter: { species: "${species}" }) {
                      info {
                        count
                      }
                      results {
                        id
                        name
                        status
                        species
                        image,
                        location {
                            name
                        },
                        origin {
                            name
                        }
                        
                      }
                    }
                  }
                `,
            }),
        });
        const data = yield response.json();
        res.status(200).send({
            info: data.data.characters.info,
            characters: data.data.characters.results,
        });
    }
    catch (error) {
        res.status(500).send('Error in server:' + error);
    }
});
exports.getCharacters = getCharacters;
const getSingleCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield fetch('https://rickandmortyapi.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query {
                    charactersByIds(ids: ${id}) {
                      id
                      name
                      status
                      species
                      image
                      origin {
                        name
                        }
                      }
                  }
                `,
            }),
        });
        const data = yield response.json();
        res.status(200).send(data.data.charactersByIds[0]);
    }
    catch (error) {
        res.status(500).send('Error in server:' + error);
    }
});
exports.getSingleCharacter = getSingleCharacter;
