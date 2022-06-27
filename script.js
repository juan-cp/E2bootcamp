'use strict';
var listado = document.getElementById("listado");
var btnSave = document.getElementById("btnSave");
var listado_ingresos;
var ultimo_id = 0;

function inicializar() {
  
    if (!!(window.localStorage.getItem('listado_ingresos'))) {
      listado_ingresos = JSON.parse(window.localStorage.getItem('listado_ingresos'));
    } else {
      listado_ingresos = [];
    }
    btnSave.addEventListener('click', guarda_paciente);

  }
  
function guarda_paciente(event) {

    var paciente = {
      pacienteId: ultimo_id,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      email_add: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value

    };
    listado_ingresos.push(paciente);
    sincronizar();
    ultimo_id++;
  }

  function sincronizar() {
  
    window.localStorage.setItem('listado_ingresos', JSON.stringify(listado_ingresos));
    listado_ingresos = JSON.parse(window.localStorage.getItem('listado_ingresos'));
  }

  function obtener_ultimo_id() {
    var ultimo_paciente = listado_ingresos[listado_ingresos.length - 1];
    ultimo_id = ultimo_paciente.pacienteId + 1;
    return ultimo_id;
  }

inicializar();
