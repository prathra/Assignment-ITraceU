import { Routes } from '@angular/router';
import { FirstTabComponent } from './tabs/firstTab/firstTab.component';
import { SecondTabComponent } from './tabs/secondTab/secondTab.component';
import { ThirdTabComponent } from './tabs/thirdTab/thirdTab.component';
import { PdfExportComponentComponent } from './tabs/PdfExportComponent/PdfExportComponent.component';
export const routes: Routes = [
  { path: '', redirectTo: 'Insights', pathMatch: 'full' },
  { path: 'Insights', component: FirstTabComponent },
  { path: 'Technology', component: SecondTabComponent },
  { path: 'Legend', component: ThirdTabComponent },
  { path: 'Task', component: PdfExportComponentComponent },
];
