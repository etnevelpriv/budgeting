import { Injectable } from '@nestjs/common';
import { Expense } from './Expense.Class.js';

type CategoryStats = {
  categoryName: Expense['category'];
  categoryCount: number;
  categoryTotal: number;
  categoryAvg: number;
};

@Injectable()
export class AppService {
  private readonly expenses: Expense[] = [
    new Expense('Heti bevásárlás', 18500, 'food'),
    new Expense('Ebéd', 3200, 'food'),
    new Expense('Pékség', 1450, 'food'),
    new Expense('Villanyszámla', 12400, 'utilities'),
    new Expense('Vízszámla', 6800, 'utilities'),
    new Expense('Internet', 7500, 'utilities'),
    new Expense('Mozijegy', 2900, 'entertainment'),
    new Expense('Koncertjegy', 22000, 'entertainment'),
    new Expense('Társasjáték', 15900, 'entertainment'),
    new Expense('Buszbérlet', 8950, 'misc'),
    new Expense('Füzet', 1200, 'misc'),
    new Expense('Hátizsák', 17000, 'misc'),
  ];
  getAll() {
    return {
      title:"Osszes",
      koltesek: this.expenses
    };
  }
  getTotal() {
    let osszeg = 0;
    this.expenses.forEach((expense: Expense) => {
      osszeg += expense.amount;
    });
    return {
      osszeg: osszeg
    };
  }
  getTop3() {
    const top3: Expense[] = [...this.expenses].sort((a, b) => b.amount - a.amount).slice(0, 3);
    return {
      title: "Top3",
      koltesek: top3
    }
  }
  searchByName(name: string) {
    const searchedExpenses: Expense[] = [];
    this.expenses.forEach((expense: Expense) => {
      if (expense.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
        searchedExpenses.push(expense);
      };
    });
    return {
      title: "Kereses",
      koltesek: searchedExpenses
    }
  }
  getMoreExpensiveThan(price: number) {
    const searchedExpenses: Expense[] = [];
    this.expenses.forEach((expense: Expense) => {
      if (expense.amount > price) {
        searchedExpenses.push(expense);
      };
    });
    return {
      title: "Kereses",
      koltesek: searchedExpenses
    };
  }
  getStats() {
    const osszDarab = this.expenses.length;
    let osszKoltes = 0;
    this.expenses.forEach((expense: Expense) => {
      osszKoltes += expense.amount;
    });
    const atlagosKoltes = osszKoltes / osszDarab;
    const categories: Set<Expense['category']> = new Set();
    this.expenses.forEach((expense: Expense) => {
      categories.add(expense.category);
    });
    const categoriesStats: CategoryStats[] = [];
    categories.forEach((category) => {
      categoriesStats.push({
        categoryName: category,
        categoryCount: 0,
        categoryTotal: 0,
        categoryAvg: 0
      })
    });
    this.expenses.forEach((expense: Expense) => {
      categoriesStats.forEach((categorie) => {
        if (categorie.categoryName == expense.category) {
          categorie.categoryCount++;
          categorie.categoryTotal += expense.amount;
        };
      });
    });
    categoriesStats.forEach((categorie) => {
      categorie.categoryAvg = categorie.categoryTotal / categorie.categoryCount;
    });
    return ({
      osszDarab: osszDarab,
      atlagKoltes: atlagosKoltes,
      categories: categoriesStats
    })
  }
}
