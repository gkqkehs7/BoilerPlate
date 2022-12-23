# TypeScript

zero-cho님의 ts-all-inone 강의를 듣고 작성한 readme

## Typescript

```tsx
const a: number = 5;
function add (x: string, y: string): string { return x + y }
var a: Array<number> = [1, 2, 3];
var a: number[] = [1, 2, 3];
const add: (x: number, y: number) => number = (x, y) => x + y;
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
```

- typescript는 기존 javascript의 변수, 함수, 객체에 type을 붙혀주는 것이다.

<br/>

## Type

```tsx
type A = number;
const a: A = 5;

type B = string;
function add(x: B, y: B): B{ return x + y }
const add: (x: B, y: B) => B = (x, y) => x + y;

type C = { lat: number, lon: number };
const obj: C = { lat: 37.5, lon: 127.5 };
```

- 이렇게 type명령어로 타입을 따로 정의해 준 다음, 지정해 주어도 된다.

<br/>

## Types

- boolean, number, string
    
    ```tsx
    type A = number;
    const a: A = 5;
    
    type B = string;
    const b: B = 'str';
    
    type C = boolean;
    const c: C = false;
    ```
    
    <br/>
    
- Array
    
    ```tsx
    let fruits: string[] = ["Apple", "Banana", "Mango"];
    let fruits: Array<string> = ["Apple", "Banana", "Mango"];
    ```
    
    - 배열은 두가지 방법으로 정의할 수 있다.
    
    <br/>
    
- object
    
    ### Interface
    
    ```tsx
    type Tobj = { lat: number, lon: number };
    const obj: Tobj = { lat: 37.5, lon: 127.5 };
    
    interface Iobj= { lat: number, lon: number };
    const obj: Iobj = { lat: 37.5, lon: 127.5 };
    ```
    
    - 객체의 타입을 정의할때는 type과 interface 둘다 사용 가능하다
    
    <br />
    
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
    - 남의 라이브러리 코드에서 타입을 추가, 수정하고 싶을 때 사용한다.
    - type끼리는 같은 이름으로 선언해도 합쳐지지 않는다. 애초에 같은 이름으로 설정 불가
    
    <br />
    
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
    
    - 위의 코드와 같이 같은 이름으로 나열하여 상속하는 것 보단, extends를 이용하여 상속한다.
    
    <br/>
    
- any/unknown
    
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
    - any의 사용빈도를 최대한 낮추자.
    
    <br/>
    
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
    
    <br/>
    
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
    
    <br/>
    
    ```tsx
    try {
    } catch (error) {
    	(error as Error).message
    }
    ```
    
    - catch의 error type이 unknwon이기 때문에 try-catch에서 많이 사용된다.
    
    <br/>
    
- null/undefined
    
    ```tsx
    let a: undefined = undefined;
    let b: null = null;
    ```
    
    <br />
    
- void
    
    <br />
    
    ```tsx
    function a(): void {
    	return; // or return undefined;
    }
    ```
    
    - void는 결과 값을 반환하지 않는 함수에 설정한다.
    - return값을 void로 선언하면 undefined를 return하거나 아무것도 return하면 안된다.
    
    <br/>
    
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
    - callback함수의 return값을 void로 설정하고 return값을 적어주어도 return값 설정 가능하다
    
    <br/>
    
- never
    
    ```tsx
    function invalid(message:string): never {
      throw new Error(message);
    }
    ```
    
    - never는 일반적으로 함수의 return타입으로 사용되는데, 항상 오류를 출력하거나 return 값을 절대로 내보내지 않음을 의미한다.
    
    <br />
    
    ```tsx
    let never_type: never;
    
    never_type = 99;
    ```
    
    - never타입을 지정한 변수에 never가 아닌 타입을 할당할 수 없다.
    
    <br />
    
- Object
    
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
    
    <br/>
    

<br />

### union & intersection

```tsx
type A = { hello: "world" } | { bye : "book" };

const a : A = { hello : "world" } // o
```

- or연산자로 타입의 범위 넓히기

<br/>

```tsx
type A = { hello: "world" } & { bye : "book" };

const a : A = { hello : "world" } // x
```

- and연산자로 타입의 범위 좁히기

<br/>

```tsx
type Animal = { breath: true };
type mammal= Animal & { breed: true };
type Human = mammal & { think : true };

const me: Human = { breath: true, breed: true, think : true }
```

- &로 타입을 추가해가며 상속의 개념으로 사용한다.

<br/>

강의에선 **“보통은 interface를 사용하고. type과 interface의 기능적 차이는 거의 없고,**

