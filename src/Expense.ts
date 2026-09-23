export interface Expense {
  name: string;
  amount: number;
  category: "food" | "utilities" | "entertainment" | "misc";
}
