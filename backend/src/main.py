from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS
from .errors import ApiError
from .models import Base
from .views import *
import os
from .session import engine
from datetime import timedelta

secret_key = os.getenv("JWT_SECRET_KEY")

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = secret_key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=1440)  # Access token expires in 15 minutes


Base.metadata.create_all(engine)

api = Api(app)
api.add_resource(CreateUsers, "/api/users")
api.add_resource(Login, "/api/users/login")
api.add_resource(Products, "/api/products")
api.add_resource(GetPostCart, "/api/users/cart")
api.add_resource(DelPutCart, "/api/users/cart/<string:id_item>")

@app.get('/health-check')
def health_check():
    return 'OK', 200

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
    Producto("iPhone", 10.0, "https://www.clevercel.co/cdn/shop/files/Portadas_iPhone14Plus.webp?v=1743797244", 5),
    Producto("PS5", 20.0, "https://cosonyb2c.vtexassets.com/arquivos/ids/360392-800-800?v=638645914784400000&width=800&height=800&aspect=true", 10),
    Producto("RTX 4090", 30.0, "https://images-cdn.ubuy.ae/642418354fdb2738c94b5913-new-geforce-rtx-4090-24gb-founders.jpg", 3)
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
cors = CORS(app)

@jwt.unauthorized_loader
def handle_missing_token(error):
    return jsonify({"msg": "El token es invalido o no se encuentra en la petición"}), 412

@jwt.expired_token_loader
def handle_expired_token(jwt_header, jwt_payload):
    return jsonify({"msg": "El token es invalido o no se encuentra en la petición"}), 412

@jwt.invalid_token_loader
def handle_invalid_token(error):
    return jsonify({"msg": "El token es invalido o no se encuentra en la petición"}), 412