**표현의 차이가 있을 뿐이다.”** 라고 했는데 

type과 interface를 조금 더 사용해가며 나에게 맞는 것을 찾아봐야 겠다.

<br/>

### type을 집합으로 생각하자

```tsx
type A = string | number; // 더 넓은 type
type B = string; // 더 좁은 type
```

<br/>

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B; // 제일 좁은 type
type D = A | B; // 제일 넓은 type
```

- 넓은 type은 좁은 type에 들어갈 수 있다.

<br/>

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B;

const me: C = { name: "minwoo", age: 25, married: false } // 잉여 속성 검사로 인해 에러

const me2 = { name: "minwoo", age: 25, married: false }
const me3: C = me2 // 이렇게 빼주어야 가능
```

<br/>

### 잉여 속성 검사

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B;

const me: C = { name: "minwoo", age: 25, married: false } // 잉여 속성 검사로 인해 에러
```

<br/>

```tsx
type A = { name: string };
type B = { age: number }; 
type C = A & B;

const me = { name: "minwoo", age: 25, married: false }
const me2: C = me // 이렇게 빼주어야 가능
```

<br/>

### Type Gaurd

```tsx
function numOrStr(a: number | string) {
	a.toFixed(1);
}
```

- a가 number인지 string인지 확실히 알지 못하여 에러가 난다.

<br/>

```tsx
function numOrStr(a: number | string) {
	(a as number).toFixed(1);
}
```

- 이 해결방법은 typeScript를 잠시 안심시키지만. 에러가 날 수 있다.

<br/>

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

<br/>

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

<br/>

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

<br/>

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

<br/>

### index signature

```tsx
type A = { a: string, b: string, c: string }
const a: A = { a: 'a', b: 'b', c: 'c' }
```

- 객체의 타입이 모두 똑같을때

<br/>

```tsx
type A = { [key: string]: string }
const a: A = { a: 'a', b: 'b', c: 'c' }
```

- 이런식으로 key를 사용하여 통일 가능하다

<br/>

```tsx
type A = 'a' | 'b' | 'c'
type B = { [key in A]: string }
const b: B = { a: 'a', b: 'b', c: 'c' }
```

- key에 제한을 두고 싶다면 이런식으로 사용 가능하다

<br/>

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

<br/>

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
- interface와 type은 typescript에만 존재하여서 js에선 사라진다. 남기고 싶다면 class로 구현하자

<br/>

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

<br/>

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

<br/>

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

<br/>

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

<br/>

```tsx
function add<T extends string> (x: T, y: T): T {
	return x + y;
}

add(1, 2); // x
add('1', '2'); // o
```

- extends를 사용해서 type을 제한해 줄 수 있다

<br/>

```tsx
function add<T extends string | number> (x: T, y: T): T {
	return x + y;
}

add(1, 2); // o
add('1', '2'); // o
```

- 이렇게 type을 넓혀주는 것도 가능하다.

<br/>

```tsx
function add<T> (x: T, y: T): T {
	return x + y;
}

add<number>(1, 2);
```

- typescript가 알아먹지 못한다면, 직접 generic 타입을 써줄 수 있다.

<br/>

```tsx
function add<T extends string, K extends number> (x: T, y: K): T {
	return x + y;
}

add(1, 2); // x
add('1', '2'); // x
add('1', 2); // o
```

<br/>

```tsx
function add<T extends { a: string }>(x: T): T { return x; }
add({ a: 'hello' });

function add<T extends string[]>(x: T): T { return x; }
add(['1', '2', '3']);

function add<T extends (a: string) => number>(x: T): T { return x; }
add((a) => a);
```

<br/>

- forEach로 generic 이해하기

```tsx
interface Array<T> {
	forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
}

[1, 2, 3].forEach((value) => { console.log(value) }); // T = number
['1', '2', '3'].forEach((value) => { console.log(value) }); // T = string
[true, false, true].forEach((value) => { console.log(value) }); // T = boolean
[1, '2', true].forEach((value) => { console.log(value) }); // T = number | string | boolean
```

<br/>

- map으로 generic 이해하기

```tsx
interface Array<T> {
	map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}

const strings = [1, 2, 3].map((item) => item.toString()); // T는 number, U는 string
```

<br/>

- filter로 generic 이해하기

```tsx
interface Array<T> {
	filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
}

[1, 2, 3, 4, 5].filter((value) => value % 2);

// 왜 이건 추론하지 못하는가?
['1', 2, '3', '4', 5].filter((value) => type of(value) === string); // string[]
```

<br/>

- forEach 타입 직접 만들기

```tsx
interface Arr {
	forEach(callback: (item: number) => void): void;
}

