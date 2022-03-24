
from cherrypy import url
from flask import Blueprint, render_template,render_template_string, redirect, url_for, request,flash
from numpy import tile
from sympy import true
from .utilsfunc.infolooter import extract_title, extract_js,delay,check_robots,check_health
from flask import Blueprint
from . import db
from flask_login import login_required, current_user

main = Blueprint('main', __name__)

@main.route("/")
def home():
    if current_user.is_authenticated:
        name = current_user.name
    else: 
        name = "Гость"
    return render_template("home.html",name=name)

@main.route("/scan")
def scan():
    return render_template('scan.html')

@main.route("/srvinfos",methods=['GET','POST'])
def infos():
    if current_user.is_authenticated:
        if current_user.id == 1:
            if request.method == "POST":    
                srv_url = request.form['url']
                try:
                    if srv_url == "":
                        flash('Пожалуйста, введите корректный адрес')
                        return redirect(url_for('main.scan'))
                    
                    if "file://" in srv_url or "{" in srv_url or "'" in srv_url or "<" in srv_url or ";" in srv_url or "127.0.0.1" in srv_url or "localhost" in srv_url: # big ssrf filter ...
                        flash('Что ты пытаешься сделать ???')
                        return redirect(url_for('main.scan'))

                    if check_health(srv_url) != "failed":
                        if "http" in srv_url:
                            title = extract_title(srv_url)
                            title = title.replace("_","").replace(".","").replace("{{","{").replace("}}","}").replace("[","").replace("]","")
                            js_file = extract_js(srv_url)
                            timereq = delay(srv_url)
                            robot = check_robots(srv_url)
                            health = check_health(srv_url)
                            template = '''
                            <link href="../static/css/list.scss" rel="stylesheet" />
                            <main>
                            <h1>Информация о сервере</h1>
                            <ol class="gradient-list">
                                <li>задерживать : {}</li><br>
                                <li>js-файл : {}</li><br>
                                <li>заглавие : {}</li><br>
                                <li>robots.txt : {}</li><br>
                                <li>статус кода : {}</li><br>
                            </ol>
                            </main>
                            '''.format(timereq,js_file,title,robot,health)
                            return render_template_string(template)
                        else:
                            flash('хакер !!!')
                            return redirect(url_for('main.scan'))
                    else:
                        flash('сервер скорее всего не работает')
                        return redirect(url_for('main.scan'))
                except Exception as e:
                    print(e)
                    flash(f'error 500')
                    return redirect(url_for('main.scan'))
        else:
            flash(" ты не админ !!!")
            return redirect(url_for('main.home'))
    else:
        return redirect(url_for('auth.login'))


