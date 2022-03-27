FROM node:16-alpine as frontend
WORKDIR /build
ARG GENERATE_SOURCEMAP=false
COPY frontend .
RUN yarn install --frozen-lockfile --check-files
RUN yarn lint
RUN yarn build

FROM python:3.8
WORKDIR /app
COPY api/requirements.txt .
COPY api/setup.py .
COPY api/src .
RUN pip install -r requirements.txt
COPY --from=frontend /build .
RUN mkdir config
VOLUME /app/config
EXPOSE 10981

CMD [ "python", "./api.py" ]
