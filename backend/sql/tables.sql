DROP TABLE IF EXISTS IT_ISSUES_COMMENTS cascade; 
DROP TABLE IF EXISTS IT_ISSUES cascade; 
DROP TABLE IF EXISTS IT_PEOPLE cascade; 
DROP TABLE IF EXISTS IT_PROJECTS; 
DROP TABLE IF EXISTS IT_PROJECTS_ROLES; 

DROP TABLE IF EXISTS IT_PEOPLE_AUDITS cascade;
DROP TABLE IF EXISTS IT_ISSUES_AUDITS cascade;
DROP TABLE IF EXISTS IT_PROJECTS_AUDITS cascade;

CREATE TABLE IT_PEOPLE (
    person_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    person_name varchar(255) NOT NULL,
    person_email varchar(255) NOT NULL,
    username varchar(255) UNIQUE NOT NULL,
    assigned_project INTEGER,
    created_on DATETIME NOT NULL default CURRENT_TIMESTAMP,
    created_by varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    person_role varchar(255) NOT NULL CHECK (
        person_role IN (
            'team_member',
            'project_lead',
            'manager',
            'admin'
        )
    )
);

CREATE TABLE IT_PROJECTS (
    project_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    project_name varchar(255) UNIQUE NOT NULL,
    start_date DATETIME NOT NULL,
    target_end_date DATETIME NOT NULL,
    actual_end_date DATETIME,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by varchar(255) NOT NULL
);

CREATE TABLE IT_ISSUES (
    issue_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    issue_summary varchar(255) NOT NULL,
    issue_description varchar(4000),
    identified_by_person_id INTEGER NOT NULL,
    related_project INTEGER NOT NULL,
    assigned_to INTEGER NOT NULL,
    status varchar(30) NOT NULL DEFAULT 'open' CHECK (
        status IN ('open', 'in_progress', 'closed', 'resolved')
    ),
    priority varchar(30) DEFAULT 'medium' CHECK (
        priority IN ('low', 'medium', 'high', 'severe')
    ),
    target_resolution_date DATETIME,
    progress varchar(4000),
    actual_resolution_date DATETIME,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by varchar(255) NOT NULL,
    FOREIGN KEY (identified_by_person_id) REFERENCES IT_PEOPLE (person_id),
    FOREIGN KEY (related_project) REFERENCES IT_PROJECTS (project_id),
    FOREIGN KEY (assigned_to) REFERENCES IT_PEOPLE (person_id)
);

CREATE TABLE IT_ISSUES_COMMENTS (
	comment_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	comment_description varchar(4000) NOT NULL,
	issue_id INTEGER NOT NULL,
	person_id INTEGER NOT NULL,
	person_name varchar(255) NOT NULL, 
	FOREIGN KEY (issue_id) REFERENCES IT_ISSUES (issue_id),
	FOREIGN KEY (person_id) REFERENCES IT_PEOPLE (person_id)
)