const a: Arr = [1, 2, 3];
a.forEach((item) => {
	console.log(item);
});
```

<br/>

### 공변성과 반공변성

```tsx
function a(x: string): number {
	return +x;
}
a('1'); // 1

type B = (x: string) => number | string;
const b: B = a; // o
```

- a의 return 값은 number이고 B의 return 값은 number |  string인데 a는 왜 b에 대입이 되는가?
- 더 넓은 타입으로는 대입 가능하다

<br/>

```tsx
function a(x: string): number | string {
	return +x;
}
a('1'); // 1

type B = (x: string) => number;
const b: B = a; // x
```

- 더 좁은 타입으로는 대입할 수 없다.

<br/>

```tsx
function a(x: number | string ): number {
	return 0;
}

type B = (x: string) => number;
let b: B = a; // o
```

- 매개변수는 좁은 타입으로 대입이 된다.

<br/>

```tsx
function a(x: string ): number {
	return 0;
}

type B = (x: string | number ) => number;
let b: B = a; // x
```

- 매개변수는 넓은 타입으로 대입할 수 없다.

<br/>

```tsx
function a(x: string | number): number {
	return 0;
}

type B = (x: string) => number | string;
let b: B = a;
```

- 매개변수와  return값 합친것
- 매개변수는 좁은타입으로, return값은 넓은타입으로만 대입 가능하다

<br/>

### 타입 오버로딩

```tsx
declare function add(x: number, y: number): number
declare function add(x: number, y: number, z: number): number
// declare function add(x: number, y: number, z?: number): number

add(1, 2);
add(2, 3, 4);
```

- 같은 이름, 다른 타입의 함수를 두 번 선언해주면 위와 같이 쓰면된다.
- 타입별로 나누기 힘들때, 두개를 만들어주어 손쉽게 매개변수 별로 선언해 줄 수 있다.

<br/>

```tsx
interface Add {
	(x: number, y: number): number;
	(x: string, y: string): string;
}
const add: Add = (x, y) => x + y;

class A {
	add(x: number, y: number): number;
	add(x: string, y: string): string;
}

new A().add(1,2);
new A().add('1', '2');
```

- 객체과 class에 대한 오버로딩

<br/>

### TypeScript는 건망증이 심하다

```tsx
interface CustomError {
	name: string;
	message: string;
	stack?: string;
	response?: {
		data: any;	
	}
}

try {
} catch (err: unknown) {
	console.error((err as CustomError).response?.data); // 여기서 타입을 써주었는데
	(err as CustomError).response?.data; // 똑같은 코드에도 또 타입을 씌워주어야한다.
}
```

- TypeScipt는 똑같은 코드라도 계속 타입을 씌워주어야한다.

<br/>

```tsx
try {
} catch (err: unknown) {
	const customError = error as CustomError
	console.error((customError ).response?.data); // 여기서 타입을 써주었는데
	(customError).response?.data; // 똑같은 코드에도 또 타입을 씌워주어야한다.
}
```

- as로 도배 될 수 있기 때문에, 따로 변수로 빼준다.

<br/>

### Utility Types

- Partial
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    const me: Profile = {
    	name: 'minwoo',
    	age: 29,
    	married: false
    }
    ```
    
    - 새 객체를 만들때 interface는 건드리지 않고 married만 빼고 싶다면 어떻게 해야할까?
    
    <br/>
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    const me: Partial<Profile> = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    - Partial을 사용하면 interface을 모두 optional로 취급해 준다.
    
    <br/>
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    type CustomPartial<T> {
    	[Key in keyof T]?: T[key]; 
      // type Name = Profile['name']사용 Profile.name은 불가
    }
    
    const me: CustomPartial<Profile> = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    - Partial직접 구현해보기
    
    <br/>
    
- Extract
    
    ```tsx
    type Animal = 'Cat' | 'Dog' | 'Human';
    type Mammal = Extract<Animal, 'Human'>;
    ```
    
    - Extract는 원하는 것만 지정하여 선택할 수 있다.
    
    <br/>
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    type A = Extract<keyof Profile, 'name' | 'age'>
    
    const me: A = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    - 하지만, 객체에 바로 씌울 순 없어서 type으로 뺴준다음 적용해주어야 한다.
    
    <br/>
    
