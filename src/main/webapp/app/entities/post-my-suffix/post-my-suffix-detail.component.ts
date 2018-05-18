import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PostMySuffix } from './post-my-suffix.model';
import { PostMySuffixService } from './post-my-suffix.service';

@Component({
    selector: 'jhi-post-my-suffix-detail',
    templateUrl: './post-my-suffix-detail.component.html'
})
export class PostMySuffixDetailComponent implements OnInit, OnDestroy {

    post: PostMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private postService: PostMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPosts();
    }

    load(id) {
        this.postService.find(id)
            .subscribe((postResponse: HttpResponse<PostMySuffix>) => {
                this.post = postResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPosts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'postListModification',
            (response) => this.load(this.post.id)
        );
    }
}
