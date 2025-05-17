package migration

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func CreateIdxNameForTokens() *gormigrate.Migration {
	const sql = `
create extension if not exists pg_trgm;

create index idx_name on tokens 
 using gin (name gin_trgm_ops) with (fastupdate = false);
`

	const down = `
drop index idx_name;
`

	return &gormigrate.Migration{
		ID: "002_create_idx_name_for_tokens",
		Migrate: func(tx *gorm.DB) error {
			return tx.Exec(sql).Error
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Exec(down).Error
		},
	}
}
