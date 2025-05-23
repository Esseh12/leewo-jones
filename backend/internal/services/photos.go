package services

import (
	"github.com/Esseh12/leewo-jones/api/internal/model"
)

type PhotoService struct {
}

func (ps PhotoService) GetPhotosByCategoryName(name string, storage model.Store) []model.Photo {
	return storage.GetPhotosByCategory(name)
}
