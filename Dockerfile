FROM python:3.8.5
WORKDIR /app
COPY api/requirements.txt .
COPY api/setup.py .
COPY api/src .
RUN pip install -r requirements.txt
WORKDIR /app/build
COPY frontend/build .
WORKDIR /app

EXPOSE 8080

RUN useradd appuser && chown -R appuser /app
USER appuser

CMD [ "python", "./api.py" ]
