import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  doSearch(theSearchWord: string) {
    console.log("theSearchWord: " + theSearchWord);
    this.router.navigateByUrl(`/search/${theSearchWord}`);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
