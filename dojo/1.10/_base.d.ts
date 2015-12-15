declare namespace dojo {
	namespace _base {

		/* dojo/_base/array */
		interface Array {
			/**
			 * Determines whether or not every item in arr satisfies the condition implemented by callback.
			 * @param {T[] | string} arr the array to iterate on. If a string, operates on individual characters.
			 * @param {Function | string} callback a  function is invoked with three arguments: item, index, and
			 *                                     array and returns true if the condition is met.
			 * @param {object} thisObj may be used to scope the call to callback
			 */
			every<T>(arr: T[] | string, callback: (item: T, idx: number, arr: T[]) => boolean | string, thisObj?: any): boolean;

			/**
			 * Determines whether or not any item in arr satisfies the condition implemented by callback.
			 */
			some<T>(arr: T[] | string, callback: (item: T, idx: number, arr: T[]) => boolean | string, thisObj?: any): boolean;

			/**
			 * locates the last index of the provided value in the passed array. If the value is not found, -1
			 * is returned.
			 * @param {boolean} findLast Makes indexOf() work like lastIndexOf().  Used internally; not meant
			 *                           for external usage.
			 */
			indexOf<T>(arr: T[], value: T, fromIndex?: number, findLast?: boolean): number;

			/**
			 * locates the first index of the provided value in the passed array. If the value is not found,
			 * -1 is returned.
			 */
			lastIndexOf<T>(arr: T[], value: T, fromIndex?: number): number;

			/**
			 * locates the last index of the provided value in the passed array. If the value is not found,
			 * -1 is returned.
			 */
			forEach<T>(arr: T[], callback: (item: T, idx: number, arr: T[]) => void, thisObj?: any): void;

			/**
			 * for every item in arr, callback is invoked. Return values are ignored. If you want to break
			 * out of the loop, consider using array.every() or array.some().
			 */
			map<T, U>(arr: T[] | string, callback: (item: T, idx: number, arr: T[]) => U | string, thisObj?: any, Ctr?: dojo.GenericConstructor<U[]>): U[];

			/**
			 * Returns a new Array with those items from arr that match the condition implemented by
			 * callback.
			 */
			filter<T>(arr: T[], callback: (item: T, idx: number, arr: T[]) => boolean, thisObj?: any): T[];

			clearCache(): void;
		}

		/* dojo/_base/declare */

		/**
		 * Create a feature-rich constructor from compact notation.
		 */
		interface Declare {
			<A, B, C>(className: string, superClass: [ dojo.GenericConstructor<A>, dojo.GenericConstructor<B> ], props: C): dojo.GenericConstructor<A&B&C>;
			<A, B, C>(superClass: [ dojo.GenericConstructor<A>, dojo.GenericConstructor<B> ], props: C): dojo.GenericConstructor<A&B&C>;
			<A, B>(className: string, superClass: dojo.GenericConstructor<A>, props: B): dojo.GenericConstructor<A&B>;
			<A, B>(superClass: dojo.GenericConstructor<A>, props: B): dojo.GenericConstructor<A&B>;
			<A>(className: string, superClass: dojo.GenericConstructor<any>|dojo.GenericConstructor<any>[], props: any): dojo.GenericConstructor<A>;
			<A>(superClass: dojo.GenericConstructor<any>|dojo.GenericConstructor<any>[], props: any): dojo.GenericConstructor<A>;
			(className: string, superClass: any[], props: any): dojo.GenericConstructor<any>;
			(superClass: any[], props: any): dojo.GenericConstructor<any>;
		}
	}
}