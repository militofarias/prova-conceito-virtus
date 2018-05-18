import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CommentaryMySuffix } from './commentary-my-suffix.model';
import { CommentaryMySuffixService } from './commentary-my-suffix.service';

@Component({
    selector: 'jhi-commentary-my-suffix-detail',
    templateUrl: './commentary-my-suffix-detail.component.html'
})
export class CommentaryMySuffixDetailComponent implements OnInit, OnDestroy {

    commentary: CommentaryMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private commentaryService: CommentaryMySuffixService,
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
            .subscribe((commentaryResponse: HttpResponse<CommentaryMySuffix>) => {
                this.commentary = commentaryResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
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
