const EventEmitter = require("events");
const bus = new EventEmitter();

// Suscriptor (Escucha cuando se crea un turno)
bus.on("turnoCreado", (data) => {
  console.log("-> [SUSCRIPTOR] Nuevo turno recibido:", data);
  console.log("-> [NOTIFICACIÓN] Enviando mensaje de confirmación a WhatsApp...");
});

// Publicador (Emite el evento)
console.log("-> [PUBLICADOR] Registrando cita...");
bus.emit("turnoCreado", {
  id: "101",
  cliente: "Carlos Pérez",
  servicio: "Corte y barba",
  fecha: "2026-10-30",
  hora: "15:00"
});