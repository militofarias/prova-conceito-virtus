import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Commentary } from './commentary.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Commentary>;

@Injectable()
export class CommentaryService {

    private resourceUrl =  SERVER_API_URL + 'api/commentaries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/commentaries';

    constructor(private http: HttpClient) { }

    create(commentary: Commentary): Observable<EntityResponseType> {
        const copy = this.convert(commentary);
        return this.http.post<Commentary>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(commentary: Commentary): Observable<EntityResponseType> {
        const copy = this.convert(commentary);
        return this.http.put<Commentary>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Commentary>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Commentary[]>> {
        const options = createRequestOption(req);
        return this.http.get<Commentary[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Commentary[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Commentary[]>> {
        const options = createRequestOption(req);
        return this.http.get<Commentary[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Commentary[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Commentary = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Commentary[]>): HttpResponse<Commentary[]> {
        const jsonResponse: Commentary[] = res.body;
        const body: Commentary[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Commentary.
     */
    private convertItemFromServer(commentary: Commentary): Commentary {
        const copy: Commentary = Object.assign({}, commentary);
        return copy;
    }

    /**
     * Convert a Commentary to a JSON which can be sent to the server.
     */
    private convert(commentary: Commentary): Commentary {
        const copy: Commentary = Object.assign({}, commentary);
        return copy;
    }
}
