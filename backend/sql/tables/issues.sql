CREATE TABLE IF NOT EXISTS issues (
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    issue_key TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT,
    identified_date TEXT NOT NULL,
    related_project UUID NOT NULL REFERENCES projects(id),
    assigned_to UUID REFERENCES users(id),
    priority TEXT,
    issue_type TEXT,
    target_resolution_date TEXT,
    actual_resolution_date TEXT,
    resolution_summary TEXT,
    created_on TEXT NOT NULL,
    created_by UUID NOT NULL references users(id)
);