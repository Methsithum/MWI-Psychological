# LMS Backend Architecture

## Folder Structure
- `config/` database and third-party configuration
- `controllers/` request handlers
- `middleware/` auth, upload, and error handlers
- `models/` Mongoose schemas and relationships
- `routes/` Express routers
- `uploads/` local development file storage
- `utils/` reusable helpers

## Core Modules
- Authentication
- User Management
- Course Management
- Material Management
- Video Upload
- Attendance
- Assignment
- Submission
- Notification
- Report
- Dashboard

## JWT Flow
1. User submits credentials.
2. Server validates role and password.
3. JWT is generated with user id, role, and status.
4. Client stores token and attaches it as `Bearer` token.
5. Protected routes run `protect` and `authorizeRoles` middleware.

## Student Approval Workflow
- New student registration creates a user with `status: pending`.
- Pending students cannot access protected routes.
- Admin can list, approve, or reject students.
- Only approved students can log in successfully.

## Recommended Packages
- `express`
- `mongoose`
- `dotenv`
- `cors`
- `helmet`
- `express-rate-limit`
- `jsonwebtoken`
- `bcryptjs`
- `multer`
- `morgan`
- `cookie-parser`
- `express-validator`
- `nodemon`

## Example Endpoints
- `POST /api/auth/login`
- `POST /api/auth/register/student`
- `GET /api/users/pending-students`
- `PATCH /api/users/students/:id/approve`
- `POST /api/courses`
- `POST /api/materials`
- `POST /api/videos`
- `POST /api/attendance`
- `POST /api/assignments`
- `POST /api/submissions`
- `GET /api/dashboard/summary`

## Sample Responses
### Success
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "...",
    "role": "student",
    "status": "approved"
  }
}
```

### Error
```json
{
  "success": false,
  "message": "Forbidden: insufficient role access"
}
```
