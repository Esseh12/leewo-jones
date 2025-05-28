package handlers

type createUserPOSTData struct {
	// FirstName string `json:"first-name" binding:"required,min=3"`
	// LastName  string `json:"last-name" binding:"required,min=3"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// type User struct {
// 	Name     string `json:"name" binding:"required,min=3"`
// 	Email    string `json:"email" binding:"required,email"`
// 	Password string `json:"password" binding:"required,min=6"`
// }
