# Cuppa Angular 2 Data Grid Component

[![npm version](https://img.shields.io/npm/v/cuppa-ng2-grid.svg)](https://www.npmjs.com/package/cuppa-ng2-grid)

### Render 10,000+ Records with high performance
It is often required that, large datasets needs to be rendered in the front-end table. Cuppa Angular 2 Data Grid components handles 10K + records with high performance. Developed using `Angular 2`, `TypeScript`, `HTML`, `CSS` 

### Features
- Render `10k + records` with high performance
- Faster Rendering without browser hanging.
- Faster `Sorting algorithm`
- Faster `filtering` and `search algorithm`


## Demo
### View the [Demo here](https://cuppalabs.github.io/angular2-dataGrid/).

## Getting Started

### Installation
- Install with [npm](https://www.npmjs.com/package/cuppa-ng2-grid):
    `npm install cuppa-ng2-grid `

### Usage

- Import `CuppaDataGridModule` from the installed package into your module as follows:

```js
import { CuppaDataGridModule } from 'cuppa-ng2-grid/cuppa-ng2-dataGrid';
```
- Declare the data grid module in your `ngModule` as follows:

```js
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    CuppaDataGridModule // Import DataGrid module variable here
  ]
})
```

## Initialize

### HTML
- Place the component html tag in the template where the table needs to be rendered.
```html
<cuppa-datagrid [datalist] = "arrayList" [config]="config" (onRowSelect)="onRowClick($event)"></cuppa-datagrid>
```

### JS 
- Component requires a `config` object to configure the grid and `datalist` to pass data to the component, as follows:

```js 
export class AppComponent implements OnInit {
      private config = {
        title: "Cuppa Data Table",
        w: 300,
        h: 300,
        itemHeight: 31,
        totalRows: 10000,
        items: this.arrayList,
        sort:{'id':'desc'}
      }
      private arrayList:any[] =
            [
                {"id":1,"name":"Mayo","mobile":9240592804},
                {"id":2,"name":"Nelson","mobile":9008774782},
                {"id":3,"name":"Nichols","mobile":9965852134},
                {"id":4,"name":"Summers","mobile":9600712058},
                {"id":5,"name":"Novak","mobile":9045924098},
                {"id":6,"name":"Bell","mobile":9001240358},
                {"id":7,"name":"Marshall","mobile":9276107621},
                {"id":8,"name":"May","mobile":9966279627},
                {"id":9,"name":"Villanueva","mobile":9695365778},
                {"id":10,"name":"Gonzalez","mobile":9946879817},
                {"id":11,"name":"Dorsey","mobile":9243595415}
            ];
      private onRowClick(row:any){
        console.log(row);
        alert("selected row:"+ row.id +" "+row.name+" "+row.mobile);
      }
  }
```

### Config Options
The following config options can be used

| Setting         |Type    | Description            |
|:--- |:--- |:--- |:--- |
| title | String | Set the title of the table |
| w | Number | Set the width of the table. |
| h | Number | Set the height of the table. |
| itemHeight | Number | Set the height of the row. |
| totalRows | Number | Total number of records. |
| items | Array | Array of table records. |
| sort | Object | Object to set the default column for sorting.|

### Column Template
Custom content or elements can be added to table columns.

  - `<c-column>` - Column component for the table.
  - Example:

```html
    <cuppa-datagrid [datalist] = "arrayList" [config]="config">
          <c-column field="id"></c-column>
          <c-column field="name">
            <ng-template let-person="rowData">
                <span>{{person.name}}</span>
            </ng-template>
          </c-column>
          <c-column field="mobile"></c-column>
          <c-column>
            <ng-template let-person="rowData">
                <button class="btn btn-default btn-success" (click)="getRowData(person)">Get Row</button>
            </ng-template>
          </c-column>
      </cuppa-datagrid>
```

### Heading Template
The table heading can be customised with the `<c-heading>` tag. The following example show how to use a font awesome icon with text in the title section.
  -Example:

```html
        <cuppa-datagrid [datalist] = "arrayList" [config]="config">
          <c-heading>
            <ng-template> 
              <span class="fa fa-list"></span>
              <b>Heading Template</b>
            </ng-template>
          </c-heading>
      </cuppa-datagrid> 

```

### Events
  - `onRowSelect` - Return the clicked row object.

     Example : (onRowSelect)="onRowClick($event)"


Thats all Folks !! You are good to go.

Please raise any issues [here](https://github.com/CuppaLabs/angular2-dataGrid/issues)

To run the code and build in your local, follw the below steps

- git clone `https://github.com/CuppaLabs/angular2-dataGrid.git`
- npm install
- ng serve
- Go to `http://localhost:4200` where your app will run.

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

--

The MIT License (MIT)
Copyright (c) 2016 Cuppa Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## Author
Pradeep Kumar Terli  @ [Cuppa Labs](http://www.cuppalabs.com)

