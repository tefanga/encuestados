/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id){
    if(parseInt(id)){
    this.modelo.borrarPregunta(id);}
  },

  agregarVoto: function(id, respuesta) {
    console.log(id)
    if(parseInt(id)){
  	this.modelo.agregarVoto(id, respuesta)}
  },

  editarPregunta: function(id, nombre) {
    if(parseInt(id)){
  	this.modelo.editarPregunta(id, nombre)}
  },

  borrarPreguntas: function() {
    this.modelo.borrarPreguntas()
  }

};
