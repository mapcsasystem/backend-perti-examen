# Examen Backend Nodejs, mongodb WebServer RestServer

## Requerimientos para development

```
git clone https://github.com/mapcsasystem/backend-perti-examen
cd backend-perti-examen
npm i
```

### Para conectar a base de datos mongo [Mongo compass](https://www.mongodb.com/es/products/compass)

#### crear en la raiz del proyecto archivo .env basado en el .env.example

```
PORT=poner aqui el puerto no es requerido por default sera 3000 si no se pone
DB_URI_MONGO=poner aqui la cadena de conexion base de datos mongo es requerido
SECRETORPRIVATEKEY=poner aqui la llave pata generar el token es requerido
```

#### en la raíz del proyecto ejecutar

```
npm run dev
```

### Para ejecutar con docker instalar

### [docker](https://www.docker.com/products/docker-desktop/)

### [documentacion docker compose](https://docs.docker.com/get-started/08_using_compose/)

### [documentacion docker](https://docs.docker.com/get-started/overview/)

#### ejecutar el comando en la raíz del proyecto para lanzar docker

```
docker compose up -d mongo
```

```
npm run dev
```

#### ejecutar el comando de docker para bajar docker

```
docker compose down
```
