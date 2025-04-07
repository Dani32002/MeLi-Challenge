from .model import Model, Base
from sqlalchemy import Column, String
from marshmallow import Schema, fields

class Usuario(Model, Base):
    __tablename__ = "usuarios"
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    def __init__(self, username, email, password):
        Model.__init__(self)
        self.username = username
        self.email = email
        self.password = password


class UsuarioJsonSchema(Schema):
    id = fields.Str()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()