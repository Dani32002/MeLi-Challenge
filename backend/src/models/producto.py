from .model import Model, Base
from sqlalchemy import Column, String, Float, Integer

class Producto(Model, Base):
    __tablename__ = "productos"
    nombre = Column(String, unique=False, nullable=False)
    precio = Column(Float, unique=False, nullable=False)
    imagen_path = Column(String, unique=False, nullable=True)
    stock = Column(Integer, unique=False, nullable=False)

    def __init__(self, nombre, precio, imagen_path, stock):
        Model.__init__(self)
        self.nombre = nombre
        self.precio = precio
        self.imagen_path = imagen_path
        self.stock = stock


