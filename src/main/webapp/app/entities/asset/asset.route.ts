import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AssetComponent } from './asset.component';
import { AssetDetailComponent } from './asset-detail.component';
import { AssetPopupComponent } from './asset-dialog.component';
import { AssetDeletePopupComponent } from './asset-delete-dialog.component';

export const assetRoute: Routes = [
    {
        path: 'asset',
        component: AssetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'asset/:id',
        component: AssetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assetPopupRoute: Routes = [
    {
        path: 'asset-new',
        component: AssetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asset/:id/edit',
        component: AssetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asset/:id/delete',
        component: AssetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
