---
lang: es-ES
title: Dart - Enumeraciones, clases y objetos
description: Enumeraciones, clases y objetos en Dart
---

# Enumeraciones, clases y objetos

## Enumeraciones

Las enumeraciones son un tipo de datos que nos permiten definir un conjunto de constantes con nombre.
Por convención la primera letra se escribe en mayúscula y el resto en minúscula. Status, PersonProfile, etc.

Además los enums tiene propiedades que nos permiten obtener el nombre de la constante y el índice de la misma.

```dart
enum Status {
  none,
  running,
  stopped,
  paused
}

void main() {
  var status = Status.running;

  print(status); // Status.running
  print(status.index); // 1
  print(status.toString()); // Status.running
  print(status.name); // running
}
```

## Switch

El switch es una estructura de control que nos permite ejecutar un bloque de código en función del valor de una variable.

Las enumeraciones se utilizan a menudo con los `switch` para realizar acciones específicas en función del valor de la enumeración.

```dart
enum Status {
  none,
  running,
  stopped,
  paused
}

void main() {
  var status = Status.running;

  switch (status) {
    case Status.none:
      print('none');
      break;
    case Status.running:
      print('running');
      break;
    case Status.stopped:
      print('stopped');
      break;
    case Status.paused:
      print('paused');
      break;
  }
}
```

## Clases

Las clases son plantillas que se utilizan para crear objetos. Los objetos son instancias de una clase.
Las clases en dart son similares a las clases en JavaScript.

```dart
class Person {
  String name;

  printName() { <!-- a method -->
    print(name);
  }
}
```

Para crear una instancia de una clase, se puede usar la palabra clave `new`, es opcional.

```dart
var person = new Person();
const person = Person(); <!-- Flutter way -->
```

### Public

En Dart, todo es público por defecto. Si desea que algo sea privado, debe agregar un guión bajo (\_) al principio de su nombre.

```dart
class Person {
  String name;
  int age;
  _Person(this.name, this.age);
}
```

### Constructores

Los constructores son métodos especiales que se usan para crear instancias de una clase.

Tenemos los constructores por defecto y los constructores con nombre.

```dart
class Person {
  String name;

  Person(this.name); // Constructor por defecto

  Person.withName(this.name); // Constructor con nombre
}
```

Solo podemos tener un constructor por defecto. Mientras que podemos tener varios constructores con nombre.

Los contructores con nombre sirven para inicializar la clase con valores por defecto.

```dart
class Persona {
  String nombre;
  int edad;

  Persona(this.nombre, this.edad);

  // Named constructor para crear una persona con edad 18
  Persona.adulto(this.nombre) : edad = 18;

  // Named constructor para crear una persona con nombre Anónimo y edad 0
  Persona.anonimo() : nombre = 'Anónimo', edad = 0;

  void saludar() {
    print('Hola, mi nombre es $nombre y tengo $edad años');
  }
}

void main() {
  Persona p1 = Persona('Juan', 25);
  p1.saludar(); // Hola, mi nombre es Juan y tengo 25 años

  Persona p2 = Persona.adulto('María');
  p2.saludar(); // Hola, mi nombre es María y tengo 18 años

  Persona p3 = Persona.anonimo();
  p3.saludar(); // Hola, mi nombre es Anónimo y tengo 0 años
}
```

Extender una clase:

```dart
class Person {
  String name;

  Person(this.name);

  void printName() {
    print(name);
  }
}

class Employee extends Person {
  String company;

  Employee(String name, this.company) : super(name);

  void printCompany() {
    print(company);
  }
}
```

Named parameters:

```dart
class Person {
  String name;
  int age;

  Person({required this.name, required this.age});
}

void main() {
  var p1 = Person(name: 'Bob', age: 20);
  var p2 = Person(age: 20, name: 'Bob');
}
```

#### Factory constructors

Los factory constructors son métodos que devuelven una instancia de la clase. Se utilizan para controlar la creación de instancias de una clase.

```dart
class Person {
  String name;

  Person(this.name);

  factory Person.fromName(String name) {
    return Person(name);
  }
}

void main() {
  var person = Person.fromName('Bob');
}
```

### Abstract classes

Las clases abstractas son clases que no se pueden instanciar. Se utilizan como clases base para otras clases.

```dart
abstract class Person {
  String name;

  Person(this.name);

  void printName() {
    print(name);
  }
}

class Employee extends Person {
  String company;

  Employee(String name, this.company) : super(name);

  void printCompany() {
    print(company);
  }
}

void main() {
  var employee = Employee('Bob', 'Google');
  employee.printName(); // Bob
  employee.printCompany(); // Google
}
```
