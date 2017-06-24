import { Component } from '@angular/core'
@Component({
    selector: 'app-loader',
    template: `
 <div> 
 <div class='container'>
   <router-outlet></router-outlet>
 </div>
</div>  
`
})
export class AppComponent {

}