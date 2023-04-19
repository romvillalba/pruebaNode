const autosImportados = require ("./archivo")

const concesionaria = {

   autos: autosImportados,
   buscarAuto: function (patente){
      let autoBuscado = this.autos.find(row=>row.patente==patente )
      if (autoBuscado) return autoBuscado
      else return null
   },
   
   venderAuto: function(patente){
   let autoVendido=this.buscarAuto(patente)
     if(autoVendido!==null&&autoVendido.vendido!==true){
      autoVendido.vendido = true
     } 
     return autoVendido   
   },

   autosParaLaVenta: function(){
      let autosDisponibles = this.autos.filter	   (row=>row.vendido==false);
   return autosDisponibles
   },

   autosNuevos: function(){
      let autosCero = this.autosParaLaVenta().filter(row=>row.km<100)
      return autosCero
      },

   listaDeVentas: function(){
     
         let lista = this.autos.filter(row=>row.vendido==true)
         let listaPrecio = lista.map(row=>row.precio)
      return listaPrecio
},
   totalDeVentas: function(){
       let total = this.listaDeVentas().reduce((accumulator,currentValue)=>accumulator+currentValue,0)
         return total
},

puedeComprar: function(auto,persona){
if(persona.capacidadDePagoEnCuotas>=(auto.precio/auto.cuotas) && persona.capacidadDePagoTotal>=auto.precio) return true
else return false
},

   autosQuePuedeComprar: function(persona){
      let autosNoVendidos = this.autosParaLaVenta()
      let autosParaComprar=[]
      for(let i=0; i<autosNoVendidos.length; i++){
       if(this.puedeComprar(autosNoVendidos[i],persona)==true){
         autosParaComprar[i]=autosNoVendidos[i]
        }
      }
      return autosParaComprar 
},

autosQuePuedeComprar: function(persona){
let autosNoVendidos = this.autosParaLaVenta()
let listaDisponible = autosNoVendidos.filter(row=>this.puedeComprar(row,persona)==true)

    return listaDisponible
}

}   
