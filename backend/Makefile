BINDIR=${CURDIR}/bin

bin-deps:
	GOBIN=${BINDIR} go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@v2.4.1 && \
	GOBIN=${BINDIR} go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.64.8

generate:
	@PATH=${BINDIR}:$$PATH oapi-codegen -generate types,skip-prune -package rest_common api/rest/common.yaml > internal/gen/rest_common/common.go
	@PATH=${BINDIR}:$$PATH oapi-codegen -generate types,gin -package rest_user --import-mapping common.yaml:data-tokenization/internal/gen/rest_common api/rest/user.yaml > internal/gen/rest_user/user.go
	@PATH=${BINDIR}:$$PATH oapi-codegen -generate types,gin -package rest_market --import-mapping common.yaml:data-tokenization/internal/gen/rest_common api/rest/market.yaml > internal/gen/rest_market/market.go

lint:
	@PATH=${BINDIR}:$$PATH golangci-lint run

# Define smart contracts names once
SMART_CONTRACTS_NAMES := Storage

contracts-generate:
	@echo "Generating files to interact with smart contracts..."
	@cd ../contract && \
	for contract in $(SMART_CONTRACTS_NAMES); do \
		solc --abi --bin src/$$contract.sol -o build --overwrite; \
	done

	@mkdir -p ../backend/internal/gen/contracts
	@cd ../backend/internal/gen/contracts && \
	for contract in $(SMART_CONTRACTS_NAMES); do \
		lowercase_contract=$$(echo "$$contract" | tr '[:upper:]' '[:lower:]') && \
		abigen --bin=../../../../contracts/build/$$contract.bin \
			--abi=../../../../contracts/build/$$contract.abi \
			--pkg=contracts \
			--out=$$lowercase_contract.go \
			--type $$contract; \
	done

	@echo "Generation completed"