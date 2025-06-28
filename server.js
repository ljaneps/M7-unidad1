const fs = require("fs");
const http = require("http");
const PORT = 3000;

const readJson = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error al leer el archivo JSON:", err);
    return [];
  }
};

const writeJson = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const server = http.createServer((req, res) => {
  try {
    console.log("Petición recibida:", req.method, req.url);

    //GET para LISTA SALAS disponibles
    if (req.method === "GET" && req.url === "/salas") {
      const rooms = readJson("./rooms.json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(rooms));
    }

    // POST para RESERVAR SALA
    if (req.method === "POST" && req.url === "/reservar") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const { roomId, date, userName, participants } = JSON.parse(body);
          const reservations = await readJson("./reservations.json");
          const rooms = await readJson("./rooms.json");
          const room = rooms.find((r) => r.id === roomId);

          if (!room) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Sala no encontrada." }));
            return;
          }

          const validarFechaReserva = reservations.find(
            (r) => r.roomId === roomId && r.date === date
          );
          if (validarFechaReserva) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                error: "Esta sala ya ha sido reservada en esta fecha.",
              })
            );
            return;
          }

          const validarCapacidad = room.capacity >= participants;
          if (!validarCapacidad) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                error:
                  "La cantidad de participantes excede la capacidad de la sala.",
              })
            );
            return;
          }

          const newReservation = {
            id: reservations.length + 1,
            roomId,
            date,
            userName,
          };

          reservations.push(newReservation);
          await writeJson("./reservations.json", reservations);

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newReservation));
        } catch (error) {
          console.error("Error procesando la reserva:", error);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid request data" }));
        }
      });
    }

    // GET para OBTENER RESERVAS activas
    if (req.method === "GET" && req.url === "/activas") {
      const reservations = readJson("./reservations.json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(reservations));
    }

    // DELETE para CANCELAR RESERVA
    if (req.method === "DELETE" && req.url.startsWith("/cancelar/")) {
      (async () => {
        const idReserva = req.url.split("/")[2] || null;
        if (!idReserva) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Es necesario ID de reserva." }));
          return;
        }

        let reservations = readJson("./reservations.json");
        const pos = reservations.length;

        reservations = reservations.filter((r) => r.id !== parseInt(idReserva));
        if (reservations.length === pos) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Reserva no encontrada." }));
          return;
        }

        try {
          await writeJson("./reservations.json", reservations);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Reserva cancelada." }));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Error al cancelar la reserva." }));
        }
      })();
    }
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
