/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHipsterBlogTestModule } from '../../../test.module';
import { CommentaryComponent } from '../../../../../../main/webapp/app/entities/commentary/commentary.component';
import { CommentaryService } from '../../../../../../main/webapp/app/entities/commentary/commentary.service';
import { Commentary } from '../../../../../../main/webapp/app/entities/commentary/commentary.model';

describe('Component Tests', () => {

    describe('Commentary Management Component', () => {
        let comp: CommentaryComponent;
        let fixture: ComponentFixture<CommentaryComponent>;
        let service: CommentaryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [CommentaryComponent],
                providers: [
                    CommentaryService
                ]
            })
            .overrideTemplate(CommentaryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentaryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentaryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Commentary(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.commentaries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
