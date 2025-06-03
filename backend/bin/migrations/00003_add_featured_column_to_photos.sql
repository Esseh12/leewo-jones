-- +goose Up
-- +goose StatementBegin
ALTER TABLE photos ADD COLUMN featured BOOLEAN DEFAULT false;
UPDATE photos SET featured = 1 WHERE id = '3';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
