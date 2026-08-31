import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="d849bdd1-6883-4d67-ad6c-91d624167b67",
    name="Verify High-Yield Savings Account APY",
    tc_id="TC-655",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"apy_is_4_34_percent_check": "4.34%", "apy": "4.34%"},
    auto_heal_version="AH2",
    default_action_timeout_ms=10000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to http://localhost:3000/bank-clone-app/open-account', instruction_id='e72b688b-0a25-4591-8c0f-589686a86851'):
        await page.goto("http://localhost:3000/bank-clone-app/open-account")
    
    async with testmu.step('Clicking 4.34% High-Yield Savings account option', instruction_id='7918ce13-7ff6-4871-b92b-d9b7778a18ae'):
        _loc_1 = page.locator("internal:role=button[name=\"4.34% High-Yield Savings No\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Reading the advertised APY from the account option'):
        set_var('apy_is_4_34_percent_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ((el(15)?.textContent?.match(/\\b\\d+\\.\\d+%/) || [null])[0]);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=button[name="4.34% High-Yield Savings No"i]'], query='the advertised APY for the selected account option', expected_value='4.34%', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition='{{apy}} is 4.34%'))
    
    async with testmu.step('Reading the advertised APY from the account option'):
        set_var('apy', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = ((el(15)?.textContent?.match(/\\b\\d+\\.\\d+%/) || [null])[0]);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=button[name="4.34% High-Yield Savings No"i]'], query='the advertised APY for the selected account option', expected_value='', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition='the advertised APY is saved as {{apy}}'))
    
    async with testmu.step('Assertion check', instruction_id='96bcf7a5-1d41-48b9-a60d-c523764d1178'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': '{{apy}} is 4.34%', 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'expected': '4.34%', 'extracted_value': '{{apy_is_4_34_percent_check}}', 'store_key': 'apy_is_4_34_percent_check', 'variable_refs': {'{{apy_is_4_34_percent_check}}': '4.34%', '{{apy}}': '4.34%'}}], 'sub_checks': [{'description': '{{apy}} is 4.34%', 'store_key': 'apy_is_4_34_percent_check', 'expected_value': '4.34%', 'extracted_value': '{{apy_is_4_34_percent_check}}', 'operator': 'equals', 'transforms': ['strip']}], 'composite_operator': 'and', 'claim': '{{apy}} is 4.34%'})


if __name__ == "__main__":
    testmu.run(test)