BINDIR=${CURDIR}/bin

bin-deps:
	GOBIN=${BINDIR} go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@v2.4.1 && \
	GOBIN=${BINDIR} go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.64.8

generate:
	@PATH=${BINDIR}:$$PATH oapi-codegen -generate types,gin -package restgen api/rest/api.yaml > internal/gen/restgen/server.go

lint:
	@PATH=${BINDIR}:$$PATH golangci-lint run