/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JHipsterBlogTestModule } from '../../../test.module';
import { BodyMySuffixComponent } from '../../../../../../main/webapp/app/entities/body-my-suffix/body-my-suffix.component';
import { BodyMySuffixService } from '../../../../../../main/webapp/app/entities/body-my-suffix/body-my-suffix.service';
import { BodyMySuffix } from '../../../../../../main/webapp/app/entities/body-my-suffix/body-my-suffix.model';

describe('Component Tests', () => {

    describe('BodyMySuffix Management Component', () => {
        let comp: BodyMySuffixComponent;
        let fixture: ComponentFixture<BodyMySuffixComponent>;
        let service: BodyMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JHipsterBlogTestModule],
                declarations: [BodyMySuffixComponent],
                providers: [
                    BodyMySuffixService
                ]
            })
            .overrideTemplate(BodyMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BodyMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BodyMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BodyMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bodies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
