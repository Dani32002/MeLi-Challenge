from flask import request, jsonify
from flask_restful import Resource
from ..errors import ApiError
from ..session import Session
from ..models import Usuario
import re
from flask_jwt_extended import create_access_token

class CreateUsers(Resource):
    def post(self):
        json = request.get_json()
        keys = ["username", "email", "password_hash"]

        for key in keys:
            if key not in json:
                raise ApiError(412, f"Campos faltantes o no acorde a las condiciones minimas")
            

        if not isinstance(json["username"], str) or len(json["username"]) < 5 or re.search(r'\s', json["username"]) or re.search(r'\W', json["username"]):
            raise ApiError(412, f"Campos faltantes o no acorde a las condiciones minimas")
        
        email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not isinstance(json["email"], str) or not re.match(email_pattern, json["email"]):
            raise ApiError(412, f"Campos faltantes o no acorde a las condiciones minimas")
        
        if not isinstance(json["password_hash"], str) or len(json["password_hash"]) < 8:
            raise ApiError(412, f"Campos faltantes o no acorde a las condiciones minimas")

        session = Session()

        users = session.query(Usuario).filter_by(username=json["username"]).all()
        if len(users) > 0:
            session.close()
            raise ApiError(412, f"Campos faltantes o no acorde a las condiciones minimas")
        
        users = session.query(Usuario).filter_by(email=json["email"]).all()
        if len(users) > 0:
            session.close()
            raise ApiError(412, f"Campos faltantes o no acorde a las condiciones minimas")
        
        user = Usuario(username=json["username"], email=json["email"], password_hash=json["password_hash"])
        session.add(user)
        session.commit()
        

        return_obj = {
            "id": str(user.id),
            "username": user.username,
            "email": user.email,
            "password_hash": user.password_hash
        }

        session.close()


        return return_obj, 201
        

class Login(Resource):
    def get(self):
        
        json = request.get_json()
        keys = ["username", "password_hash"]

        for key in keys:
            if key not in json:
                raise ApiError(412, f"Campos faltantes")
            
        session = Session()

        users = session.query(Usuario).filter_by(username=json["username"]).all()
        
        if len(users) == 0:
            session.close()
            raise ApiError(412, f"Usuario o contraseña incorrecta")
        
        user = users[0]
        if user.password_hash != json["password_hash"]:
            session.close()
            raise ApiError(412, f"Usuario o contraseña incorrecta")
        
        return_obj = {
            "id": str(user.id),
            "username": user.username,
            "email": user.email,
            "password_hash": user.password_hash,
            "token": create_access_token(identity=user.id)
        }

        

        return return_obj, 200