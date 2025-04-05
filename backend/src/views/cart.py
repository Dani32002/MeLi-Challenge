from flask import request, jsonify
from flask_restful import Resource
from ..errors import ApiError
from ..session import Session
from ..models import Usuario, ItemCarrito, Producto, OpcionEnvio
import re
from flask_jwt_extended import jwt_required, get_jwt_identity

class GetPostCart(Resource):

    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        json = request.get_json()
        keys = ["id_producto", "cantidad"]

        for key in keys:
            if key not in json:
                raise ApiError(412, f"Campos faltantes o no cumplen los requisitos minimos")
            
        if not isinstance(json["id_producto"], str):
            raise ApiError(412, f"Campos faltantes o no cumplen los requisitos minimos")
            
        if not isinstance(json["cantidad"], int) or json["cantidad"] < 1:
            raise ApiError(412, f"Campos faltantes o no cumplen los requisitos minimos")

        session = Session()
        user = session.query(Usuario).filter_by(id=current_user).first()
        if not user:
            session.close()
            raise ApiError(412, f"El token es invalido o no se encuentra en la petición")

        product = session.query(Producto).filter_by(id=json["id_producto"]).first()
        if not product:
            session.close()
            raise ApiError(404, f"El producto no se encontró")
        
        if json["cantidad"] > product.stock:
            session.close()
            raise ApiError(412, f"La cantidad solicitada supera el stock")
        
        item = session.query(ItemCarrito).filter_by(producto=json["id_producto"], usuario=current_user).all()

        if len(item) > 0:
            session.close()
            raise ApiError(412, f"El producto ya esta en el cart")
        
        item = ItemCarrito(cantidad=json["cantidad"], producto=json["id_producto"], usuario=current_user)
        session.add(item)
        session.commit()
        session.close()

        return_obj = {
            "msg": "Se creo el producto en el cart"
        }

        return return_obj, 201
    
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        
        session = Session()
        user = session.query(Usuario).filter_by(id=current_user).first()
        if not user:
            session.close()
            raise ApiError(412, f"El token es invalido o no se encuentra en la petición")
        
        items = session.query(ItemCarrito).filter_by(usuario=current_user).all()

        products = []
        for item in items:
            product = session.query(Producto).filter_by(id=item.producto).first()
            opcionesEnvio  = session.query(OpcionEnvio).filter_by(producto=item.producto).all()
            products.append({
                "id": str(product.id),
                "id_item": str(item.id),
                "nombre": product.nombre,
                "imagen_path": product.imagen_path,
                "precio": product.precio,
                "cantidad": item.cantidad,
                "subtotal": product.precio * item.cantidad,
                "opcionesEnvio": [{
                    "nombre": opcion.nombre,
                    "costo": opcion.costo
                } for opcion in opcionesEnvio]

            })
        
        session.close()
        
        return_obj = {
            "total": sum([product["subtotal"] for product in products]),
            "num_prods": len(products),
            "productos": products
        }

        return return_obj, 200
    

class DelPutCart(Resource):
    
    @jwt_required()
    def delete(self, id_item):
        current_user = get_jwt_identity()

        session = Session()
        user = session.query(Usuario).filter_by(id=current_user).first()
        if not user:
            session.close()
            raise ApiError(412, f"El token es invalido o no se encuentra en la petición")
        
        item = session.query(ItemCarrito).filter_by(id=id_item, usuario=current_user).first()
        if not item:
            session.close()
            raise ApiError(404, f"El producto no se encontró en el cart")
        
        session.delete(item)
        session.commit()
        session.close()

        return '', 204
    
    @jwt_required()
    def put(self, id_item):
        current_user = get_jwt_identity()
        json = request.get_json()
        if "cantidad" not in json:
            raise ApiError(412, f"Campos faltantes o no cumplen los requisitos minimos")
        
        if not isinstance(json["cantidad"], int) or json["cantidad"] < 1:
            raise ApiError(412, f"Campos faltantes o no cumplen los requisitos minimos")
        
        session = Session()
        user = session.query(Usuario).filter_by(id=current_user).first()
        if not user:
            session.close()
            raise ApiError(412, f"El token es invalido o no se encuentra en la petición")
        
        item = session.query(ItemCarrito).filter_by(id=id_item, usuario=current_user).first()
        if not item:
            session.close()
            raise ApiError(404, f"El producto no se encontró en el cart")
        
        product = session.query(Producto).filter_by(id=item.producto).first()

        if product.stock < json["cantidad"]:
            session.close()
            raise ApiError(412, f"La cantidad solicitada supera el stock")
        
        item.cantidad = json["cantidad"]
        session.commit()
        session.close()

        return_obj = {
            "msg": "Se actualizo el producto en el cart"
        }

        return return_obj, 200

        
