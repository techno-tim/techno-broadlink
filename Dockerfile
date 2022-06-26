FROM python:3.8.5
WORKDIR /app
COPY api/requirements.txt .
COPY api/setup.py .
COPY api/src .
RUN pip install -r requirements.txt
WORKDIR /app/build
COPY frontend/build .
WORKDIR /app
RUN mkdir config
VOLUME /app/config
EXPOSE 10981

CMD [ "python", "./api.py" ]
