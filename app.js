const process = require('process');
const {buscarAuto, venderAuto, autosNuevos, listaDeVentas, totalDeVentas, autosParaLaVenta, autosQuePuedeComprar, puedeComprar} = require('./concesionaria')

switch (process.argv[2]) {
    case 'buscar':
        let resultado = buscarAuto(process.argv[3]);
        resultado ? console.log(resultado) : console.log("No se encontró el auto con esa patente");
        break;
    case 'vender':
        console.log(venderAuto(process.argv[3]))
        break
    case 'consultar' :
        autosParaLaVenta().forEach(auto => {
            console.log(`${auto.marca} - ${auto.modelo} - $${auto.precio}`);
        })
        break
    case 'nuevos' :
        autosNuevos().forEach(auto => {
            console.log(`${auto.marca} - ${auto.modelo} - $${auto.precio} - km: ${auto.km}`);
        })
        break
    case 'ventas' : 
        listaDeVentas().forEach(precio => console.log('- ' + precio))
        break
    case 'total' :
        console.log('Total de ventas: $'  + totalDeVentas())
        break
    case 'compra' :
        console.log(puedeComprar(process.argv[3],process.argv[4]));
        break
    default:
        break;
}