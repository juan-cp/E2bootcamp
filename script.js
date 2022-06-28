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
    mostrar_pacientes(paciente);
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
  
    var removeIcon = document.createElement('td');
    var element = document.createElement('tr');
    var updateIcon = document.createElement('td');

  
    removeIcon.innerHTML = "&#10060;";
    removeIcon.className = "remove_item clickeable";
    removeIcon.setAttribute("title", "Remove");

    updateIcon.innerHTML = "&#9997;";
    updateIcon.className = "update_icon clickeable";
    updateIcon.setAttribute("title", "Update");


    
    element.setAttribute("id", pac.pacienteId);
    element.innerHTML += "<td>"+pac.nombre+"</td>";
    element.innerHTML += "<td>"+pac.apellido+"</td>";
    element.innerHTML += "<td>"+pac.email_add+"</td>";
    element.innerHTML += "<td>"+pac.telefono+"</td>";
    element.appendChild(removeIcon);
    element.appendChild(updateIcon);
    listado.appendChild(element);
}

inicializar();
