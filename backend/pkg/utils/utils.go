package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(passwd string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(passwd), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil

}

func CompareHash(hashed_password, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashed_password), []byte(password))
}
