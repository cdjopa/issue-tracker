CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    project_key TEXT NOT NULL,
    summary TEXT,
    start_date TEXT NOT NULL,
    target_end_date TEXT,
    actual_end_date TEXT,
    created_on TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id)
);
