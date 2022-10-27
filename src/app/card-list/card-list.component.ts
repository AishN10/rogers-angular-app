import { Component, OnInit } from '@angular/core';
import { PageTemplateService, item } from '../service';
import { saveAs } from 'file-saver'
interface FormattedPageData {
  url: string;
  title: string;
  description: string;
  category: Categories;
}
interface Categories {
  '1': string;
  '2': string;
}

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  page: Array<FormattedPageData> = [];

  constructor(private pageTemplateService: PageTemplateService) {}

  async ngOnInit() {
      const pageData =  await this.pageTemplateService.getPage();
      const ndJson = this.transformData(pageData?.pageTemplateCollection.items!);
      await this.parseNdJson(ndJson)
  }

  private transformData(items: Array<item>) {
     let ndJson = ''
     items?.forEach((item) => {
      if(item && item.seo){
        const title = item.seo.title.replace('|', '-').trim();
        const description = item.seo.description !== "NA" ? item.seo.description.substring(0, 80) : null;
        const url = item.url.replace('/home', '');
        const keywords = url.replace(/\/+/g, ' ').trim().split(' ');
        const category = {
          '1': keywords[0]?.charAt(0).toUpperCase() + keywords[0]?.slice(1),
          '2': keywords[1]?.charAt(0).toUpperCase() + keywords[1]?.slice(1),
        };
        const value = {
          url: `https://rogers.com${url}`,
          ...{ title },
          ...{ description },
          isNoIndex: item.seo.isNoIndex,
          ...{ category },
         
        };
       ndJson+="\n" + JSON.stringify(value)
      }
    });
    const blob = new Blob([ndJson], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'ndjson.txt');
    return ndJson;
  }

   private async parseNdJson(ndJson: string){
     const jsonArray = ndJson.trim().split("\n");
     this.page = jsonArray.map((arr) => JSON.parse(arr))
  }

}
