---

# Role-Based Access Control (RBAC) System - Front-End

## Overview

This project is a **Role-Based Access Control (RBAC)** system's front-end developed in React. It enables administrators, teachers, and students to interact with a structured interface for managing classes, students, teachers, subjects, and attendance. The application uses Redux for state management and is organized into components and pages for clarity and scalability.

---

## Features

### User Roles
- **Admin**: Manage classes, students, teachers, and subjects.
- **Teacher**: View and manage their classes and student details.
- **Student**: View their profile and attendance details.

### Core Functionalities
1. **Admin Dashboard**:
   - Add and manage classes, students, teachers, and subjects.
   - View student attendance and other related information.

2. **Teacher Dashboard**:
   - View class details.
   - Manage student data related to their subjects.

3. **Student Dashboard**:
   - View personal profile.
   - Access attendance details.

4. **Reusable Components**:
   - Tables, forms, modals, and buttons styled with custom templates.

5. **State Management**:
   - Implemented with Redux for managing global application state.

---

## Directory Structure

### Key Folders
1. **`src/components`**:  
   Contains reusable components like menus, tables, styles, popups, and utility templates.

2. **`src/pages`**:  
   Organized by user roles:
   - `admin`: Handles admin-specific pages and actions.
   - `teacher`: Pages for teacher-related functionalities.
   - `student`: Pages for student-specific tasks.

3. **`src/redux`**:  
   Redux slices and handlers for managing state logic related to classes, students, teachers, and users.

4. **Other Files**:
   - **`index.js`**: Entry point of the React application.
   - **`App.js`**: Contains routing logic for navigating between pages.
   - **`index.css`**: Global styles for the application.

---

## Prerequisites

### Tools Required
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Dependencies
1. **React**: Front-end framework.
2. **Redux**: State management.
3. **React-Router**: For navigation between pages.

---

## Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd Role-Based-Access-Control-RBAC-System---front-end-master
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application:
   - Visit `http://localhost:3000` in your web browser.

---

## Folder Details and Files

### `src/components`
Reusable elements such as:
- `AccountMenu.js`: Handles user account-related actions.
- `TableTemplate.js`: Renders tabular data with dynamic props.
- `Popup.js`: Creates modals for interactive actions.

### `src/pages`
Role-based pages organized into:
- **Admin**:  
  - `AdminDashboard.js`: Admin's main control panel.
  - `AddClass.js`, `AddStudent.js`: Forms for adding records.
- **Teacher**:  
  - `TeacherDashboard.js`: Main dashboard for teachers.
  - `TeacherViewStudent.js`: View student details.
- **Student**:  
  - `StudentDashboard.js`: Dashboard for student role.
  - `ViewStdAttendance.js`: View attendance history.

### `src/redux`
State logic, separated into modules:
- `userRelated`: User-related actions and reducers.
- `sclassRelated`: Class-related state logic.
- `teacherRelated`: Handles teacher-specific state updates.
- `studentRelated`: State for managing students' data.

---

## How to Use

### Admin
1. Log in as an Admin.
2. Navigate through the dashboard to:
   - Add classes, teachers, or students.
   - Assign subjects and manage records.

### Teacher
1. Log in as a Teacher.
2. View assigned classes and manage student information.

### Student
1. Log in as a Student.
2. View profile details and attendance history.

---

## Deployment

1. Build the application:
   npm run build

---

## Future Enhancements(In MY POV)
- Integrate API endpoints for dynamic data fetching.
- Add authentication and role-based routing using libraries like **JWT**.
- Improve UI/UX for mobile responsiveness.

---
