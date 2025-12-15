let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const form = document.getElementById("taskForm");
const contenedor = document.getElementById("tasksContainer");
const filtroPrioridad = document.getElementById("filterPrioridad");
const ordenFecha = document.getElementById("orderFecha");
const taskIdInput = document.getElementById("taskId");

function guardar() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const tarea = {
    id: taskIdInput.value || Date.now(),
    fecha: fecha.value,
    materia: materia.value,
    prioridad: prioridad.value,
    titulo: titulo.value,
    descripcion: descripcion.value
  };

  if (taskIdInput.value) {
    const i = tareas.findIndex(t => t.id == tarea.id);
    tareas[i] = tarea;
  } else {
    tareas.push(tarea);
  }

  guardar();
  form.reset();
  taskIdInput.value = "";
  mostrar();
});

filtroPrioridad.addEventListener("change", mostrar);
ordenFecha.addEventListener("change", mostrar);

function mostrar() {
  contenedor.innerHTML = "";

  let lista = [...tareas];

  if (filtroPrioridad.value) {
    lista = lista.filter(t => t.prioridad === filtroPrioridad.value);
  }

  lista.sort((a, b) =>
    ordenFecha.value === "asc"
      ? new Date(a.fecha) - new Date(b.fecha)
      : new Date(b.fecha) - new Date(a.fecha)
  );

  lista.forEach(t => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <span class="badge ${t.prioridad.toLowerCase()}">${t.prioridad}</span>
      <p><strong>${t.fecha}</strong> - ${t.materia}</p>
      <h4>${t.titulo}</h4>

      <p class="task-desc">
        ${t.descripcion}
      </p>

      <div class="acciones">
        <button onclick="editar(${t.id})">Editar</button>
        <button onclick="eliminar(${t.id})">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

function editar(id) {
  const t = tareas.find(t => t.id === id);
  fecha.value = t.fecha;
  materia.value = t.materia;
  prioridad.value = t.prioridad;
  titulo.value = t.titulo;
  descripcion.value = t.descripcion;
  taskIdInput.value = t.id;
}

function eliminar(id) {
  tareas = tareas.filter(t => t.id !== id);
  guardar();
  mostrar();
}

mostrar();
