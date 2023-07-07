const { createApp } = Vue  //creo un objeto VUE llamdo createApp
 createApp({
   data() {  // define los datos de VUE
     return {
       url: 'http://malumolinas86.pythonanywhere.com/productos',
       datos: [],
       cantidad:0
     }
   },
   methods: {  // define los métodos o funciones
     fetchData(url) {
      console.log(12+"-"+this.url)
       fetch(url)
         .then(response => response.json())
         .then(data => {
           console.log(data)
           //this.datos=data
           this.datos=data.map( x => {x.cantidad=""; return x})
        })
         .catch(error=>alert("Ups... se produjo un error: "+ error))
     },
     comprar(elemento){
        
        let datos = { 
          nombre:elemento.nombre,
          precio:elemento.precio,
          stock:elemento.stock-elemento.cantidad ,
          imagen:elemento.imagen
        }
        alert("EL TOTAL DE SU COMPRA ES: $ "+elemento.precio*elemento.cantidad)
        
        var options = {
          body:JSON.stringify(datos),
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow'
      }
      console.log(39+"-"+this.url)
      fetch(this.url+'/'+elemento.id, options)
      .then(function () {
          alert("Gracias por su compra.... POR FAVOR VUELVA PRONTO!!!!!")
          location.reload();  
      })
      .catch(err => {
          console.error(err);
          alert("Error al Guardar")  // puedo mostrar el error tambien
      }) 
        
     },
     
     
     },
   
   created() {  // llama a los métodos que se tienen que ejecutar al inicio
     this.fetchData(this.url)                                                      
   }
    // define los métodos que se van a ejecutar cada vez que cambien los datos


   
 }).mount('#app')
