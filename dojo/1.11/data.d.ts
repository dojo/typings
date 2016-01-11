declare namespace dojo {

	namespace data {

		namespace api {

			/* dojo/data/api/Identity */

			interface Features {
				'dojo.data.api.Identity'?: boolean;
			}

			interface FetchByIdentityArgs<T extends Item> {
				identity?: string | Object;
				onItem?: (item: T) => void;
				onError?: (err: Error) => void;
				scope?: Object;
			}

			interface Identity<T extends Item> {
				/**
				 * See dojo/data/api/Read.getFeatures()
				 */
				getFeatures(): Features;

				/**
				 * Returns a unique identifier for an item.  The return value will be
				 * either a string or something that has a toString() method (such as,
				 * for example, a dojox/uuid object).
				 */
				getIdentity(item: T): Object | string | number;

				/**
				 * Returns an array of attribute names that are used to generate the identity.
				 * For most stores, this is a single attribute, but for some complex stores
				 * such as RDB backed stores that use compound (multi-attribute) identifiers
				 * it can be more than one.  If the identity is not composed of attributes
				 * on the item, it will return null.  This function is intended to identify
				 * the attributes that comprise the identity so that so that during a render
				 * of all attributes, the UI can hide the the identity information if it
				 * chooses.
				 */
				getIdentity(item: T): string[];

				/**
				 * Given the identity of an item, this method returns the item that has
				 * that identity through the onItem callback.  Conforming implementations
				 * should return null if there is no item with the given identity.
				 * Implementations of fetchItemByIdentity() may sometimes return an item
				 * from a local cache and may sometimes fetch an item from a remote server,
				 */
				fetchItemByIdentity(keywordArgs: FetchByIdentityArgs<T>): T;
			}

			interface IdentityConstructor {
				new <T extends Item>(): Identity<T>;
				prototype: Identity<any>;
			}

			/* dojo/data/api/Item */

			/**
			 * An item in a dojo/data store
			 * Class for documentation purposes only. An item can take any form, so no
			 * properties or methods are defined here.
			 */
			interface Item {
				[property: string]: any;
			}

			interface ItemConstructor {
				new (): Item;
				prototype: Item;
			}

			/* dojo/data/api/Notification */

			interface ParentInfo<T> {
				item: T;
				attribute: string;
				oldValue: any;
			}

			interface Features {
				'dojo.data.api.Notification': boolean;
			}

			interface Notification<T extends Item> {
				/**
				 * See dojo/data/api/Read.getFeatures()
				 */
				getFeatures(): Features;

				/**
				 * This function is called any time an item is modified via setValue, setValues, unsetAttribute, etc.
				 */
				onSet(item: T, attribute: string, oldValue: any, newValue: any): void;

				/**
				 * This function is called any time a new item is created in the store.
				 * It is called immediately after the store newItem processing has completed.
				 */
				onNew(item: T, parentInfo?: ParentInfo<T>): void;

				/**
				 * This function is called any time an item is deleted from the store.
				 * It is called immediately after the store deleteItem processing has completed.
				 */
				onDelete(deletedItem: T): void;
			}

			interface NotificationConstructor {
				new <T extends Item>(): Notification<T>;
				prototype: Notification<Item>;
			}

			/* dojo/data/api/Read */

			interface Features {
				'dojo.data.api.Read'?: boolean;
			}

			interface LoadItemArgs<T extends Item> {
				item?: T;
				onItem?: (item: T) => void;
				onError?: (err: Error) => void;
				scope?: Object;
			}

			interface SortArg {
				attribute: string;
				descending?: boolean;
			}

			interface FetchArgs<T extends Item> {
				query?: Object | string;
				queryOptions?: Object;
				onBegin?: (size: number, request: Request) => void;
				onItem?: (item: T, request: Request) => void;
				onComplete?: (items: T[], request: Request) => void;
				onError?: (errorData: Error, request: Request) => void;
				scope?: Object;
				start?: number;
				count?: number;
				sort?: SortArg[];
			}

			interface Read<T extends Item> {

				/**
				 * Returns a single attribute value.
				 * Returns defaultValue if and only if *item* does not have a value for *attribute*.
				 * Returns null if and only if null was explicitly set as the attribute value.
				 * Returns undefined if and only if the item does not have a value for the
				 * given attribute (which is the same as saying the item does not have the attribute).
				 */
				getValue<U>(item: T, attribute: string, defaultValue?: U): U;

				/**
				 * This getValues() method works just like the getValue() method, but getValues()
				 * always returns an array rather than a single attribute value.  The array
				 * may be empty, may contain a single attribute value, or may contain
				 * many attribute values.
				 * If the item does not have a value for the given attribute, then getValues()
				 * will return an empty array: [].  (So, if store.hasAttribute(item, attribute)
				 * has a return of false, then store.getValues(item, attribute) will return [].)
				 */
				getValues<U>(item: T, attribute: string): U[];

				/**
				 * Returns an array with all the attributes that this item has.  This
				 * method will always return an array; if the item has no attributes
				 * at all, getAttributes() will return an empty array: [].
				 */
				getAttributes(item: T): string[];

				/**
				 * Returns true if the given *item* has a value for the given *attribute*.
				 */
				hasAttribute(item: T, attribute: string): boolean;

				/**
				 * Returns true if the given *value* is one of the values that getValues()
				 * would return.
				 */
				containsValue(item: T, attribute: string, value: any): boolean;

				/**
				 * Returns true if *something* is an item and came from the store instance.
				 * Returns false if *something* is a literal, an item from another store instance,
				 * or is any object other than an item.
				 */
				isItem(something: any): something is T;

				/**
				 * Returns false if isItem(something) is false.  Returns false if
				 * if isItem(something) is true but the the item is not yet loaded
				 * in local memory (for example, if the item has not yet been read
				 * from the server).
				 */
				isItemLoaded(something: any): boolean;

				/**
				 * Given an item, this method loads the item so that a subsequent call
				 * to store.isItemLoaded(item) will return true.  If a call to
				 * isItemLoaded() returns true before loadItem() is even called,
				 * then loadItem() need not do any work at all and will not even invoke
				 * the callback handlers.  So, before invoking this method, check that
				 * the item has not already been loaded.
				 */
				loadItem(keywordArgs: LoadItemArgs<T>): T;

				/**
				 * Given a query and set of defined options, such as a start and count of items to return,
				 * this method executes the query and makes the results available as data items.
				 * The format and expectations of stores is that they operate in a generally asynchronous
				 * manner, therefore callbacks are always used to return items located by the fetch parameters.
				 */
				fetch(keywordArgs: FetchArgs<T>): Request;

				/**
				 * The getFeatures() method returns an simple keyword values object
				 * that specifies what interface features the datastore implements.
				 * A simple CsvStore may be read-only, and the only feature it
				 * implements will be the 'dojo/data/api/Read' interface, so the
				 * getFeatures() method will return an object like this one:
				 * {'dojo.data.api.Read': true}.
				 * A more sophisticated datastore might implement a variety of
				 * interface features, like 'dojo.data.api.Read', 'dojo/data/api/Write',
				 * 'dojo.data.api.Identity', and 'dojo/data/api/Attribution'.
				 */
				getFeatures(): Features;

				/**
				 * The close() method is intended for instructing the store to 'close' out
				 * any information associated with a particular request.
				 */
				close(request?: Request): void;

				/**
				 * Method to inspect the item and return a user-readable 'label' for the item
				 * that provides a general/adequate description of what the item is.
				 */
				getLabel(item: T): string;

				/**
				 * Method to inspect the item and return an array of what attributes of the item were used
				 * to generate its label, if any.
				 */
				getLabelAttributes(item: T): string[];
			}

			interface ReadConstructor {
				new <T extends Item>(): Read<T>;
				prototype: Read<Item>;
			}

			/* dojo/data/api/Request */

			interface Request {
				/**
				 * This class defines out the semantics of what a 'Request' object looks like
				 * when returned from a fetch() method.  In general, a request object is
				 * nothing more than the original keywordArgs from fetch with an abort function
				 * attached to it to allow users to abort a particular request if they so choose.
				 * No other functions are required on a general Request object return.  That does not
				 * inhibit other store implementations from adding extensions to it, of course.
				 * This is an abstract API that data provider implementations conform to.
				 * This file defines methods signatures and intentionally leaves all the
				 * methods unimplemented.
				 * For more details on fetch, see dojo/data/api/Read.fetch().
				 */
				abort(): void;
			}

			interface RequestConstructor {
				new (): Request;
				prototype: Request;
			}

			/* dojo/data/api/Write */

			interface Features {
				'dojo.data.api.Write': boolean;
			}

			interface SaveKeywordArgs {
				onComplete?: () => void;
				onError?: (error: Error) => void;
				scope?: Object;
			}

			interface Write<T extends Item> {

				/**
				 * See dojo/data/api/Read.getFeatures()
				 */
				getFeatures(): Features;

				/**
				 * Returns a newly created item.  Sets the attributes of the new
				 * item based on the *keywordArgs* provided.  In general, the attribute
				 * names in the keywords become the attributes in the new item and as for
				 * the attribute values in keywordArgs, they become the values of the attributes
				 * in the new item.  In addition, for stores that support hierarchical item
				 * creation, an optional second parameter is accepted that defines what item is the parent
				 * of the new item and what attribute of that item should the new item be assigned to.
				 * In general, this will assume that the attribute targeted is multi-valued and a new item
				 * is appended onto the list of values for that attribute.
				 */
				newItem(keywordArgs: T, parentInfo?: ParentInfo<T>): T;

				/**
				 * Deletes an item from the store.
				 */
				deleteItem(item: T): boolean;

				/**
				 * Sets the value of an attribute on an item.
				 * Replaces any previous value or values.
				 */
				setValue(item: T, attribute: string, value: any): boolean;

				/**
				 * Adds each value in the *values* array as a value of the given
				 * attribute on the given item.
				 * Replaces any previous value or values.
				 * Calling store.setValues(x, y, []) (with *values* as an empty array) has
				 * the same effect as calling store.unsetAttribute(x, y).
				 */
				setValues(item: T, attribute: string, values: any[]): boolean;

				/**
				 * Deletes all the values of an attribute on an item.
				 */
				unsetAttribute(item: T, attribute: string): boolean;

				/**
				 * Saves to the server all the changes that have been made locally.
				 * The save operation may take some time and is generally performed
				 * in an asynchronous fashion.  The outcome of the save action is
				 * is passed into the set of supported callbacks for the save.
				 */
				save(keywordArgs: SaveKeywordArgs): void;

				/**
				 * Discards any unsaved changes.
				 */
				revert(): boolean;

				/**
				 * Given an item, isDirty() returns true if the item has been modified
				 * since the last save().  If isDirty() is called with no *item* argument,
				 * then this function returns true if any item has been modified since
				 * the last save().
				 */
				isDirty(item?: T): boolean;
			}

			interface WriteConstructor {
				new <T>(): Write<T>;
				prototype: Write<any>;
			}
		}

		namespace util {

			/* dojo/data/util/filter */

			interface Filter {
				/**
				 * Helper function to convert a simple pattern to a regular expression for matching.
				 */
				patternToRegExp(pattern: string, ignoreCase?: boolean): RegExp;
			}

			/* dojo/data/util/simpleFetch */

			interface SimpleFetch {

				/**
				 * The error handler when there is an error fetching items.  This function should not be called
				 * directly and is used by simpleFetch.fetch().
				 */
				errorHandler(errorData: Error, requestObject: api.Request): void;

				/**
				 * The handler when items are successfully fetched.  This function should not be called directly
				 * and is used by simpleFetch.fetch().
				 */
				fetchHandler<T extends api.Item>(items: T[], requestObject: api.Request): void;

				/**
				 * The simpleFetch mixin is designed to serve as a set of function(s) that can
				 * be mixed into other datastore implementations to accelerate their development.
				 */
				fetch(request?: api.Request): api.Request;
			}

			/* dojo/data/util/sorter */

			interface SortFunction<T> {
				(a: T, b: T): number;
			}

			interface Sorter {

				/**
				 * Basic comparison function that compares if an item is greater or less than another item
				 */
				basicComparator: SortFunction<any>;

				/**
				 * Helper function to generate the sorting function based off the list of sort attributes.
				 */
				createSortFunction<T>(attributes: api.SortArg[], store: api.Read<T>): SortFunction<T>;
			}
		}

		/* dojo/data/ItemFileReadStore */

		interface ItemFileReadStoreData<T extends api.Item> {
			items: T[];
			identifier?: string;
		}

		interface ItemConstructor<V, T> {
			new (value: V): T;
			prototype: T;
		}

		interface ItemConstructorObject<V, T> {
			type: GenericConstructor<T>;
			deserialize: (value: V) => T;
		}

		interface ItemFileReadStoreTypeMap {
			[type: string]: ItemConstructor<any, any> | ItemConstructorObject<any, any>;
		}

		interface ItemFileReadStoreArgs<T extends api.Item> {
			url: string;
			data?: ItemFileReadStoreData<T>;
			typeMap?: ItemFileReadStoreTypeMap;
		}

		interface FindCallback<T extends api.Item> {
			(items: T[], requestArgs: api.Request): void;
		}

		interface ItemFileReadStore<T extends api.Item> extends Evented, util.SimpleFetch {

			/**
			 * Parameter to allow users to specify if a close call should force a reload or not.
			 * By default, it retains the old behavior of not clearing if close is called.  But
			 * if set true, the store will be reset to default state.  Note that by doing this,
			 * all item handles will become invalid and a new fetch must be issued.
			 */
			clearOnClose: boolean;

			/**
			 * Parameter to allow specifying if preventCache should be passed to the xhrGet call or not when loading data from a url.
			 * Note this does not mean the store calls the server on each fetch, only that the data load has preventCache set as an option.
			 * Added for tracker: #6072
			 */
			urlPreventCache: boolean;

			/**
			 * Parameter for specifying that it is OK for the xhrGet call to fail silently.
			 */
			failOk: boolean;

			/**
			 * Parameter to indicate to process data from the url as hierarchical
			 * (data items can contain other data items in js form).  Default is true
			 * for backwards compatibility.  False means only root items are processed
			 * as items, all child objects outside of type-mapped objects and those in
			 * specific reference format, are left straight JS data objects.
			 */
			hierarchical: boolean;

			/**
			 * This function tests whether the item passed in is indeed an item in the store.
			 */
			_assertIsItem(item: any): void;

			/**
			 * This function tests whether the item passed in is indeed a valid 'attribute' like type for the store.
			 */
			_assertIsAttribute(attribute: string): void;

			/**
			 * See dojo/data/api/Read.getValue()
			 */
			getValue<V>(item: T, attribute: string, value?: V): V;

			/**
			 * See dojo/data/api/Read.getValues()
			 */
			getValues<V>(item: T, attribute: string): V[];

			/**
			 * See dojo/data/api/Read.getAttributes()
			 */
			getAttributes(item: T): string[];

			/**
			 * See dojo/data/api/Read.hasAttribute()
			 */
			hasAttribute(item: T, attribute: string): boolean;

			/**
			 * See dojo/data/api/Read.containsValue()
			 */
			containsValue(item: T, attribute: string, value: any): boolean;

			/**
			 * Internal function for looking at the values contained by the item.
			 */
			_containsValue(item: T, attribute: string, value: any, regexp?: RegExp): boolean;

			/**
			 * See dojo/data/api/Read.isItem()
			 */
			isItem(something: any): something is T;

			/**
			 * See dojo/data/api/Read.isItemLoaded()
			 */
			isItemLoaded(something: any): boolean;

			/**
			 * See dojo/data/api/Read.loadItem()
			 */
			loadItem(keywordArgs: api.LoadItemArgs<T>): void;

			/**
			 * See dojo/data/api/Read.getFeatures()
			 */
			getFeatures(): api.Features;

			/**
			 * See dojo/data/api/Read.getLabel()
			 */
			getLabel(item: T): string;

			/**
			 * See dojo/data/api/Read.getLabelAttributes()
			 */
			getLabelAttributes(item: T): string[];

			/**
			 * This method handles the basic filtering needs for ItemFile* based stores.
			 */
			filter(requestArgs: api.Request, arrayOfItems: T[], findCallback: FindCallback<T>): void;

			/**
			 * See dojo/data/util.simpleFetch.fetch()
			 */
			_fetchItems(keywordArgs: api.FetchArgs<T>, findeCallback: FindCallback<T>): void;

			/**
			 * Internal function to execute delayed request in the store.
			 */
			_handleQueuedFetches(): void;

			/**
			 * Internal function to determine which list of items to search over.
			 */
			_getItemsArray(queryOptions?: { deep?: boolean }): T[];

			/**
			 * See dojo/data/api/Read.close()
			 */
			close(request?: api.Request): void;

			/**
			 * Function to parse the loaded data into item format and build the internal items array.
			 */
			_getItemsFromLoadedData(dataObject: Object): void;

			/**
			 * Method to add an reference map entry for an item and attribute.
			 */
			_addReferenceToMap(refItem: T, parentItem: T, attribute: string): void;

			/**
			 * See dojo/data/api/Identity.getIdentity()
			 */
			getIdentity(item: T): Object | string | number;

			/**
			 * See dojo/data/api/Identity.fetchItemByIdentity()
			 */
			fetchItemByIdentity(keywordArgs: api.FetchByIdentityArgs<T>): T;

			/**
			 * Internal function to look an item up by its identity map.
			 */
			_getItemByIdentity(identity: Object): T;

			/**
			 * See dojo/data/api/Identity.getIdentityAttributes()
			 */
			getIdentityAttributes(item: T): string[];

			/**
			 * Internal function to force a load of the store if it hasn't occurred yet.  This is required
			 * for specific functions to work properly.
			 */
			_forceLoad(): void;
		}

		interface ItemFileReadStoreConstructor {
			new <T extends api.Item>(keywordParameters: ItemFileReadStoreArgs<T>): ItemFileReadStore<T>;
			prototype: ItemFileReadStore<api.Item>;
		}

		/* dojo/data/ItemFileWriteStore */

		interface ItemFileWriteStore<T extends api.Item> extends ItemFileReadStore<T> {
			referenceIntegrity: boolean;

			_assert(condition: boolean): void;

			_getIdentifierAttribute(): boolean;

			/**
			 * See dojo/data/api/Write.newItem()
			 */
			newItem(keywordArgs: T, parentInfo?: api.ParentInfo<T>): T;

			_removeArrayElement(array: any[], element: any): boolean;

			/**
			 * See dojo/data/api/Write.deleteItem()
			 */
			deleteItem(item: T): boolean;

			/**
			 * See dojo/data/api/Write.set()
			 */
			setValue(item: T, attribute: string, value: any): boolean;

			/**
			 * See dojo/data/api/Write.setValues()
			 */
			setValues(item: T, attribute: string, values: any[]): boolean;

			/**
			 * See dojo/data/api/Write.unsetAttribute()
			 */
			unsetAttribute(item: T, attribute: string): boolean;

			_setValueOrValues(item: T, attribute: any, newValueOrValues: any, callOnSet?: boolean): boolean;

			/**
			 * Method to remove an reference map entry for an item and attribute.
			 */
			_removeReferenceFromMap(refItem: T, parentItem: T, attribute: string): void;

			/**
			 * Function to dump the reverse reference map of all items in the store for debug purposes.
			 */
			_dumpReferenceMap(): void;

			_getValueOrValues(item: T, attribute: string): any;

			_flatten(value: any): any;

			/**
			 * Generate a string that can be saved to a file.
			 * The result should look similar to:
			 * http://trac.dojotoolkit.org/browser/dojo/trunk/tests/data/countries.json
			 */
			_getNewFileContentString(): string;

			/**
			 * Function to determine if an array or object has no properties or values.
			 */
			_isEmpty(something: any): boolean;

			/**
			 * See dojo/data/api/Write.save()
			 */
			save(keywordArgs: api.SaveKeywordArgs): void;

			/**
			 * See dojo/data/api/Write.revert()
			 */
			revert(): boolean;

			/**
			 * See dojo/data/api/Write.isDirty()
			 */
			isDirty(item: T): boolean;

			/**
			 * See dojo/data/api/Notification.onSet()
			 */
			onSet(item: T, attribute: string, oldValue: any, newValue: any): void;

			/**
			 * See dojo/data/api/Notification.onNew()
			 */
			onNew(item: T, parentInfo?: api.ParentInfo<T>): void;

			/**
			 * See dojo/data/api/Notification.onDelete()
			 */
			onDelete(deletedItem: T): void;
		}

		interface ItemFileWriteStoreConstructor {
			new <T extends api.Item>(keywordParameters: ItemFileReadStoreArgs<T>): ItemFileWriteStore<T>;
			prototype: ItemFileWriteStore<api.Item>;
		}

		/* dojo/data/ObjectStore */

		/* TODO: Replace with Store API when Typed */
		interface Store { }

		interface ObjectStoreOptions {
			objectStore?: Store;
			labelAttribute?: string;
			labelProperty?: string;
		}

		interface ObjectStoreSaveArgs {
			/**
			 * This will cause the save to commit the dirty data for all
			 * ObjectStores as a single transaction.
			 */
			global?: boolean;

			/**
			 * This will cause the changes to be reverted if there is an
			 * error on the save. By default a revert is executed unless
			 * a value of false is provide for this parameter.
			 */
			revertOnError?: boolean;

			/**
			 * Called when an error occurs in the commit
			 */
			onError(e: Error): void;

			/**
			 * Called when an the save/commit is completed
			 */
			onComplete(actions: any[]): void;

			scope?: Object;
		}

		interface ObjectStore<T extends api.Item> extends Evented {
			objectStore: Store;
			labelProperty: string;

			/**
			 * Gets the value of an item's 'property'
			 */
			getValue(item: T, property: string, defaultValue?: any): any;

			/**
			 * Gets the value of an item's 'property' and returns
			 * it. If this value is an array it is just returned,
			 * if not, the value is added to an array and that is returned.
			 */
			getValues(item: T, property: string): any[];

			/**
			 * Gets the available attributes of an item's 'property' and returns
			 * it as an array.
			 */
			getAttributes(item: T): string[];

			/**
			 * Checks to see if item has attribute
			 */
			hasAttribute(item: T, attribute: string): boolean;

			/**
			 * Checks to see if 'item' has 'value' at 'attribute'
			 */
			containsValue(item: T, attribute: string, value: any): boolean;

			/**
			 * Checks to see if the argument is an item
			 */
			isItem(item: any): item is T;

			/**
			 * Checks to see if the item is loaded.
			 */
			isItemLoaded(item: any): boolean;

			/**
			 * Loads an item and calls the callback handler. Note, that this will call the callback
			 * handler even if the item is loaded. Consequently, you can use loadItem to ensure
			 * that an item is loaded is situations when the item may or may not be loaded yet.
			 * If you access a value directly through property access, you can use this to load
			 * a lazy value as well (doesn't need to be an item).
			 */
			loadItem(keywordArgs: api.LoadItemArgs<T>): T;

			/**
			 * See dojo/data/api/Read.close()
			 */
			close(request?: api.Request): void;

			/**
			 * See dojo/data/api/Read.fetch()
			 */
			fetch(keywordArgs: api.FetchArgs<T>): api.Request;

			/**
			 * return the store feature set
			 */
			getFeatures(): api.Features;

			/**
			 * See dojo/data/api/Read.getLabel()
			 */
			getLabel(item: T): string;

			/**
			 * See dojo/data/api/Read.getLabelAttributes()
			 */
			getLabelAttributes(item: T): string[];

			/**
			 * returns the identity of the given item
			 * See dojo/data/api/Read.getIdentity()
			 */
			getIdentity(item: T): Object | string | number;

			/**
			 * returns the attributes which are used to make up the
			 * identity of an item.	Basically returns this.objectStore.idProperty
			 * See dojo/data/api/Read.getIdentityAttributes()
			 */
			getIdentityAttributes(item: T): string[];

			/**
			 * fetch an item by its identity, by looking in our index of what we have loaded
			 */
			fetchItemByIdentity(keywordArgs: api.FetchByIdentityArgs<T>): T;

			/**
			 * adds a new item to the store at the specified point.
			 * Takes two parameters, data, and options.
			 */
			newItem(keywordArgs: T, parentInfo?: api.ParentInfo<T>): T;

			/**
			 * deletes item and any references to that item from the store.
			 */
			deleteItem(item: T): void;

			/**
			 * sets 'attribute' on 'item' to 'value'
			 * See dojo/data/api/Write.setValue()
			 */
			setValue(item: T, attribute: string, value: any): boolean;

			/**
			 * sets 'attribute' on 'item' to 'value' value
			 * must be an array.
			 * See dojo/data/api/Write.setValues()
			 */
			setValues(item: T, attribute: string, values: any[]): boolean;

			/**
			 * unsets 'attribute' on 'item'
			 * See dojo/data/api/Write.unsetAttribute()
			 */
			unsetAttribute(item: T, attribute: string): boolean;

			/**
			 * adds an object to the list of dirty objects.  This object
			 * contains a reference to the object itself as well as a
			 * cloned and trimmed version of old object for use with
			 * revert.
			 */
			changing(object: T, _deleting: boolean): void;

			/**
			 * Saves the dirty data using object store provider. See dojo/data/api/Write for API.
			 */
			save(kwArgs: ObjectStoreSaveArgs): void;

			/**
			 * returns any modified data to its original state prior to a save();
			 */
			revert(): void;

			/**
			 * returns true if the item is marked as dirty or true if there are any dirty items
			 */
			isDirty(item: T): boolean;

			/**
			 * See dojo/data/api/Notification.onSet()
			 */
			onSet(item: T, attribute: string, oldValue: any, newValue: any): void;

			/**
			 * See dojo/data/api/Notification.onNew()
			 */
			onNew(item: T, parentInfo?: api.ParentInfo<T>): void;

			/**
			 * See dojo/data/api/Notification.onDelete()
			 */
			onDelete(deletedItem: T): void;

			/**
			 * Called when a fetch occurs
			 */
			onFetch(results: any): void;
		}

		/**
		 * A Dojo Data implementation that wraps Dojo object stores for backwards
		 * compatibility.
		 */
		interface ObjectStoreConstructor {
			new <T extends api.Item>(options: ObjectStoreOptions): ObjectStore<T>;
			prototype: ObjectStore<api.Item>;
		}
	}
}
