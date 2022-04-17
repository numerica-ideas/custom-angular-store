import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateInterface } from '../interfaces/state.interface';
import { StateService } from './state.service';
import { BookState } from '../states/book.state';
import { DEFAULT_BOOK } from 'src/app/utils/constant';

/**
 * Called to update the book state details (title, year, author).
 * This specific state holds a reference of the global one to sync its content. 
 */
@Injectable({ providedIn: 'root' })
export class BookService implements StateInterface {
    private bookSubject: BehaviorSubject<BookState> = new BehaviorSubject<BookState>(DEFAULT_BOOK);

    constructor(private stateService: StateService) {}

    /**
     * Returns the book details.
     */
    get(): BehaviorSubject<BookState> {
        return this.bookSubject;
    }

    /**
     * Applies some changes to the book state.
     * @param stateChanges The changes (an object) to populate.
     */
    set(stateChanges: BookState): void {
        if (!stateChanges) return;
        const book: BookState = { ...this.bookSubject.getValue(), ...stateChanges };
        this.bookSubject.next(book);
        this.stateService.set({ book });
    }

}
