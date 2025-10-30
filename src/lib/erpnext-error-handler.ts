/**
 * ERPNext/Frappe Error Handler Utility
 * Extracts clear error messages from ERPNext API responses
 * 
 * Simple approach: Show exactly what the server said, don't improvise.
 */

export interface ERPNextError {
  _server_messages?: string
  exception?: string
  exc_type?: string
  _error_message?: string
  message?: string
  [key: string]: any
}

export interface ParsedError {
  type: ErrorType
  userMessage: string
  technicalMessage: string
  suggestions: string[]
}

export type ErrorType = 
  | 'duplicate'
  | 'permission'
  | 'validation'
  | 'not_found'
  | 'mandatory'
  | 'link_validation'
  | 'network'
  | 'server'
  | 'authentication'
  | 'unknown'

/**
 * Parse ERPNext error response and extract the server's error message
 * Shows the EXACT message from the server without modification
 */
export async function parseERPNextError(response: Response): Promise<ParsedError> {
  const status = response.status
  let errorData: ERPNextError | null = null
  let rawText = ''

  try {
    rawText = await response.text()
    
    // Try to parse as JSON
    if (rawText) {
      try {
        errorData = JSON.parse(rawText)
      } catch {
        // If not JSON, treat as plain text error
        return {
          type: 'server',
          userMessage: rawText,
          technicalMessage: rawText,
          suggestions: []
        }
      }
    }
  } catch {
    // If we can't even read the response
    return {
      type: 'network',
      userMessage: 'Network error occurred',
      technicalMessage: 'Failed to read error response',
      suggestions: []
    }
  }

  // Handle by HTTP status code first
  if (status === 401 || status === 403) {
    return {
      type: 'authentication',
      userMessage: status === 401 ? 'Authentication failed' : 'Permission denied',
      technicalMessage: rawText,
      suggestions: []
    }
  }

  if (status === 404) {
    return {
      type: 'not_found',
      userMessage: 'Resource not found',
      technicalMessage: rawText,
      suggestions: []
    }
  }

  // Parse ERPNext-specific error messages
  if (errorData) {
    let serverMessage = ''
    let errorType: ErrorType = 'unknown'

    // PRIORITY 1: Extract clear message from 'exception' field
    // Format: "exception.type.path: Clear Error Message Here"
    // Example: "frappe.exceptions.InvalidEmailAddressError: asgsg is not a valid Email Address"
    // We extract: "asgsg is not a valid Email Address"
    if (errorData.exception) {
      const exceptionParts = errorData.exception.split(': ')
      if (exceptionParts.length > 1) {
        // Everything after the first colon is the clear error message
        serverMessage = exceptionParts.slice(1).join(': ').trim()
        
        // Basic categorization for styling/icon only
        const exceptionType = exceptionParts[0].toLowerCase()
        if (exceptionType.includes('duplicate')) errorType = 'duplicate'
        else if (exceptionType.includes('permission')) errorType = 'permission'
        else if (exceptionType.includes('validation') || exceptionType.includes('invalid')) errorType = 'validation'
        else if (exceptionType.includes('mandatory')) errorType = 'mandatory'
        else if (exceptionType.includes('notfound')) errorType = 'not_found'
      }
    }

    // PRIORITY 2: Parse _server_messages (backup method)
    if (!serverMessage && errorData._server_messages) {
      try {
        const messages = JSON.parse(errorData._server_messages)
        if (Array.isArray(messages) && messages.length > 0) {
          const firstMessage = typeof messages[0] === 'string' 
            ? JSON.parse(messages[0]) 
            : messages[0]
          
          if (firstMessage.message) {
            serverMessage = firstMessage.message
          }
        }
      } catch {
        // If parsing fails, continue
      }
    }

    // PRIORITY 3: Check _error_message
    if (!serverMessage && errorData._error_message) {
      serverMessage = errorData._error_message
    }

    // PRIORITY 4: Check plain message field
    if (!serverMessage && errorData.message) {
      serverMessage = errorData.message
    }

    // If we found a server message, return it AS-IS
    if (serverMessage) {
      return {
        type: errorType,
        userMessage: serverMessage,  // EXACT server message
        technicalMessage: rawText,   // Full response for debugging
        suggestions: []  // No improvised suggestions
      }
    }
  }

  // Fallback for unknown errors
  return {
    type: 'unknown',
    userMessage: 'An unexpected error occurred',
    technicalMessage: rawText || `HTTP ${status}`,
    suggestions: []
  }
}

/**
 * Helper function to display error to user (format for UI)
 */
export function formatErrorForDisplay(parsedError: ParsedError, showTechnical: boolean = false): string {
  let display = parsedError.userMessage
  
  if (showTechnical) {
    display += `\n\nTechnical Details:\n${parsedError.technicalMessage}`
  }
  
  return display
}

/**
 * Quick wrapper for fetch calls with automatic error parsing
 */
export async function fetchWithErrorHandling(
  url: string, 
  options: RequestInit = {}
): Promise<{ success: true; data: any } | { success: false; error: ParsedError }> {
  try {
    const response = await fetch(url, options)
    
    if (!response.ok) {
      const error = await parseERPNextError(response)
      return { success: false, error }
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: {
        type: 'network',
        userMessage: 'Network error occurred',
        technicalMessage: error instanceof Error ? error.message : String(error),
        suggestions: []
      }
    }
  }
}

/**
 * Get appropriate icon/color for error type (useful for UI)
 */
export function getErrorTypeStyle(type: ErrorType): { color: string; icon: string } {
  const styles = {
    duplicate: { color: 'yellow', icon: '⚠️' },
    permission: { color: 'red', icon: '🔒' },
    validation: { color: 'orange', icon: '❗' },
    not_found: { color: 'gray', icon: '🔍' },
    mandatory: { color: 'blue', icon: 'ℹ️' },
    link_validation: { color: 'orange', icon: '🔗' },
    network: { color: 'purple', icon: '📡' },
    server: { color: 'red', icon: '🔥' },
    authentication: { color: 'red', icon: '🔐' },
    unknown: { color: 'gray', icon: '❓' }
  }
  
  return styles[type]
}

