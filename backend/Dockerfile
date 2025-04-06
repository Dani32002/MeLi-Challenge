FROM python:3.11-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

RUN apk add --no-cache curl

RUN pip install --no-cache-dir pipenv
RUN pipenv install --system

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_HOST=localhost
ENV JWT_SECRET_KEY=test
ENV POSTGRES_DB=postgres
ENV FLASK_APP=./src/main.py

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]