import { Controller, Get, Render, Query } from '@nestjs/common';
import { AppService } from './app.service.js';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render("index")
  getHello() {
    return this.appService.getTotal()
  };
  @Get("/all")
  @Render("all")
  getAll() {
    return this.appService.getAll()
  };
  @Get("/top3")
  @Render("all")
  getTop3() {
    return this.appService.getTop3();
  };
  @Get("/search")
  @Render("all")
  getSearch(@Query("name") name: string = "") {
    return this.appService.searchByName(name);
  };
  @Get("/expensive")
  @Render("all")
  getExpensive(@Query("amount") price: string = "0") {
    const amount = Number(price);
    return this.appService.getMoreExpensiveThan(amount);
  };
  @Get("/stats")
  @Render("stats")
  getStats() {
     return this.appService.getStats();
  }
};