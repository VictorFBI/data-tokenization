// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package contracts

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// TokenatorMetaData contains all meta data concerning the Tokenator contract.
var TokenatorMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"signature\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"tokenName\",\"type\":\"string\"}],\"name\":\"getTokenPathBySignatureAndName\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"signature\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"tokenName\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"ipfsPath\",\"type\":\"string\"}],\"name\":\"tokenize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b503360015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506109628061005c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610034575f3560e01c80631f4ce25f146100385780634db7288914610068575b5f5ffd5b610052600480360381019061004d9190610405565b610084565b60405161005f91906104db565b60405180910390f35b610082600480360381019061007d91906104fb565b6101dd565b005b606060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610115576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161010c906105e9565b60405180910390fd5b5f836040516101249190610641565b9081526020016040518091039020826040516101409190610641565b9081526020016040518091039020805461015990610684565b80601f016020809104026020016040519081016040528092919081815260200182805461018590610684565b80156101d05780601f106101a7576101008083540402835291602001916101d0565b820191905f5260205f20905b8154815290600101906020018083116101b357829003601f168201915b5050505050905092915050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461026c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610263906105e9565b60405180910390fd5b805f8460405161027c9190610641565b9081526020016040518091039020836040516102989190610641565b908152602001604051809103902090816102b2919061085d565b50505050565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610317826102d1565b810181811067ffffffffffffffff82111715610336576103356102e1565b5b80604052505050565b5f6103486102b8565b9050610354828261030e565b919050565b5f67ffffffffffffffff821115610373576103726102e1565b5b61037c826102d1565b9050602081019050919050565b828183375f83830152505050565b5f6103a96103a484610359565b61033f565b9050828152602081018484840111156103c5576103c46102cd565b5b6103d0848285610389565b509392505050565b5f82601f8301126103ec576103eb6102c9565b5b81356103fc848260208601610397565b91505092915050565b5f5f6040838503121561041b5761041a6102c1565b5b5f83013567ffffffffffffffff811115610438576104376102c5565b5b610444858286016103d8565b925050602083013567ffffffffffffffff811115610465576104646102c5565b5b610471858286016103d8565b9150509250929050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f6104ad8261047b565b6104b78185610485565b93506104c7818560208601610495565b6104d0816102d1565b840191505092915050565b5f6020820190508181035f8301526104f381846104a3565b905092915050565b5f5f5f60608486031215610512576105116102c1565b5b5f84013567ffffffffffffffff81111561052f5761052e6102c5565b5b61053b868287016103d8565b935050602084013567ffffffffffffffff81111561055c5761055b6102c5565b5b610568868287016103d8565b925050604084013567ffffffffffffffff811115610589576105886102c5565b5b610595868287016103d8565b9150509250925092565b7f556e617574686f72697a656400000000000000000000000000000000000000005f82015250565b5f6105d3600c83610485565b91506105de8261059f565b602082019050919050565b5f6020820190508181035f830152610600816105c7565b9050919050565b5f81905092915050565b5f61061b8261047b565b6106258185610607565b9350610635818560208601610495565b80840191505092915050565b5f61064c8284610611565b915081905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061069b57607f821691505b6020821081036106ae576106ad610657565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026107107fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826106d5565b61071a86836106d5565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f61075e61075961075484610732565b61073b565b610732565b9050919050565b5f819050919050565b61077783610744565b61078b61078382610765565b8484546106e1565b825550505050565b5f5f905090565b6107a2610793565b6107ad81848461076e565b505050565b5b818110156107d0576107c55f8261079a565b6001810190506107b3565b5050565b601f821115610815576107e6816106b4565b6107ef846106c6565b810160208510156107fe578190505b61081261080a856106c6565b8301826107b2565b50505b505050565b5f82821c905092915050565b5f6108355f198460080261081a565b1980831691505092915050565b5f61084d8383610826565b9150826002028217905092915050565b6108668261047b565b67ffffffffffffffff81111561087f5761087e6102e1565b5b6108898254610684565b6108948282856107d4565b5f60209050601f8311600181146108c5575f84156108b3578287015190505b6108bd8582610842565b865550610924565b601f1984166108d3866106b4565b5f5b828110156108fa578489015182556001820191506020850194506020810190506108d5565b868310156109175784890151610913601f891682610826565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220b38cf68f1f6c9f20545eb88f7206a68bf852c40a605314d0ff4d71b59fc0022e64736f6c634300081d0033",
}

// TokenatorABI is the input ABI used to generate the binding from.
// Deprecated: Use TokenatorMetaData.ABI instead.
var TokenatorABI = TokenatorMetaData.ABI

// TokenatorBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use TokenatorMetaData.Bin instead.
var TokenatorBin = TokenatorMetaData.Bin

// DeployTokenator deploys a new Ethereum contract, binding an instance of Tokenator to it.
func DeployTokenator(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *Tokenator, error) {
	parsed, err := TokenatorMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(TokenatorBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Tokenator{TokenatorCaller: TokenatorCaller{contract: contract}, TokenatorTransactor: TokenatorTransactor{contract: contract}, TokenatorFilterer: TokenatorFilterer{contract: contract}}, nil
}

// Tokenator is an auto generated Go binding around an Ethereum contract.
type Tokenator struct {
	TokenatorCaller     // Read-only binding to the contract
	TokenatorTransactor // Write-only binding to the contract
	TokenatorFilterer   // Log filterer for contract events
}

// TokenatorCaller is an auto generated read-only Go binding around an Ethereum contract.
type TokenatorCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TokenatorTransactor is an auto generated write-only Go binding around an Ethereum contract.
type TokenatorTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TokenatorFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type TokenatorFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// TokenatorSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type TokenatorSession struct {
	Contract     *Tokenator        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// TokenatorCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type TokenatorCallerSession struct {
	Contract *TokenatorCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// TokenatorTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type TokenatorTransactorSession struct {
	Contract     *TokenatorTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// TokenatorRaw is an auto generated low-level Go binding around an Ethereum contract.
type TokenatorRaw struct {
	Contract *Tokenator // Generic contract binding to access the raw methods on
}

// TokenatorCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type TokenatorCallerRaw struct {
	Contract *TokenatorCaller // Generic read-only contract binding to access the raw methods on
}

// TokenatorTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type TokenatorTransactorRaw struct {
	Contract *TokenatorTransactor // Generic write-only contract binding to access the raw methods on
}

// NewTokenator creates a new instance of Tokenator, bound to a specific deployed contract.
func NewTokenator(address common.Address, backend bind.ContractBackend) (*Tokenator, error) {
	contract, err := bindTokenator(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Tokenator{TokenatorCaller: TokenatorCaller{contract: contract}, TokenatorTransactor: TokenatorTransactor{contract: contract}, TokenatorFilterer: TokenatorFilterer{contract: contract}}, nil
}

// NewTokenatorCaller creates a new read-only instance of Tokenator, bound to a specific deployed contract.
func NewTokenatorCaller(address common.Address, caller bind.ContractCaller) (*TokenatorCaller, error) {
	contract, err := bindTokenator(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &TokenatorCaller{contract: contract}, nil
}

// NewTokenatorTransactor creates a new write-only instance of Tokenator, bound to a specific deployed contract.
func NewTokenatorTransactor(address common.Address, transactor bind.ContractTransactor) (*TokenatorTransactor, error) {
	contract, err := bindTokenator(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &TokenatorTransactor{contract: contract}, nil
}

// NewTokenatorFilterer creates a new log filterer instance of Tokenator, bound to a specific deployed contract.
func NewTokenatorFilterer(address common.Address, filterer bind.ContractFilterer) (*TokenatorFilterer, error) {
	contract, err := bindTokenator(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &TokenatorFilterer{contract: contract}, nil
}

// bindTokenator binds a generic wrapper to an already deployed contract.
func bindTokenator(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := TokenatorMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Tokenator *TokenatorRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Tokenator.Contract.TokenatorCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Tokenator *TokenatorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Tokenator.Contract.TokenatorTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Tokenator *TokenatorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Tokenator.Contract.TokenatorTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Tokenator *TokenatorCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Tokenator.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Tokenator *TokenatorTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Tokenator.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Tokenator *TokenatorTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Tokenator.Contract.contract.Transact(opts, method, params...)
}

// GetTokenPathBySignatureAndName is a free data retrieval call binding the contract method 0x1f4ce25f.
//
// Solidity: function getTokenPathBySignatureAndName(string signature, string tokenName) view returns(string)
func (_Tokenator *TokenatorCaller) GetTokenPathBySignatureAndName(opts *bind.CallOpts, signature string, tokenName string) (string, error) {
	var out []interface{}
	err := _Tokenator.contract.Call(opts, &out, "getTokenPathBySignatureAndName", signature, tokenName)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetTokenPathBySignatureAndName is a free data retrieval call binding the contract method 0x1f4ce25f.
//
// Solidity: function getTokenPathBySignatureAndName(string signature, string tokenName) view returns(string)
func (_Tokenator *TokenatorSession) GetTokenPathBySignatureAndName(signature string, tokenName string) (string, error) {
	return _Tokenator.Contract.GetTokenPathBySignatureAndName(&_Tokenator.CallOpts, signature, tokenName)
}

// GetTokenPathBySignatureAndName is a free data retrieval call binding the contract method 0x1f4ce25f.
//
// Solidity: function getTokenPathBySignatureAndName(string signature, string tokenName) view returns(string)
func (_Tokenator *TokenatorCallerSession) GetTokenPathBySignatureAndName(signature string, tokenName string) (string, error) {
	return _Tokenator.Contract.GetTokenPathBySignatureAndName(&_Tokenator.CallOpts, signature, tokenName)
}

// Tokenize is a paid mutator transaction binding the contract method 0x4db72889.
//
// Solidity: function tokenize(string signature, string tokenName, string ipfsPath) returns()
func (_Tokenator *TokenatorTransactor) Tokenize(opts *bind.TransactOpts, signature string, tokenName string, ipfsPath string) (*types.Transaction, error) {
	return _Tokenator.contract.Transact(opts, "tokenize", signature, tokenName, ipfsPath)
}

// Tokenize is a paid mutator transaction binding the contract method 0x4db72889.
//
// Solidity: function tokenize(string signature, string tokenName, string ipfsPath) returns()
func (_Tokenator *TokenatorSession) Tokenize(signature string, tokenName string, ipfsPath string) (*types.Transaction, error) {
	return _Tokenator.Contract.Tokenize(&_Tokenator.TransactOpts, signature, tokenName, ipfsPath)
}

// Tokenize is a paid mutator transaction binding the contract method 0x4db72889.
//
// Solidity: function tokenize(string signature, string tokenName, string ipfsPath) returns()
func (_Tokenator *TokenatorTransactorSession) Tokenize(signature string, tokenName string, ipfsPath string) (*types.Transaction, error) {
	return _Tokenator.Contract.Tokenize(&_Tokenator.TransactOpts, signature, tokenName, ipfsPath)
}
