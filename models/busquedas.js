//const fs = require('fs');
const axios = require('axios');
require('colors');
class Operaciones {

    constructor() {//inicializamos el constructor
    }
    // Método asíncrono para obtener múltiplos de 5
    async multiplo5(num) {
        // Crear un array para almacenar los múltiplos de 5
        const multiples = [];

        // Loop para encontrar los múltiplos de 5
        for (let i = 1; i <= num; i++) {
            if (i % 5 === 0) {
                multiples.push(i);
            }
        }
        // Devolver los múltiplos de 5
        console.clear();
        console.log('=======================');
        console.log(('  Multiplos de : ' + num).yellow);
        console.log('=======================\n');
        console.log(multiples);
        return multiples;

    }

    get paramsWeather() {//para hacer la consulta con filtros
        return {
            appid: process.env.OPENWEATHER_kEY,
            units: 'metric', lang: 'es'
        }
    }
    async climaLugar(lat, lon) {//devuelve clima 
        try {
            const instance = axios.create({//consulta a la Api
                baseURL:
                    `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })
            const resp = await instance.get();
            const { weather, main, name } = resp.data;//los campos que queremos ver

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
                name: name
            }
        } catch (error) {
            //console.log(error);
        }
    }


    //POKEMON
    async pokemones(cantidad = '') {
        try {
            // Petición http
            const intance = axios.create({
                baseURL: `https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=0`
            });
            const resp = await intance.get();
            return resp.data.results.map(pokemon => ({
                name: pokemon.name,
                url: pokemon.url
            }));
        } catch (error) {
            return [];
        }
    }
}


module.exports = Operaciones;