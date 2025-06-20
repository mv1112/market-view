# Enterprise Authentication System Documentation

## Overview

This project implements a comprehensive, enterprise-grade authentication system using Supabase with advanced security features including rate limiting, session management, audit logging, and multi-layered security policies.

## ✨ Features Implemented

### 🔐 Core Authentication
- **Secure Registration & Login** with email/password
- **Password Reset** with rate limiting
- **Email Verification** workflow
- **Session Management** with device tracking
- **Automatic Logout** on session expiry

### 🛡️ Security Features
- **Rate Limiting** to prevent brute force attacks
- **Device Fingerprinting** for session tracking
- **IP Address Logging** for security monitoring
- **Risk Scoring** for authentication events
- **Row Level Security (RLS)** policies on all tables
- **Audit Trail** for all security events
- **Multi-Session Management** with device tracking

### 🎯 Advanced Features
- **User Profiles** with role-based access control
- **Security Dashboard** showing recent activity
- **Session Monitoring** with device information
- **Password History** tracking (for compliance)
- **OAuth Connection** tracking (ready for social login)

## 🏗️ Architecture

### Database Schema

#### Core Tables
```sql
-- User Profiles (extends auth.users)
user_profiles
├── id (UUID, references auth.users)
├── email, full_name, avatar_url
├── company, job_title, phone, bio
├── timezone, language, theme
├── email_verified, phone_verified
├── two_factor_enabled, two_factor_secret
├── role (user/admin/manager/viewer)
├── status (active/inactive/suspended/pending)
├── last_login_at, last_login_ip
└── created_at, updated_at

-- Session Management
user_sessions
├── id (UUID)
├── user_id (references auth.users)
├── session_token (unique)
├── device_info (JSONB)
├── ip_address, location (JSONB)
├── is_active, expires_at
└── created_at, last_activity_at

-- Security Audit Trail
security_logs
├── id (UUID)
├── user_id (references auth.users)
├── event_type (login, logout, etc.)
├── event_description, ip_address
├── user_agent, location (JSONB)
├── risk_score (0-100)
├── blocked (boolean)
├── metadata (JSONB)
└── created_at

-- Rate Limiting
rate_limits
├── id (UUID)
├── identifier (IP, email, user_id)
├── action (login_attempt, password_reset)
├── attempts, window_start
├── blocked_until
└── created_at, updated_at

-- Additional Tables
password_history    -- Password change tracking
oauth_connections   -- Social login connections
```

### Security Functions

#### Rate Limiting
```sql
check_rate_limit(identifier, action, max_attempts, window_minutes) → boolean
```
- Tracks attempts per identifier/action combination
- Implements exponential backoff for blocking
- Returns true if action is allowed, false if blocked

#### Security Logging
```sql
log_security_event(user_id, event_type, description, ip, user_agent, location, risk_score, metadata) → uuid
```
- Logs all security-relevant events
- Assigns risk scores for anomaly detection
- Stores contextual metadata for investigation

#### Session Management
```sql
create_user_session(user_id, session_token, device_info, ip_address, location, expires_at) → uuid
validate_session(session_token) → table(user_id, is_valid, expires_at)
```
- Creates and validates user sessions
- Tracks device information and location
- Automatically deactivates old sessions from same device

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Copy environment variables
cp .env.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Run Database Migrations
The migrations are already applied, but you can view them in:
- `create_user_profiles_and_auth_schema`
- `create_rls_policies`  
- `create_auth_functions`
- `fix_security_issues`
- `fix_rls_infinite_recursion`

### 3. Test the System
```bash
# Install dependencies
npm install

# Run authentication tests
node scripts/test-auth.mjs

# Start development server
npm run dev
```

### 4. Access Points
- **Login:** `/auth/login`
- **Register:** `/auth/sign-up`
- **Reset Password:** `/auth/forgot-password`
- **Dashboard:** `/protected`
- **Charts (Protected):** `/charts`

## 🔧 Usage

### Frontend Components

#### Login Form
```tsx
import { LoginForm } from '@/components/login-form'

// Handles device fingerprinting and IP detection automatically
<LoginForm 
  onSwitchToSignUp={() => setView('signup')}
  onSwitchToForgotPassword={() => setView('forgot')} 
/>
```

#### Authentication Service
```tsx
import { authService } from '@/lib/auth'

// Login with security logging
const { data, error } = await authService.login(email, password, deviceInfo, ipAddress)

// Get user profile with security status
const { user, profile } = await authService.getCurrentUser()

// Get user's security activity
const { data: logs } = await authService.getSecurityLogs(userId)
```

### Backend Integration

#### Middleware Protection
```tsx
// middleware.ts - Automatically protects routes
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// Protects: /protected, /charts, /dashboard
// Redirects to: /auth/login with returnUrl
```

#### Server Components
```tsx
import { createClient } from '@/lib/server'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/auth/login')
  
  // Get user profile and security data
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()
}
```

## 🛡️ Security Measures

### 1. Rate Limiting
- **Login attempts:** 5 per 15 minutes per email
- **Password resets:** 3 per hour per email  
- **Signup attempts:** 5 per hour per IP
- **Exponential backoff:** Increases block time with repeated violations

### 2. Session Security
- **Session tokens:** Cryptographically secure random UUIDs
- **Device tracking:** Browser fingerprinting for session association
- **Automatic expiry:** 7-day default with configurable duration
- **Concurrent sessions:** Configurable limit per user

