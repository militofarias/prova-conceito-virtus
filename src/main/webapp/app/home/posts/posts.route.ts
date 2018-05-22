import {Routes} from '@angular/router';
import {PostsPopupComponent} from './posts-dialog.component';

export const postPopupRoute: Routes = [
    {
        path: 'post-new',
        component: PostsPopupComponent,
        data: {
            pageTitle: 'jHipsterBlogApp.post.home.title'
        },
        outlet: 'popup'
    }
];
