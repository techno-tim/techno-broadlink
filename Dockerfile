FROM python:3.8.5
RUN ls
WORKDIR /app
ADD api/src/requirements.txt .
ADD api/src/ .
RUN pip install -r requirements.txt
ADD frontend/build .

CMD [ "python", "./api.py" ]
