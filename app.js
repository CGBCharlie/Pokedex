const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const { debug } = require("console");
const ejs = require('ejs');
const { get } = require("http");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html"); 

let pkmnId = 197;

app.get('/', (req, res) => {
    const lista = [];
    let pkmnSearch = "umbreon";
    const url = "https://pokeapi.co/api/v2/pokemon/" + pkmnSearch;
    https.get(url, (response) => {
        response.on("data", (data) =>{
            lista.push(data);
        });
        response.on("end", () => {
            const pkmnDataAux = Buffer.concat(lista);
            const pkmnData = JSON.parse(pkmnDataAux);
            let name = pkmnData.name;
            let pkmnId = pkmnData.id;
            let types = pkmnData.types;
            let xp = pkmnData.base_experience;
            let weight = pkmnData.weight;
            let height = pkmnData.height;
            let moves = pkmnData.moves;
            let abilities = pkmnData.abilities;
            let sprite = pkmnData.sprites.other.dream_world.front_default;
            if (sprite == null) {
                sprite = pkmnData.sprites.front_default;
            }
            let shinySprite = pkmnData.sprites.front_shiny;
            let stats = pkmnData.stats;

            let movesList = [];
            let typesList = [];
            let abilitiesList = [];
            let statsList = [];

            for (let i = 0; i < moves.length; i++) {
                movesList.push(moves[i].move.name)
            }

            for (let i = 0; i < types.length; i++) {
                typesList.push(types[i].type.name)
            }

            for (let i = 0; i < types.length; i++) {
                abilitiesList.push(abilities[i].ability.name)
            }

            for (let i = 0; i < stats.length; i++) {
                statsList.push(stats[i].base_stat)
            }

            res.render("index.html", {
                name: name, 
                xp: xp,
                weight: weight,
                height: height,
                moves: movesList,
                types: typesList,
                abilities: abilitiesList,
                sprite: sprite,
                shinySprite: shinySprite,
                stats: statsList,
                pkmnId: pkmnId
            }); 
        })
    });
});

app.post('/', (req, res) => {
    const lista = [];
    let pkmnSearch = req.body.search.toLowerCase();
    const url = "https://pokeapi.co/api/v2/pokemon/" + pkmnSearch;
    https.get(url, (response) => {
        response.on("data", (data) => {
            lista.push(data);
        });
        response.on("end", () => {
            try {
                const pkmnDataAux = Buffer.concat(lista);
                const pkmnData = JSON.parse(pkmnDataAux);
                let name = pkmnData.name;
                pkmnId = pkmnData.id;
                let types = pkmnData.types;
                let xp = pkmnData.base_experience;
                let weight = pkmnData.weight;
                let height = pkmnData.height;
                let moves = pkmnData.moves;
                let abilities = pkmnData.abilities;
                let sprite = pkmnData.sprites.other.dream_world.front_default;
                if (sprite == null) {
                    sprite = pkmnData.sprites.front_default;
                }
                let shinySprite = pkmnData.sprites.front_shiny;
                let stats = pkmnData.stats;

                let movesList = [];
                let typesList = [];
                let abilitiesList = [];
                let statsList = [];

                for (let i = 0; i < moves.length; i++) {
                    movesList.push(moves[i].move.name)
                }

                for (let i = 0; i < types.length; i++) {
                    typesList.push(types[i].type.name)
                }

                for (let i = 0; i < abilities.length; i++) {
                    abilitiesList.push(abilities[i].ability.name)
                }
                
                for (let i = 0; i < stats.length; i++) {
                    statsList.push(stats[i].base_stat)
                }

                res.render("index.html", {
                    name: name, 
                    xp: xp,
                    weight: weight,
                    height: height,
                    moves: movesList,
                    types: typesList,
                    abilities: abilitiesList,
                    sprite: sprite,
                    shinySprite: shinySprite,
                    stats: statsList,
                    pkmnId: pkmnId
                }); 
            } catch (error) {
                res.render("error.html")
                // res.status(400).send('Undefined Pokémon please try searching another one');
            }
        })
    });
});

