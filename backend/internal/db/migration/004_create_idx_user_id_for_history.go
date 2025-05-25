package migration

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func CreateIdxUserIDForUserHistory() *gormigrate.Migration {
	const sql = `
create index idx_user_id on history (user_id);
`

	const down = `
drop index idx_user_id;
`

	return &gormigrate.Migration{
		ID: "004_create_idx_user_id_for_history",
		Migrate: func(tx *gorm.DB) error {
			return tx.Exec(sql).Error
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Exec(down).Error
		},
	}
}
