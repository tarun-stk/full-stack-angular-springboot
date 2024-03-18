import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list-component',
  // below is the template location, which will trigger on <app-sales-person-list-component> at location
  templateUrl: './sales-person-list-component-bootstrap.component.html',
  styleUrls: ['./sales-person-list-component.component.css']
})
export class SalesPersonListComponentComponent implements OnInit {

  // array of sales person objs
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Anup", "Kumar", 1000, "anup@gmail.com"),
    new SalesPerson("Varun", "Kumar", 40000, "varun@gmail.com"),
    new SalesPerson("Jason", "Kumar", 30000, "jason@gmail.com")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
