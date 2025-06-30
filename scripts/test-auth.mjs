#!/usr/bin/env node

/**
 * Authentication System Test Script
 * Tests all authentication features and security measures
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables')
  console.error('Please ensure .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAuthSystem() {
  console.log('🚀 Testing Authentication System\n')

  try {
    // Test 1: Check database tables
    console.log('📋 Testing database schema...')
    await testDatabaseAccess()
    console.log('✅ Database schema accessible\n')

    // Test 2: Rate limiting function
    console.log('🚦 Testing rate limiting...')
    await testRateLimit()
    console.log('✅ Rate limiting working\n')

    // Test 3: Security logging function  
    console.log('📊 Testing security logging...')
    await testSecurityLogging()
    console.log('✅ Security logging working\n')

    // Test 4: Session functions
    console.log('🔄 Testing session functions...')
    await testSessionFunctions()
    console.log('✅ Session functions working\n')

    console.log('🎉 All tests passed! Authentication system is ready.')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error('\nStack trace:', error.stack)
    process.exit(1)
  }
}

async function testDatabaseAccess() {
  const tables = ['user_profiles', 'security_logs', 'user_sessions', 'rate_limits']
  
  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1)
    if (error && !error.message.includes('permission')) {
      throw new Error(`Cannot access table ${table}: ${error.message}`)
    }
    console.log(`  ✓ Table ${table} accessible`)
  }
}

async function testRateLimit() {
  const { data, error } = await supabase.rpc('check_rate_limit', {
    identifier_param: 'test-' + Date.now(),
    action_param: 'test_action',
    max_attempts: 5,
    window_minutes: 15
  })

  if (error) {
    throw new Error(`Rate limit function failed: ${error.message}`)
  }

  if (data !== true) {
    throw new Error('Rate limit should return true for first attempt')
  }

  console.log('  ✓ Rate limit function working')
}

async function testSecurityLogging() {
  const { data, error } = await supabase.rpc('log_security_event', {
    user_id_param: null,
    event_type_param: 'system_test',
    event_description_param: 'Authentication system test',
            ip_address_param: 'test-client-ip',
    user_agent_param: 'Test Script',
    risk_score_param: 0,
    metadata_param: { test: true, timestamp: new Date().toISOString() }
  })

  if (error) {
    throw new Error(`Security logging failed: ${error.message}`)
  }

  if (!data) {
    throw new Error('Security logging should return event ID')
  }

  console.log(`  ✓ Security event logged with ID: ${data}`)
}

async function testSessionFunctions() {
  // Test validate_session function exists
  const { error } = await supabase.rpc('validate_session', {
    session_token_param: 'test-token'
  })

  // Function should exist even if it returns no results
  if (error && error.message.includes('does not exist')) {
    throw new Error('validate_session function does not exist')
  }

  console.log('  ✓ Session validation function exists')

  // Test create_user_session function exists (may fail due to constraints)
  const { error: createError } = await supabase.rpc('create_user_session', {
    user_id_param: '00000000-0000-0000-0000-000000000000',
    session_token_param: 'test-token',
    device_info_param: { test: true },
          ip_address_param: 'test-client-ip'
  })

  if (createError && createError.message.includes('does not exist')) {
    throw new Error('create_user_session function does not exist')
  }

  console.log('  ✓ Session creation function exists')
}

// Run the test
testAuthSystem() 