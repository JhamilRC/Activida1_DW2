require('dotenv').config()
const { inquirerMenu, pausa, leerInput, listarPokemones, caracteristicasPokemon } = require('./helpers/inquirer.js');
const Operaciones = require('./models/busquedas');

const main = async () => {
    const obj = new Operaciones();
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1://multiplos de 5 de n
                // Mostrar mensaje y lee
                console.clear();
                const termino = await leerInput('Numero: ');
                const multiplos = await obj.multiplo5(termino);
                break;
            case 2://ver clima SCZ
                const lat = "-17.7834";
                const long = "-63.1822";
                const clima = await obj.climaLugar(lat, long);
                // Mostrar resultados
                console.clear();
                console.log('============================');
                console.log('  Información de la ciudad'.yellow);
                console.log('============================\n');
                console.log('Nombre:', clima.name.green);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como está el clima:', clima.desc.green);
                break;
            case 3: //listar pokemones
                const cantidad = await leerInput('Cantidad: ');
                const pokemones = await obj.pokemones(cantidad);
                const nombre = await listarPokemones(pokemones);
                if (nombre === '') continue;
             const pokemonSel = caracteristicasPokemon(nombre);
            // busquedas.agregarHistorial(lugarSel.nombre);
            // const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        }
        if (opt !== 0) await pausa();
    } while (opt != 0)
}
main();