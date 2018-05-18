import { BaseEntity } from './../../shared';

export class BodyMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public text?: any,
        public assets?: BaseEntity[],
        public postId?: number,
    ) {
    }
}
