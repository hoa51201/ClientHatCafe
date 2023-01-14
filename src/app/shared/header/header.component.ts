import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataService) { }
  categories: any[] =[];

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.dataService.GET('api/Categories/get-item').subscribe((res:any) => {
      this.categories = res
    })
  }

}
