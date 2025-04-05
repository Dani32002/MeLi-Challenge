from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_restful import Api
from .errors import ApiError
from .models import Base
from .views import *
import os
from .session import engine

secret_key = os.getenv("JWT_SECRET_KEY")

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = secret_key

Base.metadata.create_all(engine)

api = Api(app)
api.add_resource(CreateUsers, "/api/users")
api.add_resource(Login, "/api/users/login")
api.add_resource(Products, "/api/products")
api.add_resource(GetPostCart, "/api/users/cart")
api.add_resource(DelPutCart, "/api/users/cart/<string:id_item>")


session = Session()

from .models import Usuario, Producto, ItemCarrito, OpcionEnvio

# Clear the database
session.query(OpcionEnvio).delete()
session.query(ItemCarrito).delete()
session.query(Usuario).delete()
session.query(Producto).delete()
session.commit()

# Create test products
prods = [ 
    Producto("Producto 1", 10.0, "imagen_path", 5),
    Producto("Producto 2", 20.0, "imagen_path", 10),
    Producto("Producto 3", 30.0, "imagen_path", 3)
]
session.add_all(prods)
session.commit()

prods = session.query(Producto).all()
opciones = []
for prod in prods:
    opciones.append(OpcionEnvio(nombre="Envio Normal", costo=5.0, producto=prod.id))
    opciones.append(OpcionEnvio(nombre="Envio Express", costo=10.0, producto=prod.id))    

session.add_all(opciones)
session.commit()

session.close()



@app.errorhandler(ApiError)
def handle_exception(error):
    response = {
        "msg": error.description,
    }
    return jsonify(response), error.code

jwt = JWTManager(app)