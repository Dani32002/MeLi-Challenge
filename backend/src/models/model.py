from sqlalchemy import Column
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Model():

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)