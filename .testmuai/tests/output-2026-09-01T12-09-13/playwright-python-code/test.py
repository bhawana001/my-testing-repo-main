import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="e839a0cb-5124-4fa4-8686-c8324b27b39e",
    name="Verify Successful Login and Session Persistence",
    tc_id="TC-691",
    network=os.getenv("NETWORK", "false").lower() == "true",
    auto_heal_version="AH2",
    default_action_timeout_ms=10000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to http://localhost:3000/insurance-clone-app/login', instruction_id='9eb38e81-de6b-47d9-943b-ebe91e45576d'):
        await page.goto("http://localhost:3000/insurance-clone-app/login")
    
    async with testmu.step('Waiting queued plan (3 steps): type "textbox"; type "textbox"; click "Log In"', instruction_id='11266855-a34b-45c5-a9cd-a145c5ff394c'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "policy@safeguard.test" into "textbox"', instruction_id='ff813479-6ad9-4127-9ff0-e47613a09515'):
        element_0 = page.locator("internal:role=textbox >> nth=0")
        
        await element_0.click()
        await element_0.fill("policy@safeguard.test")
    
    async with testmu.step('Type "[REDACTED]" into "textbox"', instruction_id='eba64fcc-aa10-44fe-b4e2-fb9bf7d78613'):
        element_1 = page.locator("input[type=\"password\"]")
        variable_value_2 = var('{{secrets.user.password}}')
        
        await element_1.click()
        await element_1.fill(variable_value_2)
    
    async with testmu.step('Click "Log In"', instruction_id='7a7f0c22-936a-4f04-bf69-9fcfee0d6042'):
        _loc_1 = page.locator("internal:role=button[name=\"Log In\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting 1500 ms for the login form to disappear', instruction_id='1593ea07-cbfb-4e14-94e8-2d1cca547250'):
            await page.wait_for_timeout(1500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, 'the login form is no longer visible'):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the login page to finish redirecting', instruction_id='97221586-e8ba-4a41-a967-69b3c6961da8'):
            await page.wait_for_timeout(2000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, 'the Log In heading is no longer visible'):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Clicking Log In button', instruction_id='6173c296-ae11-4be0-aec9-5ab46599b80d'):
        _loc_2 = page.locator("internal:role=button[name=\"Log In\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Navigating to the dashboard page', instruction_id='37e7951c-18b8-4d49-8f22-2912a99f0d1e'):
        await page.goto("http://localhost:3000/insurance-clone-app/dashboard")
    
    async with testmu.step('Navigate back', instruction_id='64a6bb59-d0e9-4a92-b0a7-e4ecea3c6252'):
        await page.go_back()
    
    async with testmu.step('Navigate refresh', instruction_id='4f09af31-b0d2-4a57-8451-4b95fafe66ac'):
        await page.reload()
    
    async with testmu.step('Navigating to the login page', instruction_id='4c6ea664-ac6e-4285-a18c-25c1d245357e'):
        await page.goto("http://localhost:3000/insurance-clone-app/login")
    
    async with testmu.step('Waiting for queued typing actions to complete', instruction_id='470a0b89-2b17-4bc3-b465-803257cbd6d5'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "policy@safeguard.test" into "textbox"', instruction_id='04083864-f7e6-4d03-95cc-25d8b63ff61f'):
        element_3 = page.locator("internal:role=textbox >> nth=0")
        
        await element_3.click()
        await element_3.fill("policy@safeguard.test")
    
    async with testmu.step('Type "[REDACTED]" into "textbox"', instruction_id='444bf448-d19a-4d56-973c-b6e2af1d121b'):
        element_4 = page.locator("input[type=\"password\"]")
        variable_value_5 = var('{{secrets.user.password}}')
        
        await element_4.click()
        await element_4.fill(variable_value_5)
    
    async with testmu.step('Press Enter', instruction_id='778161b8-c061-45a8-a4b9-b69f83d76179'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('Enter')
    
    async with testmu.step('Navigating to the insurance clone app page', instruction_id='820598c5-22ba-409f-abfb-1f6276459b4b'):
        await page.goto("http://localhost:3000/insurance-clone-app")
    
    async with testmu.step('Clicking Log In to Your Policy', instruction_id='0512110f-b92f-46fc-b993-1f23cf3dced9'):
        _loc_3 = page.locator("internal:role=link[name=\"Log In to Your Policy ›\"i]")
        
        await _loc_3.click()


if __name__ == "__main__":
    testmu.run(test)