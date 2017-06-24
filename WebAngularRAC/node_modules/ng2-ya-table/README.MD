# ng2-ya-table

Angular 2 yet another table.

## Installation

To install this library, run:

```bash
$ npm install ng2-ya-table --save
```

## Minimal Setup Example

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Ng2YaTableModule } from 'ng2-ya-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2YaTableModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```xml
<!-- You can now use the library in app.component.html -->
<h1>
  {{title}}
</h1>
<ng2-ya-table [options]="options" [columns]="columns" [datasource]="datasource" [paging]="paging">
</ng2-ya-table>
```

```typescript
public options:any = {
    orderMulti: true,
    className: ['table-striped'],
    language: "en"
};

public datasource: any = (request: any): Observable<any> => {
    return this.userClient.getUsers(request);
}

public paging: any = {
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 25, 50, 100],
    maxSize: 5
}

public columns:Array<any> = [
  { 
      title: 'Name', 
      name: 'Name', 
      sort: true, 
      defaultSortOrder: 'asc',  
      filter: {
          type: 'default', 
          controlType: 'default',
          config: {
              placeholder: 'Filter by name'
          }
      } 
  },
  { 
      sort: false, 
      title: '', 
      name: 'btnEdit',
      render: (data: any, row: any): string => {
          return "<div class='text-center'>" +
              "<button type='button' class='btn btn-sm btn-primary'><span class='glyphicon glyphicon-pencil'></span></button> " +
              "</div>";
      },
      action: (data: any, row: any): any => {
          ...
      }
  },
  { 
      sort: false, 
      title: '', 
      name: 'btnDelete',
      render: (data: any, row: any): string => {
          return "<div class='text-center'>" +
              "<button type='button' class='btn btn-sm btn-danger'><span class='glyphicon glyphicon-trash'></span></button> " +
              "</div>";
      },
      action: (data: any, row: any): any => {
          ...
      }
  }
];
```

## Further Documentation

Installation, customization and other useful articles will be available soon...

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT ©
