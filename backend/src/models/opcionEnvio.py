from .model import Model, Base
from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

class OpcionEnvio(Model, Base):
    __tablename__ = "opciones_envio"
    nombre = Column(String, unique=False, nullable=False)
    costo = Column(Float, unique=False, nullable=False)
    producto = Column(UUID, ForeignKey("productos.id"), nullable=False)

    def __init__(self, nombre, costo, producto):
        Model.__init__(self)
        self.nombre = nombre
        self.costo = costo
        self.producto = producto
    