package business

// service – реализует бизнес слой приложения
type service struct{}

// NewService – создает новый экземпляр бизнес слоя
func NewService() *service {
	return &service{}
}
