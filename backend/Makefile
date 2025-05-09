BINDIR=${CURDIR}/bin

bin-deps:
	GOBIN=${BINDIR} go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@v2.4.1

generate:
	@PATH=${BINDIR}:$$PATH oapi-codegen -generate types,gin -package rest api/rest/api.yaml > internal/gen/rest/server.go