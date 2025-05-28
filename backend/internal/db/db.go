package db

import (
	"data-tokenization/internal/db/migration"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Connect - используется для подключения к БД и накатывание миграций
func Connect(dbURL string) *gorm.DB {
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		log.Printf("Failed to connect to database: %v", err)
	}

	if err = migration.MigrateAll(db); err != nil {
		log.Printf("Failed to process migrations: %v", err)
	}

	return db
}
