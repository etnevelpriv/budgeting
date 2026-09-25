import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Expense } from './Expense.Class.ts';
const expenses: Expense[] = [
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
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render("index")
  getHello() {
    let osszeg = 0;
    expenses.forEach((expense: Expense) => {
      osszeg += expense.amount;
    });
    return {
      osszeg: osszeg
    };
  };
  @Get("/all")
  @Render("all")
  getAll() {
    return {
      title: "All",
      koltesek: expenses
    };
  };
  @Get("/top3")
  @Render("all")
  getTop3() {
    const top3: Expense[] = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 3);
    return {
      title: "Top3",
      koltesek: top3
    }
  };
  @Get("/search")
  @Render("all")
  getSearch(@Query("name") name: string = "") {
    const searchedExpenses: Expense[] = [];
    expenses.forEach((expense: Expense) => {
      if (expense.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
        searchedExpenses.push(expense);
      };
    });
    return {
      title: "Kereses",
      koltesek: searchedExpenses
    }
  };
  @Get("/expensive")
  @Render("all")
  getExpensive(@Query("amount") price: string = "") {
    const searchedExpenses: Expense[] = [];
    expenses.forEach((expense: Expense) => {
      if (expense.amount > Number(price)) {
        searchedExpenses.push(expense);
      };
    });
    return {
      title: "Kereses",
      koltesek: searchedExpenses
    };
  };
  @Get("/stats")
  @Render("stats")
  getStats() {
    const osszDarab = expenses.length;
    let osszKoltes = 0;
    expenses.forEach((expense: Expense) => {
      osszKoltes += expense.amount;
    });
    const atlagosKoltes = osszKoltes / osszDarab;
    const categories = new Set();
    expenses.forEach((expense: Expense) => {
      categories.add(expense.category);
    });
    const categoriesStats: any[] = [];
    categories.forEach((category) => {
      categoriesStats.push({
        categoryName: category,
        categoryCount: 0,
        categoryTotal: 0,
        categoryAvg: 0
      })
    });
    expenses.forEach((expense: Expense) => {
      categoriesStats.forEach((categorie) => {
        if (categorie.categoryName == expense.category) {
          categorie.categoryCount++;
          categorie.categoryTotal += expense.amount;
        };
      });
    });
    categoriesStats.forEach((categorie) => {
      categorie.categoryAvg = categorie.categoryTotal/categorie.categoryCount;
    });
    return ({
      osszDarab:osszDarab,
      atlagKoltes:atlagosKoltes,
      categories:categoriesStats
    })
  }
};