package migration

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func CreateTableTokens() *gormigrate.Migration {
	const sql = `
create table tokens
(
    id            serial primary key,
    user_id       text not null,
    name          text not null,
    type          text not null,
    is_on_market  boolean not null,
    price         numeric,
    currency_code text,
    description   text,
    created_at    timestamp with time zone not null,
    updated_at    timestamp with time zone not null
);`

	const down = `
drop table tokens;
`

	return &gormigrate.Migration{
		ID: "001_create_table_tokens",
		Migrate: func(tx *gorm.DB) error {
			return tx.Exec(sql).Error
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Exec(down).Error
		},
	}
}
