package migration

import (
	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

func AddTestsData() *gormigrate.Migration {
	const sql = `
insert into tokens (
    user_id, name, type, is_on_market, price, currency_code, description, created_at, updated_at
) values
    ('user1', 'TokenA', 'fat', TRUE, 100.00, 'USD', 'Описание токена A', now(), now()),
    ('user1', 'TokenB', 'steps', FALSE,  50.50, 'EUR', 'Описание токена B', now(), now()),
    ('user2', 'TokenC', 'heart', TRUE,  75.20, 'GBP', 'Описание токена C', now(), now()),
    ('user2', 'TokenD', 'oxygen', FALSE, 30.00, 'JPY', 'Описание токена D', now(), now()),
    ('user3', 'TokenE', 'sleep', TRUE,  12.34, 'USD', 'Описание токена E', now(), now()),
    ('user3', 'TokenF', 'fat',   FALSE, 99.99, 'EUR', 'Описание токена F', now(), now()),
    ('user4', 'TokenG', 'steps', TRUE,  150.75,'GBP', 'Описание токена G', now(), now()),
    ('user4', 'TokenH', 'heart', FALSE, 200.00,'JPY', 'Описание токена H', now(), now()),
    ('user5', 'TokenI', 'oxygen',TRUE,  1.23,  'USD', 'Описание токена I', now(), now()),
    ('user5', 'TokenJ', 'sleep', FALSE, 5.67,  'EUR', 'Описание токена J', now(), now());

insert into history (
    user_id, token_name, action, created_at
) values 
    ('user1', 'TokenA', 'created',           now() - INTERVAL '10 days'),
    ('user1', 'TokenA', 'viewed',            now() - INTERVAL '9 days'),
    ('user1', 'TokenB', 'created',           now() - INTERVAL '8 days'),
    ('user1', 'TokenB', 'purchased',         now() - INTERVAL '7 days'),
    ('user2', 'TokenC', 'created',           now() - INTERVAL '6 days'),
    ('user2', 'TokenD', 'created',           now() - INTERVAL '5 days'),
    ('user3', 'TokenE', 'created',           now() - INTERVAL '4 days'),
    ('user3', 'TokenE', 'viewed',            now() - INTERVAL '3 days'),
    ('user4', 'TokenG', 'created',           now() - INTERVAL '2 days'),
    ('user5', 'TokenJ', 'created',           now() - INTERVAL '1 day'),
    ('user5', 'TokenJ', 'deleted',           now());
`

	const down = `
delete from tokens
 where name in (
   'TokenA','TokenB','TokenC','TokenD',
   'TokenE','TokenF','TokenG','TokenH',
   'TokenI','TokenJ'
 );

delete from history
 where (user_id, token_name, action) in (
   ('user1','TokenA','created'),
   ('user1','TokenA','viewed'),
   ('user1','TokenB','created'),
   ('user1','TokenB','purchased'),
   ('user2','TokenC','created'),
   ('user2','TokenD','created'),
   ('user3','TokenE','created'),
   ('user3','TokenE','viewed'),
   ('user4','TokenG','created'),
   ('user5','TokenJ','created'),
   ('user5','TokenJ','deleted')
 );
`

	return &gormigrate.Migration{
		ID: "005_add_tests_data",
		Migrate: func(tx *gorm.DB) error {
			return tx.Exec(sql).Error
		},
		Rollback: func(tx *gorm.DB) error {
			return tx.Exec(down).Error
		},
	}
}
