import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';

export interface item {
  url: string;
  seo: {
    entryTitle: string;
    title: string;
    description: string;
    isNoIndex: string;
  };
}

export interface PageTemplate {
    pageTemplateCollection: {
      total: number;
      skip: number;
      limit: number;
      items?: Array<item>;
    };
}


const GET_DATA = gql`
  query {
    pageTemplateCollection {
      total
      skip
      limit
      items {
        url
        seo {
          entryTitle
          title
          description
          isNoIndex
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class PageTemplateService {
  private pageQuery: QueryRef<any,any>;

  constructor(private apollo: Apollo) {
    this.pageQuery = this.apollo.watchQuery({
      query: GET_DATA,
			errorPolicy: 'all',
    });
  }

  async getPage(): Promise<PageTemplate>{
    const result = await this.pageQuery.refetch();
    return result.data;
  }
}
