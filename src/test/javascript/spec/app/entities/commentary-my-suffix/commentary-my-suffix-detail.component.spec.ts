/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHipsterBlogTestModule } from '../../../test.module';
import { CommentaryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix-detail.component';
import { CommentaryMySuffixService } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix.service';
import { CommentaryMySuffix } from '../../../../../../main/webapp/app/entities/commentary-my-suffix/commentary-my-suffix.model';

describe('Component Tests', () => {

    describe('CommentaryMySuffix Management Detail Component', () => {
        let comp: CommentaryMySuffixDetailComponent;
        let fixture: ComponentFixture<CommentaryMySuffixDetailComponent>;
        let service: CommentaryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [CommentaryMySuffixDetailComponent],
                providers: [
                    CommentaryMySuffixService
                ]
            })
            .overrideTemplate(CommentaryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentaryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentaryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CommentaryMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.commentary).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
