# MeLi-Challenge

## Endpoints

### Cart

#### 1. Agregar productos del carrito

<table>
<tr>
<td> Método </td>
<td> POST </td>
</tr>
<tr>
<td> Ruta </td>
<td> <strong>/users/cart</strong> </td>
</tr>
<tr>
<td> Parámetros </td>
<td> N/A </td>
</tr>
<tr>
<td> Encabezados </td>
<td>

```Authorization: Bearer token```
</td>
</tr>
<tr>
<td> Cuerpo </td>
<td>

```json
{
  "cantidad": Cantidad del elemento a insertar,
  "id_producto": Identificador del producto,

}
```
</td>
</tr>
</table>

##### Respuestas

<table>
<tr>
<th> Código </th>
<th> Descripción </th>
<th> Cuerpo </th>
</tr>
<tbody>
<tr>
<td> 412 </td>
<td>Campos faltantes o no cumplen los requisitos minimos</td>
<td>

```json
{
  "msg": "Campos faltantes o no cumplen los requisitos minimos",
}
```
</td>
</tr>
<tr>
<td> 412 </td>
<td>La cantidad solicitada supera el stock</td>
<td>

```json
{
  "msg": "La cantidad solicitada supera el stock",
}
```
</td>
</tr>
<tr>
<td> 412 </td>
<td>El producto ya esta en el cart</td>
<td>

```json
{
  "msg": "El producto ya esta en el cart",
}
```
</td>
</tr>
<tr>
<td> 412 </td>
<td>El token es invalido o no se encuentra en la petición</td>
<td>

```json
{
  "msg": "El token es invalido o no se encuentra en la petición",
}
```
</td>
</tr>
<tr>
<td> 404 </td>
<td>El producto no se encontró</td>
<td>

```json
{
  "msg": "El producto no se encontró",
}
```
</td>
</tr>
<tr>
<td> 201 </td>
<td>Se creo el producto en el cart</td>
<td>

```json
{
  "msg": "Se creo el producto en el cart"
}
```
</td>
</tr>
</tbody>
</table>

#### 2. Eliminar productos del carrito.

<table>
<tr>
<td> Método </td>
<td> DELETE </td>
</tr>
<tr>
<td> Ruta </td>
<td> <strong>/users/cart/{id}</strong> </td>
</tr>
<tr>
<td> Parámetros </td>
<td> id: identificador del item del cart </td>
</tr>
<tr>
<td> Encabezados </td>
<td>

```Authorization: Bearer token```
</td>
</tr>
<tr>
<td> Cuerpo </td>
<td>

N/A

</td>
</tr>
</table>

##### Respuestas

<table>
<tr>
<th> Código </th>
<th> Descripción </th>
<th> Cuerpo </th>
</tr>
<tbody>
<tr>
<td> 412 </td>
<td>El token es invalido o no se encuentra en la petición</td>
<td>

```json
{
  "msg": "El token es invalido o no se encuentra en la petición",
}
```
</td>
</tr>
<tr>
<td> 404 </td>
<td>El producto no se encontró en el cart</td>
<td>

```json
{
  "msg": "El producto no se encontró en el cart",
}
```
</td>
</tr>
<tr>
<td> 204 </td>
<td>Se borró el item del cart</td>
<td>

N/A

</td>
</tr>
</tbody>
</table>

#### 3. Cambiar la cantidad de cada producto en el carrito

<table>
<tr>
<td> Método </td>
<td> PUT </td>
</tr>
<tr>
<td> Ruta </td>
<td> <strong>/users/cart/{id}</strong> </td>
</tr>
<tr>
<td> Parámetros </td>
<td> id: identificador del item del cart </td>
</tr>
<tr>
<td> Encabezados </td>
<td>

```Authorization: Bearer token```
</td>
</tr>
<tr>
<td> Cuerpo </td>
<td>

```json
{
  "cantidad": Cantidad del elemento a actualizar,
}
```
</td>
</tr>
</table>

##### Respuestas

<table>
<tr>
<th> Código </th>
<th> Descripción </th>
<th> Cuerpo </th>
</tr>
<tbody>
<tr>
<td> 412 </td>
<td>Campos faltantes o no cumplen los requisitos minimos</td>
<td>

```json
{
  "msg": "Campos faltantes o no cumplen los requisitos minimos",
}
```
</td>
</tr>
<tr>
<td> 412 </td>
<td>La cantidad solicitada supera el stock</td>
<td>

```json
{
  "msg": "La cantidad solicitada supera el stock",
}
```
</td>
</tr>
<tr>
<td> 412 </td>
<td>El token es invalido o no se encuentra en la petición</td>
<td>

```json
{
  "msg": "El token es invalido o no se encuentra en la petición",
}
```
</td>
</tr>
<tr>
<td> 404 </td>
<td>El producto no se encontró en el cart</td>
<td>

```json
{
  "msg": "El producto no se encontró en el cart",
}
```
</td>
</tr>
<tr>
<td> 200 </td>
<td>Se actualizó el producto en el cart</td>
<td>

```json
{
  "msg": "Se actualizó el producto en el cart"
}
```
</td>
</tr>
</tbody>
</table>

#### 4. Obtener el carrito de un usuario

