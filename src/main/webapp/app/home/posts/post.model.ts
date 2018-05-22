import { BaseEntity } from '../../shared';
import {Body} from './body.model';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public body?: Body,
    ) {
    }
}
