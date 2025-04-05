from flask import request, jsonify
from flask_restful import Resource
from ..session import Session
from ..models import Producto

class Products(Resource):
    def get(self):
        session = Session()
        products = session.query(Producto).all()
        session.close()
        return_obj = []
        for product in products:
            return_obj.append({
                "id": str(product.id),
                "nombre": product.nombre,
                "imagen_path": product.imagen_path,
                "precio": product.precio,
                "stock": product.stock
            })

        return return_obj, 200