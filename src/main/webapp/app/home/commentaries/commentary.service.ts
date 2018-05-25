import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import {Commentary} from "./commentary.model";

export type EntityResponseType = HttpResponse<Commentary>;

@Injectable()
export class CommentaryService {

    private resourceUrl =  SERVER_API_URL + 'api/commentaries';

    constructor(private http: HttpClient) { }

    create(commentary: Commentary): Observable<EntityResponseType> {
        const copy = this.convert(commentary);
        return this.http.post<Commentary>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }



    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Commentary = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CommentaryMySuffix.
     */
    private convertItemFromServer(commentary: Commentary): Commentary {
        const copy: Commentary = Object.assign({}, commentary);
        return copy;
    }

    /**
     * Convert a CommentaryMySuffix to a JSON which can be sent to the server.
     */
    private convert(commentary: Commentary): Commentary {
        const copy: Commentary = Object.assign({}, commentary);
        return copy;
    }
}
