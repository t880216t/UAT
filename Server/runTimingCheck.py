#!venv/bin/python
#-*-coding:utf-8-*-
import time,json,subprocess
from flask_script import Manager
from app.tables.UAT import Task
from app import app,db

manager = Manager(app)

def runTimTask():
  timTaskDatas = Task.query.filter(db.and_(Task.status.notin_([0,4]),Task.task_type == 3)).all()
  for timTask in timTaskDatas:
    subprocess.Popen("python runUITiming.py runScript -i %s " % timTask.id, shell=True)

@manager.command
def main():
  # runTimTask()
  print("run time task")

if __name__ == '__main__':
    manager.run()
