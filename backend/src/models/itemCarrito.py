from .model import Model, Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

class ItemCarrito(Model, Base):
    __tablename__ = "items_carrito"
    cantidad = Column(Integer, unique=False, nullable=False)
    usuario = Column(UUID(as_uuid=True), ForeignKey("usuarios.id"), nullable=False)
    producto = Column(UUID(as_uuid=True), ForeignKey("productos.id"), nullable=False)

    def __init__(self, cantidad, usuario, producto):
        Model.__init__(self)
        self.cantidad = cantidad
        self.usuario = usuario
        self.producto = producto