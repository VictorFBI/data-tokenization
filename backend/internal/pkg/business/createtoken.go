package business

import (
	"data-tokenization/internal/gen/restgen/user"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *service) PostUserToken(c *gin.Context) {
	// Инициализируйте тело запроса
	var requestBody restgen_user.UserTokenPostRequest

	// Парсим входящий запрос в requestBody
	if err := c.ShouldBind(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Далее напишите вашу бизнес-логику, например, сохранение токена в базе данных
	fmt.Printf("UserId: %s, Name: %s, Icon: %s\n", requestBody.UserId, requestBody.Name, requestBody.Icon)

	// Верните ответ клиенту о том, что запрос успешно выполнен
	c.JSON(http.StatusCreated, gin.H{"msg": "Token created"})
}
