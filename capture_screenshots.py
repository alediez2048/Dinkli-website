#!/usr/bin/env python3
"""Capture screenshots and test redirects for PR proof."""
import asyncio
import json
from playwright.async_api import async_playwright

BASE_URL = "http://localhost:8000"

async def capture_screenshots():
    """Capture full-page screenshots at desktop and mobile widths."""
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        pages_to_capture = [
            ('/', 'home'),
            ('/captains/', 'captains'),
            ('/clubs/', 'clubs')
        ]
        
        for path, name in pages_to_capture:
            # Desktop (1440 wide)
            page = await browser.new_page(viewport={'width': 1440, 'height': 900})
            await page.goto(f"{BASE_URL}{path}")
            await page.screenshot(
                path=f"/workspace/pr-screenshots/{name}-desktop.png",
                full_page=True
            )
            await page.close()
            print(f"✓ Captured {name} desktop screenshot")
            
            # Mobile (390 wide)
            page = await browser.new_page(viewport={'width': 390, 'height': 844})
            await page.goto(f"{BASE_URL}{path}")
            await page.screenshot(
                path=f"/workspace/pr-screenshots/{name}-mobile.png",
                full_page=True
            )
            await page.close()
            print(f"✓ Captured {name} mobile screenshot")
        
        await browser.close()

async def test_redirects():
    """Test that redirects work correctly."""
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        redirects = [
            ('/courts/', '/clubs/'),
            ('/pitch-deck/', '/clubs/')
        ]
        
        results = []
        for from_path, expected_to in redirects:
            response = await page.goto(f"{BASE_URL}{from_path}")
            final_url = page.url
            
            # Check if we ended up at the expected location
            if final_url == f"{BASE_URL}{expected_to}":
                results.append(f"✓ {from_path} → {expected_to}")
            else:
                results.append(f"✗ {from_path} expected {expected_to}, got {final_url}")
        
        await browser.close()
        return results

async def check_internal_links():
    """Check for broken internal links on main pages."""
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        pages_to_check = ['/', '/captains/', '/clubs/', '/contact.html']
        broken_links = []
        
        for path in pages_to_check:
            await page.goto(f"{BASE_URL}{path}")
            
            # Get all links on the page
            links = await page.evaluate("""
                () => {
                    const links = Array.from(document.querySelectorAll('a[href]'));
                    return links
                        .map(a => a.getAttribute('href'))
                        .filter(href => href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#') && !href.startsWith('javascript:'));
                }
            """)
            
            # Test each internal link
            for link in links:
                try:
                    # Normalize the link
                    if link.startswith('/'):
                        test_url = f"{BASE_URL}{link}"
                    else:
                        # Relative to current page
                        base = path.rsplit('/', 1)[0] if '/' in path else ''
                        test_url = f"{BASE_URL}{base}/{link}"
                    
                    response = await page.goto(test_url)
                    if response.status >= 400:
                        broken_links.append(f"{path} → {link} (HTTP {response.status})")
                except Exception as e:
                    broken_links.append(f"{path} → {link} (Error: {str(e)})")
        
        await browser.close()
        return broken_links

async def main():
    print("Starting screenshot capture and site testing...\n")
    
    print("=== Capturing Screenshots ===")
    await capture_screenshots()
    
    print("\n=== Testing Redirects ===")
    redirect_results = await test_redirects()
    for result in redirect_results:
        print(result)
    
    print("\n=== Checking Internal Links ===")
    broken = await check_internal_links()
    if broken:
        print("⚠️  Found broken links:")
        for link in broken:
            print(f"  {link}")
    else:
        print("✓ No broken internal links found")
    
    print("\n=== Summary ===")
    print(f"Screenshots saved to /workspace/pr-screenshots/")
    print(f"- 6 total screenshots (3 pages × 2 viewports)")

if __name__ == "__main__":
    asyncio.run(main())
