import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommentaryComponent } from './commentary.component';
import { CommentaryDetailComponent } from './commentary-detail.component';
import { CommentaryPopupComponent } from './commentary-dialog.component';
import { CommentaryDeletePopupComponent } from './commentary-delete-dialog.component';

export const commentaryRoute: Routes = [
    {
        path: 'commentary',
        component: CommentaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'commentary/:id',
        component: CommentaryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentaryPopupRoute: Routes = [
    {
        path: 'commentary-new',
        component: CommentaryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'commentary/:id/edit',
        component: CommentaryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'commentary/:id/delete',
        component: CommentaryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.commentary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
