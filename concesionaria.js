const fs = require('fs');
const autos = JSON.parse(fs.readFileSync('./autos.json','utf-8'));
const clientes = JSON.parse(fs.readFileSync('./clientes.json','utf-8'))

const concesionaria = {
    autos : autos,
    clientes : clientes,
    listarAutos : function(){
      this.autos.forEach(auto => {
         console.log(auto)
      });
    },
    buscarAuto : function(patente){
        for(let i = 0; i < concesionaria.autos.length; i++){
           if(autos[i].patente === patente){
              return autos[i]
           }
        }
        return null
   },
   venderAuto : function(patente){
      concesionaria.autos.map(function(auto){
         if(auto.patente === patente){
            auto.vendido = true
         }
      })
     
      concesionaria.guardarCambios(concesionaria.autos)
      return "Auto vendido!!!"
   },
   guardarCambios : function(autos){
      fs.writeFileSync('./autos.json',JSON.stringify(autos,null,3),'utf-8');
   },
   autosParaLaVenta : function() {
      return concesionaria.autos.filter(auto => auto.vendido === false)
   },
   autosNuevos : function(){
      return concesionaria.autosParaLaVenta().filter(auto => auto.km < 100)
   },
   listaDeVentas : function(){
      let autosVendidos = concesionaria.autos.filter(auto => auto.vendido === true)
      return autosVendidos.map(auto => auto.precio)
   },
   totalDeVentas : function(){
      return concesionaria.listaDeVentas().reduce((acum,num) => acum + num, 0)
   },
   puedeComprar : function(patente,nombre){
      let auto = concesionaria.autosParaLaVenta().find(auto => auto.patente === patente);
      let cliente = concesionaria.clientes.find(cliente => cliente.nombre === nombre);

     if(cliente){
        if(auto){
           return cliente.capacidadDePagoTotal > auto.precio && cliente.capacidadDePagoEnCuotas > auto.precio / auto.cuotas ? true : false
        }else{
           return "El auto no está para la venta"
        }
     }else{
        return "El cliente no está registrado :("
     }
   },
   autosQuePuedeComprar : function(nombre){
      let autosQuePuedeComprar = concesionaria.autosParaLaVenta().filter(auto => concesionaria.puedeComprar(auto.patente,nombre))
      if(autosQuePuedeComprar.length != 0){
         return autosQuePuedeComprar
      }else{
         return "Sacate un préstamo en el banco y volvé!"
      }
   }
}


module.exports = concesionaria;