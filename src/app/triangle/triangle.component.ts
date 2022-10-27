import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss']
})
export class TriangleComponent implements OnInit {
  triangle = ""
  constructor() { }

  ngOnInit(): void {
      //** test-1 triangle problem
      for (let line = "*"; line.length < 5; line += "*"){
        if(line.length == 2){
          continue;
        }
        this.triangle += line + "\n"
      } 
  }

}
