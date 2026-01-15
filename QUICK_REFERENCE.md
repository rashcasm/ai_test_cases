# Car Rental Tests - Quick Reference Guide

## 📁 File Structure

```
car-rental-tests/
├── tests/
│   ├── auth/
│   │   ├── auth.signup.test.js          (88 lines, 7 tests)
│   │   ├── auth.login.test.js           (86 lines, 5 tests)
│   │   ├── auth.security.test.js        (64 lines, 7 tests)
│   │   ├── auth.edge-cases.test.js      (290 lines, ~40 tests)
│   │   └── auth.middleware.test.js      (428 lines, ~50 tests)
│   ├── booking/
│   │   ├── booking.create.test.js       (187 lines, ~20 tests)
│   │   ├── booking.read.test.js         (176 lines, ~8 tests)
│   │   ├── booking.update-delete.test.js (277 lines, ~15 tests)
│   │   └── booking.edge-cases.test.js   (666 lines, ~60 tests)
│   ├── integration.test.js              (602 lines, ~30 tests)
│   └── helpers.js                       (137 lines, utilities)
├── vitest.config.js
├── package.json
├── TEST_COVERAGE.md
└── README.md
```

## 🧪 Test Count Summary

| Category | Test File | Tests Count |
|----------|-----------|------------|
| **Auth** | auth.signup.test.js | 7 |
| | auth.login.test.js | 5 |
| | auth.security.test.js | 7 |
| | auth.edge-cases.test.js | ~40 |
| | auth.middleware.test.js | ~50 |
| **Booking** | booking.create.test.js | ~20 |
| | booking.read.test.js | ~8 |
| | booking.update-delete.test.js | ~15 |
| | booking.edge-cases.test.js | ~60 |
| **Integration** | integration.test.js | ~30 |
| **TOTAL** | **10 files** | **~242 tests** |

## 🔐 What Gets Tested

### Authentication (109 lines, ~109 tests)
- User signup with validation
- User login with token generation
- Security invariants
- Authorization middleware
- Edge cases and input validation
- Password security
- Token validation

### Booking Operations (1,306 lines, ~103 tests)
- Create bookings with validation
- Read bookings (list, detail, summary)
- Update bookings (details and status)
- Delete bookings
- Boundary condition testing
- Multi-user isolation
- Status workflows
- Cost calculations

### Integration Tests (602 lines, ~30 tests)
- Complete user workflows
- Concurrent operations
- Data consistency
- Multi-user scenarios
- Status transitions
- Large dataset handling

## 🚀 Quick Start

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npm test tests/auth/auth.signup.test.js
```

### Run tests with watch mode
```bash
npm test -- --watch
```

### Run only auth tests
```bash
npm test tests/auth
```

### Run only booking tests
```bash
npm test tests/booking
```

## 📊 Coverage Areas

### Positive Scenarios ✅
- Valid user creation and login
- Successful booking operations
- Correct calculations and formatting
- Proper status transitions

### Negative Scenarios ❌
- Invalid inputs and edge cases
- Missing required fields
- Boundary value violations
- Unauthorized access attempts
- Cross-user access prevention

### Security 🔒
- SQL injection prevention
- XSS attack prevention
- Authentication enforcement
- Authorization validation
- Token security
- Error message sanitization
- User data isolation

### Edge Cases 🎯
- Very long inputs (>255 chars)
- Special characters handling
- Null/undefined values
- Negative numbers
- Decimal values
- Whitespace handling
- Concurrent operations
- Large datasets (20+ bookings)

## 🧩 Test Helpers

Located in `tests/helpers.js`:

```javascript
// HTTP Methods
post(path, body, token)
get(path, token)
put(path, body, token)
del(path, token)

// User Generation
generateUsername(prefix)
createUserAndGetToken()
generateTestToken(userId, username)

// Constants
BASE_URL = "http://localhost:3000"
JWT_SECRET = "sunphool"
```

## 📋 Test Categories

### By Feature
- **Auth**: Signup, Login, Security, Middleware
- **Bookings**: Create, Read, Update, Delete
- **Integration**: Cross-feature workflows

### By Type
- **Unit Tests**: Individual endpoint testing
- **Integration Tests**: Feature interaction
- **Security Tests**: Auth and data isolation
- **Edge Case Tests**: Boundary conditions

### By Scope
- **Single User**: User-specific operations
- **Multi-User**: Cross-user scenarios
- **Concurrent**: Simultaneous operations
- **Large Scale**: Many bookings/users

## 🎯 Key Testing Principles

1. **Isolation**: Each test is independent
2. **Repeatability**: Tests use unique data generation
3. **Coverage**: All code paths tested
4. **Security**: Special focus on vulnerabilities
5. **Clarity**: Descriptive test names
6. **Maintenance**: Well-organized file structure

## 📝 Test Naming Convention

- `auth.*.test.js` - Authentication-related tests
- `booking.*.test.js` - Booking-related tests
- `integration.test.js` - Cross-feature tests
- `helpers.js` - Shared utilities and helpers

Each describe block starts with the endpoint: `POST /auth/signup`, `GET /bookings`, etc.

## 🔍 Example Test Cases

### Auth Signup
```javascript
it("creates a new user successfully", async () => {
  const res = await post("/auth/signup", { username, password });
  expect(res.status).toBe(201);
})
```

### Booking Creation
```javascript
it("fails with 400 when days is greater than 365", async () => {
  const res = await post("/bookings", 
    { carName, days: 366, rentPerDay }, token);
  expect(res.status).toBe(400);
})
```

### Security
```javascript
it("user cannot read another user's booking", async () => {
  const res = await get(
    `/bookings?bookingId=${othersBooking}`, userToken);
  expect(res.status).toBe(404);
})
```

## ✨ Highlights

- **2,864 lines** of test code
- **~242 tests** covering all endpoints
- **Multiple test files** for organization
- **Comprehensive coverage** of happy paths and edge cases
- **Security-focused** with SQL injection and XSS tests
- **Multi-user scenarios** to ensure data isolation
- **Integration tests** for complete workflows
- **Well-documented** with clear test descriptions

## 🛠️ Backend Requirements

The tests expect:
- Backend running on `http://localhost:3000`
- JWT_SECRET environment variable set to `"sunphool"`
- Database with User and Booking models
- All endpoints implemented as per specification
- Vitest configuration with fork pool for isolation

## 📚 Additional Resources

See `TEST_COVERAGE.md` for:
- Detailed test descriptions
- Complete test statistics
- Test execution guide
- Future enhancement suggestions
