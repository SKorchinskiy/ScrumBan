CREATE TYPE ACCESS AS ENUM ('public', 'private');
CREATE TYPE PRIORITY AS ENUM ('None', 'Low', 'Medium', 'High', 'Urgent')

CREATE TABLE IF NOT EXISTS USERS (
    user_id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(63) NOT NULL,
    last_name VARCHAR(63) NOT NULL,
    email VARCHAR(127) UNIQUE NOT NULL,
    display_name VARCHAR(127) NOT NULL,
    timezone CHAR(2) DEFAULT('UA'),
);

CREATE TABLE IF NOT EXISTS PROJECTS (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(63) NOT NULL,
    project_description VARCHAR(255) DEFAULT(''),
    project_access ACCESS DEFAULT('private')
);

CREATE TABLE IF NOT EXISTS WORKSPACES (
    workspace_id SERIAL PRIMARY KEY,
    workspace_name VARCHAR(31)NOT NULL,
    workspace_owner INT references USERS(user_id)
);

CREATE TABLE IF NOT EXISTS SPRINTS (
    sprint_id SERIAL PRIMARY KEY,
    sprint_title VARCHAR(63) NOT NULL,
    sprint_description VARCHAR(255) DEFAULT(''),
    sprint_start_date DATE,
    sprint_end_date DATE
);

CREATE TABLE IF NOT EXISTS STATES (
    state_id SERIAL PRIMARY KEY,
    project_id INT references PROJECTS(project_id),
    state_name VARCHAR(31),
    state_color VARCHAR(7) DEFAULT('#fff')
);

CREATE TABLE IF NOT EXISTS LABELS (
    label_id SERIAL PRIMARY KEY,
    project_id INT references PROJECTS(project_id),
    label_name VARCHAR(31) NOT NULL
);

CREATE TABLE IF NOT EXISTS ISSUES (
    issue_id SERIAL PRIMARY KEY,
    project_id INT references PROJECTS(project_id),
    issue_title VARCHAR(63) NOT NULL,
    issue_description VARCHAR(255) DEFAULT(''),
    issue_state INT references STATES(state_id),
    issue_priority PRIORITY DEFAULT('None'),
    issue_start_date DATE,
    issue_end_date DATE
);

CREATE TABLE IF NOT EXISTS PROJECTS_MEMBERS (
    user_id INT NOT NULL references USERS(user_id),
    project_id INT NOT NULL references PROJECTS(project_id),
    role VARCHAR(63) DEFAULT('user'),
    PRIMARY KEY (user_id, project_id)
);

CREATE TABLE IF NOT EXISTS WORKSPACES_PROJECTS (
    workspace_id INT NOT NULL references WORKSPACES(workspace_id),
    project_id INT NOT NULL references PROJECTS(project_id),
    PRIMARY KEY (workspace_id, project_id)
);

CREATE TABLE IF NOT EXISTS SPRINTS_ISSUES (
    sprint_id INT NOT NULL references SPRINTS(sprint_id),
    issue_id INT NOT NULL references ISSUES(issue_id),
    PRIMARY KEY (sprint_id, issue_id)
);

CREATE TABLE IF NOT EXISTS ISSUES_ASSIGNEES (
    issue_id INT NOT NULL references ISSUES(issue_id),
    user_id INT NOT NULL references USERS(user_id),
    PRIMARY KEY (issue_id, user_id),
);

CREATE TABLE IF NOT EXISTS ISSUES_LABELS (
    issue_id INT NOT NULL references ISSUES(issue_id),
    label_id INT NOT NULL references LABELS(label_id),
    PRIMARY KEY (issue_id, label_id)
);