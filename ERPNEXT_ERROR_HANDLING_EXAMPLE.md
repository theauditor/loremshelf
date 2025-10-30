# ERPNext Error Handling - Usage Examples

This guide shows you how to use the new `erpnext-error-handler.ts` utility to convert ERPNext API errors into user-friendly messages.

## Basic Usage

### Option 1: Use the wrapper function (Recommended)

```typescript
import { fetchWithErrorHandling } from '../lib/erpnext-error-handler'

const result = await fetchWithErrorHandling(
  'https://fox.lorempress.co/api/resource/Customer',
  {
    method: 'POST',
    headers: {
      'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ customer_name: 'John Doe' })
  }
)

if (result.success) {
  console.log('Success!', result.data)
} else {
  // result.error contains ParsedError with user-friendly message
  setError(result.error.userMessage)
  console.error('Technical details:', result.error.technicalMessage)
  console.log('Suggestions:', result.error.suggestions)
}
```

### Option 2: Manual parsing (More control)

```typescript
import { parseERPNextError, formatErrorForDisplay } from '../lib/erpnext-error-handler'

try {
  const response = await fetch('https://fox.lorempress.co/api/resource/Customer', {
    method: 'POST',
    headers: {
      'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ customer_name: 'John Doe' })
  })

  if (!response.ok) {
    const parsedError = await parseERPNextError(response)
    
    // Show user-friendly message
    setError(parsedError.userMessage)
    
    // Optionally format with suggestions
    const fullMessage = formatErrorForDisplay(parsedError, false) // true to show technical details
    console.error(fullMessage)
    
    return
  }

  const data = await response.json()
  console.log('Success!', data)
} catch (error) {
  setError('Network error. Please check your connection.')
}
```

## Example: Refactored ContactPage

Here's how to refactor your `ContactPage.tsx`:

```typescript
import { useState } from 'react'
import { parseERPNextError } from '../lib/erpnext-error-handler'
// ... other imports

export function ContactPage() {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    mobile: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorSuggestions, setErrorSuggestions] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setErrorSuggestions([])

    try {
      // Step 1: Create Customer
      const customerResponse = await fetch('https://fox.lorempress.co/api/resource/Customer', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_type: 'Individual',
          customer_group: 'All Customer Groups',
          territory: 'All Territories',
          mobile_no: formData.mobile,
          email_id: formData.email
        })
      })

      if (!customerResponse.ok) {
        const parsedError = await parseERPNextError(customerResponse)
        setError(parsedError.userMessage)
        setErrorSuggestions(parsedError.suggestions)
        setIsSubmitting(false)
        return
      }

      const customerData = await customerResponse.json()
      const customerId = customerData.data.name

      // Step 2: Create Issue
      const issueResponse = await fetch('https://fox.lorempress.co/api/resource/Issue', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: formData.subject,
          customer: customerId,
          raised_by: formData.email,
          description: formData.message,
          issue_type: 'Contact',
          status: 'Open',
          priority: 'Medium'
        })
      })

      if (!issueResponse.ok) {
        const parsedError = await parseERPNextError(issueResponse)
        setError(parsedError.userMessage)
        setErrorSuggestions(parsedError.suggestions)
        setIsSubmitting(false)
        return
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred. Please try again.')
      setErrorSuggestions(['Check your internet connection', 'Contact support if this continues'])
    } finally {
      setIsSubmitting(false)
    }
  }

  // In your JSX, display errors with suggestions:
  return (
    // ... your JSX
    {error && (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 font-medium">{error}</p>
            {errorSuggestions.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-red-700">
                {errorSuggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )}
  )
}
```

## Example: Refactored CheckoutPage

For your `CheckoutPage.tsx`, use it in the customer creation:

