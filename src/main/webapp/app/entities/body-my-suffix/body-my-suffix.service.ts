import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BodyMySuffix } from './body-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BodyMySuffix>;

@Injectable()
export class BodyMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/bodies';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/bodies';

    constructor(private http: HttpClient) { }

    create(body: BodyMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(body);
        return this.http.post<BodyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(body: BodyMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(body);
        return this.http.put<BodyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BodyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BodyMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<BodyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BodyMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<BodyMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<BodyMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BodyMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BodyMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BodyMySuffix[]>): HttpResponse<BodyMySuffix[]> {
        const jsonResponse: BodyMySuffix[] = res.body;
        const body: BodyMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BodyMySuffix.
     */
    private convertItemFromServer(body: BodyMySuffix): BodyMySuffix {
        const copy: BodyMySuffix = Object.assign({}, body);
        return copy;
    }

    /**
     * Convert a BodyMySuffix to a JSON which can be sent to the server.
     */
    private convert(body: BodyMySuffix): BodyMySuffix {
        const copy: BodyMySuffix = Object.assign({}, body);
        return copy;
    }
}
