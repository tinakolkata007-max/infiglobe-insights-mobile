# API DOCUMENTATION - Infiglobe Insights

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://api.infiglobe.com/api`

## Authentication

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

Successful responses:

```json
{
  "message": "Success message",
  "data": {...}
}
```

Error responses:

```json
{
  "message": "Error message",
  "error": "Error details"
}
```

## Endpoints

### Authentication

#### Register

- **Method**: POST
- **Path**: `/auth/register`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "password": "SecurePassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {...}
  }
  ```

#### Login

- **Method**: POST
- **Path**: `/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token",
    "user": {...}
  }
  ```

### KYC

#### Get KYC Status

- **Method**: GET
- **Path**: `/kyc/status`
- **Auth**: Required
- **Response**:
  ```json
  {
    "status": "not_started|in_progress|verified|rejected",
    "document_type": "Aadhar|PAN|Passport"
  }
  ```

#### Submit KYC

- **Method**: POST
- **Path**: `/kyc/submit`
- **Auth**: Required
- **Body**:
  ```json
  {
    "pan_number": "XXXXXXXX123X",
    "aadhar_number": "XXXX XXXX XXXX",
    "document_type": "Aadhar",
    "bank_account": "XXXXXXXXXXXX"
  }
  ```

### Research

#### Get Intraday Research

- **Method**: GET
- **Path**: `/research/intraday`
- **Auth**: Required
- **Query**: `limit=10&offset=0`
- **Response**:
  ```json
  {
    "research": [
      {
        "id": 1,
        "title": "Research Title",
        "content": "...",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
  ```

### Education

#### Get Courses

- **Method**: GET
- **Path**: `/education/courses`
- **Auth**: Required
- **Response**:
  ```json
  {
    "courses": [
      {
        "id": 1,
        "title": "Course Title",
        "description": "...",
        "duration_weeks": 4,
        "price": 0
      }
    ]
  }
  ```

#### Enroll in Course

- **Method**: POST
- **Path**: `/education/enroll`
- **Auth**: Required
- **Body**:
  ```json
  {
    "course_id": 1
  }
  ```
- **Response**:
  ```json
  {
    "message": "Enrolled successfully",
    "progress": {...}
  }
  ```

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

- Currently not implemented in V1
- To be added in future versions
