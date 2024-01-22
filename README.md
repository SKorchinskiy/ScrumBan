# ScrumBan

## Table of Contents

+ [Project Description](https://github.com/SKorchinskiy/ScrumBan?tab=readme-ov-file#project-description)

+ [Project Structure](https://github.com/SKorchinskiy/ScrumBan?tab=readme-ov-file#project-structure) 

+ [Project Workflow](https://github.com/SKorchinskiy/ScrumBan?tab=readme-ov-file#project-workflow)

+ [Why have I built this project ?](https://github.com/SKorchinskiy/ScrumBan?tab=readme-ov-file#why-have-i-built-this-project-)

+ [What did I learn ?](https://github.com/SKorchinskiy/ScrumBan?tab=readme-ov-file#what-did-i-learn-)

## Project Description

🗓️ ScrumBan - A Project Management microservice application that combines features of popular agile methodologies: Scrum and Kanban. The application is written in Typescript using:
- **React** *for components*
- **Next.js** *as a react framework*
- **HTML, CSS** *for markdown and styling*
- **Nest.js** *as node.js server framework for interacting with DB*
- **TypeORM** *as [object relational mapping](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) tool (internally converts requests into sql)*
- **PostgreSQL** *as a data storage*
- **Docker** *as standard tool to make the application multiplatform*

## Project Structure 

```
📦 scrumban
LICENSE
README.md
nestjs-backend
│  ├─ .dockerignore
auth
│  │  ├─ .eslintrc.js
│  │  ├─ .gitignore
│  │  ├─ .prettierrc
│  │  ├─ Dockerfile
│  │  ├─ README.md
docker-compose.yaml
│  │  ├─ nest-cli.json
│  │  ├─ package-lock.json
package.json
src
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ dto
│  │  │  │  ├─ createUser.dto.ts
│  │  │  │  └─ updateUser.dto.ts
mailer
│  │  │  │  ├─ mailer.module.ts
│  │  │  │  └─ mailer.service.ts
main.ts
tsconfig.build.json
│  │  └─ tsconfig.json
│  ├─ docker-compose.yaml
│  ├─ gateway
│  │  ├─ .eslintrc.js
│  │  ├─ .gitignore
│  │  ├─ .prettierrc
│  │  ├─ Dockerfile
│  │  ├─ README.md
│  │  ├─ docker-compose.yaml
│  │  ├─ nest-cli.json
│  │  ├─ package-lock.json
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ app.controller.spec.ts
│  │  │  ├─ app.controller.ts
│  │  │  ├─ app.module.ts
│  │  │  ├─ app.service.ts
│  │  │  ├─ auth
│  │  │  │  ├─ auth.controller.ts
│  │  │  │  └─ auth.service.ts
│  │  │  ├─ decorators
│  │  │  │  └─ user.decorator.ts
│  │  │  ├─ dto
│  │  │  │  ├─ create-project.dto.ts
│  │  │  │  ├─ create-stats.dto.ts
│  │  │  │  ├─ createUser.dto.ts
│  │  │  │  ├─ get-stats.dto.ts
│  │  │  │  ├─ update-project.dto.ts
│  │  │  │  ├─ update-stats.dto.ts
│  │  │  │  └─ updateUser.dto.ts
│  │  │  ├─ guards
│  │  │  │  └─ auth.guard.ts
│  │  │  ├─ main.ts
│  │  │  ├─ middlewares
│  │  │  │  └─ activity.middleware.ts
│  │  │  ├─ project
│  │  │  │  ├─ issue
│  │  │  │  │  ├─ dto
│  │  │  │  │  │  ├─ create-issue.dto.ts
│  │  │  │  │  │  └─ update-issue.dto.ts
│  │  │  │  │  ├─ issue.controller.ts
│  │  │  │  │  └─ issue.service.ts
│  │  │  │  ├─ label
│  │  │  │  │  ├─ dto
│  │  │  │  │  │  ├─ create-label.dto.ts
│  │  │  │  │  │  └─ update-label.dto.ts
│  │  │  │  │  ├─ label.controller.ts
│  │  │  │  │  └─ label.service.ts
│  │  │  │  ├─ project.controller.ts
│  │  │  │  ├─ project.service.ts
│  │  │  │  ├─ sprint
│  │  │  │  │  ├─ dto
│  │  │  │  │  │  ├─ create-sprint.dto.ts
│  │  │  │  │  │  └─ update-sprint.dto.ts
│  │  │  │  │  ├─ sprint.controller.ts
│  │  │  │  │  └─ sprint.service.ts
│  │  │  │  └─ state
│  │  │  │     ├─ dto
│  │  │  │     │  ├─ create-state.dto.ts
│  │  │  │     │  └─ update-state.dto.ts
│  │  │  │     ├─ state.controller.ts
│  │  │  │     └─ state.service.ts
│  │  │  ├─ user
│  │  │  │  ├─ user.controller.ts
│  │  │  │  └─ user.service.ts
│  │  │  ├─ utils
│  │  │  │  └─ user-message-pattern.util.ts
│  │  │  └─ workspace
│  │  │     ├─ dto
│  │  │     │  ├─ create-workspace.dto.ts
│  │  │     │  └─ update-workspace.dto.ts
│  │  │     ├─ workspace.controller.ts
│  │  │     └─ workspace.service.ts
│  │  ├─ test
│  │  │  ├─ app.e2e-spec.ts
│  │  │  └─ jest-e2e.json
│  │  ├─ tsconfig.build.json
│  │  └─ tsconfig.json
│  ├─ project
│  │  ├─ .eslintrc.js
│  │  ├─ .gitignore
│  │  ├─ .prettierrc
│  │  ├─ Dockerfile
│  │  ├─ README.md
│  │  ├─ docker-compose.yaml
│  │  ├─ nest-cli.json
│  │  ├─ package-lock.json
│  │  ├─ package.json
│  │  ├─ src
dto
│  │  │  │  ├─ create-issue.dto.ts
│  │  │  │  ├─ create-label.dto.ts
create-project.dto.ts
create-sprint.dto.ts
create-state.dto.ts
│  │  │  │  ├─ update-issue.dto.ts
│  │  │  │  ├─ update-label.dto.ts
update-project-member.dto.ts
│  │  │  │  ├─ update-project.dto.ts
│  │  │  │  ├─ update-sprint.dto.ts
│  │  │  │  └─ update-state.dto.ts
│  │  │  ├─ entities
issue.entity.ts
│  │  │  │  ├─ label.entity.ts
│  │  │  │  ├─ member.entity.ts
project.entity.ts
│  │  │  │  ├─ sprint.entity.ts
│  │  │  │  └─ state.entity.ts
│  │  │  ├─ issue
│  │  │  │  ├─ issue.controller.ts
│  │  │  │  ├─ issue.module.ts
│  │  │  │  └─ issue.service.ts
│  │  │  ├─ label
│  │  │  │  ├─ label.controller.ts
│  │  │  │  ├─ label.module.ts
│  │  │  │  └─ label.service.ts
│  │  │  ├─ main.ts
│  │  │  ├─ member
│  │  │  │  ├─ member.controller.ts
│  │  │  │  ├─ member.module.ts
│  │  │  │  └─ member.service.ts
│  │  │  ├─ project.controller.ts
│  │  │  ├─ project.module.ts
│  │  │  ├─ project.service.ts
│  │  │  ├─ providers
database.provider.ts
│  │  │  │  └─ project.provider.ts
│  │  │  ├─ sprint
│  │  │  │  ├─ sprint.controller.ts
│  │  │  │  ├─ sprint.module.ts
│  │  │  │  └─ sprint.service.ts
│  │  │  └─ state
│  │  │     ├─ state.controller.ts
│  │  │     ├─ state.module.ts
│  │  │     └─ state.service.ts
│  │  ├─ tsconfig.build.json
│  │  └─ tsconfig.json
│  ├─ user
│  │  ├─ .dockerignore
│  │  ├─ .eslintrc.js
│  │  ├─ .gitignore
│  │  ├─ .prettierrc
│  │  ├─ Dockerfile
│  │  ├─ README.md
│  │  ├─ docker-compose.yaml
│  │  ├─ nest-cli.json
│  │  ├─ package-lock.json
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ dto
│  │  │  │  ├─ createUser.dto.ts
│  │  │  │  └─ updateUser.dto.ts
│  │  │  ├─ entities
│  │  │  │  └─ user.entity.ts
│  │  │  ├─ main.ts
│  │  │  ├─ providers
│  │  │  │  ├─ database.provider.ts
│  │  │  │  └─ user.provider.ts
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.module.ts
│  │  │  ├─ user.service.ts
│  │  │  └─ utils
│  │  │     └─ user-message-pattern.util.ts
│  │  ├─ tsconfig.build.json
│  │  └─ tsconfig.json
│  └─ workspace
│     ├─ .eslintrc.js
│     ├─ .gitignore
│     ├─ .prettierrc
│     ├─ Dockerfile
│     ├─ README.md
│     ├─ docker-compose.yaml
│     ├─ nest-cli.json
│     ├─ package-lock.json
│     ├─ package.json
│     ├─ src
│     │  ├─ dto
│     │  │  ├─ create-stats.dto.ts
│     │  │  ├─ create-workspace.dto.ts
│     │  │  ├─ get-stats.dto.ts
│     │  │  ├─ update-stats.dto.ts
│     │  │  └─ update-workspace.dto.ts
│     │  ├─ entities
│     │  │  ├─ stats.entity.ts
│     │  │  └─ workspace.entity.ts
│     │  ├─ main.ts
│     │  ├─ providers
│     │  │  ├─ database.provider.ts
│     │  │  └─ workspace.provider.ts
│     │  ├─ stats
│     │  │  ├─ stats.controller.ts
│     │  │  ├─ stats.module.ts
│     │  │  └─ stats.service.ts
│     │  ├─ workspace.controller.ts
│     │  ├─ workspace.module.ts
│     │  └─ workspace.service.ts
│     ├─ tsconfig.build.json
│     └─ tsconfig.json
└─ nextjs-frontend
   ├─ .eslintrc.json
   ├─ .gitignore
   ├─ Dockerfile
   ├─ README.md
   ├─ next.config.js
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  └─ app
   │     ├─ _components
   │     │  ├─ form-frame
   │     │  │  ├─ form-frame.component.tsx
   │     │  │  └─ form-frame.module.css
   │     │  ├─ frame-box
   │     │  │  ├─ frame-box.component.tsx
   │     │  │  └─ frame-box.module.css
   │     │  ├─ issue-card
   │     │  │  ├─ issue-card.component.tsx
   │     │  │  └─ issue-card.module.css
   │     │  ├─ issue-update-modal
   │     │  │  ├─ issue-update-modal.component.tsx
   │     │  │  └─ issue-update-modal.module.css
   │     │  ├─ issues-board
   │     │  │  ├─ issue-board.module.css
   │     │  │  └─ issues-board.component.tsx
   │     │  ├─ sign-in-form
   │     │  │  ├─ sign-in-form.component.tsx
   │     │  │  └─ sign-in-form.module.css
   │     │  └─ sign-up-form
   │     │     ├─ sign-up-form.component.tsx
   │     │     └─ sign-up-form.module.css
   │     ├─ favicon.ico
   │     ├─ globals.css
   │     ├─ layout.tsx
   │     ├─ page.module.css
   │     ├─ page.tsx
   │     ├─ types
   │     │  └─ types.ts
   │     ├─ verify
   │     │  └─ [token]
   │     │     └─ page.tsx
   │     └─ workspaces
   │        ├─ [workspaceId]
   │        │  ├─ dashboard
   │        │  │  ├─ _components
   │        │  │  │  ├─ activity-graph
   │        │  │  │  │  ├─ activity-graph.component.tsx
   │        │  │  │  │  └─ activity-graph.module.css
   │        │  │  │  ├─ activity-overview
   │        │  │  │  │  ├─ activity-overview.component.tsx
   │        │  │  │  │  └─ activity-overview.module.css
   │        │  │  │  └─ box-shaped-day
   │        │  │  │     ├─ box-shaped-day.component.tsx
   │        │  │  │     └─ box-shaped-day.module.css
   │        │  │  ├─ page.module.css
   │        │  │  └─ page.tsx
   │        │  ├─ globals.css
   │        │  ├─ issues
   │        │  │  ├─ page.module.css
   │        │  │  └─ page.tsx
   │        │  ├─ layout.tsx
   │        │  └─ projects
   │        │     ├─ [projectId]
   │        │     │  ├─ issues
   │        │     │  │  ├─ page.module.css
   │        │     │  │  └─ page.tsx
   │        │     │  └─ sprints
   │        │     │     ├─ [sprintId]
   │        │     │     │  ├─ page.module.css
   │        │     │     │  └─ page.tsx
   │        │     │     ├─ _components
   │        │     │     │  ├─ issue-selector
   │        │     │     │  │  ├─ issue-selector.component.tsx
   │        │     │     │  │  └─ issue-selector.module.css
   │        │     │     │  └─ sprint-creational-modal
   │        │     │     │     ├─ sprint-creational-modal.component.tsx
   │        │     │     │     └─ sprint-creational-modal.module.css
   │        │     │     ├─ page.module.css
   │        │     │     └─ page.tsx
   │        │     ├─ _components
   │        │     │  ├─ creational-modal
   │        │     │  │  ├─ creational-modal.component.tsx
   │        │     │  │  └─ creational-modal.module.css
   │        │     │  ├─ project-card
   │        │     │  │  ├─ project-card.component.tsx
   │        │     │  │  └─ project-card.module.css
   │        │     │  └─ project-list
   │        │     │     ├─ project-list.component.tsx
   │        │     │     └─ project-list.module.css
   │        │     ├─ page.module.css
   │        │     └─ page.tsx
   │        ├─ _components
   │        │  ├─ issue-creational-modal
   │        │  │  ├─ issue-creational-modal.component.tsx
   │        │  │  └─ issue-creational-modal.module.css
   │        │  ├─ panel-header
   │        │  │  ├─ panel-header.component.tsx
   │        │  │  └─ panel-header.module.css
   │        │  ├─ project-representation
   │        │  │  ├─ project-representation.component.tsx
   │        │  │  └─ project-representation.module.css
   │        │  ├─ sidebar
   │        │  │  ├─ sidebar.component.tsx
   │        │  │  └─ sidebar.module.css
   │        │  ├─ state-creational-modal
   │        │  │  ├─ state-creational-modal.component.tsx
   │        │  │  └─ state-creational-modal.module.css
   │        │  ├─ workspace-creational-modal
   │        │  │  ├─ workspace-creational-modal.component.tsx
   │        │  │  └─ workspace-creational-modal.module.css
   │        │  └─ workspace-list
   │        │     ├─ workspace-list.component.tsx
   │        │     └─ workspace-list.module.css
   │        ├─ page.module.css
   │        └─ page.tsx
   └─ tsconfig.json
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)
## Project Workflow

The project is deployed using AWS. You can check it [here](http://ec2-18-193-109-186.eu-central-1.compute.amazonaws.com:3000/)

## Higher level overview

![Application Workflow](https://drive.google.com/uc?id=191VgPvCawKtmep8JmgCljCSVetVwIs3r)

> [!TIP]
> As you can see from the workflow, the connections between services use TCP. This can be improved by using
> [message brokers](https://en.wikipedia.org/wiki/Message_broker) (Kafka, RabbitMQ). This can help not to miss
> important application lifecycle methods when one or more services are unavailable.

### Entity-Relationship Diagram
![ER-Diagram](https://drive.google.com/uc?id=1EqHhdzNaBFy9TW1-4fSgAPX22rflvjDs)

> [!IMPORTANT]
> As you can see from ER-diagram, there are several disconnected parts of the database. That is because some microservices have their own postgres
> instance running (in case microservices are distributed among some number of machines). It can potentially result into anomalies and data inconsistencies.
> To avoid negative side effects of distributed system, transactions must be implemented. **Currently, this version of the project has no transactions
> implemented**.

### Detailed description

- **Auth Page**: when opening the application, you should sign in or sign up to proceed. If you've registered, a mail with the link to verify the account will be send on the provided email.

![](https://drive.google.com/uc?id=1JJKNRaS60Bl1ZkcpGfA790bOrljrFz11)

- **Dashboard Page**: after signing in, you'll be redirected to the dashboard page (or if you've signed up, you'll need to create workspace)

![](https://drive.google.com/uc?id=1hfKfAahOH3UZ-nkxZDdmEPu8FI8vFkzQ)

> [!NOTE]
> + Using sidebar you can:
>   + switch between or create new workspaces
>   + create new issues
>   + check dashboard
>   + navigate to workspace specific projects
>   + check all workspace issues
>   + navigate to the project specific issues
>   + navigate to the project specific sprint
> + Using central part on the dashboard page you can:
>   + check your activity
>   + check all issues
>   + go to specific project

- **Issues Page**: there are different types of issues page (workspace issues, project issues, sprint issues), however the layout is the same

![](https://drive.google.com/uc?id=1mKmqSIHj3ukUSU6RnffR7fVB-6IZ4pXB)

> [!NOTE]
> You can:
>   + update issue information
>   + remote issue from the current context (sprint, project, workspace)
>   + drag and drop them to specific state (todo, in progress, done or custom state). **Each drag and drop rewrites issue's state in the database**

- **Sptints Page**: on this page you can create new sprints the list of which is displayed.

![](https://drive.google.com/uc?id=12FLSj-GnXKPBdreQ5q_-Ji7tMCDg_Sqo)

> [!NOTE]
> Inside each sprint you have similar layout to the previously demonstrated. However, you can also add existing issues to the sprint

- **Creational Modals**

#### Workspace Creational Modal

![](https://drive.google.com/uc?id=1JqwMy4VHHvAvoZ9GqXXgRr3u27JEsDwF)

#### Project Creational Modal

![](https://drive.google.com/uc?id=1Ztlw5qsaBoSu5eJ029ND17yIO1C-k6P3)

#### State Creational Modal

![](https://drive.google.com/uc?id=1bpGWSfIwYnB4y0lOVJJYVJ1Vv1_MaHYY)

#### Issue Creational Modal

![](https://drive.google.com/uc?id=1MKH789q7oitdvoY1fZGM9vpzfp7xibNi)

#### Sprint Creational Modal

![](https://drive.google.com/uc?id=1PxZkzbYoX7BfldH0TImjuIEaoUrv7FZu)

## Why have I built this project ?

I've built ScrumBan (Scrum + Kanban) project to experiment with microservice architecture as well as to improve my skills in web development. 
In the next section I've listed what I've learned during the project building process.

## What did I learn ?

+ **Technologies**: React, Next.js, HTML, CSS, Nest.js, TypeORM, PostgreSQL, Docker
+ **Strategies and Concepts**: scrum, kanban, agile, microservice architecture, distributed systems, containerization, object relational mapping, message brokers (basics)
