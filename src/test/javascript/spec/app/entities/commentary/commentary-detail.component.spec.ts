/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JHipsterBlogTestModule } from '../../../test.module';
import { CommentaryDetailComponent } from '../../../../../../main/webapp/app/entities/commentary/commentary-detail.component';
import { CommentaryService } from '../../../../../../main/webapp/app/entities/commentary/commentary.service';
import { Commentary } from '../../../../../../main/webapp/app/entities/commentary/commentary.model';

describe('Component Tests', () => {

    describe('Commentary Management Detail Component', () => {
        let comp: CommentaryDetailComponent;
        let fixture: ComponentFixture<CommentaryDetailComponent>;
        let service: CommentaryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [CommentaryDetailComponent],
                providers: [
                    CommentaryService
                ]
            })
            .overrideTemplate(CommentaryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentaryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentaryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Commentary(123)
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
