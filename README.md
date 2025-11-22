# Discounts Service

Servicio REST para administración de **descuentos**, persistencia en
**MongoDB** y eventos via **RabbitMQ**.

## 🚀 Cómo iniciar

### Con Docker Compose

    docker-compose up --build

Swagger UI:\
http://localhost:8080/swagger-ui/index.html

RabbitMQ Panel:\
http://localhost:15672\
user: guest\
pass: guest

## 🗂 Endpoints

### **Discounts**

  Método   Endpoint            Descripción
  -------- ------------------- -------------------
  POST     `/discounts`        Crear descuento
  GET      `/discounts`        Listar descuentos
  GET      `/discounts/{id}`   Obtener por ID
  PUT      `/discounts/{id}`   Actualizar
  DELETE   `/discounts/{id}`   Eliminar

### **Eventos (RabbitMQ)**

POST `/discounts/events/apply`

Ejemplo:

``` json
{
  "orderId": "1234",
  "amount": 5000
}
```

## 🛠 Ejecutar sin Docker

    ./gradlew clean build
    ./gradlew bootRun

## ⚙ Configuración

``` yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/discountsdb

rabbitmq:
  queue: discounts.events
  exchange: discounts.exchange
  routing-key: discounts.key
```
