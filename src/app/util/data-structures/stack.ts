/**
 * @description stack implementation in typescript
 */
export class Stack<T> {

    private items;

    // Array is used to implement stack 
    constructor() {
        this.items = [];
    }

    /**
     * @description push element into stack
     * @param element the element to be pushed
     */
    push(element: T) {
        // push element into the items 
        this.items.push(element);
    }

    /**
     * @description remove the topmost element from the stack
     */
    pop() {
        // return top most element in the stack 
        // and removes it from the stack 
        // Underflow if stack is empty 
        if (this.items.length == 0)
            return "underflow";
        return this.items.pop();
    }

    /**
     * @description return the top of the stack
     */
    peek() {
        // return the top most element from the stack
        return this.items[this.items.length - 1];
    }

    /**
     * @description check if stack is empty
     */
    isEmpty() {
        // return true if stack is empty 
        return this.items.length === 0;
    }

    /**
     * @description display stack from top to bottom
     */
    printStack() {
        return this.items.slice(0).reverse();
    }
} 