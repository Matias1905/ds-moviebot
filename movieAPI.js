const apiKEY = '6eadf421fcb9fda153ae65023141394a'
const fetch = require('node-fetch')

module.exports = {

    buscarTitulo(titulo, okBusqueda) {
        //Parametros de conexion
        const url = "https://api.themoviedb.org/3/search/movie?api_key=";
        const search = `${"&language=es-AR&query="}${titulo}${"&page=1"}`;

        const endpoint = `${url}${apiKEY}${search}`;
        //console.log("Buscando",endpoint);
        fetch(endpoint
        ).then((response) => {

            return response.json();
        }).then(responseData => {
            //console.log("respuesta bruta",responseData);
            //Obtengo resultados
            const results = responseData.results;
            //console.log("Resultados", results);
            //Dar formato a los datos para mostrar en la grilla
            const peliculas = results.map((item, i) => {
                const baseURLImg = "https://image.tmdb.org/t/p/w200";
                return {
                    id: i,
                    imagen: `${baseURLImg}${item.poster_path}`,
                    title: item.title,
                    resumen: item.overview,
                    puntaje: item.vote_average,
                    fecha_salida: item.release_date,
                    popularity: item.popularity
                };
            })

            //devuelvo respuesta
            okBusqueda(peliculas);
        });
    },


    buscarSerie(titulo, okBusqueda) {
        //Parametros de conexion
        const url = "https://api.themoviedb.org/3/search/tv?api_key=";
        const search = `${"&language=es-AR&query="}${titulo}${"&page=1"}`;

        const endpoint = `${url}${apiKEY}${search}`;
        //console.log("Buscando",endpoint);
        fetch(endpoint
        ).then((response) => {

            return response.json();
        }).then(responseData => {
            //console.log("respuesta bruta",responseData);
            //Obtengo resultados
            const results = responseData.results;
            //console.log("Resultados", results);
            //Dar formato a los datos para mostrar en la grilla
            const peliculas = results.map((item, i) => {
                const baseURLImg = "https://image.tmdb.org/t/p/w200";
                return {
                    id: i,
                    imagen: `${baseURLImg}${item.poster_path}`,
                    title: item.name,
                    resumen: item.overview,
                    puntaje: item.vote_average,
                    fecha_salida: item.first_air_date,
                    popularity: item.popularity
                };
            })

            //devuelvo respuesta
            okBusqueda(peliculas);
        });
    },

    buscarTop(callback) {
        //Parametros de conexion
        const url = "https://api.themoviedb.org/3/movie/popular?api_key=";
        const search = `${"&language=es-AR&page=1"}`;

        const endpoint = `${url}${apiKEY}${search}`;
        //console.log("Buscando",endpoint);
        fetch(endpoint
        ).then((response) => {

            return response.json();
        }).then(responseData => {
            //console.log("respuesta bruta",responseData);
            //Obtengo resultados
            const results = responseData.results;
            //console.log("Resultados", results);
            //Dar formato a los datos para mostrar en la grilla
            const peliculas = results.map((item, i) => {
                const baseURLImg = "https://image.tmdb.org/t/p/w200";
                return {
                    id: i,
                    imagen: `${baseURLImg}${item.poster_path}`,
                    title: item.title,
                    resumen: item.overview,
                    puntaje: item.vote_average,
                    fecha_salida: item.release_date,
                    popularity: item.popularity
                };
            })

            //devuelvo respuesta
            callback(peliculas);
        });


    }
}