### 3. Audit Logging
- **All auth events:** Login, logout, password changes, profile updates
- **Risk scoring:** 0-100 scale for anomaly detection
- **IP tracking:** Location and device information
- **Metadata storage:** Flexible JSONB for event context

### 4. Database Security
- **Row Level Security:** Enabled on all tables
- **Secure functions:** `SECURITY DEFINER` with fixed search_path
- **Policy isolation:** Users can only access their own data
- **Admin separation:** Special policies for administrative access

## 📊 Monitoring & Analytics

### Security Dashboard
The `/protected` route provides a comprehensive dashboard showing:

- **User Profile:** Role, status, verification status
- **Security Status:** 2FA, email verification, last login
- **Active Sessions:** Device information and last activity
- **Security Activity:** Recent authentication events with risk scores
- **Quick Actions:** Password change, 2FA setup, session management

### Event Types Tracked
- `login_success` / `login_failed`
- `signup_success` / `signup_failed`  
- `password_reset_requested` / `password_changed`
- `profile_updated`
- `session_created` / `session_revoked`
- `page_access` (for protected pages)

## 🔬 Testing

### Automated Tests
```bash
# Run comprehensive auth tests
node scripts/test-auth.mjs
```

Tests verify:
- ✅ Database schema accessibility
- ✅ Rate limiting functionality
- ✅ Security logging
- ✅ Session management functions
- ✅ RLS policy enforcement

### Manual Testing Flow
1. **Registration:** Create account with strong password
2. **Email Verification:** Check verification status
3. **Login:** Authenticate with device tracking
4. **Dashboard:** View security information
5. **Rate Limiting:** Attempt multiple failed logins
6. **Password Reset:** Request and complete reset flow
7. **Session Management:** Login from multiple devices
8. **Logout:** Clean session termination

## 🚨 Security Advisors

The system includes automatic security monitoring:
```bash
# Check for security issues
npx supabase db lint --level=warn
```

Current status: ✅ **All security advisors passing**

## 🔄 Maintenance

### Regular Tasks
- Monitor security logs for anomalies
- Review rate limit violations
- Clean up expired sessions
- Update password policies
- Rotate secrets and keys

### Database Maintenance
```sql
-- Clean expired sessions (run weekly)
DELETE FROM user_sessions 
WHERE expires_at < NOW() OR is_active = false;

-- Clean old security logs (run monthly)
DELETE FROM security_logs 
WHERE created_at < NOW() - INTERVAL '90 days';

-- Clean old rate limit records (run daily)
DELETE FROM rate_limits 
WHERE window_start < NOW() - INTERVAL '1 day' AND blocked_until < NOW();
```

## 🛠️ Customization

### Environment Variables
```bash
# Rate Limiting
RATE_LIMIT_MAX_ATTEMPTS=5
RATE_LIMIT_WINDOW_MINUTES=15

# Session Configuration  
SESSION_DURATION_DAYS=7
MAX_CONCURRENT_SESSIONS=5

# Security
NEXTAUTH_SECRET=your-super-secret-key
TWO_FACTOR_APP_NAME=Your App Name
```

### Extending the System

#### Adding New Event Types
```sql
-- Add to security_logs
INSERT INTO security_logs (user_id, event_type, event_description, risk_score)
VALUES (user_id, 'custom_event', 'Description', 25);
```

#### Custom Rate Limits
```sql
-- Check custom rate limit
SELECT check_rate_limit('identifier', 'custom_action', 10, 60);
```

#### Additional User Fields
```sql
-- Extend user_profiles table
ALTER TABLE user_profiles ADD COLUMN custom_field TEXT;
```

## 📚 API Reference

### AuthService Methods
```tsx
// Authentication
login(email, password, deviceInfo?, ipAddress?) → Promise<{data, error}>
signup(email, password, fullName?) → Promise<{data, error}>
logout() → Promise<{error}>

// Profile Management
getCurrentUser() → Promise<{user, profile, error}>
getUserProfile(userId) → Promise<UserProfile | null>
updateUserProfile(userId, updates) → Promise<{data, error}>

// Security
resetPassword(email) → Promise<{data, error}>
updatePassword(newPassword) → Promise<{data, error}>
getSecurityLogs(userId, limit?) → Promise<{data, error}>

// Session Management
getUserSessions(userId) → Promise<SessionInfo[]>
revokeSession(sessionId, userId) → Promise<{error}>
```

### Database Functions
```sql
-- Rate limiting
check_rate_limit(identifier, action, max_attempts, window_minutes) → boolean

-- Security logging
log_security_event(user_id, event_type, description, ip, user_agent, location, risk_score, metadata) → uuid

-- Session management
create_user_session(user_id, session_token, device_info, ip_address, location, expires_at) → uuid
validate_session(session_token) → table(user_id, is_valid, expires_at)
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Run tests: `node scripts/test-auth.mjs`
4. Check security: `npx supabase db lint`
5. Submit pull request

### Security Guidelines
- Always use RLS policies for data access
- Log security-relevant events
- Implement rate limiting for public endpoints
- Use secure random tokens for sessions
- Validate and sanitize all inputs
- Follow principle of least privilege

---

**🎉 Congratulations!** You now have a production-ready, enterprise-grade authentication system with comprehensive security features, monitoring, and audit capabilities. 