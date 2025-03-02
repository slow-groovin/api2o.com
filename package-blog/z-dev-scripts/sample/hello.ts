import "dotenv/config"; //先导入先执行, 所以这个导入必须是第一行 //这样导入直接执行了函数

console.log("hello world")
console.log(process.env.MY_ENV_VARIABLE)