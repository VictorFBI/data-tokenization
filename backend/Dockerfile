FROM golang:1.24-alpine

WORKDIR /app

COPY ./api/rest /app/api/rest
COPY ./configs/values_docker.yaml /app/configs/values_local.yaml

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o tokenator ./cmd/tokenator

ENV CONFIG_FILE=./configs/values_docker.yaml

CMD ["./tokenator"]
