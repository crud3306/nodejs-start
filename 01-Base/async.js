/*

一、node单线程实现高并发原理
================
众所周知nodejs是单线程且支持高并发的脚本语言。可为什么单线程的nodejs可以支持高并发呢？很多人都不明白其原理，下面我来谈谈我的理解：

1. node的优点：I/O密集型处理是node的强项，因为node的I/O请求都是异步的（如：sql查询请求、文件流操作操作请求、http请求...）
----------------
a. 什么是异步？

异步：发出操作指令，然后就可以去做别的事情了（主线程不需要等待），所有操作完成后再执行回调
*/

// 异步的示例：

// 第一步：定义变量
let a = 1;

// 第二步：发出指令，然后把回调函数加入事件队列（回调函数并没有执行）
setTimeout(() => {
    console.log(a);
}, 0);

// 第三步：赋值，回调函数没有执行
a = 2;

// 第四步：发出指令，然后把回调函数加入异步队列（回调函数并没有执行）
setTimeout(() => {
    console.log(a);
}, 0);

// 第五步：赋值，回调函数没有执行
a = 3;
// 当所有代码执行完毕，cpu空闲下来了，就会开始遍历执行事件队列里面的回调函数
// 所以最后控制台输出：3 3



/*
b. 拥有异步I/O的node为什么可以支持高并发呢？

因为I/O操作是由node的工作线程去执行的（nodejs底层的libuv是多线程的线程池用来并行io操作），且主线程是不需要等待结果返回的，只要发出指令马上就可以去忙其他事情了。　　　


额外知识点：

c. 虽然nodejs的I/O操作开启了多线程，但是所有线程都是基于node服务进程开启的，并不能充分利用cpu资源

pm2进程管理器可以解决这个问题

pm2 是一个带有负载均衡功能的Node应用的进程管理器.

d. cpu核数与线程之间的关系

在过去单CPU时代，单任务在一个时间点只能执行单一程序。之后发展到多任务阶段，计算机能在同一时间点并行执行多任务或多进程。虽然并不是真正意义上的“同一时间点”，而是多个任务或进程共享一个CPU，并交由操作系统来完成多任务间对CPU的运行切换，以使得每个任务都有机会获得一定的时间片运行。而现在多核CPU的情况下，同一时间点可以执行多个任务，具体到这个任务在CPU哪个核上运行，这个就跟操作系统和CPU本身的设计相关了
*/


/*

2. node的缺点：不擅长cpu密集型的操作
----------------
a. 什么是cpu密集型操作（复杂的运算、图片的操作）

// 这就是一个cpu密集型的操作
for (let i = 0; i < 100000000; i++) {
    console.log(i);
}


b. nodejs为什么不擅长cpu密集型操作

因为nodejs是单线程的

*/





