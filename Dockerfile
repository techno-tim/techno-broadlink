FROM python:3.8.5
WORKDIR /app
ADD ./api/requirements.txt .
ADD ./api/src/ .
RUN pip install -r requirements.txt
ADD ./frontend/build ./build
EXPOSE 8080

CMD [ "python", "./api.py" ]
