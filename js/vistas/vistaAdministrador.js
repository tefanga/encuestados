/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function() { 
    contexto.reconstruirLista(); 
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista()
  })

  this.modelo.preguntasEliminadas.suscribir(function() {
    contexto.reconstruirLista()
  })
  
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    nuevoItem = $("<li>").addClass("list-group-item").attr("id",pregunta.id).text(pregunta.textoPregunta);
    //completar
    //asignar a nuevoitem un elemento "li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        if(this.value.length) {
          respuestas.push({textoRespuesta: this.value, cantidad: 0})
        }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);

    });
    //asociar el resto de los botones a eventos

    e.botonBorrarPregunta.click(function(){
      const id = parseInt($('.list-group-item.active').attr('id'));

      contexto.controlador.borrarPregunta(id);
    })

    e.botonEditarPregunta.on('click', function() {
      const id = parseInt($('.list-group-item.active').attr('id'))
      const nuevoNombre = prompt('Nuevo título de la pregunta:')
      if ($.trim(nuevoNombre)) {
        contexto.controlador.editarPregunta(id, nuevoNombre)
      }
    })

    e.borrarTodo.on('click', function() {
      contexto.controlador.borrarPreguntas()
    })

    
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
