import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page
from testmu import devtoolsCookiesQuery

testmu.configure(
    build="de4c5e58-578e-40b1-9657-990f5a54f577",
    name="Verify Successful Login and Session Persistence",
    tc_id="TC-694",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"dashboard_url_check": "http://localhost:3000/insurance-clone-app/dashboard", "policy_greeting_check": "Welcome back, policy", "active_policy_card_check": "true", "safeguard_session_cookie_check": "true"},
    auto_heal_version="AH2",
    devtools={"cookies": True},
    default_action_timeout_ms=10000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to http://localhost:3000/insurance-clone-app/login', instruction_id='a78cc4b9-2a8b-406a-b316-71007b5ce016'):
        await page.goto("http://localhost:3000/insurance-clone-app/login")
    
    async with testmu.step('Waiting for the plan steps to run', instruction_id='51559229-1a1c-49bf-9426-566cda63e690'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "policy@safeguard.test" into "textbox"', instruction_id='7e1c8bd5-be44-411e-b207-afa1e6d92805'):
        element_0 = page.locator("internal:role=textbox >> nth=0")
        
        await element_0.click()
        await element_0.fill("policy@safeguard.test")
    
    async with testmu.step('Type "[REDACTED]" into "textbox"', instruction_id='cfe86cef-da72-47b4-ba83-b90cabf2a7d6'):
        element_1 = page.locator("input[type=\"password\"]")
        variable_value_2 = var('{{secrets.user.password}}')
        
        await element_1.click()
        await element_1.fill(variable_value_2)
    
    async with testmu.step('Click "Log In"', instruction_id='82d86785-346a-4248-ae40-3a6e13118f1a'):
        _loc_1 = page.locator("internal:role=button[name=\"Log In\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Reading the current page URL', instruction_id='4560dc60-49be-4ca2-b7d7-ae5dec222472'):
        set_var('dashboard_url_check', page.url)
    
    async with testmu.step('Reading the personalized welcome greeting'):
        set_var('policy_greeting_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {9: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(9)?.textContent);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Welcome back, policy"i]'], query='the personalized welcome greeting on the dashboard', expected_value='Welcome back, policy', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the page greets 'policy' by name with 'Welcome back, policy'"))
    
    async with testmu.step('Checking the active policy card details'):
        set_var('active_policy_card_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {12: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ((() => { const rows = Array.from(el(12)?.querySelectorAll('tr') || []); const getVal = label => { const row = rows.find(r => r.children?.[0]?.textContent?.trim() === label); return row?.children?.[1]?.textContent?.trim() ?? null; }; return getVal('Policy number') === 'SG-AUTO-4417-2026' && getVal('Status') === 'Active'; })());\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=table'], query='whether the active policy card shows the expected policy number and status', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the active policy card shows policy number SG-AUTO-4417-2026 with status Active'))
    
    async with testmu.step('Checking whether the safeguard session cookie exists and is httpOnly'):
        set_var('safeguard_session_cookie_check', await devtoolsCookiesQuery("c = cookies.get('safeguard_session')\nreturn c is not None and c.http_only and bool(c.value)"))
    
    async with testmu.step('Assertion check', instruction_id='1c33d991-5b14-4766-96df-298fd5cf3e04'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the URL contains /insurance-clone-app/dashboard', 'passed': True, 'operator': 'contains', 'transforms': [], 'json_path': None, 'expected': '/insurance-clone-app/dashboard', 'extracted_value': '{{dashboard_url_check}}', 'store_key': 'dashboard_url_check', 'variable_refs': {'{{dashboard_url_check}}': 'http://localhost:3000/insurance-clone-app/dashboard'}}, {'description': "the page greets 'policy' by name with 'Welcome back, policy'", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Welcome back, policy', 'extracted_value': '{{policy_greeting_check}}', 'store_key': 'policy_greeting_check', 'variable_refs': {'{{policy_greeting_check}}': 'Welcome back, policy'}}, {'description': 'the active policy card shows policy number SG-AUTO-4417-2026 with status Active', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{active_policy_card_check}}', 'store_key': 'active_policy_card_check', 'variable_refs': {'{{active_policy_card_check}}': 'true'}}], 'sub_checks': [{'description': 'the URL contains /insurance-clone-app/dashboard', 'store_key': 'dashboard_url_check', 'expected_value': '/insurance-clone-app/dashboard', 'extracted_value': '{{dashboard_url_check}}', 'operator': 'contains', 'transforms': []}, {'description': "the page greets 'policy' by name with 'Welcome back, policy'", 'store_key': 'policy_greeting_check', 'expected_value': 'Welcome back, policy', 'extracted_value': '{{policy_greeting_check}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': 'the active policy card shows policy number SG-AUTO-4417-2026 with status Active', 'store_key': 'active_policy_card_check', 'expected_value': 'true', 'extracted_value': '{{active_policy_card_check}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the login lands on the policyholder dashboard: the URL contains /insurance-clone-app/dashboard, the page greets 'policy' by name with 'Welcome back, policy', and the active policy card shows policy number SG-AUTO-4417-2026 with status Active"})
    
    async with testmu.step('Waiting for checkpoint processing to settle', instruction_id='04de70a8-2b79-460d-93e1-40a521a0ca59'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Checking whether the safeguard_session cookie exists and is httpOnly'):
        set_var('safeguard_session_cookie_check', await devtoolsCookiesQuery("c = cookies.get('safeguard_session')\nreturn str(bool(c is not None and getattr(c, 'http_only', False) is True)).lower()"))


if __name__ == "__main__":
    testmu.run(test)