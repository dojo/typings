declare namespace dojo {
	namespace store {
		namespace api {

			/* dojo/store/api/Store */

			interface SortInformation {

				/**
				 * The name of the attribute to sort on.
				 */
				attribute: string;

				/**
				 * The direction of the sort.  Default is false.
				 */
				descending?: boolean;
			}

			interface QueryOptions {
				/**
				 * A list of attributes to sort on, as well as direction
				 * For example:
				 * | [{attribute:"price", descending: true}].
				 * If the sort parameter is omitted, then the natural order of the store may be
				 * applied if there is a natural order.
				 */
				sort?: SortInformation[];

				/**
				 * The first result to begin iteration on
				 */
				start?: number;

				/**
				 * The number of how many results should be returned.
				 */
				count?: number;
			}

			interface QueryEngineFunction<T extends Object> {
				(array: T[]): T[];
				matches(object: T): boolean;
			}

			type BaseQueryType = string | Object | Function;

			interface QueryEngine<T extends Object, Q extends BaseQueryType> {
				<O extends QueryOptions>(query: Q, options?: O): QueryEngineFunction<T>;
			}

			interface PutDirectives<T extends Object> {

				/**
				 * Indicates the identity of the object if a new object is created
				 */
				id?: string | number;

				/**
				 * If the collection of objects in the store has a natural ordering,
				 * this indicates that the created or updated object should be placed before the
				 * object specified by the value of this property. A value of null indicates that the
				 * object should be last.
				 */
				before?: T;

				/**
				 * If the store is hierarchical (with single parenting) this property indicates the
				 * new parent of the created or updated object.
				 */
				parent?: T;

				/**
				 * If this is provided as a boolean it indicates that the object should or should not
				 * overwrite an existing object. A value of true indicates that a new object
				 * should not be created, the operation should update an existing object. A
				 * value of false indicates that an existing object should not be updated, a new
				 * object should be created (which is the same as an add() operation). When
				 * this property is not provided, either an update or creation is acceptable.
				 */
				overwrite?: boolean;
			}

			interface QueryResults<T extends Object> extends ArrayLike<T> {

				/**
				 * Iterates over the query results, based on
				 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/forEach.
				 * Note that this may executed asynchronously. The callback may be called
				 * after this function returns.
				 */
				forEach(callback: (item: T, id: string | number, results: this) => void, thisObject?: Object): void | this;

				/**
				 * Filters the query results, based on
				 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter.
				 * Note that this may executed asynchronously. The callback may be called
				 * after this function returns.
				 */
				filter(callback: (item: T, id: string | number, results: this) => boolean, thisObject?: Object): this;

				/**
				 * Maps the query results, based on
				 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map.
				 * Note that this may executed asynchronously. The callback may be called
				 * after this function returns.
				 */
				map<U>(callback: (item: T, id: string | number, results: this) => U, thisObject?: Object): QueryResults<U>;

				/**
				 * This registers a callback for when the query is complete, if the query is asynchronous.
				 * This is an optional method, and may not be present for synchronous queries.
				 */
				then?: <U>(callback?: promise.PromiseCallback<this, U>, errback?: promise.PromiseErrback, progback?: promise.PromiseProgback) => promise.Promise<U>;

				/**
				 * This registers a callback for notification of when data is modified in the query results.
				 * This is an optional method, and is usually provided by dojo/store/Observable.
				 */
				total: number | promise.Promise<number>;
			}

			interface Transaction {
				/**
				 * Commits the transaction. This may throw an error if it fails. Of if the operation
				 * is asynchronous, it may return a promise that represents the eventual success
				 * or failure of the commit.
				 */
				commit(): void;

				/**
				 * Aborts the transaction. This may throw an error if it fails. Of if the operation
				 * is asynchronous, it may return a promise that represents the eventual success
				 * or failure of the abort.
				 */
				abort(): void;
			}

			interface Store<T extends Object, Q extends BaseQueryType, O extends QueryOptions>{

				/**
				 * If the store has a single primary key, this indicates the property to use as the
				 * identity property. The values of this property should be unique.
				 */
				idProperty: string;

				/**
				 * If the store can be queried locally (on the client side in JS), this defines
				 * the query engine to use for querying the data store.
				 * This takes a query and query options and returns a function that can execute
				 * the provided query on a JavaScript array. The queryEngine may be replace to
				 * provide more sophisticated querying capabilities. For example:
				 * | var query = store.queryEngine({foo:"bar"}, {count:10});
				 * | query(someArray) -> filtered array
				 * The returned query function may have a "matches" property that can be
				 * used to determine if an object matches the query. For example:
				 * | query.matches({id:"some-object", foo:"bar"}) -> true
				 * | query.matches({id:"some-object", foo:"something else"}) -> false
				 */
				queryEngine: QueryEngine<any, any>;

				/**
				 * Retrieves an object by its identity
				 */
				get(id: string | number): T;

				/**
				 * Returns an object's identity
				 */
				getIdentity(object: T): string | number;

				/**
				 * Stores an object
				 */
				put<D extends PutDirectives<T>>(object: T, directives?: D): string | number;

				/**
				 * Creates an object, throws an error if the object already exists
				 */
				add<D extends PutDirectives<T>>(object: T, directives?: D): string | number;

				/**
				 * Deletes an object by its identity
				 */
				remove(id: string | number): void;

				/**
				 * Queries the store for objects. This does not alter the store, but returns a
				 * set of data from the store.
				 */
				query(query: Q, options?: O): QueryResults<T>;

				/**
				 * Starts a new transaction.
				 * Note that a store user might not call transaction() prior to using put,
				 * delete, etc. in which case these operations effectively could be thought of
				 * as "auto-commit" style actions.
				 */
				transaction(): Transaction;

				/**
				 * Retrieves the children of an object.
				 */
				getChildren(parent: T, options?: O): QueryResults<T>;

				/**
				 * Returns any metadata about the object. This may include attribution,
				 * cache directives, history, or version information.
				 */
				getMetadata(object: T): Object;
			}

			interface StoreConstructor {
				new <T extends Object, Q extends BaseQueryType, O extends QueryOptions>(): Store<T, Q, O>;
			}
		}

		namespace util {

			/* dojo/store/util/QueryResults */

			interface QueryResultsFunction {
				/**
				 * A function that wraps the results of a store query with additional
				 * methods.
				 */
				<T extends Object>(results: T[]): api.QueryResults<T>;
			}

			/* dojo/store/util/SimpleQueryEngine */
			interface SimpleQueryEngine extends api.QueryEngine<Object, api.BaseQueryType> {}
		}

		/* dojo/store/Memory */

		interface MemoryOptions<T extends Object> {
			data?: T[];
			idProperty?: string;
			queryEngine?: api.QueryEngine<any, any>;
			setData?: (data: T[]) => void;
		}

		interface Memory<T extends Object> extends api.Store<T, api.BaseQueryType, api.QueryOptions> {
			/**
			 * The array of all the objects in the memory store
			 */
			data: T[];

			/**
			 * An index of data indices into the data array by id
			 */
			index: { [id: string]: number };

			/**
			 * Sets the given data as the source for this store, and indexes it
			 */
			setData(data: T[]): void;
		}

		interface MemoryConstructor {
			/**
			 * This is a basic in-memory object store. It implements dojo/store/api/Store.
			 */
			new <T extends Object>(options?: MemoryOptions<T>): Memory<T>;
		}

	}
}
