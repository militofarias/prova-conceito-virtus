import { BaseEntity } from '../../shared';
import {Body} from './body.model';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public bodyText?: string,
        public date?: Date,
        public assets?: string[],
        public authorLogin?: string
    ) {
    }
}
