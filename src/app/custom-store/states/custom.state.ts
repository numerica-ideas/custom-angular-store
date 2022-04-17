import { BookState } from "./book.state";

/**
 * The global custom state model.
 */
export interface CustomState {
    fieldA?: string;
    fieldB?: string;
    year?: number;
    book?: BookState;
    // ...
    // etc.
}
