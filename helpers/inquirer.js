const inquirer = require('inquirer');
const axios = require('axios');
const { default: Choices } = require('inquirer/lib/objects/choices');
require('colors');

const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?'.red,
        choices: [

            { value: 1, name: `${'1.'.green} Multiplos de 5 de N` },
            { value: 2, name: `${'2.'.green} Ver clima en Santa Cruz de la Sierra` },
            { value: 3, name: `${'2.'.green} Listar Pokemones` },
            { value: 0, name: `${'0.'.green} Salir` },
        ]
    }
];
const inquirerMenu = async () => {//cargar menu inquirer diseño
    console.clear();;
    console.log('========================'.green);
    console.log('    Menu de Opciones'.yellow);
    console.log('========================'.green);
    const { opcion } = await inquirer.prompt(opciones);
    return opcion;
}

const pausa = async () => {//para evitar el bucle salir
    const question = {
        type: 'input',
        name: 'enter',
        message: 'Presione enter para continuar',
    }
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input', 
            name: 'nume', 
            message,
            validate(value) {
                if (value.length === 0) {//que ingrese vacio
                    return 'Por favor ingrese un número';

                }
                if (isNaN(value)) {//verificar que sea un numero
                    return 'Por favor ingrese un valor numérico válido';
                }
                else if (value % 5 !== 0) {//verificar que sea un numero
                    return 'Por favor ingrese un valor numérico multiplo de 5 ejemp:(5,10,15,20...)';
                }
                return true;
            }
        }
    ];
    const { nume } = await inquirer.prompt(question);
    return parseInt(nume, 10);
}

//POKEMON
const listarPokemones = async (pokemones = []) => {
    const choices = pokemones.map((pokemon, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: pokemon.name,
            name: `${idx} ${pokemon.name}`,
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
    const preguntas = [
    {
        type: 'list',
        name: 'name',
        message: 'Seleccione un pokemon:',
        choices
    }
    ]
    const { name } = await inquirer.prompt(preguntas);
    return name;
}

async function caracteristicasPokemon(nombre) {
    try {
        const nom = nombre.toLowerCase(); 
        const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nom}`);
        const data = respuesta.data;
        const datosPokemon = {
            nombre: data.name,
            id: data.id,
            altura: data.height,
            peso: data.weight,
            habilidades: data.abilities.map(ability => ability.ability.name),
            imagen: data.sprites.front_default
        };
        console.clear();
        
        console.log('=============================='.green);
        console.log(`${(" Caracteristicas de: ").yellow + datosPokemon.nombre}`);
        console.log('=============================='.green);

        console.log(`${(" Id: ").green + datosPokemon.id}`);

        console.log(`${(" Altura: ").green + datosPokemon.altura+ "Cm."}`);
        console.log(`${(" Peso: ").green +datosPokemon.peso+ "kg."}`);
        console.log((" Habilidades: ").green);
        data.abilities.forEach(ability => {
            console.log(`- ${ability.ability.name}`);
        });
        console.log(`${(" Imagen: ").green +datosPokemon.imagen}`);

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}



module.exports = {
    inquirerMenu, pausa, leerInput, listarPokemones, caracteristicasPokemon
}