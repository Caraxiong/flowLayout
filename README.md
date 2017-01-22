#####常用命令

* $ webpack --display-error-details //方便出错时能查阅更详尽的信息
* $ webpack --config XXX.js //使用另一份配置文件（比如webpack.config2.js）来打包
* $ webpack --watch //监听变动并自动打包
* $ webpack -p //压缩混淆脚本，这个非常非常重要！
* $ webpack -d //生成map映射文件，告知哪些模块被最终打包到哪里了
* $ webpack --progress //显示进度
***
* babel-preset-es2015 : 2015转码规则
* babel-preset-stage-0/1/2/3 : ES7不同阶段语法提案的转码规则（共有4个阶段）
* babel-core : API转换核心文件
* babel-plugin-transform-runtime : 语法转换
* babel-polyfill : api polyfill　　
***
样式独立
* npm install extract-text-webpack-plugin --save-dev
config 
`var ExtractTextPlugin = require("extract-text-webpack-plugin");
plugins: [
  new ExtractTextPlugin("[name].css")
]
loaders: [
  { test: /\.css$/, loader: ExtractTextPlugin.extract("css") },
  { test: /\.less$/, loader: ExtractTextPlugin.extract("css!less") }
]`