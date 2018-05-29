import { BaseEntity } from '../../shared';

export class Asset implements BaseEntity {
    constructor(
        public id?: number,
        public imagePath?: string,
        public fileType?: string
    ) {
    }
}
