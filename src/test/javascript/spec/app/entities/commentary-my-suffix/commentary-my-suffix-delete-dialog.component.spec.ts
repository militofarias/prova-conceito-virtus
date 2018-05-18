/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JHipsterBlogTestModule } from '../../../test.module';
import { CommentaryMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix-delete-dialog.component';
import { CommentaryMySuffixService } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix.service';

describe('Component Tests', () => {

    describe('CommentaryMySuffix Management Delete Component', () => {
        let comp: CommentaryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CommentaryMySuffixDeleteDialogComponent>;
        let service: CommentaryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [CommentaryMySuffixDeleteDialogComponent],
                providers: [
                    CommentaryMySuffixService
                ]
            })
            .overrideTemplate(CommentaryMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentaryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentaryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
