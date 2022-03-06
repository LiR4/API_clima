//declaração de variaveis
let lon
let lat
let cidade
let estado
let pais
let temperatura
let ss
let tp_max
let tp_min
let clima

//Função para buscar o clima do estado selecionado
function mostrar() {
  cidade = document.getElementById('cidade').value
  estado = document.getElementById('estado').value
  pais = document.getElementById('pais').value

  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade},${estado},${pais}&limit=1&appid=8f9ca3ad64f1d4f5dc5b6e4096309304`

  fetch(url)//Aqui a API utiliza do nome da cidade, estado e país para obter dados latitude e longitude 
    .then(prom => prom.json())
    .then(ll => {
      lon = ll[0]['lon']
      lat = ll[0]['lat']

      fetch( //API utiliza dos dados de longitude e latitude para pegar informações de temperatura e clima 
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8f9ca3ad64f1d4f5dc5b6e4096309304`
      )
        .then(promj => promj.json())
        .then(clima_info => {
          console.log(clima_info)
          //Pega os dado da array 'main' converte de kelvin para celcius 
          temperatura = clima_info['main']['temp'] - 273
          ss = clima_info['main']['feels_like'] - 273
          tp_max = clima_info['main']['temp_max'] - 273
          tp_min = clima_info['main']['temp_min'] - 273
          clima = clima_info['weather'][0]['main']

          document.getElementById('tp').value =
            'Temperatura: ' + temperatura.toFixed(1) + 'c°'
          document.getElementById('tp_max').value =
            'Temperatura máxima: ' + tp_max.toFixed(1) + 'c°'
          document.getElementById('tp_min').value =
            'Temperatura mínima: ' + tp_min.toFixed(1) + 'c°'

            //condições para traduzir os nomes dos climas

          if (clima.toLowerCase() == 'thunderstorm') {
             document.getElementById('clima').value = 'Tempestade'
          } else if (
            clima == 'drizzle' ||
            clima == 'rain'
          ) {
             document.getElementById('clima').value = 'Garoa'
          } else if (clima.toLowerCase() == 'snow' || clima == 'Snow') {
             document.getElementById('clima').value = 'Neve'
          } else if (clima.toLowerCase() == 'mist' ) {
             document.getElementById('clima').value = 'Névoa'
          } else if (clima.toLowerCase() == 'smoke') {
             document.getElementById('clima').value = 'Fumaça'
          } else if (clima.toLowerCase() == 'haze' ) {
             document.getElementById('clima').value = 'Neblina'
          } else if (clima.toLowerCase() == 'dust' ) {
             document.getElementById('clima').value = 'Pó'
          } else if (clima.toLowerCase() == 'fog' ) {
             document.getElementById('clima').value = 'Nevoeiro'  
          } else if (clima.toLowerCase() == 'sand' ) {
             document.getElementById('clima').value = 'Areia'
          } else if (clima.toLowerCase() == 'clear' ) {
             document.getElementById('clima').value = 'Limpo'
          } else if (clima.toLowerCase() == 'clouds' ) {
             document.getElementById('clima').value = 'Nuvens'
          }
        })
    })
}
