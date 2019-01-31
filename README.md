# reporting-app-template

Simple Angular 5 / Ionic 3 app for reporting utilities issues. Template based on an abandoned client project. 

## Principles followed

### Store

* Any data that is accessed by >1 controller or component should be held in the store.
* All data fetched from the backend should be held in the store.
* All API calls should be made through actions (action --> service --> central API service).
* Only simple objects should be held in the store; views should convert state to usable models 'at the last second'.
* On logout, use a metareducer to wipe the entire store.
* Pair action dispatches with the listeners so the data flow is easier to understand.

### Subscriptions

* Always unsubscribe from observables when a view is destroyed.
* If a subscription to an action triggers an ACTION, unsubscribe immediately (otherwise it may be triggered when the page is not active but not destroyed).
* If a subscription updates data, unsubscribe on ngOnDestroy.
* When unsubscribing in ngOnDestroy, use a dummy Subject the emits a value in ngOnDestroy and use takeUntil(subject) with your Observables.
* There is no need to unsubscribe from translateService.get() as this is done automatically.

### Other

* All payloads should be built using model methods; all the service should need to do is call these methods.
* If a view requires backend data before opening, use ionViewCanEnter
* If the data for a view should be refetched every time it opens, wipe its store value on destroy.
* Superuser settings cannot be stored on the user model (as you need to test when not logged in - e.g. signup) or in local storage (as they could then affect non-superuser users). Saving in working memory means you can test the full flow AND any user can reset by restarting the app. 

## TODO:

* Backend field names should only need to be changed once, and in one file (JSON mapper).
* Tests
* Events
* Push notifications
* Image upload URL.
* Setup steps.