app.post('/next', (req, res) => {
    const lista = [];
    if (pkmnId == 893) {
        pkmnId = 1;
    } else {
        pkmnId++;
    }
    let pkmnSearch = pkmnId;
    const url = "https://pokeapi.co/api/v2/pokemon/" + pkmnSearch;
    https.get(url, (response) => {
        response.on("data", (data) =>{
            lista.push(data);
        });
        response.on("end", () => {
            try {
                const pkmnDataAux = Buffer.concat(lista);
                const pkmnData = JSON.parse(pkmnDataAux);
                let name = pkmnData.name;
                pkmnId = pkmnData.id;
                let types = pkmnData.types;
                let xp = pkmnData.base_experience;
                let weight = pkmnData.weight;
                let height = pkmnData.height;
                let moves = pkmnData.moves;
                let abilities = pkmnData.abilities;
                let sprite = pkmnData.sprites.other.dream_world.front_default;
                if (sprite == null) {
                    sprite = pkmnData.sprites.front_default;
                }
                let shinySprite = pkmnData.sprites.front_shiny;
                let stats = pkmnData.stats;

                let movesList = [];
                let typesList = [];
                let abilitiesList = [];
                let statsList = [];

                for (let i = 0; i < moves.length; i++) {
                    movesList.push(moves[i].move.name)
                }

                for (let i = 0; i < types.length; i++) {
                    typesList.push(types[i].type.name)
                }

                for (let i = 0; i < abilities.length; i++) {
                    abilitiesList.push(abilities[i].ability.name)
                }
                
                for (let i = 0; i < stats.length; i++) {
                    statsList.push(stats[i].base_stat)
                }

                res.render("index.html", {
                    name: name, 
                    xp: xp,
                    weight: weight,
                    height: height,
                    moves: movesList,
                    types: typesList,
                    abilities: abilitiesList,
                    sprite: sprite,
                    shinySprite: shinySprite,
                    stats: statsList,
                    pkmnId: pkmnId
                }); 
            } catch (error) {
                res.status(404).sendFile(__dirname + "index.html")
                res.status(400).send('Undefined Pokémon please try searching another one');
            }
        })
    });
});

app.post('/back', (req, res) => {
    const lista = [];
    if (pkmnId == 1) {
        pkmnId = 893;
    } else {
        pkmnId--;
    }
    let pkmnSearch = pkmnId;
    const url = "https://pokeapi.co/api/v2/pokemon/" + pkmnSearch;
    https.get(url, (response) => {
        response.on("data", (data) =>{
            lista.push(data);
        });
        response.on("end", () => {
            try {
                const pkmnDataAux = Buffer.concat(lista);
                const pkmnData = JSON.parse(pkmnDataAux);
                let name = pkmnData.name;
                pkmnId = pkmnData.id;
                let types = pkmnData.types;
                let xp = pkmnData.base_experience;
                let weight = pkmnData.weight;
                let height = pkmnData.height;
                let moves = pkmnData.moves;
                let abilities = pkmnData.abilities;
                let sprite = pkmnData.sprites.other.dream_world.front_default;
                if (sprite == null) {
                    sprite = pkmnData.sprites.front_default;
                }
                let shinySprite = pkmnData.sprites.front_shiny;
                let stats = pkmnData.stats;

                let movesList = [];
                let typesList = [];
                let abilitiesList = [];
                let statsList = [];

                for (let i = 0; i < moves.length; i++) {
                    movesList.push(moves[i].move.name)
                }

                for (let i = 0; i < types.length; i++) {
                    typesList.push(types[i].type.name)
                }

                for (let i = 0; i < abilities.length; i++) {
                    abilitiesList.push(abilities[i].ability.name)
                }
                
                for (let i = 0; i < stats.length; i++) {
                    statsList.push(stats[i].base_stat)
                }

                res.render("index.html", {
                    name: name, 
                    xp: xp,
                    weight: weight,
                    height: height,
                    moves: movesList,
                    types: typesList,
                    abilities: abilitiesList,
                    sprite: sprite,
                    shinySprite: shinySprite,
                    stats: statsList,
                    pkmnId: pkmnId
                }); 
            } catch (error) {
                res.status(400).send('Undefined Pokémon please try searching another one');
            }
        })
    });
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
})