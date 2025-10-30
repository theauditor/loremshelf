# How Your ERPNext Error Will Be Displayed

## Sample Error Response (Raw from API)

```json
{
  "exception": "frappe.exceptions.InvalidEmailAddressError: asgsg is not a valid Email Address",
  "exc_type": "InvalidEmailAddressError",
  "_exc_source": "erpnext (app)",
  "exc": "[\"Traceback (most recent call last):\\n  File...\"]",
  "_server_messages": "[...]"
}
```

## How It's Processed

### Step 1: Extract Clear Message from `exception` field
The error handler extracts: **"asgsg is not a valid Email Address"**

(Everything after the colon in: `frappe.exceptions.InvalidEmailAddressError: asgsg is not a valid Email Address`)

### Step 2: Categorize the Error
- Detects it's an email validation error (contains "email" and "not valid")
- Extracts the invalid email: **"asgsg"**
- Categorizes as `validation` error type

### Step 3: Generate User-Friendly Response

```typescript
{
  type: 'validation',
  userMessage: 'Invalid email address: asgsg',
  technicalMessage: 'asgsg is not a valid Email Address',
  suggestions: [
    'Please enter a valid email address (e.g., example@email.com)',
    'Check for typos in the email address',
    'Make sure the email contains @ and a domain name'
  ]
}
```

## How It Looks in the Modal

### ❌ Customer Creation Failed

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Invalid email address: asgsg                                │
│  Error Type: validation                                      │
│                                                               │
│  What you can do:                                            │
│  • Please enter a valid email address (e.g., example@email.com) │
│  • Check for typos in the email address                      │
│  • Make sure the email contains @ and a domain name          │
│                                                               │
│  ▸ Technical Details                                         │
│    asgsg is not a valid Email Address                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Visual Design (Styled)

```
╔══════════════════════════════════════════════════════════════╗
║                      API Response                            ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ❌ Customer Creation Failed                                 ║
║  ┌──────────────────────────────────────────────────────┐   ║
║  │ 🔴 Red Background (bg-red-50)                        │   ║
║  │                                                       │   ║
║  │ Invalid email address: asgsg                         │   ║
║  │ Error Type: validation                               │   ║
║  │                                                       │   ║
║  │ What you can do:                                     │   ║
║  │ • Please enter a valid email address                 │   ║
║  │   (e.g., example@email.com)                          │   ║
║  │ • Check for typos in the email address               │   ║
║  │ • Make sure the email contains @ and a domain name   │   ║
║  │                                                       │   ║
║  │ [Technical Details ▼]                                │   ║
║  │   asgsg is not a valid Email Address                 │   ║
║  └──────────────────────────────────────────────────────┘   ║
║                                                              ║
║  ⏭️ Address Creation Failed                                 ║
║  ┌──────────────────────────────────────────────────────┐   ║
║  │ 🔴 Red Background                                     │   ║
║  │                                                       │   ║
║  │ Not attempted due to customer creation failure       │   ║
║  │ Error Type: unknown                                  │   ║
║  └──────────────────────────────────────────────────────┘   ║
║                                                              ║
║  [Close]                                                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## Other Common Error Examples

### 1. Duplicate Customer Error
**Raw Exception:**
```
"exception": "frappe.exceptions.DuplicateEntryError: Customer already exists"
```

**Displayed As:**
```
Invalid email address: asgsg

What you can do:
• This record has already been created
• Try using different information
• Check your previous submissions
```

### 2. Mandatory Field Missing
**Raw Exception:**
```
"exception": "frappe.exceptions.MandatoryError: 'customer_name' is mandatory"
```

**Displayed As:**
```
customer_name is required

What you can do:
• Please provide a value for customer_name
• All required fields must be filled
```

### 3. Invalid Phone Number
**Raw Exception:**
```
"exception": "frappe.exceptions.ValidationError: Invalid mobile number format"
```

**Displayed As:**
```
Invalid phone number

What you can do:
• Please enter a valid phone number
• Include country code if required
• Use only numbers without spaces or special characters
```

## Key Benefits

✅ **Clear Message Extraction**: The `exception` field is now prioritized for extracting the clear error message  
✅ **User-Friendly Display**: Technical jargon is converted to plain language  
✅ **Actionable Suggestions**: Users get specific steps to fix the issue  
✅ **Technical Details Available**: Developers can still see the raw error if needed  
✅ **Categorized Errors**: Different error types get appropriate styling and icons  

## Test It Yourself

To test the error handler, try these scenarios in your checkout form:

1. **Invalid Email**: Enter `asgsg` (no @ symbol)
2. **Invalid Format**: Enter `test@` (incomplete domain)
3. **Duplicate Entry**: Try creating the same customer twice
4. **Missing Required Field**: Leave customer name empty

