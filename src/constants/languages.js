// Language definitions with default starter code
export const LANGUAGES = [
  {
    id: 'java',
    name: 'Java',
    monacoId: 'java',
    icon: '☕',
    color: '#B07219',
    defaultCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hey, Hi! This is Loki Here");
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
    defaultCode: `print("Hey, Hi! This is Loki Here")`,
    fileExtension: 'py',
  },
  
  {
    id: 'cpp',
    name: 'C++',
    monacoId: 'cpp',
    icon: '⚡',
    color: '#F34B7D',
    defaultCode: `#include <iostream>
int main() { std::cout << "Hey, Hi! This is Loki Here"; }`,
    fileExtension: 'cpp',
  },
  {
    id: 'c',
    name: 'C',
    monacoId: 'c',
    icon: '🔵',
    color: '#555555',
    defaultCode: `#include <stdio.h>
int main() { printf("Hey, Hi! This is Loki Here"); }`,
    fileExtension: 'c',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    monacoId: 'javascript',
    icon: '🟨',
    color: '#F7DF1E',
    defaultCode: `console.log("Hey, Hi! This is Loki Here");`,
    fileExtension: 'js',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    monacoId: 'typescript',
    icon: '🔷',
    color: '#2B7489',
    defaultCode: `let msg: string = "Hey, Hi! This is Loki Here";
console.log(msg);`,
    fileExtension: 'ts',
  },
];

export const getLanguageById = (id) => {
  return LANGUAGES.find(lang => lang.id === id) || LANGUAGES[0];
};

export const DEFAULT_LANGUAGE_ID = 'javascript';
