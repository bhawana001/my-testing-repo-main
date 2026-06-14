import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="45d71919-f552-4934-8c4e-e2f88b8085bc",
    name="Web || bhawanatestmuai || TC-208",
    tc_id="TC-208",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"__cp_final": "true"},
    default_action_timeout_ms=10000,
    default_navigation_timeout_ms=30000,
    kane_run_v4=True,
)

async def _resolve_ranked_locator(page, locators, description=""):
    """Return the first locator in *locators* that matches at least one element.

    Mirrors Selenium's ranked-selector iteration: tries each locator in the
    order supplied and stops at the first match, preserving selector rank
    priority rather than DOM order (which .or_().first would use).

    When no locator resolves:
      - description provided (V3 path): returns ``testmu.locator(page,
        description=description)`` — a VisionLocator that triggers the heal
        cascade when its action method is awaited.
      - description omitted (V4 path): raises ``TimeoutError``.
    """
    for _loc in locators:
        if await _loc.count() > 0:
            return _loc
    if description:
        import testmu
        return testmu.locator(page, description=description)
    raise TimeoutError("ranked locator resolution exhausted — no selector matched")


@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to http://localhost:3000', instruction_id='548245ef-b25d-40d9-957e-c6b6ed154653'):
        await page.goto("http://localhost:3000")
    
    async with testmu.step('Clicking the Login link in the header', instruction_id='d224c80f-3b82-4655-9623-58431c9cb2fd'):
        _loc_1 = page.locator("internal:role=link[name=\"Login\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Typing the email address into the Email field', instruction_id='10e3d707-0fc3-4ffb-9397-cebeb3beb1b8'):
        element_0 = page.locator("internal:role=textbox[name=\"Email\"i]")
        
        await element_0.click()
        await element_0.fill("bhawana.official01@gmail.com")
    
    async with testmu.step('Clicking the Send code button', instruction_id='f35be366-f933-4558-b3e2-1e9c5e3f5a77'):
        _loc_2 = page.locator("internal:role=button[name=\"Send code\"i]")
        
        await _loc_2.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('PRIMARY: wait for the OTP entry screen to appear (e.g., an input for the verification code and a button labeled "Verify & sign in"), replacing the "Sending…" button', instruction_id='3a3f4642-fd18-40bd-a869-ea117cacb156'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, 'an input field for the login code or a button labeled "Verify & sign in" is visible'):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Typing the OTP into the one-time code field', instruction_id='d9078727-631a-4d25-b5ec-4bd2a18e14f0'):
        element_1 = page.locator("internal:role=textbox[name=\"One-time code\"i]")
        
        await element_1.click()
        await element_1.fill("318601")
    
    async with testmu.step('Clicking Verify & sign in', instruction_id='5fc8c9db-e568-4ab3-b766-586d4e7db61f'):
        _loc_3 = page.locator("internal:role=button[name=\"Verify & sign in\"i]")
        
        await _loc_3.click()
    
    async with testmu.step('PRIMARY: the "You\'re signed in" confirmation message is visible | HINTS: center modal/card Always answer true/false, nothing else.', instruction_id='4c11a895-5ed2-4078-9c3d-50e18a207e22'):
        set_var('__cp_final', await testmu.vision_query(page, "PRIMARY: the \"You're signed in\" confirmation message is visible | HINTS: center modal/card Always answer true/false, nothing else.", ""))
    
    async with testmu.step('Assertion check', instruction_id='91fcda87-0b33-4814-ad9b-8f0a23d10169'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'Final verification — confirm the objective is fully achieved', 'passed': True, 'operator': 'equals', 'transforms': [], 'expected': 'true', 'extracted_value': '{{__cp_final}}', 'store_key': '__cp_final', 'variable_refs': {'{{__cp_final}}': 'true'}}], 'sub_checks': [{'description': 'Final verification — confirm the objective is fully achieved', 'store_key': '__cp_final', 'expected_value': 'true', 'extracted_value': '{{__cp_final}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "Click the Login button in the header. Log in with bhawana.official01@gmail.com (Send code). Ask the otp from me and click 'Verify & sign in'. Report whether sign-in succeeded or what error appeared."})


if __name__ == "__main__":
    testmu.run(test)