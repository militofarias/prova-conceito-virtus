import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { BodyMySuffix } from './body-my-suffix.model';
import { BodyMySuffixService } from './body-my-suffix.service';

@Component({
    selector: 'jhi-body-my-suffix-detail',
    templateUrl: './body-my-suffix-detail.component.html'
})
export class BodyMySuffixDetailComponent implements OnInit, OnDestroy {

    body: BodyMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private bodyService: BodyMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBodies();
    }

    load(id) {
        this.bodyService.find(id)
            .subscribe((bodyResponse: HttpResponse<BodyMySuffix>) => {
                this.body = bodyResponse.body;
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

    registerChangeInBodies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bodyListModification',
            (response) => this.load(this.body.id)
        );
    }
}
