# Car Rental API Test Suite - Comprehensive Documentation

This document outlines all the test cases created for the 100x Car Rental backend API.

## Test Structure Overview

The test suite is organized into the following categories:

### Authentication Tests
- **auth.signup.test.js** - User registration
- **auth.login.test.js** - User authentication
- **auth.security.test.js** - Security invariants
- **auth.edge-cases.test.js** - Input validation and edge cases
- **auth.middleware.test.js** - Authorization middleware and token validation

### Booking Tests
- **booking.create.test.js** - Booking creation
- **booking.read.test.js** - Booking retrieval and queries
- **booking.update-delete.test.js** - Booking updates and deletions
- **booking.edge-cases.test.js** - Input validation and boundary conditions

### Integration Tests
- **integration.test.js** - Cross-feature workflows and data consistency

---

## Test Coverage Details

### 1. Authentication Tests (auth.signup.test.js)

**User Registration Tests:**
- ✅ Creates user successfully with valid credentials
- ✅ Rejects duplicate usernames with 409 status
- ✅ Rejects signup with missing password (400)
- ✅ Rejects signup with missing username (400)
- ✅ Rejects signup when both fields are missing
- ✅ Does not leak plain password in response
- ✅ Returns userId in response

### 2. Authentication Tests (auth.login.test.js)

**User Login Tests:**
- ✅ Logs in successfully with correct credentials
- ✅ Returns valid JWT token on successful login
- ✅ Rejects login with incorrect password (401)
- ✅ Rejects login with non-existent user (401)
- ✅ Rejects login with missing password (400)
- ✅ Rejects login with missing username (400)
- ✅ Token payload contains userId and username

### 3. Security Tests (auth.security.test.js)

**Security Invariants:**
- ✅ Does not leak internal error details
- ✅ JWT token only returned on successful login
- ✅ Rejects /bookings requests without authorization header
- ✅ Rejects requests with missing Bearer token
- ✅ Rejects requests with invalid token
- ✅ Accepts valid JWT tokens
- ✅ Attaches user info to request after validation

### 4. Edge Cases & Validation (auth.edge-cases.test.js)

**Input Validation:**
- ✅ Rejects very long usernames (>255 chars)
- ✅ Rejects very long passwords (>1000 chars)
- ✅ Accepts passwords with special characters
- ✅ Accepts usernames with numbers
- ✅ Handles case sensitivity consistently
- ✅ Rejects null and undefined values
- ✅ Rejects whitespace-only inputs

**Password Security:**
- ✅ Plain password never returned in responses
- ✅ Different users get different tokens for same password
- ✅ Password handling is secure and consistent

### 5. Middleware Tests (auth.middleware.test.js)

**Authorization Header Validation:**
- ✅ Rejects missing authorization header
- ✅ Rejects header without Bearer prefix
- ✅ Rejects Bearer with no token
- ✅ Rejects malformed JWT
- ✅ Rejects JWT with wrong signature
- ✅ Rejects empty/null tokens

**Protected Routes:**
- ✅ POST /bookings requires authentication
- ✅ GET /bookings requires authentication
- ✅ PUT /bookings/:id requires authentication
- ✅ DELETE /bookings/:id requires authentication

**User Isolation:**
- ✅ User can only update their own bookings
- ✅ User can only delete their own bookings
- ✅ User cannot read another user's bookings

**Security & Error Handling:**
- ✅ Does not leak database errors
- ✅ Does not leak stack traces
- ✅ Does not leak internal implementation details
- ✅ Token can be reused multiple times
- ✅ Prevents SQL injection attempts
- ✅ Prevents XSS attacks

---

## Booking Tests Details

### 6. Booking Creation (booking.create.test.js)

**Basic Operations:**
- ✅ Creates booking successfully
- ✅ Calculates totalCost correctly (days × rentPerDay)
- ✅ Sets initial status to "booked"
- ✅ Requires authentication token
- ✅ Validates all required fields

**Validation:**
- ✅ Rejects missing carName
- ✅ Rejects missing days
- ✅ Rejects missing rentPerDay
- ✅ Rejects empty carName string
- ✅ Rejects days ≥ 365
- ✅ Allows days = 364 (boundary)
- ✅ Rejects days = 365 (boundary)
- ✅ Rejects rentPerDay > 2000
- ✅ Allows rentPerDay = 2000 (boundary)
- ✅ Rejects extra fields in body

### 7. Booking Retrieval (booking.read.test.js)

**List Operations:**
- ✅ Returns all user's bookings with correct format
- ✅ Returns bookings with proper field names
- ✅ Returns empty array when user has no bookings
- ✅ Returns bookings in consistent order

**Single Booking Queries:**
- ✅ Returns single booking by bookingId
- ✅ Returns 404 for non-existent bookingId
- ✅ Prevents cross-user booking access

