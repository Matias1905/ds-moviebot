console.log('Soy un bot.')

const Discord = require('discord.js');
const client = new Discord.Client();
const movieApi = require('./movieApi.js')

client.login('Nzg3MDY0NjQ5NjQ3Nzg0MDE2.X9PhEw.iqNE3E4LMAbpU8LSPZbYzGaikeM')

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if (msg.content.startsWith('&hola')) {
        msg.channel.send('que onda mono soy el bot de las peliculas')
    }

    if (msg.content.startsWith('&info')) {
        const movieTitle = msg.content.slice(6).replace('ñ', 'n');

        movieApi.buscarTitulo(movieTitle, (array) => {
            if (array.length !== 0) {
                const pelicula = array[0]
                const body = `**${pelicula.title}** \n**Rating:** ${pelicula.puntaje} \nPopularity: ${pelicula.popularity} \n${pelicula.resumen}`
                msg.channel.send(body, { files: [pelicula.imagen] }).then(message => {
                    message.react('👍').then(() => message.react('👎'));
                })

            } else {
                msg.channel.send('No encontré nada viejo, aprendé a escribir.')
            }
        })
    }

    if (msg.content.startsWith('&top')) {
        movieApi.buscarTop((array) => {
            const titulos = array.map(a => a.title).reduce((prev, curr) => prev + curr + '\n', '>>> ')
            msg.channel.send(titulos)
        })

    }

    if (msg.content.startsWith('&serie')) {
        const serieTitle = msg.content.slice(7).replace('ñ', 'n');

        movieApi.buscarSerie(serieTitle, (array) => {
            if (array.length !== 0) {
                const serie = array[0]
                const body = `**${serie.title}** \n**Rating:** ${serie.puntaje} \nPopularity: ${serie.popularity} \n${serie.resumen}`
                msg.channel.send(body, { files: [serie.imagen] }).then(message => {
                    message.react('👍').then(() => message.react('👎'));
                })

            } else {
                msg.channel.send('No encontré nada viejo, aprendé a escribir.')
            }
        })
    }
})