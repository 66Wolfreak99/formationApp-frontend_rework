import { Routes } from '@angular/router';
import { LoginComponent } from 'app/auth/login/login.component';
import { SigninComponent } from 'app/auth/signin/signin.component';
import { ModifyProjectComponent } from 'app/modify-project/modify-project.component';
import { NewProjectComponent } from 'app/new-project/new-project.component';
import { SingleProjectComponent } from 'app/single-project/single-project.component';

import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path:'new', component:NewProjectComponent },
    { path:'project/:id', component:SingleProjectComponent },
    { path:'project/edit/:id', component:ModifyProjectComponent },

];
