// Seleccionar elementos del DOM
const eventForm = document.getElementById('event-form');
const eventTitleInput = document.getElementById('event-titulo');
const eventDateInput = document.getElementById('event-fecha');
const eventList = document.getElementById('events');

// Manejo de envío a través del formulario
eventForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar que la página se recargue

    // Obtener valores del formulario
    const eventTitle = eventTitleInput.value;
    const eventDate = eventDateInput.value;

    // Validar que los campos no estén vacíos
    if (eventTitle === '' || eventDate === '') {
        alert('Por favor completa todos los campos!!');
        return;
    }

    // Crear el objeto del evento
    const event = {
        title: eventTitle,
        date: eventDate
    };

    // Guardar el evento en localStorage
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));

    // Agregar el evento a la lista
    addEventToList(event);

    // Limpiar el formulario
    eventForm.reset();
});

// Función para agregar un evento a la lista
function addEventToList(event) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${event.title} (${event.date})</span> <button class="delete-btn">Eliminar</button>`;

    // Agregar el evento a la lista
    eventList.appendChild(li);

    // Manejo de eliminación de eventos
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        removeEventFromLocalStorage(event);
    });
}

// Función para cargar eventos desde localStorage
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => addEventToList(event));
}

// Función para eliminar un evento de localStorage
function removeEventFromLocalStorage(eventToRemove) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => event.title !== eventToRemove.title || event.date !== eventToRemove.date);
    localStorage.setItem('events', JSON.stringify(events));
}

// Cargar eventos al cargar la página
document.addEventListener('DOMContentLoaded', loadEvents);

