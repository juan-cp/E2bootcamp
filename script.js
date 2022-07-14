
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
    showList();
}

function showList() {

  if (!!listado_ingresos.length) {
    obtener_ultimo_id();
    for (var item in listado_ingresos) {
      var pac = listado_ingresos[item];
      mostrar_pacientes(pac);
    }
    actualizabotones(); 
  }
  
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

function mostrar_pacientes(pac) {
  
    var borrar_icono = document.createElement('td');
    var element = document.createElement('tr');
    var actualizar_icono = document.createElement('td');

    borrar_icono.innerHTML = "&#10060; <span style='color:red'>Borrar</span>";
    borrar_icono.className = "borra clickeable";
    borrar_icono.setAttribute("title", "Remove");

    actualizar_icono.innerHTML = "&#9997; <span style='color:orange'>Editar</span>";
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

function updatepac(event) {

  var actualiza_pac = event.currentTarget.parentNode;
  var pacienteId = actualiza_pac.id;
  var paciente_actualizar = buscar_paciente(pacienteId).paciente;
  var pos = buscar_paciente(pacienteId).pos;

  document.getElementsByClassName('seccion_formulario')[0].style.display="none";


  if (!!paciente_actualizar) {
    //var nombre = window.prompt("nombre", paciente_actualizar.nombre);
    //var apellido = window.prompt("apellido", paciente_actualizar.apellido);
    //var email_add = window.prompt("Email", paciente_actualizar.email_add);
    //var telefono = window.prompt("Telefono", paciente_actualizar.telefono);
    
    var form_update=document.createElement('div');
    form_update.setAttribute('class','formulario_actualizacion');
    var campos=["nombre","apellido","email","telefono"];
    var etiquetas=["Nombre","Apellido","E-mail","Teléfono"];

  
    for(var i=0; i<campos.length;i++){
        eval("label_"+campos[i]+"=document.createElement('label'); campo_"+campos[i]+"=document.createElement('input'); label_"+campos[i]+".innerHTML='"+etiquetas[i]+"';  campo_"+campos[i]+".innerHTML='"+campos[i]+"'; campo_"+campos[i]+".setAttribute('class','u_"+campos[i]+"'); campo_"+campos[i]+".style.width='100px'; form_update.appendChild(label_"+campos[i]+"); form_update.appendChild(campo_"+campos[i]+");");
    }
  
    form_update.style.display="flex";
    form_update.style.flexDirection="row";
  
    var btnUpdate=document.createElement("button");
    btnUpdate.setAttribute('class','btnUpdate');
    btnUpdate.innerHTML="Actualizar..";
    form_update.appendChild(btnUpdate);

    document.getElementsByClassName('formulario_actualiza')[0].appendChild(form_update);
    document.getElementsByClassName('u_nombre')[0].value=paciente_actualizar.nombre;
    document.getElementsByClassName('u_apellido')[0].value=paciente_actualizar.apellido;
    document.getElementsByClassName('u_email')[0].value=paciente_actualizar.email_add;
    document.getElementsByClassName('u_telefono')[0].value=paciente_actualizar.telefono;
    
    btnUpdate.addEventListener('click',()=>{

      var nombre= document.getElementsByClassName('u_nombre')[0].value
      var apellido = document.getElementsByClassName('u_apellido')[0].value
      var email_add = document.getElementsByClassName('u_email')[0].value
      var telefono = document.getElementsByClassName('u_telefono')[0].value
  
      paciente_actualizar.nombre = nombre;
      paciente_actualizar.apellido = apellido;
      paciente_actualizar.email_add = email_add;
      paciente_actualizar.telefono = telefono;

      listado_ingresos[pos] = paciente_actualizar;
      form_update.style.display="none";
      document.getElementsByClassName('formulario_actualiza')[0].removeChild(form_update);
      document.getElementsByClassName('seccion_formulario')[0].style.display="inline";

      sincronizar();
      location.reload();
      return false;
    });
    
  
    
  
    
  }
  
}
function borrar_pac(event) {
  
  var BORRAR_pac= event.currentTarget.parentNode;
  var pacienteId = BORRAR_pac.id;
  listado.removeChild(BORRAR_pac);
  listado_ingresos.forEach(function(element, i) {
    if (element.pacienteId == pacienteId) {
      listado_ingresos.splice(i, 1);
    }
  })

  sincronizar();
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
      actualizar_icono[j].addEventListener('click', updatepac);
    }
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


inicializar();
