FROM python:3.8.5
WORKDIR /usr/src/app
COPY api/requirements.txt .
COPY api/setup.py .
COPY api/src .
RUN pip install -r requirements.txt
WORKDIR /usr/src/app/build
COPY frontend/build .
WORKDIR /usr/src/app

EXPOSE 8080

CMD [ "python", "./api.py" ]
