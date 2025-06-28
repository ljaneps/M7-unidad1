# UNIDAD 1 - Fundamentos del Desarrollo Backend con Node.js

Desarrollar una API REST utilizando Node.js y el módulo http que permita gestionar la reserva de salas de estudio en una biblioteca o centro de coworking. La API permitirá consultar las salas disponibles, realizar reservas, cancelar reservas y consultar las reservas activas. Los datos de las salas y las reservas deben almacenarse en archivos JSON para mantener la persistencia.

# GET - LISTAR SALAS disponibles. 


# POST - RESERVAR SALAS estudio en una franja horaria específica.
▪ Validar que no se puedan hacer reservas que excedan la capacidad de la sala.
▪ Validar que una sala no pueda ser reservada por diferentes usuarios en la misma franja horaria.

# DELETE - CANCELAR RESERVA.


# GET - RESERVAS ACTIVAS.


# Detalle de entrega

Para esta práctica se ha creado un server.js, un rooms.json y un reservations.json según pedía el enunciado.
Dentro del sever se han ido creado las peticiones mencionadas anteriormente. En la petición de reserva de una sala, se ha incluido dos validaciones, además de gestionar los posibles errores.
Para la parte de "Validar que no se puedan hacer reservas que excedan la capacidad de la sala" añadí un campo más a la petición de reserva de una sala, en ese caso es el de "participants" el cual obliga al usuario a introducir el numero de personar que utilizarán la sala, por lo que si este es mayor a la capacidad, se notificará dicho caso.