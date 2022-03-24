import re
from numpy import empty
import requests
from sympy import false
import socket
from bs4 import BeautifulSoup as bs
from urllib.parse import urljoin
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

def extract_title(url):
    try:
        req = requests.get(url,verify=false,timeout=4)
        soup = bs(req.content, 'lxml')
        extracted = soup.select_one('title').text
        return extracted
    except:
        pass
        return "failed"

def extract_js(url):
    try:
        js_file = []
        r = requests.get(url,verify=False,timeout=4)
        rep = r.text
        soup = bs(rep,"html.parser")

        for script in soup.find_all("script"):
            if script.attrs.get("src"):
                script_url = urljoin(url, script.attrs.get("src"))
                js_file.append(script_url)
        if js_file != []:
            return js_file
        else:
            return 'нет js-файла'
    except:
        pass
        return "failed"

def delay(url):
    try:
        r = requests.get(url,verify=false,timeout=4)
        d = r.elapsed.total_seconds()
        return d
    except:
        return "failed"
        pass

def check_robots(url):
    try:
        url = url + "/robots.txt"
        r = requests.get(url,verify=false,timeout=4)
        if r.status_code !=404:
            return "yes"
        else:
            return "no"
    except:
        pass
        return "failed"

def check_health(url):
    try:
        r = requests.get(url,verify=false,timeout=4)
        return r.status_code
    except:
        pass
        return "failed"