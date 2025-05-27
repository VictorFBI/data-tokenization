package config

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/ethereum/go-ethereum/common"
	"gopkg.in/yaml.v3"
)

// Config структура конфигурации, ассоциированная с yaml файлом
type Config struct {
	Server struct {
		Host         string `yaml:"host"`
		Port         string `yaml:"port"`
		HTTPEndpoint string `yaml:"endpoint"`
	} `yaml:"service"`

	Ipfs struct {
		Host         string `yaml:"host"`
		Port         string `yaml:"port"`
		HTTPEndpoint string `yaml:"endpoint"`
	} `yaml:"ipfs"`

	Hardhat struct {
		Host                 string         `yaml:"host"`
		Port                 string         `yaml:"port"`
		DeployerPrivateKey   string         `yaml:"deployer_private_key"`
		SmartContractAddress common.Address `yaml:"smart_contract_address"`
		HTTPEndpoint         string         `yaml:"endpoint"`
	} `yaml:"hardhat"`

	Postgres struct {
		Host           string `yaml:"host"`
		Port           string `yaml:"port"`
		User           string `yaml:"user"`
		Password       string `yaml:"password"`
		DB             string `yaml:"db"`
		HostAuthMethod string `yaml:"host_auth_method"`
		URL            string `yaml:"url"`
	} `yaml:"postgres"`
}

// LoadConfig загружает конфигурацию из файла
func LoadConfig(filename string) (*Config, error) {
	f, err := os.Open(filepath.Clean(filename))
	if err != nil {
		return nil, err
	}

	defer func(f *os.File) {
		err := f.Close()
		if err != nil {
			panic(err)
		}
	}(f)

	config := &Config{}
	if err := yaml.NewDecoder(f).Decode(config); err != nil {
		return nil, err
	}

	if config.Server.HTTPEndpoint == "" {
		config.Server.HTTPEndpoint = fmt.Sprintf("https://%s:%s", config.Server.Host, config.Server.Port)
	}
	if config.Ipfs.HTTPEndpoint == "" {
		config.Ipfs.HTTPEndpoint = fmt.Sprintf("%s/%s", config.Ipfs.Host, config.Ipfs.Port)
	}
	if config.Hardhat.HTTPEndpoint == "" {
		config.Hardhat.HTTPEndpoint = fmt.Sprintf("%s:%s", config.Hardhat.Host, config.Hardhat.Port)
	}
	if config.Postgres.URL == "" {
		config.Postgres.URL = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
			config.Postgres.User,
			config.Postgres.Password,
			config.Postgres.Host,
			config.Postgres.Port,
			config.Postgres.DB)
	}

	return config, nil
}
