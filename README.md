# Overview
## Objective
Create an application that facilitates the tracking, management, and resolution of software bugs and issues within a development environemnet.

## Scope
The Bug Tracker is a web based application that allows users to report, track, and manage software defects throughout the software development lifecycle. It will provide a centralized collaboration environment among teams, testers, and stakeholders.

## Intended Audience
The intended audience for this application is developers, testers, project managers, and other stakeholders involved in the software development process.

## Product Features
1. **User Authentication**: Users will be required to log in with valid credentials to access the Bug Tracking System
2. **Bug Reporting**: Users can submit detailed bug reports, including information such as the issue description, steps to reproduce, and attatchments.
3. **Issue Tracking**: The system will provided centralized dashboard to view and track the status of reported bugs, Each bug will have a unique identifier.
4. **User Roles**: The Bug Tracker will support the different roles; Developer, Tester, Manager, Admin, with varying levels of access and permissions
5. **Email Notifications**: Automatic email notifications to relevant users on creation, updates, and resolution.
6. **Search and Filter**: Users can search for bugs based on various criteria and apply filters to narrow down the list.
7. **Reporting and Analytics**: Generate reports and analytics to track bug trends, resolution times, and other relevant metrics.

## User Classes and Characteristics
1. **Administrator**: Manages user roles, system configuration, and overall system maintenance.
2. **Developer**: Responsible for resolving assigned bugs and updating their status.
3. **Tester**: Reports bugs, verifies bug fixes, and communicates with developers.
4. **Manager**: Monitors overall bug status, assigns tasks, and generates reports.

# System Features
### 1. User Management
The system shall provide user authentication and authorization functionalities.
#### Inputs:
- Plain text (username, password)
- github auth0
#### Outputs:
- Successful login confirmation

### 2. Bug Reporting
Users shall be able to submit detailed bug reports.
#### Inputs:
- Bug title
- Description
- Priotity
- Assignee
- Type
- Submitter
- Created timestamp
- Updated timestamp
- Project
- Steps to Reproduce
- Attatchements (if applicable)
#### Outputs:
- unique bug identifier

### 3. Issue Tracking
The system shall maintain a centralized dashboard for tracking the status of reported bugs within a project.
#### Inputs:
- Project details
#### Outputs:
- Bug List
- Bug status (e.g., open, in progress, closed)

### 4. User Roles
The system will allow for the different roles:
#### Developer
- update status of issues
- resolve issues
#### Tester
- Create issues
- verify bug completion
#### Manager
- assign tasks
- generate reports
#### Admin
- manage user roles
- system configuration
- project maintanence

### 5. Email Notifications
The system will send relevant email notifications when updating a shared resource
#### Inputs:
- Resource update (e.g., issue resolution, issue creation, project invite)
#### Outputs:
- email notification

### 6. Search and Filter
Users can search and filter issues based on certain criteria
#### Inputs:
- status
- assignee
- date create
- id

### 7. Project Groups
Admins can create projects and add/manager users within a project
#### Inputs:
- project name
- project description
#### Outputs:
- unique project id

### 8. Reporting and Analytics
Generate reports and analytics to track bug trends. Accessible to Managers and Admins.
#### Inputs:
- Resolution Times
- ticket count by priority
#### Outputs:
- graphs of relevant trends

