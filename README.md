## Cliente Gateway

## Dev
1.- Clonar repositorio
2.- Instalar dependencias
3.- Crear archivo `.env` basado en `env.template`
4.- Levantar el servidor de NATS
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
5.- Levantar Microservicios 
    5.1.- Ordenes Funciona con Prisma para PostGres: Crear la Base de Datos
    `npx prisma migrate dev`
6.- Levantar proyecto `npm run start:dev`
