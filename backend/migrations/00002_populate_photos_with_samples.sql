-- +goose Up
-- +goose StatementBegin
INSERT INTO photos (
    id, title, price, category, sub_category, description,
    format, resolution, created_at, popularity, downloads,
    thumbnail_url, image, discount
) VALUES (
    '1', 'Sunset Over Mountains', 12.99, 'Nature', 'Sunsets',
    'A high-resolution photo of a sunset behind the mountains.',
    'JPEG', '3840x2160', '2025-05-01 14:00:00', 4.7, 150,
    'https://example.com/thumbnails/sunset.jpg',
    'https://example.com/images/sunset.jpg', 0.1
);

INSERT INTO photos (
    id, title, price, category, sub_category, description,
    format, resolution, created_at, popularity, downloads,
    thumbnail_url, image, discount
) VALUES (
    '2', 'Urban Life', 9.50, 'City', 'Streets',
    'A black and white capture of city street life.',
    'PNG', '1920x1080', '2025-04-15 10:30:00', 3.9, 85,
    'https://example.com/thumbnails/urban.jpg',
    'https://example.com/images/urban.jpg', 0.0
);

INSERT INTO photos (
    id, title, price, category, sub_category, description,
    format, resolution, created_at, popularity, downloads,
    thumbnail_url, image, discount
) VALUES (
    '3', 'Wildlife in Africa', 15.75, 'Wildlife', 'Safari',
    'A lion photographed during a safari in Kenya.',
    'JPEG', '2560x1440', '2025-03-21 09:00:00', 4.9, 220,
    'https://example.com/thumbnails/lion.jpg',
    'https://example.com/images/lion.jpg', 0.15
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM photos WHERE id IN ('1', '2', '3');
-- +goose StatementEnd
