# UAT
是一个Web版的自动化用例及测试任务管理平台，底层基于Robotframework去执行生成的测试脚本。

借助Chrome插件，及H5页面的特性。使您可以通过轻松的点点点，即可生成测试脚本，可视化的元素标签及关键词释义，使你的用例维护更便捷。

更多的测试技术及工具使用，欢迎进群交流：743130703

![](https://testerhome.com/uploads/photo/2019/80beba6b-1412-45a2-8a9d-394da51a63fb.jpg!large)

## 项目目录
下面是整个项目的目录结构。

```bash
├── Chrome-Extension         # chorme插件
├── Server                   # 服务端代码
├── UI                       # 前端代码
└── README.md
```

# 安装步骤

###  下载项目代码
```shell
git clone https://github.com/t880216t/UAT.git
```

###  安装前端依赖
```shell
cd UAT/UI & cnpm i
```

###  启动前端开发服务
```shell
npm start
```

###  导入数据库文件
UAT.sql

###  创建服务端python虚拟环境
```shell
cd UAT/Server & python3 -m venv venv
```

###  启动虚拟环境安装服务端依赖
```shell
source venv/bin/activate
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
```

###  导入webdriver
https://github.com/mozilla/geckodriver/releases/
http://chromedriver.storage.googleapis.com/index.html
下载后放入虚拟环境venv/bin中

###  启动后端服务
```shell
python run.py
```

### 导入SeleniumLibrary库的默认关键词
```shell
cd UAT/Server/scripts
python syncRFLib2DB.py
```
