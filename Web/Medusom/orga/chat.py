#pip3 install websockets
#!/usr/bin/env python
import asyncio
import random
import websockets
import time
from time import sleep
from datetime import datetime
import traceback
import threading
import os
import json

CHAT_PORT = 4490
orgaTeam = "0rga_f0r_th3_w1n_bahahah"
teams = {orgaTeam: []}

utcnow = datetime.utcnow()

class User:
    def __init__(self, websocket, path):
        (self.IP, self.Port) = websocket.remote_address
        self.websocket = websocket
        self.team = None
        self.nickname = "Unknown"
        self.running = False
        self.bot = False
        self.admin = False

        if path.startswith('/'):
            path = path[1:]
        infos = path.split('/')
        try: 
            self.teamId = infos[0]
            self.nickname = infos[1]
        except:
            pass

        if self.nickname == "REGISTER_TEAM":
            self.bot = True
            teams[self.teamId] = []

        if self.teamId in teams:
            if self.teamId == orgaTeam:
                self.admin = True

            self.team = teams[self.teamId]
            self.team.append(self)
            print(f"[{self.IP}] User connected ({self.nickname} - {self.teamId})")
            self.running = True
        else:
            print(f"{self.IP} failed to login -> {path}")
    async def kill(self):
        try:
            if self.running:
                print(f"[{self.IP}] User disconnected ({self.nickname} - {self.teamId})")
                self.running = False
                self.team.remove(self)
                if not self.admin and not self.bot:
                    await self.sendTeam(self.team, json.dumps({"type": 0, "data": f"{self.nickname} a quitté la discussion"}))
                if self.bot:
                    await self.sendTeam(teams[orgaTeam], json.dumps({"team": self.teamId, "type": 0, "data": f"Le bot a été déconnecté."}))
                    del teams[self.teamId]
                    await self.killTeam(self.team, False)
                else:
                    await self.sendTeam(teams[orgaTeam], json.dumps({"team": self.teamId, "type": 0, "data": f"{self.nickname} a quitté la discussion"}))
                await self.websocket.close()
        except Exception:
            pass
    async def send(self, data):
        try:
            await self.websocket.send(data)
        except Exception as ex:
            pass
    async def sendTeam(self, team, data):
        for user in team:
            if not user.bot:
                await user.send(data)
    async def killTeam(self, team, warn):
        for user in team:
            if not user.bot:
                if warn:
                    await user.send(json.dumps({"type": 2, "data": "Vous avez été décelé et déconnecté par un administrateur de la MEDUSOM. Dans le cadre du challenge, on fera comme si rien ne s'était passé !"}))
                await user.kill()
    async def sendBot(self, team, data):
        for user in team:
            if user.bot:
                await user.send(data)
    async def listen(self):
        while self.running:
            try:
                sleep(.5)
                data = await self.websocket.recv()
                if type(data) is str and len(data) > 0 and self.admin:
                    action = json.loads(data)
                    if action['action'] == "logout":
                        await self.killTeam(teams[action['team']], True)
                        await self.sendBot(teams[action['team']], json.dumps({"type": "logout"}))
                    elif action['action'] == "bot":
                        await self.sendBot(teams[action['team']], json.dumps({"type": "bot", "data": action['value']}))
                    elif action['action'] == "msg":
                        await self.sendTeam(teams[action['team']], json.dumps({"team": action['team'], "type": 1, "nickname": self.nickname, "data": action['value']}))
                        await self.sendTeam(teams[orgaTeam], json.dumps({"team": action['team'], "type": 1, "nickname": self.nickname, "data": action['value']}))
                elif type(data) is str and len(data) > 0:
                    await self.sendTeam(self.team, json.dumps({"type": 1, "nickname": self.nickname, "data": data}))
                    await self.sendTeam(teams[orgaTeam], json.dumps({"team": self.teamId, "type": 1, "nickname": self.nickname, "data": data}))
            except Exception as ex:
                #print(traceback.format_exc())
                await self.kill()
    
async def listenUser(websocket, path):
    viewer = User(websocket, path)
    if viewer.running:
        if not viewer.bot:
            if not viewer.admin:
                await viewer.sendTeam(viewer.team, json.dumps({"type": 0, "data": f"{viewer.nickname} a rejoint la discussion"}))
            await viewer.sendTeam(teams[orgaTeam], json.dumps({"team": viewer.teamId, "type": 0, "data": f"{viewer.nickname} a rejoint la discussion"}))
        else:
            await viewer.sendTeam(teams[orgaTeam], json.dumps({"team": viewer.teamId, "type": 0, "data": f"Le bot est connecté."}))
        await viewer.listen()
         
async def serverUsers(port):
    print("Waiting for users")
    async with websockets.serve(listenUser, "", port=port, close_timeout=10, ping_interval=10, ping_timeout=15):
        await asyncio.Future()

def main():
    print(f"===========================================================")
    print(f"CHAT SERVER 1.0")
    print(f"===========================================================")
    asyncio.run(serverUsers(CHAT_PORT))
    
if __name__ == '__main__':
    main()