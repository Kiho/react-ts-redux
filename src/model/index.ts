import { Employee } from './employee';
import { Department } from './department';

export type EntityType = 'employee' | 'department' | 'project';

export const createNew = (path: EntityType) => {
    switch (path) {
        case 'employee':
            return Object.assign({}, Employee);
        case 'department':
            return Object.assign({}, Department);
    }
    return null;
};
