 #### 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：
 普通接口
``` ts
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```
#### 函数接口
``` ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}

```
#### 可索引的类型
``` ts
  interface StringArray {
    [index: number]: string;
  }

  let myArray: StringArray;
  myArray = ["Bob", "Fred"];

  let myStr: string = myArray[0];
```
#### 类类型
``` ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

```ts
// 构造函数的接口
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
// 实例的接口
interface ClockInterface {
    tick();
}
 // 构造函数
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}
// DigitalClock 实现接口
class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
// AnalogClock 实现接口
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```
#### 继承接口
``` ts
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}
//继承多个
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}
```
#### 混合类型
``` ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
``` ts
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}
 // 这里的的SelectableControl 只能被 Control的派生类所实现   派生类通常被称作 子类，基类通常被称作 超类。
// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {

}
```
