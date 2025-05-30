---
title: 'Error Handling Guidelines'
description:
  'Comprehensive error handling patterns for web applications to provide
  consistent user experience and robust error management.'
category: 'Development'
tags: ['error-handling', 'user-experience', 'typescript', 'best-practices']
createdAt: '2024-01-25'
---

# Error Handling Guidelines

## Overview

Consistent error handling patterns for the application to provide the best user
experience.

## Client-Side Error Handling

### Form Validation Errors

- Use inline validation messages below form fields
- Show field-specific errors in red text with proper ARIA labels
- Preserve user input when validation fails
- Use Zod schemas for consistent validation rules

### Server Action Errors

- Return structured error responses from server actions
- Display errors using toast notifications for non-critical errors
- Use inline error states for form-specific errors
- Provide meaningful error messages to users

### Network/API Errors

- Show toast notifications for transient failures
- Provide retry mechanisms where appropriate
- Use loading states to indicate pending operations
- Fall back gracefully when services are unavailable

## Error Response Format

### Server Actions

```typescript
type ActionResult<T> = {
  success: boolean
  data?: T
  error?: {
    message: string
    field?: string // For field-specific errors
    code?: string // For programmatic error handling
  }
}
```

### Error Classes

Create custom error classes for different error types:

```typescript
export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication required') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'Access denied') {
    super(message)
    this.name = 'AuthorizationError'
  }
}
```

## User Experience Guidelines

### Toast Notifications

- **Success**: Green toast for successful operations
- **Error**: Red toast for errors that need immediate attention
- **Warning**: Yellow toast for warnings or non-critical issues
- **Info**: Blue toast for informational messages

### Error Messages

- Be specific and actionable
- Avoid technical jargon
- Provide next steps when possible
- Use consistent tone and voice

### Loading and Error States

- Show loading spinners for async operations
- Disable form submissions during processing
- Provide visual feedback for all user actions
- Clear error states when user corrects issues

## Implementation Patterns

### Server Actions

```typescript
export async function updateUserProfile(
  formData: FormData,
): Promise<ActionResult<User>> {
  try {
    // Validation
    const validation = userUpdateSchema.safeParse({
      name: formData.get('name'),
    })

    if (!validation.success) {
      return {
        success: false,
        error: {
          message: 'Invalid data provided',
          field: validation.error.issues[0]?.path[0] as string,
        },
      }
    }

    // Business logic
    const result = await updateUser(validation.data)

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    console.error('Profile update error:', error)
    return {
      success: false,
      error: {
        message: 'Failed to update profile. Please try again.',
      },
    }
  }
}
```

### Form Handling

```typescript
const [state, formAction] = useActionState(updateUserProfile, null)

// Show toast on success/error
useEffect(() => {
  if (state?.success) {
    toast.success('Profile updated successfully!')
  } else if (state?.error) {
    toast.error(state.error.message)
  }
}, [state])
```

## Security Considerations

- Never expose sensitive error details to clients
- Log detailed errors server-side for debugging
- Sanitize error messages before showing to users
- Rate limit error responses to prevent abuse

## Monitoring and Logging

- Use PostHog for error tracking
- Log errors with context (user ID, action, timestamp)
- Monitor error rates and patterns
- Set up alerts for critical error thresholds
