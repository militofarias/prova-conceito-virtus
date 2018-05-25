import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Commentary } from './commentary.model';
import { CommentaryPopupService } from './commentary-popup.service';
import { CommentaryService } from './commentary.service';

@Component({
    selector: 'jhi-commentary-delete-dialog',
    templateUrl: './commentary-delete-dialog.component.html'
})
export class CommentaryDeleteDialogComponent {

    commentary: Commentary;

    constructor(
        private commentaryService: CommentaryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentaryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentaryListModification',
                content: 'Deleted an commentary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commentary-delete-popup',
    template: ''
})
export class CommentaryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentaryPopupService: CommentaryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentaryPopupService
                .open(CommentaryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
