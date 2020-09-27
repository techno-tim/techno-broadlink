FROM python:3.8.5
RUN ls
WORKDIR /app
COPY api/src/requirements.txt .
COPY api/src/ .
RUN pip install -r requirements.txt
COPY frontend/build .

CMD [ "python", "./api.py" ]
