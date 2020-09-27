FROM python:3.8.5
WORKDIR /app
COPY api/requirements.txt .
COPY api/src/ .
RUN pip install -r requirements.txt
COPY frontend/build ./build
EXPOSE 8080

CMD [ "python", "./api.py" ]