- Exclude
    
    ```tsx
    type Animal = 'Cat' | 'Dog' | 'Human';
    type Mammal = Exclude<Animal, 'Human'>;
    ```
    
    - Exclude는 제외해주고 싶은 것을 지정하여 제외할 수 있다.
    
    <br/>
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    type A = Exclude<keyof Profile, 'married'>
    
    const me: A = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    - 하지만, Extract와 같이 객체에 바로 씌울 순 없어서 type으로 뺴준다음 적용해주어야 한다.
    
    <br/>
    
- Pick
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    const me: Partial<Profile> = {}
    ```
    
    - Partial을 사용하면 아무것도 작성하지 않아도 에러가 나지 않기 때문에, partial은 잘 사용하지 않는다.
    
     <br/>
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    const me: Pick<Profile, 'name' | 'age' > = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    - Partial대신 Pick을 사용하면 사용할 것만 가지고 나올 수 있다.
    
    <br/>
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    type CustomPick<T, S extends keyof T> = {
    	[Key in S]: T[Key];
    }
    
    const me: CustomPick<Profile, 'name' | 'age' > = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    <br/>
    
- Omit
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    const me: Omit<Profile, 'married' > = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    - Pick으로 원하는 것만 빼오는 경우엔 속성이 너무 많으면 다 적어줘야 하기 때문에, 뺴줄 것만 Omit으로 지정할 수 있다.
    
    <br/>
    
    ```tsx
    interface Profile {
    	name: string;
    	age: number;
    	married: boolean;
    }
    
    type CustomOmit<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>
    
    const me: CustomOmit<Profile, 'married' > = {
    	name: 'minwoo',
    	age: 29,
    }
    ```
    
    - Pick과 Exclude를 이용해서 omit 만들어 보기
- Required
    
    ```tsx
    interface Profile {
    	name?: string;
    	age?: number;
    	married?: boolean;
    }
    
    const me: Required<Profile> = {
    	name: 'minwoo',
    	age: 29,
    	married: false
    }
    ```
    
    - Required는 모두 optional로 되어있는 어떤 type을 모두 필수로 해주고 싶을 때 사용한다.
    
    <br/>
    
    ```tsx
    interface Profile {
    	name?: string;
    	age?: number;
    	married?: boolean;
    }
    
    type CustomRequired<T> {
    	[Key in keyof T]-?: T[Key]; // ?는 optional -?는 optional제거이다
    }
    
    const me: CustomRequired<Profile> = {
    	name: 'minwoo',
    	age: 29,
    	married: false
    }
    ```
    
    - Required직접 만들어보기
    
    <br/>
    
    ```tsx
    interface Profile {
    	readonly name?: string;
    	readonly age?: number;
    	readonly married?: boolean;
    }
    
    type CustomRequired<T> {
    	-readonly[Key in keyof T]-?: T[Key]; // ?는 optional -?는 optional제거이다
    }
    
    const me: CustomRequired<Profile> = {
    	name: 'minwoo',
    	age: 29,
    	married: false
    }
    me.name = 'minwoo2';
    ```
    
    - -를 쓰면 특정 조건을 없애 줄 수 있다.
    - 보통 남의 라이브러리에서 타입을 가져와쓸때 조건 제외시 사용된다.
    
    <br/>
    
- Record
    
    ```tsx
    const a: Record<string, number> = { a: 3, b: 'b' };
    ```
    
    - record는 union과 똑같은 용도로 쓰인다.
    
    <br/>
    
- NonNullable
    
    ```tsx
    type A = string | null | undefined | number;
    type B = NonNullable<A> // string | number
    ```
    
    - NonNullable을 사용하면 null과  undefined를 제외하고 타입을 가져온다.
    
    ```tsx
    type A = string | null | undefined | number;
    
    type CustomNonNullable<T> = T extends null | undefined ? never : T;
    type B = CustomNonNullable<A> // string | number
    ```
    
- Parameters
    
    ```tsx
    function zip(x: number, y: string, z: boolean): { x: number, y: string, z: boolean } {
    	return { x, y, z };
    }
    
    type Params = Parameters<type of zip>;
    Params[0] // number;
    Params[1] // string;
    Params[2] // boolean ;
    ```
    
    - Parameters를 사용하면 함수의 return 타입들을 뽑아와 배열에 저장한다.
    
    ```tsx
    function zip(x: number, y: string, z: boolean): { x: number, y: string, z: boolean } {
    	return { x, y, z };
    }
    
    type CustomParameters<T extends (...args: any) => any> 
    	= T extends (...args: infer A) => any ? A : never;
    type Params = CustomParameters<type of zip>;
    Params[0] // number;
    Params[1] // string;
    Params[2] // boolean ;
    ```
    
    - Parmeters직접 만들어보기
    - (...args: any) => any는 무조건 함수여야함을 의미
