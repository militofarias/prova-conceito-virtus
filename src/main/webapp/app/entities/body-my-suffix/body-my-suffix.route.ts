import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BodyMySuffixComponent } from './body-my-suffix.component';
import { BodyMySuffixDetailComponent } from './body-my-suffix-detail.component';
import { BodyMySuffixPopupComponent } from './body-my-suffix-dialog.component';
import { BodyMySuffixDeletePopupComponent } from './body-my-suffix-delete-dialog.component';

export const bodyRoute: Routes = [
    {
        path: 'body-my-suffix',
        component: BodyMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.body.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'body-my-suffix/:id',
        component: BodyMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.body.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bodyPopupRoute: Routes = [
    {
        path: 'body-my-suffix-new',
        component: BodyMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.body.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'body-my-suffix/:id/edit',
        component: BodyMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.body.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'body-my-suffix/:id/delete',
        component: BodyMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.body.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
