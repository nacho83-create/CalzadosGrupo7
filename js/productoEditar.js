const id=location.search.substr(4)
const { createApp } = Vue  //creo un objeto VUE llamdo createApp
 createApp({
   data() {  // define los datos de VUE
     return {
       url:`https://malumolinas86.pythonanywhere.com/productos/`+id,
       id:0,
       nombre:"",
       precio:0,
       stock:0,
       imagen:""

     }
   },
   methods: {  // define los métodos o funciones
     fetchData(url) {
       fetch(url)
         .then(response => response.json())
         .then(data => {
           console.log(data)
           this.nombre=data.nombre
           this.imagen=data.imagen
           this.precio=data.precio
           this.stock=data.stock
        })
         .catch(error=>alert("Ups... se produjo un error: "+ error))
     },
     
      editar(){
        let producto = {
          nombre:this.nombre,
          precio: this.precio,
          stock: this.stock,
          imagen:this.imagen
      }
      var options = {
          body:JSON.stringify(producto),
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow'
      }
      fetch(this.url, options)
          .then(function () {
              alert("Registro modificado")
              window.location.href = "./index.html";  // recarga productos.html
          })
          .catch(err => {
              console.error(err);
              alert("Error al Modificar")  // puedo mostrar el error tambien
          })      
  }



      
     },
   
   created() {  // llama a los métodos que se tienen que ejecutar al inicio
     this.fetchData(this.url)                                                      
   }
    // define los métodos que se van a ejecutar cada vez que cambien los datos


   
  }).mount('#app')
