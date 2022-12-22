# TypeScript

zero-cho님의 ts-all-inone 강의를 듣고 작성한 readme

### Typescript

```tsx
const a: number = 5;
function add (x: string, y: string): string { return x + y }
const add: (x: number, y: number) => number = (x, y) => x + y;
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
```

- typescript는 기존 javascript의 변수, 함수, 객체에 type을 붙혀주는 것이다.

### Type

```tsx
type A = number;
const a: A = 5;

type B = string;
function add(x: B, y: B): B{ return x + y }
const add: (x: B, y: B) => B = (x, y) => x + y;

type C = { lat: number, lon: number };
const obj: C = { lat: 37.5, lon: 127.5 };
```

- 이렇게 type명령어로 타입을 정의해 준 다음, 지정해 주어도 된다.

### Interface

```tsx
type Tobj = { lat: number, lon: number };
const obj: Tobj = { lat: 37.5, lon: 127.5 };

interface Iobj= { lat: number, lon: number };
const obj: Iobj = { lat: 37.5, lon: 127.5 };
```

- 객체의 타입을 정의할때는 interface도 사용 가능하다

### Type과 Interface의 차이

```tsx
interface A {
	aFunc: () => void;
}

interface A {
	bFunc: () => void;
}

interface A {
	cFunc: () => void;
}

const a : A = { aFunc() {}, bFunc() {}, cFunc () {} }
```

- interface는 같은 이름으로 선언할 수 있고, 선언할때마다 속성이 추가 된다.
- 남의 라이브러리 코드에서 type을 추가, 수정하고 싶을 때 사용한다.
- type끼리는 같은 이름으로 선언해도 합쳐지지 않는다. 애초에 같은 이름으로 설정 불가

### extends

```tsx
interface Animal {
	breath: true 
}

interface mammal extends Animal {
	breed: true 
}

interface Human extends mammal {
	think : true
}

const me: Human = { breath: true, breed: true, think : true }
```

- 위의 코드와 같이 같은 이름으로 나열하여 상속하는 것 보단, extends를 이용히여 상속한다.

### union & intersection

```tsx
type A = { hello: "world" } | { bye : "book" };

const a : A = { hello : "world" } // o
```

- or연산자로 타입의 범위 넓히기

```tsx
type A = { hello: "world" } & { bye : "book" };

const a : A = { hello : "world" } // x
```

- and연산자로 타입의 범위 좁히기

```tsx
type Animal = { breath: true };
type mammal= Animal & { breed: true };
type Human = mammal & { think : true };

const me: Human = { breath: true, breed: true, think : true }
```

- &로 타입을 추가해가며 상속의 개념으로 사용한다.

강의에선 **“보통은 interface를 사용하고. type과 interface의 기능적 차이는 거의 없고,**

**표현의 차이가 있을 뿐이다.”** 라고 했는데 

type과 interface를 조금 더 사용해가며 나에게 맞는 것을 찾아봐야 겠다.

### type을 집합으로 생각하자

```tsx
type A = string | number; // 더 넓은 type
type B = string; // 더 좁은 type
```

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B; // 제일 좁은 type
type D = A | B; // 제일 넓은 type
```

넓은 type은 좁은 type에 들어갈 수 있다.

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B;

const me: C = { name: "minwoo", age: 25, married: false } // 잉여 속성 검사로 인해 에러

const me2 = { name: "minwoo", age: 25, married: false }
const me3: C = me2 // 이렇게 빼주어야 가능
```

### 잉여 속성 검사

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B;

const me: C = { name: "minwoo", age: 25, married: false } // 잉여 속성 검사로 인해 에러
```

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B;

const me = { name: "minwoo", age: 25, married: false }
const me2: C = me // 이렇게 빼주어야 가능
```

### void

```tsx
function a(): void {
	return; // or return undefined;
}
```

- return값을 void로 선언하면 undefined를 return하거나 아무것도 return하면 안된다.

```tsx
interface Human {
	talk: () => void;
}
const human: Human = {
	talk() { return 'abc' }
}

function a(() => void): void {
}
a(() => { return 3; });
```

- 첫번째 void의 의미는 이 함수의 return값은 없다 이고,
- 두번째 void의 의미는 이 함수의 return값을 사용하지 않겠다 이다.

callback함수의 return값을 void로 설정하고 return값을 적어주어도 return값 설정 가능하다

### unknown & any

type을 지금당장 모르겠을때 unknown이나 any를 사용한다.

```tsx
interface A {
	aFunc: () => number;
}
const a: A = { 
	aFunc() { return 3; }
}

const b: any = a.aFunc();
b.anyFunc();
```

- any는 type선언을 안하겠다는 포기선언과 다름없기 때문에,  뒤에 아무거나 붙혀도 에러가 나지 않는다.

```tsx
interface A {
	aFunc: () => number;
}
const a: A = { 
	aFunc() { return 3; }
}

const b: unknown = a.aFunc();
b.anyFunc();
```

- 이렇게 unknown으로 선언하면 개체가 알수없는 형식이다 라고 에러가 생긴다.

```tsx
interface A {
	aFunc: () => number;
}
const a: A = { 
	aFunc() { return 3; }
}

const b: unknown = a.aFunc();
(b as A).anyFunc();
```

- unknwon은 이렇게 as로 타입을 수정해 줄 수 있다.
- 하지만 any는 타입을 as로 수정해 줄 수 없다.

```tsx
try {
} catch (error) {
	(error as Error).message
}
```

- catch의 error type이 unknwon이기 때문에 try-catch에서 많이 사용된다.

