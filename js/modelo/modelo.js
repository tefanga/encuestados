/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.votoSumado = new Evento(this)
  this.preguntaEditada = new Evento(this)
  this.preguntasEliminadas = new Evento(this)
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    if(this.preguntas.length > 0) {
      return this.preguntas[this.preguntas.length - 1].id
    }

    return 0;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    this.preguntas = this.preguntas.filter(function(pregunta) {
        return pregunta.id !== id;
    })

    this.guardar();
    this.preguntaEliminada.notificar();

  },

  //se guardan las preguntas
  guardar: function () {
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas))
  },

  agregarVoto: function (id, respuestaSeleccionada) {

    this.preguntas.forEach(pregunta =>
      pregunta.id == id ?
        pregunta.cantidadPorRespuesta.find(resp => resp.textoRespuesta == respuestaSeleccionada).cantidad += 1
        : null)
    this.guardar();
    this.votoSumado.notificar()
  },


  editarPregunta: function (id, texto) {
    this.preguntas.forEach(pregunta =>
      pregunta.id == id ?
        pregunta.textoPregunta = texto
        : null)
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarPreguntas: function () {
    this.preguntas = [];
    this.guardar();
    this.preguntasEliminadas.notificar();
  }
};