**Summary Queries:**
- ✅ Returns summary with totalBookings and totalAmountSpent
- ✅ Summary includes only booked and completed bookings
- ✅ Summary excludes cancelled bookings
- ✅ Summary returns zero for user with no bookings
- ✅ Rejects both summary and bookingId together

### 8. Booking Updates & Deletions (booking.update-delete.test.js)

**Update Operations:**
- ✅ Updates booking details (carName, days, rentPerDay)
- ✅ Updates booking status
- ✅ Allows partial updates (only days, only rentPerDay, etc.)
- ✅ Validates status values strictly
- ✅ Rejects invalid status values
- ✅ Prevents ownership violation (403)
- ✅ Returns 404 for non-existent booking
- ✅ Requires authentication

**Deletion Operations:**
- ✅ Deletes booking successfully
- ✅ Returns 404 when deleting twice
- ✅ Prevents ownership violation (403)
- ✅ Requires authentication

### 9. Edge Cases & Boundaries (booking.edge-cases.test.js)

**Input Validation:**
- ✅ Rejects negative days
- ✅ Rejects zero days
- ✅ Rejects negative rentPerDay
- ✅ Rejects zero rentPerDay
- ✅ Handles decimal values appropriately
- ✅ Accepts special characters in carName
- ✅ Accepts very long carName
- ✅ Rejects null values
- ✅ Boundary tests for days (1 to 364)
- ✅ Boundary tests for rentPerDay (1 to 2000)

**Query Validation:**
- ✅ Handles invalid bookingId (non-numeric)
- ✅ Handles very large bookingId
- ✅ Handles summary=false (treated as normal list)
- ✅ Handles summary=yes (treated as normal list)

**Multi-user Isolation:**
- ✅ Users only see their own bookings
- ✅ Summary only includes user's own bookings
- ✅ Cannot modify other user's bookings
- ✅ Cannot delete other user's bookings

**Status Tracking:**
- ✅ Booking starts with "booked" status
- ✅ Completed bookings included in summary
- ✅ Cancelled bookings excluded from summary

---

## Integration Tests (integration.test.js)

### Complete User Lifecycle
- ✅ New user starts with no bookings
- ✅ User can Create, Read, Update, Delete bookings (CRUD)
- ✅ Different users maintain isolated records
- ✅ Summary shows correct statistics
- ✅ Summary accurately excludes cancelled bookings
- ✅ Summary includes completed bookings

### Concurrent Operations
- ✅ Multiple users can operate independently
- ✅ Concurrent updates don't affect other users
- ✅ Simultaneous delete operations work correctly

### Status Workflows
- ✅ Booking progresses through valid statuses
- ✅ Cancelled bookings don't affect totals

### Data Consistency
- ✅ Booking details remain consistent across reads
- ✅ List and detail views return consistent data
- ✅ Invalid updates don't corrupt state

### Large Dataset Handling
- ✅ Can handle 20+ bookings per user
- ✅ Summary calculation accurate with many bookings

---

## Test Statistics

| Category | Test Files | Total Tests |
|----------|-----------|------------|
| Auth | 5 | ~50+ |
| Bookings | 4 | ~60+ |
| Integration | 1 | ~30+ |
| **Total** | **10** | **140+** |

---

## Running the Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/auth/auth.signup.test.js

# Run with watch mode
npm test -- --watch

# Run with coverage (if configured)
npm test -- --coverage
```

---

## Key Test Scenarios Covered

### Security
- ✅ Token validation and expiration
- ✅ User isolation and access control
- ✅ SQL injection prevention
- ✅ XSS prevention
- ✅ Error message sanitization
- ✅ Password security

### Functionality
- ✅ CRUD operations
- ✅ Status transitions
- ✅ Cost calculations
- ✅ Boundary conditions
- ✅ Input validation
- ✅ Error handling

### Data Integrity
- ✅ User data isolation
- ✅ Booking consistency
- ✅ Summary accuracy
- ✅ Concurrent operation safety
- ✅ Deletion cascading

### Edge Cases
- ✅ Large inputs
- ✅ Malformed requests
- ✅ Missing required fields
- ✅ Invalid values
- ✅ Boundary values
- ✅ Concurrent access

---

## Test Data

All tests use:
- **Dynamic user generation** - Unique usernames for each test
- **Unique passwords** - Various passwords including special characters
- **Random booking data** - Different car names and costs
- **Isolated test data** - No interference between tests

---

## Notes

1. Tests use Vitest framework with `pool: "forks"` to ensure isolation
2. All API calls go to `http://localhost:3000`
3. JWT_SECRET is set to `"sunphool"`
4. Tests verify both positive and negative scenarios
5. Edge cases and boundary conditions are thoroughly tested
6. Security aspects are given special attention
7. Integration tests ensure features work together correctly

---

## Future Enhancements

Potential additional tests to consider:
- Performance tests (load testing)
- Stress testing with many concurrent users
- Database transaction rollback scenarios
- Rate limiting behavior
- Caching behavior (if implemented)
- Pagination support (if implemented)
- Advanced filtering options (if implemented)
