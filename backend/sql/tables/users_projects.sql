CREATE TABLE IF NOT EXISTS users_projects (
    user_id UUID NOT NULL,
    project_id UUID NOT NULL,
    PRIMARY KEY (user_id, project_id)
)