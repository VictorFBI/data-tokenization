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
	ABI: "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"tokenName\",\"type\":\"string\"}],\"name\":\"getEncryptionKey\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"tokenName\",\"type\":\"string\"}],\"name\":\"getPath\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"tokenName\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"encryptionKey\",\"type\":\"string\"}],\"name\":\"saveEncryptionKey\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"tokenName\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"ipfsPath\",\"type\":\"string\"}],\"name\":\"savePath\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x6080604052348015600e575f5ffd5b503360025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610ccd8061005c5f395ff3fe608060405234801561000f575f5ffd5b506004361061004a575f3560e01c80632aa3dfb71461004e578063423489be1461007e57806394a0e4551461009a578063af61c6a6146100b6575b5f5ffd5b610068600480360381019061006391906106fd565b6100e6565b60405161007591906107a4565b60405180910390f35b610098600480360381019061009391906107c4565b610280565b005b6100b460048036038101906100af91906107c4565b61033e565b005b6100d060048036038101906100cb91906106fd565b6103fd565b6040516100dd91906107a4565b60405180910390f35b606060025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610177576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016e90610884565b60405180910390fd5b5f60018360405161018891906108dc565b908152602001604051809103902080546101a19061091f565b80601f01602080910402602001604051908101604052809291908181526020018280546101cd9061091f565b80156102185780601f106101ef57610100808354040283529160200191610218565b820191905f5260205f20905b8154815290600101906020018083116101fb57829003601f168201915b505050505090506102378160405180602001604052805f815250610596565b15610277576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161026e90610999565b60405180910390fd5b80915050919050565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461030f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161030690610884565b60405180910390fd5b805f8360405161031f91906108dc565b908152602001604051809103902090816103399190610b60565b505050565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c490610884565b60405180910390fd5b806001836040516103de91906108dc565b908152602001604051809103902090816103f89190610b60565b505050565b606060025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461048e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048590610884565b60405180910390fd5b5f5f8360405161049e91906108dc565b908152602001604051809103902080546104b79061091f565b80601f01602080910402602001604051908101604052809291908181526020018280546104e39061091f565b801561052e5780601f106105055761010080835404028352916020019161052e565b820191905f5260205f20905b81548152906001019060200180831161051157829003601f168201915b5050505050905061054d8160405180602001604052805f815250610596565b1561058d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058490610c79565b60405180910390fd5b80915050919050565b5f8180519060200120838051906020012014905092915050565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61060f826105c9565b810181811067ffffffffffffffff8211171561062e5761062d6105d9565b5b80604052505050565b5f6106406105b0565b905061064c8282610606565b919050565b5f67ffffffffffffffff82111561066b5761066a6105d9565b5b610674826105c9565b9050602081019050919050565b828183375f83830152505050565b5f6106a161069c84610651565b610637565b9050828152602081018484840111156106bd576106bc6105c5565b5b6106c8848285610681565b509392505050565b5f82601f8301126106e4576106e36105c1565b5b81356106f484826020860161068f565b91505092915050565b5f60208284031215610712576107116105b9565b5b5f82013567ffffffffffffffff81111561072f5761072e6105bd565b5b61073b848285016106d0565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f61077682610744565b610780818561074e565b935061079081856020860161075e565b610799816105c9565b840191505092915050565b5f6020820190508181035f8301526107bc818461076c565b905092915050565b5f5f604083850312156107da576107d96105b9565b5b5f83013567ffffffffffffffff8111156107f7576107f66105bd565b5b610803858286016106d0565b925050602083013567ffffffffffffffff811115610824576108236105bd565b5b610830858286016106d0565b9150509250929050565b7f556e617574686f72697a656400000000000000000000000000000000000000005f82015250565b5f61086e600c8361074e565b91506108798261083a565b602082019050919050565b5f6020820190508181035f83015261089b81610862565b9050919050565b5f81905092915050565b5f6108b682610744565b6108c081856108a2565b93506108d081856020860161075e565b80840191505092915050565b5f6108e782846108ac565b915081905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061093657607f821691505b602082108103610949576109486108f2565b5b50919050565b7f4e6f206b657920666f72207468697320746f6b656e206e616d650000000000005f82015250565b5f610983601a8361074e565b915061098e8261094f565b602082019050919050565b5f6020820190508181035f8301526109b081610977565b9050919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302610a137fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826109d8565b610a1d86836109d8565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f610a61610a5c610a5784610a35565b610a3e565b610a35565b9050919050565b5f819050919050565b610a7a83610a47565b610a8e610a8682610a68565b8484546109e4565b825550505050565b5f5f905090565b610aa5610a96565b610ab0818484610a71565b505050565b5b81811015610ad357610ac85f82610a9d565b600181019050610ab6565b5050565b601f821115610b1857610ae9816109b7565b610af2846109c9565b81016020851015610b01578190505b610b15610b0d856109c9565b830182610ab5565b50505b505050565b5f82821c905092915050565b5f610b385f1984600802610b1d565b1980831691505092915050565b5f610b508383610b29565b9150826002028217905092915050565b610b6982610744565b67ffffffffffffffff811115610b8257610b816105d9565b5b610b8c825461091f565b610b97828285610ad7565b5f60209050601f831160018114610bc8575f8415610bb6578287015190505b610bc08582610b45565b865550610c27565b601f198416610bd6866109b7565b5f5b82811015610bfd57848901518255600182019150602085019450602081019050610bd8565b86831015610c1a5784890151610c16601f891682610b29565b8355505b6001600288020188555050505b505050505050565b7f4e6f207061746820666f72207468697320746f6b656e206e616d6500000000005f82015250565b5f610c63601b8361074e565b9150610c6e82610c2f565b602082019050919050565b5f6020820190508181035f830152610c9081610c57565b905091905056fea264697066735822122059a8e47f110b270e0599ed432c0f70feac46ba2e608c1e784c1ffbc0ae51f77c64736f6c634300081d0033",
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

