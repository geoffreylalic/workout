## 0.13.0 (2025-11-26)

### Feat

- **dashboard**: added dynamic rendering of rest, weight and repetitions
- **dashboard**: added repeitions and rest metric to volume

### Fix

- **dashboard**: fixed ordering of volumes

## 0.12.0 (2025-11-25)

### Feat

- **dashboard**: added line chart to visualize volume of previous workout
- **dashboard**: added query to get overall volume

## 0.11.0 (2025-11-24)

### Feat

- **workout**: added delete workout from a dialog
- **exercice**: delete exercice with a dialog

## 0.10.0 (2025-11-24)

### Feat

- **create-workout**: added createdat date to workout creation
- **shad**: added popover and calendar component from shad cn

## 0.9.2 (2025-11-23)

### Fix

- **set**: fixed position of sets
- **auth**: render login page when access_token has expired

## 0.9.1 (2025-11-23)

### Fix

- **workout**: fixed workout name after update

## 0.9.0 (2025-11-22)

### Feat

- **workout**: added update workout name

## 0.8.0 (2025-11-22)

### Feat

- **workout**: added drag and drop on exercices
- **workout**: added change position exercices on workout

### Fix

- **exercice**: refactored change position set api

## 0.7.0 (2025-11-19)

### Feat

- **exercices**: calculated total reps, weight and rest

## 0.6.0 (2025-11-19)

### Feat

- **set**: added ui on changing position of sets
- **package**: added dnd kit and dnd sortable
- **set**: added change position route

### Fix

- **set**: missing tablerow on table of set

## 0.5.0 (2025-11-16)

### Feat

- **exercice**: manage exercice position
- **sets**: sort sets by positions
- **set**: added position in query
- **models**: added positions to exercices and sets
- **exercice**: added query change name exercice

### Fix

- **workout-id**: parse int workout id params
- **scripts**: update scripts
- **config**: removed unused fime
- **app-config**: fix app config for autocompletion

## 0.4.13 (2025-11-14)

### Fix

- **config**: added _redirects

## 0.4.12 (2025-11-14)

### Fix

- **app-config**: fix vite config

## 0.4.11 (2025-11-14)

### Fix

- **login**: removed login from context
- **tsconfig**: fixed tsconfig to include files to build

## 0.4.10 (2025-11-14)

### Fix

- **package**: fixed package scripts

## 0.4.9 (2025-11-14)

### Fix

- **package**: fix run dev

## 0.4.8 (2025-11-12)

### Fix

- **packages**: updated packages

## 0.4.7 (2025-11-12)

### Fix

- **test**: test

## 0.4.6 (2025-11-12)

### Fix

- **create-object**: fixed ids

## 0.4.5 (2025-11-12)

### Refactor

- **types**: added type to all routes

## 0.4.4 (2025-11-12)

### Fix

- **auth**: fixed login and logout flow

## 0.4.3 (2025-11-12)

### Fix

- **regiter**: refactored and removed password from the response
- **register**: cannot create user with an existing email$
- **types**: added user type to the request

## 0.4.2 (2025-11-11)

### Fix

- **config**: update config

## 0.4.1 (2025-11-11)

### Fix

- **config**: run locally or in production

## 0.4.0 (2025-11-11)

### Feat

- **register**: added register page
- **signup**: added signup block of shadcn
- added create workout as dialog
- **components**: added shadcn field and dialog
- added logout
- **workout**: delete workout
- **workout**: get one workout
- **workouts**: added workouts actions
- **workouts**: list workouts
- **sets**: delete sets in workout creation
- **exercices**: delete exercice from workout creation
- **set**: update set during workout creation
- **set**: add set to workout
- **workout**: create workout by name

### Fix

- **set**: fixed management of sets
- **workout**: fixed refresh of current workout while updating exercices
- **Auth**: rename file client and used axios interceptors
- **workouts**: list workouts
- **set**: never disable delete set
- **sets**: querykey and showing sets on exercices

### Refactor

- **user-context**: added user in context after login
- **exercice**: removed useless logic
- **delete-v1**: removed all file related to v1
- **global-workout**: refactored workout creation and query keys management
- **vite**: migrated to vite
- **vite**: migrating to vite

## 0.2.0 (2025-05-04)

### Feat

- **production**: handling production environment

### Fix

- **login**: moved login in authentication context

## 0.1.3 (2025-04-24)

### Fix

- **ci**: chose right directory
- **ci**: change directory for migration

## 0.1.2 (2025-04-23)

### Fix

- **ci**: fix indentation
- **ci**: missing cd

## 0.1.1 (2025-04-23)

### Fix

- **deployement**: deploy on render

## 0.1.0 (2025-03-12)

### Feat

- delete exercice from workout
- add delete query
- create exercice in selected workout
- delete set
- update set
- add set in exercice
- wip ui create exercices
- update workout name
- delete workout
- list and create workout
- added auth context without redirection
- added workouts page
- add sidebar
- added home page
- added login page
- add routes
- added Tailwind to project react
- added commitizen
- added react project

### Fix

- redirect after login
- handle edit
- multiple same keys
- view workout
- refresh returning on login page
- rename
- authentication provider
- change class into classname

### Refactor

- remove unused logo
- use index export pages
- use python 3.12 syntax

### Perf

- added workout dataset as queries