### Type Gaurd

```tsx
function numOrStr(a: number | string) {
	a.toFixed(1);
}
```

- a가 number인지 string인지 확실히 알지 못하여 에러가 난다.

```tsx
function numOrStr(a: number | string) {
	(a as number).toFixed(1);
}
```

- 이 해결방법은 typeScript를 잠시 안심시키지만. 에러가 날 수 있다.

```tsx
function numOrStr(a: number | string) {
	if(typeof a === 'number') {
		a.toFixed(1);	
  } else {
		a.charAt(3);
	}
} 
```

- 이렇게 typeof를 사용하여 typeGaurd를 해준다.

```tsx
function numOrNumArr(a: number | number[]) {
  if (Array.isArray(a)) {
    a.slice(1);  
  } else {
    a.toFixed(1);
  }
}
```

- array일때 type 구분하기

```tsx
class A {
	aaa() {}
}

class B {
	bbb() {}
}

function aOrB(param: A | B) {
	if (param instance of A) {
		param.aaa();
	}
}

aOrB(new A());
```

- class일때 type 구분하기

```tsx
interface Cat { meow: number }
interface Dog { bow: number }

function catOrDog(a: Cat | Dog): a is Dog {
	if ((a as Cat).meow) { return false }
	return true;
}

function pet(a: Cat | Dog) {
	if (catOrDog(a)) {
		console.log(a.bow);
	} else {
		console.log(a.meow);
	}
}
```

- 함수의 return type에 is를 사용해 type을 구분해주는 custom TypeGaurd함수를 직접 만들어서 type 구분 해주기
- is가 있다면 custom TypeGaurd 함수이다.

### 모든 Type

```tsx
const x: {} = 'hello' // o
const y: Object = 'hello' // o

const z: object = 'hello' // x
const corret: object = {
	a: 1, b: 2
}
```

- { } 와 Object는 객체가 아니라 모든 type을 뜻한다
- 객체의 type을 나타내는 object와 헷갈리지 않도록하자.

### index signature

```tsx
type A = { a: string, b: string, c: string }
const a: A = { a: 'a', b: 'b', c: 'c' }
```

- 객체의 타입이 모두 똑같을때

```tsx
type A = { [key: string]: string }
const a: A = { a: 'a', b: 'b', c: 'c' }
```

- 이런식으로 key를 사용하여 통일 가능하다

```tsx
type A = 'a' | 'b' | 'c'
type B = { [key in A]: string }
const b: B = { a: 'a', b: 'b', c: 'c' }
```

- key에 제한을 두고 싶다면 이런식으로 사용 가능하다

### Class

```tsx
class A {
	a: string;
	b: number;
	constuctor(a: string, b: number = 123) {
		this.a = a;
		this.b = b;
	}
}

const a: A = new A('hello');
```

- typeof를 사용하지 않아도 클래스 자체로 type이 된다.

```tsx
interface A {
	readonly a: number;
	b: string;
}

class B implements A {
	a: number = 123;
	b: string = 'hello';
	c: string = 'world';
}
```

- class의 모양을 interface로 통제할 수 있다.
- 그런데 굳이 interface로 통제 안하고 class로 모든것을 구현해도 된다.
- 객체지향의 원칙(추상 - 구현)을 중시한다면 interface로 통제, class로 구현하라.

```tsx
interface A {
	readonly a: number;
	b: string;
}

class B implements A {
	private a: number = 123;
	protected b: string = 'hello';
	c: string = 'world'; // 아무것도 작성하지 않으면 public
}

class C extends B {
	method() {
		console.log(this.a); // x
		console.log(this.b); // o
		console.log(this.c); // o
	}
}

const b = new B;
B.a; // x
B.b; // x
B.c; // o
```

- private는 클래스 내부에서만 사용가능
- protected는 클래스 내부, 상속 클래스의 내부에서 사용가능
- public은 모든 곳에서 사용 가능

### Optional chaining

```tsx
function func(a: number, b?: number, c?: number) { }
func(); // x
func(1); // o
func(1, 2); // o
func(1, 2, 3); // o
func(1, 2, 3, 4); // x

let obj: { a: string, b?: string } = {
	a: 'hello' 
}
```

### Generic

Type을 변수처럼 만들어서 지금 당장 type을 모르지만 나중에 정하겠다

```tsx
function add(x: string | number, y: string | number): string | number {
	return x + y;
}
add(1, 2);
add('1', '2');
```

- add 함수를 위 처럼 정의하여 add(1, 2) 일때는 3을, add('1', '2') 일 때는 ‘12’를 return하게 해주고 싶지만 에러가 난다.
- add(1, ‘2’)이 들어 올 수 있는 가능성을 배제 하지 못했기 때문이다.

```tsx
function add<T> (x: T, y: T): T {
	return x + y;
}

add(1, 2);
add('1', '2');
```

- 이렇게 generic을 사용하면 가능해진다.
- T에 들어가는 것들은 같기만 하면 어떤 type이든 가능하다.
- 하지만 add(true, false) 이런 것도 가능해진다. 우리는 이런 것들은 막고 싶다.

```tsx
function add<T extends string> (x: T, y: T): T {
	return x + y;
}

add(1, 2); // x
add('1', '2'); // o
```

- extends를 사용해서 type을 제한해 줄 수 있다

```tsx
function add<T extends string | number> (x: T, y: T): T {
	return x + y;
}

add(1, 2); // o
add('1', '2'); // o
```

- 이렇게 type을 넓혀주는 것도 가능하다.
