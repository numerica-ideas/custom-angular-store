import { Component } from '@angular/core';
import { generateName } from './utils/name';
import { BehaviorSubject } from 'rxjs';
import { CustomState } from './custom-store/states/custom.state';
import { StateService } from './custom-store/services/state.service';

@Component({
	selector:  'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'custom-angular-store';
	currentYear: number = 2017;
	
	// Global state observable containing global store and specific states
	currentState$: BehaviorSubject<CustomState>;

	constructor(private stateService: StateService) {
		this.currentState$ = this.stateService.get();
	}

	/**
	 * Updates custom state title and year fields.
	 */
	updateCustomState(): void {
		const title = generateName();
		const year = ++this.currentYear;
		// For specific fields update we can use appropriate functions
		// this.stateService.setBookTitle(title);
		// this.stateService.setBookYear(year);
		this.stateService.setBookDetails({ title, year });
	}

}
