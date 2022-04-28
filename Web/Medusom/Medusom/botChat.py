#!/usr/bin/env python

import logging.handlers
import multiprocessing
from time import sleep
from random import random, randint
from playwright.async_api import async_playwright
import asyncio
import re
import threading
import traceback
import asyncio
import websockets
import json
import os

def runVisit(data):
    asyncio.run(visit(data))

async def visit(data):
    async with async_playwright() as pw:
        try:
            challUrl = "http://127.0.0.1/"
            browser = await pw.firefox.launch(
                headless=True
            )
            context = await browser.new_context(
                locale='fr-FR',
                timezone_id='Europe/Paris',
            )
            page = await context.new_page()
            try:
                await page.goto(f"{challUrl}/medus0m_l0g1n", wait_until="networkidle")
                await page.wait_for_timeout(100)
                await page.fill("[name='login']", 'atlas_apt')
                await page.fill("[name='password']", '3Ziwv*WLaN9ZrbG&R*&JUVmQNcVRRmQF')
                await page.wait_for_timeout(250)
                await page.click("[name='submit']")
                await page.wait_for_load_state('networkidle')
                await page.goto(f"{challUrl}/medus0m_t34m", wait_until="networkidle")
                await page.wait_for_timeout(500)
                await page.evaluate("""data => {
                document.getElementById('chat').innerHTML = data.concat(document.getElementById('chat').innerHTML);
                }""", data)
                await page.wait_for_timeout(4000)
            except:
                pass
            await browser.close()
        except Exception as ex:
            #print(ex)
            traceback.print_exc()
            pass

async def run():
    while True:
        try:
            websocket = await websockets.connect(f'ws://midnight.atlas453.com:4490/ID_TEAM/REGISTER_TEAM')
            
            while True:
                data = await websocket.recv()
                data = json.loads(data)
                if data['type'] == "logout":
                    os.system('rm -rf /tmp/sessions/*')
                    print("Logout team")
                    await websocket.close()
                elif data['type'] == "bot":
                    print("Trigger bot")
                    t = threading.Thread(target=runVisit, args=(data['data'],))
                    t.start()
        except Exception as ex:
            print(ex)
            sleep(5)
            pass

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(run())