import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Expense } from './Expense.js';
import { get } from 'http';
const expenses: Expense[] = [
  { name: 'Heti bevásárlás', amount: 18500, category: 'food' },
  { name: 'Ebéd', amount: 3200, category: 'food' },
  { name: 'Pékség', amount: 1450, category: 'food' },
  { name: 'Villanyszámla', amount: 12400, category: 'utilities' },
  { name: 'Vízszámla', amount: 6800, category: 'utilities' },
  { name: 'Internet', amount: 7500, category: 'utilities' },
  { name: 'Mozijegy', amount: 2900, category: 'entertainment' },
  { name: 'Koncertjegy', amount: 22000, category: 'entertainment' },
  { name: 'Társasjáték', amount: 15900, category: 'entertainment' },
  { name: 'Buszbérlet', amount: 8950, category: 'misc' },
  { name: 'Füzet', amount: 1200, category: 'misc' },
  { name: 'Hátizsák', amount: 17000, category: 'misc' },
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
};