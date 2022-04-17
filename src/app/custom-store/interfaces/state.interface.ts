import { BehaviorSubject } from 'rxjs';

/**
 * The interface that defines the global and specific states functions.
 * 
 * There is the concept of global and specific state, both share the same definition (StateInterface) but are being used differently:
 * - The 'set' function allows to update the state value.
 * - The 'get' function simply returns a specific subject for further subscriptions (listening to changes).
 */
export interface StateInterface {

    /**
     * Gets a state subject to listen to.
     */
    get(): BehaviorSubject<any>;

    /**
     * Sets a global/specific state value (object).
     * @param object The object to set as state value.
     */
    set(object: any): void;

}