<table>
<tr>
<td> Método </td>
<td> GET </td>
</tr>
<tr>
<td> Ruta </td>
<td> <strong>/users/cart</strong> </td>
</tr>
<tr>
<td> Parámetros </td>
<td> N/A </td>
</tr>
<tr>
<td> Encabezados </td>
<td>

```Authorization: Bearer token```
</td>
</tr>
<tr>
<td> Cuerpo </td>
<td>

N/A

</td>
</tr>
</table>

##### Respuestas

<table>
<tr>
<th> Código </th>
<th> Descripción </th>
<th> Cuerpo </th>
</tr>
<tbody>
<tr>
<td> 412 </td>
<td>El token es invalido o no se encuentra en la petición</td>
<td>

```json
{
  "msg": "El token es invalido o no se encuentra en la petición",
}
```
</td>
</tr>
<tr>
<td> 200 </td>
<td>Se consiguió el cart</td>
<td>

```json
{
  "total": Precio total del carrito,
  "num_prods": Numero de productos,
  "productos": [
    {
        "id": Id del producto,
        "id_item": Id de item del producto,
        "nombre": Nombre del producto,
        "imagen_path": Path de la imagen del producto,
        "precio": Precio del producto,
        "cantidad": Cantidad solicitada del producto,
        "subtotal": Subtotal del producto,
        "stock": Stock del producto,
        "opcionesEnvio": [
            {
                "nombre": Nombre del tipo de envio,
                "costo": Precio del tipo de envio
            }
        ]
    },
    ...
  ]
}
```
</td>
</tr>
</tbody>
</table>

### Producto

#### 1. Obtener los productos

<table>
<tr>
<td> Método </td>
<td> GET </td>
</tr>
<tr>
<td> Ruta </td>
<td> <strong>/products</strong> </td>
</tr>
<tr>
<td> Parámetros </td>
<td> N/A </td>
</tr>
<tr>
<td> Encabezados </td>
<td>

N/A

</td>
</tr>
<tr>
<td> Cuerpo </td>
<td>

N/A

</td>
</tr>
</table>

##### Respuestas

<table>
<tr>
<th> Código </th>
<th> Descripción </th>
<th> Cuerpo </th>
</tr>
<tbody>
<tr>
<td> 200 </td>
<td>Se consiguieron los productos</td>
<td>

```json
[
    {
        "id": Id del producto,
        "nombre": Nombre del producto,
        "imagen_path": Path de la imagen del producto,
        "precio": Precio del producto,
        "stock": Cantidad del producto,
    },
    ...
]
```
</td>
</tr>
</tbody>
</table>

### Usuario

#### 1. Registrarse

<table>
<tr>
<td> Método </td>
<td> POST </td>
</tr>
<tr>
<td> Ruta </td>
<td> <strong>/users</strong> </td>
</tr>
<tr>
<td> Parámetros </td>
<td> N/A </td>
</tr>
<tr>
<td> Encabezados </td>
<td>

N/A

</td>
</tr>
<tr>
<td> Cuerpo </td>
<td>

```json
{
  "username": Nombre de usuario alfanumerico y de minimo 5 caracteres unico,
  "email": Email del usuario unico,
  "password_hash": Hash de la contraseña,
}
```
</td>
</tr>
</table>

##### Respuestas

<table>
<tr>
<th> Código </th>
<th> Descripción </th>
<th> Cuerpo </th>
</tr>
<tbody>
<tr>
<td> 412 </td>
<td>Campos faltantes o no acorde a las condiciones minimas</td>
<td>

```json
{
  "msg": "Campos faltantes o no acorde a las condiciones minimas"
}
```
</td>
</tr>
<tr>
<td> 201 </td>
<td>Se creó el usuario</td>
<td>

```json
{
  "id": Identificador del usuario,
  "username": Nombre de usuario,
  "email": Email del usuario,
  "password_hash": Hash de la contraseña,
}
```
</td>
</tr>
</tbody>
</table>

#### 2. Login

<table>
<tr>
<td> Método </td>
<td> POST </td>
</tr>
<tr>
<td> Ruta </td>
<td> <strong>/users/login</strong> </td>
</tr>
<tr>
<td> Parámetros </td>
<td> N/A </td>
</tr>
<tr>
<td> Encabezados </td>
<td>

N/A

</td>
</tr>
<tr>
<td> Cuerpo </td>
<td>

```json
{
  "username": Nombre de usuario alfanumerico y de minimo 5 caracteres unico,
  "password_hash": Hash de la contraseña,
}
```
</td>
</tr>
</table>

##### Respuestas

<table>
<tr>
<th> Código </th>
<th> Descripción </th>
<th> Cuerpo </th>
</tr>
<tbody>
<tr>
<td> 412 </td>
<td>Campos faltantes</td>
<td>

```json
{
  "msg": "Campos faltantes"
}
```
</td>
</tr>
<tr>
<td> 412 </td>
<td>Usuario o contraseña incorrecta</td>
<td>

```json
{
  "msg": "Usuario o contraseña incorrecta"
}
```
</td>
</tr>
<tr>
<td> 200 </td>
<td>Login exitoso</td>
<td>

```json
{
  "id": Identificador del usuario,
  "username": Nombre de usuario,
  "email": Email del usuario,
  "password_hash": Hash de la contraseña,
  "token": Token de autorización
}
```
</td>
</tr>
</tbody>
</table>