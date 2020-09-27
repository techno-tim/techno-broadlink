FROM python:3.8.5
WORKDIR /app
COPY api/requirements.txt .
COPY api/setup.py .
COPY api/src .
RUN pip install -r requirements.txt
WORKDIR /app/build
COPY frontend/build .
EXPOSE 8080

CMD [ "python", "./api.py" ]