```typescript
import { parseERPNextError } from '../lib/erpnext-error-handler'

// Inside handleSubmitOrder function
const customerResponse = await fetch('https://fox.lorempress.co/api/resource/Customer', {
  // ... your existing code
})

if (!customerResponse.ok) {
  const parsedError = await parseERPNextError(customerResponse)
  
  customerData = {
    error: true,
    errorType: parsedError.type,
    message: parsedError.userMessage,
    suggestions: parsedError.suggestions,
    details: parsedError.technicalMessage
  }
  
  // Show in your modal with better formatting
  setApiResponses({ customer: customerData, address: addressData })
  setShowApiModal(true)
  return
}
```

## Error Types & What They Mean

The utility categorizes errors into these types:

| Error Type | When It Happens | User Impact |
|------------|----------------|-------------|
| `duplicate` | Record already exists | User tried to create something that exists |
| `permission` | No access rights | User doesn't have permission |
| `validation` | Invalid data format | User entered wrong format (email, phone, etc) |
| `not_found` | Resource doesn't exist | Referenced item was deleted or doesn't exist |
| `mandatory` | Required field missing | User didn't fill required field |
| `link_validation` | Invalid reference | Referenced record doesn't exist |
| `network` | Connection issues | Internet problems |
| `server` | Server error | ERPNext backend issue |
| `authentication` | Auth failed | Token expired or invalid |
| `unknown` | Unrecognized error | Fallback for unexpected errors |

## Advanced: Custom Error Display Component

Create a reusable error display component:

```typescript
// src/components/ErrorDisplay.tsx
import { ParsedError, getErrorTypeStyle } from '../lib/erpnext-error-handler'
import { AlertCircle, AlertTriangle, Info } from 'lucide-react'

interface ErrorDisplayProps {
  error: ParsedError
  showTechnical?: boolean
  onDismiss?: () => void
}

export function ErrorDisplay({ error, showTechnical = false, onDismiss }: ErrorDisplayProps) {
  const style = getErrorTypeStyle(error.type)
  
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: 'bg-red-50 border-red-200 text-red-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      gray: 'bg-gray-50 border-gray-200 text-gray-800'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.gray
  }

  return (
    <div className={`border rounded-lg p-4 ${getColorClasses(style.color)}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-2xl">{style.icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1">{error.userMessage}</h3>
          
          {error.suggestions.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">What you can do:</p>
              <ul className="space-y-1 text-sm">
                {error.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {showTechnical && (
            <details className="mt-3">
              <summary className="text-sm font-medium cursor-pointer">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs bg-white/50 p-2 rounded overflow-x-auto">
                {error.technicalMessage}
              </pre>
            </details>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 hover:opacity-70"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
```

Then use it in your components:

```typescript
import { ErrorDisplay } from '../components/ErrorDisplay'
import { parseERPNextError, ParsedError } from '../lib/erpnext-error-handler'

// In your component
const [parsedError, setParsedError] = useState<ParsedError | null>(null)

// When error occurs
if (!response.ok) {
  const error = await parseERPNextError(response)
  setParsedError(error)
  return
}

// In JSX
{parsedError && (
  <ErrorDisplay 
    error={parsedError} 
    showTechnical={process.env.NODE_ENV === 'development'}
    onDismiss={() => setParsedError(null)}
  />
)}
```

## Testing Different Error Scenarios

To test the error handler, you can simulate different ERPNext errors:

1. **Duplicate Error**: Try creating a customer with same email twice
2. **Mandatory Field**: Omit required fields in your API call
3. **Permission Error**: Use an invalid API token
4. **Not Found**: Reference a non-existent customer/item ID
5. **Validation Error**: Send invalid data format (e.g., invalid email)

## Benefits

✅ **User-friendly messages** instead of raw API errors  
✅ **Actionable suggestions** to help users fix issues  
✅ **Consistent error handling** across your entire app  
✅ **Better debugging** with categorized error types  
✅ **Improved UX** with contextual help  

## Questions?

- Check the `erpnext-error-handler.ts` file for full TypeScript types
- All functions are documented with JSDoc comments
- Error types are exported for custom handling

