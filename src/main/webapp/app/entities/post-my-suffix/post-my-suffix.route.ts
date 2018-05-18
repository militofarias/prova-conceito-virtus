import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PostMySuffixComponent } from './post-my-suffix.component';
import { PostMySuffixDetailComponent } from './post-my-suffix-detail.component';
import { PostMySuffixPopupComponent } from './post-my-suffix-dialog.component';
import { PostMySuffixDeletePopupComponent } from './post-my-suffix-delete-dialog.component';

export const postRoute: Routes = [
    {
        path: 'post-my-suffix',
        component: PostMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'post-my-suffix/:id',
        component: PostMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const postPopupRoute: Routes = [
    {
        path: 'post-my-suffix-new',
        component: PostMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-my-suffix/:id/edit',
        component: PostMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-my-suffix/:id/delete',
        component: PostMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jHipsterBlogApp.post.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
