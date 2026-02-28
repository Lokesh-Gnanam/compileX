// Language definitions with default starter code
export const LANGUAGES = [
  {
    id: 'java',
    name: 'Java',
    monacoId: 'java',
    icon: '☕',
    color: '#B07219',
    defaultCode: `import java.util.*;

public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "! Welcome to CompileX.";
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(greet("World"));
        
        System.out.print("Fibonacci: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
        
        // Array List example
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);
    }
}`,
    fileExtension: 'java',
  },
  
  {
    id: 'python',
    name: 'Python',
    monacoId: 'python',
    icon: '🐍',
    color: '#3572A5',
    defaultCode: `# Python 3
def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to CompileX."

print(greet("World"))

# Fibonacci sequence
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

fib_sequence = [fibonacci(i) for i in range(10)]
print("Fibonacci:", fib_sequence)

# List comprehension example
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)`,
    fileExtension: 'py',
  },
  
  {
    id: 'cpp',
    name: 'C++',
    monacoId: 'cpp',
    icon: '⚡',
    color: '#F34B7D',
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

string greet(const string& name) {
    return "Hello, " + name + "! Welcome to CompileX.";
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << greet("World") << endl;
    
    cout << "Fibonacci: ";
    for (int i = 0; i < 10; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;
    
    // Vector example
    vector<int> nums = {5, 2, 8, 1, 9, 3};
    sort(nums.begin(), nums.end());
    cout << "Sorted: ";
    for (int n : nums) cout << n << " ";
    cout << endl;
    
    return 0;
}`,
    fileExtension: 'cpp',
  },
  {
    id: 'c',
    name: 'C',
    monacoId: 'c',
    icon: '🔵',
    color: '#555555',
    defaultCode: `#include <stdio.h>
#include <string.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Hello, World! Welcome to CompileX.\\n");
    
    printf("Fibonacci: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    
    // Array operations
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    // Bubble sort
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    printf("Sorted: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    
    return 0;
}`,
    fileExtension: 'c',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    monacoId: 'javascript',
    icon: '🟨',
    color: '#F7DF1E',
    defaultCode: `// JavaScript - Node.js
function greet(name) {
  return \`Hello, \${name}! Welcome to CompileX.\`;
}

console.log(greet("World"));
console.log("Current time:", new Date().toISOString());

// Fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  process.stdout.write(fibonacci(i) + " ");
}
console.log();`,
    fileExtension: 'js',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    monacoId: 'typescript',
    icon: '🔷',
    color: '#2B7489',
    defaultCode: `interface Greetable {
  name: string;
  language: string;
}

function greet(person: Greetable): string {
  return \`Hello, \${person.name}! Writing \${person.language} on CompileX.\`;
}

const user: Greetable = { name: "Developer", language: "TypeScript" };
console.log(greet(user));

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<number>(42));
console.log(identity<string>("CompileX"));

// Enum example
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

console.log("Direction:", Direction.Up);`,
    fileExtension: 'ts',
  },
];

export const getLanguageById = (id) => {
  return LANGUAGES.find(lang => lang.id === id) || LANGUAGES[0];
};

export const DEFAULT_LANGUAGE_ID = 'javascript';
