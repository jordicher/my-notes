---
lang: es-ES
title: Dart avanzado
description: Colecciones en Dart
---

# Dart avanzado

## Null Safety

Aunque digamos que todo en Dart es un objeto, no es del todo cierto, el valor null no es un objeto.

Null safety es una característica de Dart que permite a los desarrolladores escribir código más seguro. Dart 2.12 es la primera versión de Dart que incluye Null safety. La variable no puede ser null a no ser que se especifique explícitamente.

No puedo hacer esto:

```dart
String name; // Error: String name; // Error: A value of type 'Null' can't be assigned to a variable of type 'String'.
int x = null; // Error: A value of type 'Null' can't be assigned to a variable of type 'int'.
```

Pero si puedo hacer esto:

```dart
late String name; // OK
String? name; // OK. It can be string or null.
int? aNullableInteger = null; // OK
```

`late` es una palabra clave que se usa para indicar que una variable se inicializará más tarde. Si no se inicializa, el compilador arrojará un error.

```dart
late String name;
print(name); // Error: LateInitializationError: Field 'name' has not been initialized.
```

`?` es una palabra clave que se usa para indicar que una variable puede ser nula. Podemos hacer llamadas seguras a las variables nulas.

```dart
String? name;
print(name); // null
print(name.length); // Error: The getter 'length' was called on null.
print(name?.length); // null  => Safe call
```

`!` es una palabra clave que se usa para indicar que una variable ya estamos seguros de que no es nula. Si la variable es nula, el compilador arrojará un error.

```dart
String? name;
name = 'Bob';
print(name!.length); // 3
```

## Clases

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
