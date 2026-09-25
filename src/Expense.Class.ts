import type { Expense_Interface } from "./Expense.ts";
export class Expense implements Expense_Interface {
    name:string;
    amount: number;
    category: "food" | "utilities" | "entertainment" | "misc";
    constructor(name:string, amount:number, category:"food" | "utilities" | "entertainment" | "misc") {
        this.name = name;
        this.amount = amount
        this.category = category;
    };
}