// GetEncryptionKey is a free data retrieval call binding the contract method 0x2aa3dfb7.
//
// Solidity: function getEncryptionKey(string tokenName) view returns(string)
func (_Tokenator *TokenatorCaller) GetEncryptionKey(opts *bind.CallOpts, tokenName string) (string, error) {
	var out []interface{}
	err := _Tokenator.contract.Call(opts, &out, "getEncryptionKey", tokenName)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetEncryptionKey is a free data retrieval call binding the contract method 0x2aa3dfb7.
//
// Solidity: function getEncryptionKey(string tokenName) view returns(string)
func (_Tokenator *TokenatorSession) GetEncryptionKey(tokenName string) (string, error) {
	return _Tokenator.Contract.GetEncryptionKey(&_Tokenator.CallOpts, tokenName)
}

// GetEncryptionKey is a free data retrieval call binding the contract method 0x2aa3dfb7.
//
// Solidity: function getEncryptionKey(string tokenName) view returns(string)
func (_Tokenator *TokenatorCallerSession) GetEncryptionKey(tokenName string) (string, error) {
	return _Tokenator.Contract.GetEncryptionKey(&_Tokenator.CallOpts, tokenName)
}

// GetPath is a free data retrieval call binding the contract method 0xaf61c6a6.
//
// Solidity: function getPath(string tokenName) view returns(string)
func (_Tokenator *TokenatorCaller) GetPath(opts *bind.CallOpts, tokenName string) (string, error) {
	var out []interface{}
	err := _Tokenator.contract.Call(opts, &out, "getPath", tokenName)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetPath is a free data retrieval call binding the contract method 0xaf61c6a6.
//
// Solidity: function getPath(string tokenName) view returns(string)
func (_Tokenator *TokenatorSession) GetPath(tokenName string) (string, error) {
	return _Tokenator.Contract.GetPath(&_Tokenator.CallOpts, tokenName)
}

// GetPath is a free data retrieval call binding the contract method 0xaf61c6a6.
//
// Solidity: function getPath(string tokenName) view returns(string)
func (_Tokenator *TokenatorCallerSession) GetPath(tokenName string) (string, error) {
	return _Tokenator.Contract.GetPath(&_Tokenator.CallOpts, tokenName)
}

// SaveEncryptionKey is a paid mutator transaction binding the contract method 0x94a0e455.
//
// Solidity: function saveEncryptionKey(string tokenName, string encryptionKey) returns()
func (_Tokenator *TokenatorTransactor) SaveEncryptionKey(opts *bind.TransactOpts, tokenName string, encryptionKey string) (*types.Transaction, error) {
	return _Tokenator.contract.Transact(opts, "saveEncryptionKey", tokenName, encryptionKey)
}

// SaveEncryptionKey is a paid mutator transaction binding the contract method 0x94a0e455.
//
// Solidity: function saveEncryptionKey(string tokenName, string encryptionKey) returns()
func (_Tokenator *TokenatorSession) SaveEncryptionKey(tokenName string, encryptionKey string) (*types.Transaction, error) {
	return _Tokenator.Contract.SaveEncryptionKey(&_Tokenator.TransactOpts, tokenName, encryptionKey)
}

// SaveEncryptionKey is a paid mutator transaction binding the contract method 0x94a0e455.
//
// Solidity: function saveEncryptionKey(string tokenName, string encryptionKey) returns()
func (_Tokenator *TokenatorTransactorSession) SaveEncryptionKey(tokenName string, encryptionKey string) (*types.Transaction, error) {
	return _Tokenator.Contract.SaveEncryptionKey(&_Tokenator.TransactOpts, tokenName, encryptionKey)
}

// SavePath is a paid mutator transaction binding the contract method 0x423489be.
//
// Solidity: function savePath(string tokenName, string ipfsPath) returns()
func (_Tokenator *TokenatorTransactor) SavePath(opts *bind.TransactOpts, tokenName string, ipfsPath string) (*types.Transaction, error) {
	return _Tokenator.contract.Transact(opts, "savePath", tokenName, ipfsPath)
}

// SavePath is a paid mutator transaction binding the contract method 0x423489be.
//
// Solidity: function savePath(string tokenName, string ipfsPath) returns()
func (_Tokenator *TokenatorSession) SavePath(tokenName string, ipfsPath string) (*types.Transaction, error) {
	return _Tokenator.Contract.SavePath(&_Tokenator.TransactOpts, tokenName, ipfsPath)
}

// SavePath is a paid mutator transaction binding the contract method 0x423489be.
//
// Solidity: function savePath(string tokenName, string ipfsPath) returns()
func (_Tokenator *TokenatorTransactorSession) SavePath(tokenName string, ipfsPath string) (*types.Transaction, error) {
	return _Tokenator.Contract.SavePath(&_Tokenator.TransactOpts, tokenName, ipfsPath)
}
