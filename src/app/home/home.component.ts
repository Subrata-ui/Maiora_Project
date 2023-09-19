import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeComponent {
  products: any;
  public columnsToDisplay: string[] = ['title', 'category', 'price'];
  public dataSource: MatTableDataSource<Product>;
  private dataArray: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

  pageSizes = [5, 10];
  expandedElement: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://fakestoreapi.com/products').subscribe(res => {
      console.table(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<Product>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator = this.paginatorPageSize;
    });
  }
  checkExpanded(element: any): boolean {
    let flag = false;
    this.expandedElement.forEach(e => {
      if (e === element) {
        flag = true;
        //console.log(flag);
      }
    });
    return flag;
  }
  pushPopElement(element: any) {
    const index = this.expandedElement.indexOf(element);
    //console.log(index);
    if (index === -1) {
      this.expandedElement.push(element);
    } else {
      this.expandedElement.splice(index, 1);
    }
  }
}
export class Product {
  title: string;
  category: string;
  price: number;
  description: string
}
