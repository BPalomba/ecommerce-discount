<h1> 📋 Descripción del Proyecto </h1>

Este proyecto corresponde a un **microservicio de descuentos**, desarrollado en **Java Spring Boot**, utilizando **MongoDB** para la persistencia y **RabbitMQ** para comunicación asincrónica entre microservicios.

El servicio implementa una arquitectura de **tres capas** (Controladores, Servicios y Repositorios) y gestiona:

- Reglas de descuento configurables  
- Cupones de descuento  
- Validación de cupones  
- Aplicación de reglas y cupones sobre un total de carrito  
- Emisión de eventos a RabbitMQ cuando cupones o reglas cambian  

Este módulo **NO calcula órdenes**, **NO procesa pagos** y **NO maneja carritos**.  
Su responsabilidad es **exclusivamente calcular descuentos** y devolver la información al resto del ecosistema.

<h1> 🌐 Enunciado del trabajo </h1>

El microservicio de descuentos forma parte de un sistema distribuido. La responsabilidad es proveer:

### ✔ Un endpoint para aplicar descuentos  
Dado un subtotal del carrito y (opcionalmente) un cupón, el servicio calcula el monto total descontado según reglas y cupones vigentes.

### ✔ Un endpoint de validación rápida de cupones  
Permite verificar si un cupón existe, está activo y no está vencido.

### ✔ Endpoints administrativos  
Para crear reglas de descuento y cupones, con persistencia en MongoDB.

### ✔ Eventos RabbitMQ  
Cada vez que se crea o actualiza un cupón/regla, se envía un evento `discount.updated` para que otros microservicios refresquen su caché o lógica de negocio.

<h1>📝 Endpoints y Uso </h1>

<h2> 🏷️ Aplicar descuentos | POST /api/discounts/apply </h2>

Este endpoint recibe la información del carrito y opcionalmente un cupón.  
El servicio valida el cupón, aplica reglas configuradas y devuelve el total final.

### 📥 Ejemplo de request:
```json
{ 
  "userId": "123",
  "cartTotal": 15000,
  "couponCode": "BIENVENIDO"
}
```

📤 Ejemplo de response:
```json
{
  "originalTotal": 15000,
  "discountAmount": 1500,
  "finalTotal": 13500
}
```
✔ Validaciones realizadas:
cartTotal debe ser > 0

Si existe couponCode:

el cupón debe existir

debe estar activo

debe no estar vencido

su valor debe ser coherente (entre 1 y 100 si es %)

Se aplican reglas configuradas en MongoDB

Se evita total negativo

Se determina el descuento final

<h2> 🏷️ Validar cupón | POST /api/discounts/validate </h2>
Endpoint simple orientado a UI/checkout que solo necesita saber si un cupón es válido.

📥 Ejemplo de request:
```json
{
  "code": "BIENVENIDO",
  "userId": "123",
  "cartTotal": 15000
}
```
📤 Ejemplo de response:
```json

{
  "valid": true
}
```
<h2> 🛠️ Listar reglas | GET /api/admin/discounts/rules </h2>
Devuelve todas las reglas de descuento existentes.

📤 Ejemplo:
```json

[
  {
    "_id": "abc123",
    "type": "PERCENT",
    "value": 10,
    "minAmount": 5000
  }
]
```
<h2> 🛠️ Crear regla | POST /api/admin/discounts/rules </h2>
Permite cargar una regla nueva.

📥 Request:
```json

{
  "type": "PERCENT",
  "value": 10,
  "minAmount": 5000,
  "description": "10% en compras mayores a 5000"
}
```
📨 Emite evento RabbitMQ:
discount.updated

<h2> 🏷️ Crear cupón | POST /api/admin/discounts/coupons </h2>
Crea un cupón nuevo con estado, valor, tipo y expiración.

📥 Request:
```json

{
  "code": "DESC10",
  "type": "PERCENT",
  "value": 10,
  "active": true,
  "expiration": "2025-12-01"
}
```
📨 Emite evento RabbitMQ:
discount.updated

<h1>🔍 Validaciones y Chequeos Internos </h1>
El módulo aplica validaciones estrictas para asegurar coherencia:

<h3>✔ Validaciones de cupones</h3>
Existencia del cupón

Código único

Estado activo

Fecha de expiración válida

Tipo válido (PERCENT o FIXED)

Valor > 0

Si es porcentaje → entre 1 y 100

<h3>✔ Validaciones de reglas</h3>
Tipo válido

Valor positivo

minAmount ≥ 0

Formato correcto

<h3>✔ Validaciones de cálculo</h3>
No permitir totales negativos

Aplicar múltiples reglas cuando corresponde

Resolver orden correcto de aplicación

Manejo de errores consistente

<h1> 🔄 Flujo dentro del Ecosistema de Microservicios </h1>
Carrito envía subtotal + cupón al endpoint /apply

Discounts Service valida y calcula

Devuelve:

total original

total final

monto descontado

Checkout usa el total final

Orders registra el valor definitivo

Cuando se crean reglas/cupones → se envía evento a RabbitMQ para que otros servicios actualicen su caché

<h1>📦 Ejemplos de Uso Completo </h1> <h3>✔ Aplicar cupón válido</h3>
```json ```
{
  "userId": "123",
  "cartTotal": 20000,
  "couponCode": "DESC10"
}
```

```json

{
  "originalTotal": 20000,
  "discountAmount": 2000,
  "finalTotal": 18000
}
```
<h3>✔ Cupón inválido</h3>
```
```json

{ "code": "" }
```
```

```json

{ "error": "code missing" }
<h1> 📡 RabbitMQ </h1>
Cada vez que se modifica un cupón o regla:
```
makefile

exchange: discount_exchange
routingKey: discount.updated
payload: { rule/coupon actualizado }
Esto permite sincronizar todos los microservicios sin reiniciar.

<h1>📘 Estructura del Proyecto </h1>
css

src/
 ├─ controller/
 │   ├─ DiscountController.java
 │   └─ AdminDiscountController.java
 ├─ service/
 │   ├─ DiscountService.java
 │   └─ CouponService.java
 ├─ repository/
 │   ├─ DiscountRuleRepository.java
 │   └─ CouponRepository.java
 ├─ events/
 │   └─ EventPublisherService.java
 └─ model/
     ├─ Coupon.java
     ├─ DiscountRule.java
     └─ ApplyRequest / ApplyResponse
<h1>🏁 Conclusión </h1>
Este microservicio abstrae toda la lógica relacionada a cupones y descuentos, permitiendo que otros módulos del sistema consuman la información a través de REST o RabbitMQ. Su funcionalidad es clara, desacoplada y fácilmente integrable en sistemas distribuidos.

