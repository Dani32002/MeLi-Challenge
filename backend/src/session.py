from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv(".env.development")

user = os.getenv("POSTGRES_USER")
password = os.getenv("POSTGRES_PASSWORD")
host = os.getenv("POSTGRES_HOST")
db_name = os.getenv("POSTGRES_DB")


engine = create_engine('postgresql://{}:{}@{}:5432/{}'.format(user, password, host, db_name))
Session = sessionmaker(bind=engine)
