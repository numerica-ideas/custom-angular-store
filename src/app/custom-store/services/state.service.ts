import { Injectable, Injector } from '@angular/core';
import { StateInterface } from '../interfaces/state.interface';
import { BookService } from './book.service';
import { BehaviorSubject } from 'rxjs';
import { BookState } from '../states/book.state';
import { DEFAULT_BOOK } from '../../utils/constant';
import { CustomState } from '../states/custom.state';

/**
 * The StateService is a facade that holds and serves everything state related.
 * As specific states, it also contains exported subject(s) to be consumed elsewhere.
 */
@Injectable({ providedIn: 'root' })
export class StateService implements StateInterface {
    stateSubject: BehaviorSubject<CustomState> = new BehaviorSubject<CustomState>({ book: DEFAULT_BOOK });

    // Lazy injection of specific state services
    private _bookService: BookService | undefined;
    public get bookService(): BookService {
        if (!this._bookService) this._bookService = this.injector.get(BookService);
        return this._bookService;
    }

    constructor(private injector: Injector) {}

    // ----------------- Global state management -----------------

    /**
     * Returns the global state subject.
     */
    get(): BehaviorSubject<CustomState> {
        return this.stateSubject;
    }

    /**
     * Applies some changes to the global state.
     * @param stateChanges The changes (an object) to populate.
     */
    set(stateChanges: CustomState): void {
        if (!stateChanges) return;
        const currentStateValue = this.stateSubject.getValue();
        this.stateSubject.next({ ...currentStateValue, ...stateChanges });
    }

    /**
     * Gets a global/specific state value by its key.
     * @param key Optional key, if not provided we return the global state object.
     */
    value(key = ''): any {
        const globalState: any = this.stateSubject.getValue();
        return key ? globalState[key] : globalState;
    }

    // ----------------- Specific state facades calls -----------------

    /**
     * Sets the book year.
     * @param year 
     */
    setBookYear(year: number): void {
        this.bookService.set({ year });
    }

    /**
     * Sets the book title.
     * @param title 
     */
    setBookTitle(title: string): void {
        this.bookService.set({ title });
    }

    /**
     * Sets the book details.
     * @param details A book object with many fields.
     */
    setBookDetails(details: BookState): void {
        this.bookService.set(details);
    }

}
