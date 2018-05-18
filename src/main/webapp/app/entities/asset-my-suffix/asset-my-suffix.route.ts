import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AssetMySuffixComponent } from './asset-my-suffix.component';
import { AssetMySuffixDetailComponent } from './asset-my-suffix-detail.component';
import { AssetMySuffixPopupComponent } from './asset-my-suffix-dialog.component';
import { AssetMySuffixDeletePopupComponent } from './asset-my-suffix-delete-dialog.component';

export const assetRoute: Routes = [
    {
        path: 'asset-my-suffix',
        component: AssetMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'asset-my-suffix/:id',
        component: AssetMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assetPopupRoute: Routes = [
    {
        path: 'asset-my-suffix-new',
        component: AssetMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asset-my-suffix/:id/edit',
        component: AssetMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'asset-my-suffix/:id/delete',
        component: AssetMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.asset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
