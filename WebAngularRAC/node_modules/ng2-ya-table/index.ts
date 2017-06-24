import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from 'ng2-bootstrap/pagination';
import {NG2_POWER_TABLE_DIRECTIVES} from './src/ng2-ya-table-directives';
import {Ng2YaTableService} from './src/ng2-ya-table/ng2-ya-table.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
  ],
  declarations: [
    NG2_POWER_TABLE_DIRECTIVES
  ],
  exports: [
    NG2_POWER_TABLE_DIRECTIVES
  ]
})
export class Ng2YaTableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2YaTableModule,
      providers: [Ng2YaTableService]
    };
  }
}
