# tic-tac-toe
This is a React entry project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build
```

## react 事件处理需注意绑定this

``` bash
# 方法一
this.handleClick = this.handleClick.bind(this);

# 方法二
利用剪头函数无this指向

# 方法三：属性初始化器语法
handleClick = () => {
    console.log('this is:', this);
}
```