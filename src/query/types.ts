import * as TE from 'fp-ts/TaskEither';
import { Failed } from '../output';

export interface Query<A, B> {
    data: A;
    execute: (data: A) => TE.TaskEither<Failed<unknown>, B>;
}
