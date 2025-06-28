# UNIDAD 1 - Fundamentos del Desarrollo Backend con Node.js

Desarrollar una API REST utilizando Node.js y el módulo http que permita gestionar la reserva de salas de estudio en una biblioteca o centro de coworking. La API permitirá consultar las salas disponibles, realizar reservas, cancelar reservas y consultar las reservas activas. Los datos de las salas y las reservas deben almacenarse en archivos JSON para mantener la persistencia.

# GET - Listar salas disponibles. 
![Captura de pantalla 2025-06-28 220652](https://github.com/user-attachments/assets/fb5b9bbe-2ae9-4379-928a-bcc5140a989f)

# POST - Reservar salas de estudio en una franja horaria específica.
![Captura de pantalla 2025-06-28 220600](https://github.com/user-attachments/assets/a7bb9f80-a6b6-45d4-be64-a6413cbc50f5)

▪ Validar que no se puedan hacer reservas que excedan la capacidad de la sala.

![Captura de pantalla 2025-06-28 220527](https://github.com/user-attachments/assets/f4590723-7458-45fc-89b2-572bf09ccdad)

▪ Validar que una sala no pueda ser reservada por diferentes usuarios en la misma franja horaria.

![Captura de pantalla 2025-06-28 220614](https://github.com/user-attachments/assets/ec1c708c-3d2e-45fc-9012-3ef022250bad)

# DELETE - Cancelar reserva.

![Captura de pantalla 2025-06-28 221005](https://github.com/user-attachments/assets/42b52da7-9ed0-4c04-8504-24a355ce84f0)

▪ Si no existe dicha reserva.

![Captura de pantalla 2025-06-28 220903](https://github.com/user-attachments/assets/66450b77-dbf2-4ca6-bd33-e96c34d13c34)

# GET - Reservas activas.

![Captura de pantalla 2025-06-28 220710](https://github.com/user-attachments/assets/1b656c69-d820-4dfe-9224-3d4983253a8b)

# Detalle de entrega

Para esta práctica se ha creado un server.js, un rooms.json y un reservations.json según pedía el enunciado.
Dentro del sever se han ido creado las peticiones mencionadas anteriormente. En la petición de reserva de una sala, se ha incluido dos validaciones, además de gestionar los posibles errores.
Para la parte de "Validar que no se puedan hacer reservas que excedan la capacidad de la sala" añadí un campo más a la petición de reserva de una sala, en ese caso es el de "participants" el cual obliga al usuario a introducir el numero de personar que utilizarán la sala, por lo que si este es mayor a la capacidad, se notificará dicho caso.
