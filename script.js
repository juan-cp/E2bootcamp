'use strict';
var listado = document.getElementById("listado");
var btnSave = document.getElementById("btnSave");
var listado_ingresos;
var borrar_icono;
var actualizar_icono;
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
    mostrar_pacientes(paciente);
    actualizabotones(); 
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


function mostrar_pacientes(pac) {
  
    var borrar_icono = document.createElement('td');
    var element = document.createElement('tr');
    var actualizar_icono = document.createElement('td');

  
    borrar_icono.innerHTML = "&#10060;";
    borrar_icono.className = "borra clickeable";
    borrar_icono.setAttribute("title", "Remove");

    actualizar_icono.innerHTML = "&#9997;";
    actualizar_icono.className = "actualiza clickeable";
    actualizar_icono.setAttribute("title", "Update");


    
    element.setAttribute("id", pac.pacienteId);
    element.innerHTML += "<td>"+pac.nombre+"</td>";
    element.innerHTML += "<td>"+pac.apellido+"</td>";
    element.innerHTML += "<td>"+pac.email_add+"</td>";
    element.innerHTML += "<td>"+pac.telefono+"</td>";
    element.appendChild(borrar_icono);
    element.appendChild(actualizar_icono);
    listado.appendChild(element);
}
function borrar_pac(event) {
  
  var BORRAR_pac= event.currentTarget.parentNode;
  var pacienteId = BORRAR_pac.pacienteId;
  listado.removeChild(BORRAR_pac);
  listado_ingresos.forEach(function(element, i) {
    if (element.pacienteId == pacienteId) {
      listado_ingresos.splice(i, 1);
    }
  })

  sincronizar();
}

function actualizar_pac(event) {

  var ACTUALIZA_pac = event.currentTarget.parentNode;
  var pacienteId = ACTUALIZA_pac.pacienteId;
  var paciente_actualizar = buscar_paciente(pacienteId).paciente;
  var pos = buscar_paciente(pacienteId).pos;
  if (!!paciente_actualizar) {
    var nombre = prompt("nombre", paciente_actualizar.nombre);
    var apellido = prompt("apellido", paciente_actualizar.apellido);
    var email_add = prompt("Email", paciente_actualizar.email_add);
    var telefono = prompt("Telefono", paciente_actualizar.telefono);
    paciente_actualizar.nombre = nombre;
    paciente_actualizar.apellido = apellido;
    paciente_actualizar.email_add = email_add;
    paciente_actualizar.telefono = telefono;
    
    listado_ingresos[pos] = paciente_actualizar;
    sincronizar();
    
  }
  
}

function buscar_paciente(id) {

  var response = {
    paciente: '',
    pos: 0
  };
  listado_ingresos.forEach(function(elemento, i) {
    if (elemento.pacienteId == id) {
      response.paciente = elemento;
      response.pos = i;
    }
  });

  return response;
}

function actualizabotones() {
  
  borrar_icono = document.getElementsByClassName("borra");
  actualizar_icono = document.getElementsByClassName("actualiza");
  if (!!borrar_icono.length) {
    for (var i = 0; i < borrar_icono.length; i++) {
      borrar_icono[i].addEventListener('click', borrar_pac);
    }
  }
  if (!!actualizar_icono.length) {
    for (var j = 0; j < actualizar_icono.length; j++) {
      actualizar_icono[j].addEventListener('click', actualizar_pac);
    }
  }
}

inicializar();
