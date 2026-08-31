import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="771d00b5-64c7-4c49-97fa-424ded27beda",
    name="Verify Gross Income Calculation",
    tc_id="TC-657",
    network=os.getenv("NETWORK", "false").lower() == "true",
    auto_heal_version="AH2",
    default_action_timeout_ms=10000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to http://localhost:3000/bank-clone-app/calculators', instruction_id='df3e87d7-fc69-4d6e-8378-61974991c205'):
        await page.goto("http://localhost:3000/bank-clone-app/calculators")
    
    async with testmu.step('Typing annual income 85000', instruction_id='ab4edd24-a70b-408e-ac0a-ac964221b769'):
        element_0 = page.locator("internal:role=spinbutton[name=\"Annual income\"i]")
        
        await element_0.click()
        await element_0.fill("85000")
    
    async with testmu.step('Pressing the Tab key', instruction_id='0e3203b8-b4b9-4aaf-834d-187a9ac4d947'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('Tab')
    
    async with testmu.step('Pressing the Enter key', instruction_id='01a5a1a6-5b29-4bcf-bc33-0096e9874afe'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('Enter')
    
    async with testmu.step('Waiting 1500 ms for the calculator estimate to refresh', instruction_id='30bf8905-5f15-4e2d-b127-53d18a5adf4b'):
        await page.wait_for_timeout(1500)
    
    async with testmu.step('Clicking Taxes withheld input', instruction_id='2898f901-0fe7-435f-adaa-c668b3835ad6'):
        _loc_1 = page.locator("internal:role=spinbutton[name=\"Taxes withheld\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Pressing the Tab key', instruction_id='97e4711a-0e18-4e99-93a6-c6d3c3d29d09'):
        await page.wait_for_timeout(500)
        await page.keyboard.press('Tab')


if __name__ == "__main__":
    testmu.run(test)