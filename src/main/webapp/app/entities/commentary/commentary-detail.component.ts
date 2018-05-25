import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Commentary } from './commentary.model';
import { CommentaryService } from './commentary.service';

@Component({
    selector: 'jhi-commentary-detail',
    templateUrl: './commentary-detail.component.html'
})
export class CommentaryDetailComponent implements OnInit, OnDestroy {

    commentary: Commentary;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commentaryService: CommentaryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCommentaries();
    }

    load(id) {
        this.commentaryService.find(id)
            .subscribe((commentaryResponse: HttpResponse<Commentary>) => {
                this.commentary = commentaryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCommentaries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentaryListModification',
            (response) => this.load(this.commentary.id)
        );
    }
}
