import { BaseEntity } from './../../shared';

export class Post implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public createAt?: any,
        public body?: any,
        public commentaries?: BaseEntity[],
        public assets?: BaseEntity[],
        public authorId?: number,
    ) {
    }
}
