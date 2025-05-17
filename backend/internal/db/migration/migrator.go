package migration

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

var Migrations = []*gormigrate.Migration{
	CreateTableTokens(),
	CreateIdxNameForTokens(),
	CreateTableUserHistory(),
	CreateIdxUserIDForUserHistory(),
}

func MigrateAll(db *gorm.DB) error {
	m := gormigrate.New(db, gormigrate.DefaultOptions, Migrations)

	return m.Migrate()
}
