import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page
from testmu import devtoolsNetworkQuery

testmu.configure(
    build="d1bb310b-30e2-4c0c-8382-f4f44f064ddd",
    name="Validate and Submit IRS Fraud Report Form",
    tc_id="TC-690",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"attempt_1_detail_message_check": "Please provide at least 10 characters of detail.", "attempt_1_no_request_check": "0", "attempt_1_reporting_message_check": "Please select what you are reporting.", "attempt_2_detail_message_check": "Please provide at least 10 characters of detail.", "attempt_2_no_request_check": "0", "attempt_3_rejected_check": "Please provide at least 10 characters of detail.", "attempt_3_no_request_check": "0", "attempt_4_single_post_check": "1", "attempt_4_status_code_check": "201", "attempt_4_received_status_check": "{\"ok\":true,\"caseId\":\"IRS-7UBKDW1G\",\"category\":\"Identity theft\",\"status\":\"received\",\"anonymous\":true,\"submittedAt\":\"2026-09-01T11:43:21.605Z\"}", "attempt_4_errors_cleared_check": "true", "success_panel_case_id_check": "Case IRS-7UBKDW1G received. Status: received. Thank you for helping promote fairness in the tax system.", "caseId": "{\"ok\":true,\"caseId\":\"IRS-7UBKDW1G\",\"category\":\"Identity theft\",\"status\":\"received\",\"anonymous\":true,\"submittedAt\":\"2026-09-01T11:43:21.605Z\"}", "attempt_4_case_id_present_check": "True"},
    auto_heal_version="AH2",
    devtools={"network": True},
    default_action_timeout_ms=10000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to http://localhost:3000/gov-clone-app/report-fraud/form', instruction_id='dd97ac2a-c082-47cb-93d3-59cbbb15f934'):
        await page.goto("http://localhost:3000/gov-clone-app/report-fraud/form")
    
    async with testmu.step('Scroll target into view', instruction_id='2566d1c6-5f97-4b5c-a526-6baedb2f9dcd'):
        element_0 = page.locator("internal:role=button[name=\"Submit report\"i]")
        await element_0.evaluate("el => el.scrollIntoView({block: 'center'})")
    
    async with testmu.step('Clicking Submit report button', instruction_id='aa443a5d-e092-48dd-a5a3-d6d41a53f8b9'):
        _loc_1 = page.locator("internal:role=button[name=\"Submit report\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Reading the report detail validation message'):
        set_var('attempt_1_detail_message_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {36: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(36)?.nextElementSibling?.textContent ?? null);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Provide specific, credible"i]'], query='the report detail validation message next to the detail textbox', expected_value='Please provide at least 10 characters of detail.', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="after Attempt 1, 'Please provide at least 10 characters of detail.' appears on the page"))
    
    async with testmu.step('Counting requests sent to the fraud report endpoint'):
        set_var('attempt_1_no_request_check', await devtoolsNetworkQuery('return len(network.requests(path="/api/gov/report"))'))
    
    async with testmu.step("after Attempt 1, 'Please select what you are reporting.' appears on the page", instruction_id='81c3980e-83ee-43a1-8355-668200438463'):
        set_var('attempt_1_reporting_message_check', await testmu.vision_query(page, "after Attempt 1, 'Please select what you are reporting.' appears on the page", ""))
    
    async with testmu.step('Assertion check', instruction_id='aaf76a30-1d85-4a26-a1cb-b466a182a4db'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "after Attempt 1, 'Please select what you are reporting.' appears on the page", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Please select what you are reporting.', 'extracted_value': '{{attempt_1_reporting_message_check}}', 'store_key': 'attempt_1_reporting_message_check', 'variable_refs': {'{{attempt_1_reporting_message_check}}': 'Please select what you are reporting.'}}, {'description': "after Attempt 1, 'Please provide at least 10 characters of detail.' appears on the page", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Please provide at least 10 characters of detail.', 'extracted_value': '{{attempt_1_detail_message_check}}', 'store_key': 'attempt_1_detail_message_check', 'variable_refs': {'{{attempt_1_detail_message_check}}': 'Please provide at least 10 characters of detail.'}}, {'description': 'after Attempt 1, no request was sent to /api/gov/report', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': '0', 'extracted_value': '{{attempt_1_no_request_check}}', 'store_key': 'attempt_1_no_request_check', 'variable_refs': {'{{attempt_1_no_request_check}}': '0'}}], 'sub_checks': [{'description': "after Attempt 1, 'Please select what you are reporting.' appears on the page", 'store_key': 'attempt_1_reporting_message_check', 'expected_value': 'Please select what you are reporting.', 'extracted_value': '{{attempt_1_reporting_message_check}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': "after Attempt 1, 'Please provide at least 10 characters of detail.' appears on the page", 'store_key': 'attempt_1_detail_message_check', 'expected_value': 'Please provide at least 10 characters of detail.', 'extracted_value': '{{attempt_1_detail_message_check}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': 'after Attempt 1, no request was sent to /api/gov/report', 'store_key': 'attempt_1_no_request_check', 'expected_value': '0', 'extracted_value': '{{attempt_1_no_request_check}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "after Attempt 1, empty submit, both 'Please select what you are reporting.' and 'Please provide at least 10 characters of detail.' appear on the page and no request was sent to /api/gov/report"})
    
    async with testmu.step('Waiting while the identity theft report steps are being queued', instruction_id='2380dfac-9e6b-4ae7-8f3e-e3dc54408ed7'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Click "Identity theft"', instruction_id='5b252ba0-f7bf-40bf-8e07-cd8914ca2d6f'):
        _loc_2 = page.locator("internal:role=radio[name=\"Identity theft\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Type "            " into "Provide specific, credible information…"', instruction_id='33ac8e1b-afb1-4348-8042-a6c52c94281a'):
        element_1 = page.locator("internal:role=textbox[name=\"Provide specific, credible\"i]")
        
        await element_1.click()
        await element_1.fill("            ")
    
    async with testmu.step('Scroll "Submit report" into view', instruction_id='370104d3-0c1e-4bd4-8b30-a5daa6f6896e'):
        element_2 = page.locator("internal:role=button[name=\"Submit report\"i]")
        await element_2.evaluate("el => el.scrollIntoView({block: 'center'})")
    
    async with testmu.step('Click "Submit report"', instruction_id='f7f01d61-cb16-430c-9ea3-b702ec9b5719'):
        _loc_3 = page.locator("internal:role=button[name=\"Submit report\"i]")
        
        await _loc_3.click()
    
    async with testmu.step('Reading the detail validation message'):
        set_var('attempt_2_detail_message_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {36: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(36)?.nextElementSibling?.textContent ?? null);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Provide specific, credible"i]'], query='the detail validation message shown next to the details textbox', expected_value='Please provide at least 10 characters of detail.', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="after Attempt 2, whitespace only, 'Please provide at least 10 characters of detail.' appears on the page"))
    
    async with testmu.step('Counting requests sent to the report submission endpoint'):
        set_var('attempt_2_no_request_check', await devtoolsNetworkQuery("reqs = network.requests(path='/api/gov/report')\nreturn len(reqs)"))
    
    async with testmu.step('Assertion check', instruction_id='3bd47e65-c9dc-45d7-af43-06072f1419b1'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "after Attempt 2, whitespace only, 'Please provide at least 10 characters of detail.' appears on the page", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Please provide at least 10 characters of detail.', 'extracted_value': '{{attempt_2_detail_message_check}}', 'store_key': 'attempt_2_detail_message_check', 'variable_refs': {'{{attempt_2_detail_message_check}}': 'Please provide at least 10 characters of detail.'}}, {'description': 'after Attempt 2, whitespace only, no request was sent to /api/gov/report', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': '0', 'extracted_value': '{{attempt_2_no_request_check}}', 'store_key': 'attempt_2_no_request_check', 'variable_refs': {'{{attempt_2_no_request_check}}': '0'}}], 'sub_checks': [{'description': "after Attempt 2, whitespace only, 'Please provide at least 10 characters of detail.' appears on the page", 'store_key': 'attempt_2_detail_message_check', 'expected_value': 'Please provide at least 10 characters of detail.', 'extracted_value': '{{attempt_2_detail_message_check}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': 'after Attempt 2, whitespace only, no request was sent to /api/gov/report', 'store_key': 'attempt_2_no_request_check', 'expected_value': '0', 'extracted_value': '{{attempt_2_no_request_check}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'after Attempt 2, whitespace only, it is still rejected with the 10-character message and still no request was sent, proving the length check runs on trimmed input and not raw characters'})
    
    async with testmu.step('Waiting for the form to be ready', instruction_id='64ac24eb-80f5-4d61-867a-393e628d2cde'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "fraud abc" into "Provide specific, credible information…"', instruction_id='6ff088d2-900e-4d09-86cd-c286f10d075f'):
        element_3 = page.locator("internal:role=textbox[name=\"Provide specific, credible\"i]")
        
        await element_3.click()
        await element_3.fill("fraud abc")
    
    async with testmu.step('Click "Submit report"', instruction_id='90294d6f-30b2-4b0c-9e29-a44cf4a8b323'):
        _loc_4 = page.locator("internal:role=button[name=\"Submit report\"i]")
        
        await _loc_4.click()
    
    async with testmu.step('Reading the detail validation message next to the report details textbox'):
        set_var('attempt_3_rejected_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {36: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(36).nextElementSibling ? el(36).nextElementSibling.textContent : null);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Provide specific, credible"i]'], query='the detail validation message shown next to the report details textbox', expected_value='Please provide at least 10 characters of detail.', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition='after Attempt 3, one character below the boundary, the form submission is rejected'))
    
    async with testmu.step('Counting requests sent to the report submission endpoint'):
        set_var('attempt_3_no_request_check', await devtoolsNetworkQuery("reqs = network.requests(path='/api/gov/report')\nreturn len(reqs)"))
    
    async with testmu.step('Assertion check', instruction_id='a940150b-54bf-4b69-9439-838b06672687'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'after Attempt 3, one character below the boundary, the form submission is rejected', 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Please provide at least 10 characters of detail.', 'extracted_value': '{{attempt_3_rejected_check}}', 'store_key': 'attempt_3_rejected_check', 'variable_refs': {'{{attempt_3_rejected_check}}': 'Please provide at least 10 characters of detail.'}}, {'description': 'after Attempt 3, one character below the boundary, no request was sent to /api/gov/report', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': '0', 'extracted_value': '{{attempt_3_no_request_check}}', 'store_key': 'attempt_3_no_request_check', 'variable_refs': {'{{attempt_3_no_request_check}}': '0'}}], 'sub_checks': [{'description': 'after Attempt 3, one character below the boundary, the form submission is rejected', 'store_key': 'attempt_3_rejected_check', 'expected_value': 'Please provide at least 10 characters of detail.', 'extracted_value': '{{attempt_3_rejected_check}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': 'after Attempt 3, one character below the boundary, no request was sent to /api/gov/report', 'store_key': 'attempt_3_no_request_check', 'expected_value': '0', 'extracted_value': '{{attempt_3_no_request_check}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'after Attempt 3, one character below the boundary, it is still rejected and no request went out'})
    
    async with testmu.step('Typing fraud abcd into the report description field', instruction_id='4f61a9a3-d3c9-4015-a3e6-f6f0c3e93021'):
        element_4 = page.locator("internal:role=textbox[name=\"Provide specific, credible\"i]")
        
        await element_4.click()
        await element_4.fill("fraud abcd")
    
    async with testmu.step('Clicking Submit report button', instruction_id='a50aaae5-f2d9-4958-88c6-47f9bc4830ea'):
        _loc_5 = page.locator("internal:role=button[name=\"Submit report\"i]")
        
        await _loc_5.click()
    
    async with testmu.step('Counting POST requests to the report endpoint'):
        set_var('attempt_4_single_post_check', await devtoolsNetworkQuery("reqs = network.requests(method='POST', path='/api/gov/report')\nreturn len(reqs)"))
    
    async with testmu.step('Reading the response status code from the report POST request'):
        set_var('attempt_4_status_code_check', await devtoolsNetworkQuery("req = network.requests(method='POST', path='/api/gov/report')[-1]\nreturn req.response_status"))
    
    async with testmu.step('Reading the response body status from the report POST request'):
        set_var('attempt_4_received_status_check', await devtoolsNetworkQuery("req = network.requests(method='POST', path='/api/gov/report')[-1]\nreturn req.response_body"))
    
    async with testmu.step('Checking whether the previous validation error messages are present after submission'):
        set_var('attempt_4_errors_cleared_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (!!el(15) && !/Please provide at least 10 characters of detail\\.|Please select what you are reporting\\./.test(el(15).parentElement.querySelector('main') ? el(15).parentElement.querySelector('main').innerText : document.body.innerText));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="✓ Report submitted"i]'], query="whether the previous validation error messages are present in the page's main content after submission", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='after Attempt 4, exactly at the boundary with a double submit, the error messages clear'))
    
    async with testmu.step('Reading the case ID from the success panel'):
        set_var('success_panel_case_id_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {16: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(16) ? ((el(16).textContent||'') + ((el(16).nextElementSibling?.textContent)||'') + ((el(16).nextElementSibling?.nextElementSibling?.textContent)||'')) : null);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Case IRS-7UBKDW1G received."i'], query='the case ID shown in the success panel', expected_value='IRS-7UBKDW1G', needs_unit_conversion=False, operator='contains', transforms=[], condition='the success panel on screen shows {{caseId}}'))
    
    async with testmu.step('Reading the case ID from the report POST response'):
        set_var('caseId', await devtoolsNetworkQuery("req = network.requests(method='POST', path='/api/gov/report')[-1]\nreturn req.response_body"))
    
    async with testmu.step('Checking whether the report POST response includes a case ID'):
        set_var('attempt_4_case_id_present_check', await devtoolsNetworkQuery("req = network.requests(method='POST', path='/api/gov/report')[-1]\nbody = json.loads(req.response_body)\nreturn body.get('caseId') is not None and body.get('caseId') != ''"))
    
    async with testmu.step('Assertion check', instruction_id='e35c9141-4666-466f-b1b6-23bc1ad0ff11'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'after Attempt 4, exactly at the boundary with a double submit, the error messages clear', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{attempt_4_errors_cleared_check}}', 'store_key': 'attempt_4_errors_cleared_check', 'variable_refs': {'{{attempt_4_errors_cleared_check}}': 'true'}}, {'description': 'after Attempt 4, exactly at the boundary with a double submit, exactly one POST to /api/gov/report was sent and not two', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': '1', 'extracted_value': '{{attempt_4_single_post_check}}', 'store_key': 'attempt_4_single_post_check', 'variable_refs': {'{{attempt_4_single_post_check}}': '1'}}, {'description': 'after Attempt 4, exactly at the boundary with a double submit, the POST to /api/gov/report returned 201', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': '201', 'extracted_value': '{{attempt_4_status_code_check}}', 'store_key': 'attempt_4_status_code_check', 'variable_refs': {'{{attempt_4_status_code_check}}': '201'}}, {'description': 'after Attempt 4, exactly at the boundary with a double submit, the response from /api/gov/report included a caseId', 'passed': True, 'operator': 'equals', 'transforms': ['lowercase'], 'json_path': None, 'expected': 'true', 'extracted_value': '{{attempt_4_case_id_present_check}}', 'store_key': 'attempt_4_case_id_present_check', 'variable_refs': {'{{attempt_4_case_id_present_check}}': 'True'}}, {'description': "after Attempt 4, exactly at the boundary with a double submit, the response from /api/gov/report included status 'received'", 'passed': True, 'operator': 'equals', 'transforms': ['json_path'], 'json_path': 'status', 'expected': 'received', 'extracted_value': '{{attempt_4_received_status_check}}', 'store_key': 'attempt_4_received_status_check', 'variable_refs': {'{{attempt_4_received_status_check}}': '{"ok":true,"caseId":"IRS-7UBKDW1G","category":"Identity theft","status":"received","anonymous":true,"submittedAt":"2026-09-01T11:43:21.605Z"}'}}], 'sub_checks': [{'description': 'after Attempt 4, exactly at the boundary with a double submit, the error messages clear', 'store_key': 'attempt_4_errors_cleared_check', 'expected_value': 'true', 'extracted_value': '{{attempt_4_errors_cleared_check}}', 'operator': 'equals', 'transforms': []}, {'description': 'after Attempt 4, exactly at the boundary with a double submit, exactly one POST to /api/gov/report was sent and not two', 'store_key': 'attempt_4_single_post_check', 'expected_value': '1', 'extracted_value': '{{attempt_4_single_post_check}}', 'operator': 'equals', 'transforms': []}, {'description': 'after Attempt 4, exactly at the boundary with a double submit, the POST to /api/gov/report returned 201', 'store_key': 'attempt_4_status_code_check', 'expected_value': '201', 'extracted_value': '{{attempt_4_status_code_check}}', 'operator': 'equals', 'transforms': []}, {'description': 'after Attempt 4, exactly at the boundary with a double submit, the response from /api/gov/report included a caseId', 'store_key': 'attempt_4_case_id_present_check', 'expected_value': 'true', 'extracted_value': '{{attempt_4_case_id_present_check}}', 'operator': 'equals', 'transforms': ['lowercase']}, {'description': "after Attempt 4, exactly at the boundary with a double submit, the response from /api/gov/report included status 'received'", 'store_key': 'attempt_4_received_status_check', 'expected_value': 'received', 'extracted_value': '{{attempt_4_received_status_check}}', 'operator': 'equals', 'transforms': ['json_path']}], 'composite_operator': 'and', 'claim': "after Attempt 4, exactly at the boundary with a double submit, the error messages clear, exactly one POST to /api/gov/report was sent and not two, and it returned 201 with a caseId and status 'received'"})
    
    async with testmu.step('Assertion check', instruction_id='bc75e126-073c-4d18-a5c1-632b0ebd628d'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the success panel on screen shows {{caseId}}', 'passed': True, 'operator': 'contains', 'transforms': [], 'json_path': None, 'expected': 'IRS-7UBKDW1G', 'extracted_value': '{{success_panel_case_id_check}}', 'store_key': 'success_panel_case_id_check', 'variable_refs': {'{{success_panel_case_id_check}}': 'Case IRS-7UBKDW1G received. Status: received. Thank you for helping promote fairness in the tax system.', '{{caseId}}': '{"ok":true,"caseId":"IRS-7UBKDW1G","category":"Identity theft","status":"received","anonymous":true,"submittedAt":"2026-09-01T11:43:21.605Z"}'}}], 'sub_checks': [{'description': 'the success panel on screen shows {{caseId}}', 'store_key': 'success_panel_case_id_check', 'expected_value': 'IRS-7UBKDW1G', 'extracted_value': '{{success_panel_case_id_check}}', 'operator': 'contains', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the success panel on screen shows {{caseId}}'})


if __name__ == "__main__":
    testmu.run(test)