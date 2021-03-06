import { BaseEntity } from './../../shared';

export class PostMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public date?: any,
        public bodyId?: number,
        public commentaries?: BaseEntity[],
    ) {
    }
}
