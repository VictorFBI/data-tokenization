package migration

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func CreateTableUserHistory() *gormigrate.Migration {
	const sql = `
create table user_history
(
    id         serial primary key,
    user_id    text                     not null,
    token_name text                     not null,
    action     text                     not null,
    created_at timestamp with time zone not null
);`

	const down = `
drop table user_history;
`

	return &gormigrate.Migration{
		ID: "003_create_table_user_history",
		Migrate: func(tx *gorm.DB) error {
			return tx.Exec(sql).Error
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Exec(down).Error
		},
	}
}
