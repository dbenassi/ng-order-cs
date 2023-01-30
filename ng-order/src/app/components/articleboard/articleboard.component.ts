import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

type ArticleSQL = {
  ID: number;
  DESCRIZIONE: string;
  PREZZO: number;
}

@Component({
  selector: 'app-articleboard',
  templateUrl: './articleboard.component.html',
  styleUrls: ['./articleboard.component.scss']
})

export class ArticleboardComponent implements OnInit {

  articleList!: Array<ArticleSQL>;
  displayedColumns: string[] = ['ID', 'DESCRIZIONE', 'PREZZO'];

  constructor(private fetchService : FetchService){}

  ngOnInit(): void {
    this.fetchService.getArticles().subscribe({
      next: (response) => {
        this.articleList = response;
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => console.info('complete')
    })      

  }





}
