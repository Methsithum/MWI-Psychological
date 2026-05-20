# LMS Backend Architecture

## Folder Structure
- `config/` database and third-party configuration
- `controllers/` request handlers
- `controllers/studentController.js` teacher/admin student filtering and course-wise reporting
- `middleware/` auth, upload, and error handlers
- `models/` Mongoose schemas and relationships
- `models/StudentRegistration.js` student onboarding request lifecycle
- `models/PaymentInformation.js` manual payment metadata + uploaded slip reference
- `routes/` Express routers
- `routes/studentRoutes.js` course-wise student lists and count APIs
- `uploads/` local development file storage
- `utils/` reusable helpers

## Core Modules
- Authentication
- User Management
- Course Management
- Student Registration + Approval
- Payment Slip Upload Management
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
1. Student fetches published courses via `GET /api/courses/available`.
2. Student submits registration and payment slip via `POST /api/auth/register/student`.
3. System stores registration in `StudentRegistration` and payment in `PaymentInformation` with status `pending`.
4. Admin reviews pending registrations via `GET /api/users/pending-students`.
5. Admin approves using `PATCH /api/users/students/:id/approve` (registration ID), then:
  - Creates/updates `User` with role `student`
  - Sets `status: approved`
  - Sets initial password to NIC (bcrypt hash through model hook)
  - Sets `forcePasswordChange: true`
  - Adds student to related `Course.students`
6. Admin can reject using `PATCH /api/users/students/:id/reject`.
7. Approved students log in and can change password via `PATCH /api/auth/change-password`.

## MongoDB Relationships
- `Course.teacher -> User._id`
- `Course.students[] -> User._id`
- `User.course -> Course._id`
- `StudentRegistration.course -> Course._id`
- `StudentRegistration.user -> User._id` (after approval)
- `StudentRegistration.paymentInformation -> PaymentInformation._id`
- `PaymentInformation.registration -> StudentRegistration._id`

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
- `POST /api/auth/login/:role`
- `POST /api/auth/register/student`
- `PATCH /api/auth/change-password`
- `GET /api/courses/available`
- `GET /api/users/pending-students`
- `PATCH /api/users/students/:id/approve`
- `PATCH /api/users/students/:id/reject`
- `GET /api/students/course/:courseId`
- `GET /api/courses/:courseId/students`
- `GET /api/students/course-wise`
- `GET /api/students/course-counts`
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
  "message": "Student registration submitted for approval",
  "data": {
    "registrationId": "682bf2...",
    "email": "student@example.com",
    "status": "pending",
    "selectedCourse": {
      "id": "682be1...",
      "title": "Diploma in Psychology",
      "code": "PSY101"
    },
    "paymentInformation": {
      "paymentMethod": "bank_transfer",
      "transactionId": "TRX12345",
      "paymentSlipUrl": "/uploads/1747...pdf"
    }
  }
}
```

### Error
```json
{
  "success": false,
  "message": "Student account is not approved"
}
```

## Security Best Practices Applied
- Password hashing with `bcryptjs` model hook
- JWT + role-based route protection (`protect`, `authorizeRoles`)
- Block unapproved students from login and protected routes
- Strict upload type/size validation for payment slips (JPEG, PNG, PDF)
- Request validation using `express-validator`
- Helmet + rate limiter + centralized error handling

## Recommended Development Order
1. Apply model changes and migrations/seeding checks.
2. Integrate registration endpoint with payment slip upload.
3. Integrate admin pending/approve/reject workflow.
4. Add teacher course-wise student listing + counts.
5. Update frontend forms to send multipart data.
6. Add API tests for registration lifecycle and auth edge cases.
