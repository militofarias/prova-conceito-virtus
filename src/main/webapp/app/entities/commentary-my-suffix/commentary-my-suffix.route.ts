import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommentaryMySuffixComponent } from './commentary-my-suffix.component';
import { CommentaryMySuffixDetailComponent } from './commentary-my-suffix-detail.component';
import { CommentaryMySuffixPopupComponent } from './commentary-my-suffix-dialog.component';
import { CommentaryMySuffixDeletePopupComponent } from './commentary-my-suffix-delete-dialog.component';

export const commentaryRoute: Routes = [
    {
        path: 'commentary-my-suffix',
        component: CommentaryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'commentary-my-suffix/:id',
        component: CommentaryMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentaryPopupRoute: Routes = [
    {
        path: 'commentary-my-suffix-new',
        component: CommentaryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'commentary-my-suffix/:id/edit',
        component: CommentaryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'commentary-my-suffix/:id/delete',
        component: CommentaryMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
