// interface NumberDictionary {
//   [index: string]: number;
//   length: number;    // 可以，length是number类型
//   name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
// }
// class Animal {
//   name: string;
//   constructor(theName: string) { this.name = theName; }
//   move(distanceInMeters: number = 0) {
//       console.log(`${this.name} moved ${distanceInMeters}m.`);
//   }
// }

// class Snake extends Animal {
//   constructor(name: string) { super(name); }
//   move(distanceInMeters = 5) {
//       console.log("Slithering...");
//       super.move(distanceInMeters);
//   }
// }

// class Horse extends Animal {
//   constructor(name: string) { super(name); }
//   move(distanceInMeters = 45) {
//       console.log("Galloping...");
//       super.move(distanceInMeters);
//   }
// }

// let sam = new Snake("Sammy the Python");
// let tom: Animal = new Horse("Tommy the Palomino");

// sam.move();
// tom.move(34);
// console.log(sam)
// class Person {
//   protected name: string;
//   constructor(name: string) { this.name = name; }
// }

// class Employee extends Person {
//   private department: string;

//   constructor(name: string, department: string) {
//       super(name)
//       this.department = department;
//   }

//   public getElevatorPitch() {
//       return `Hello, my name is ${this.name} and I work in ${this.department}.`;
//   }
// }

// let howard = new Employee("Howard", "Sales");
// console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误
// let myAdd: (baseValue: number, increment: number) => number =
//     function(x: number, y: number): number { return x + y; };
interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function(this: Deck) {
      return ():Card => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}
