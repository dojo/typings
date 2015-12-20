declare namespace dojo {
	namespace promise {
		export interface PromiseCallback<T, U> {
			(result: T): U;
		}

		export interface PromiseErrback {
			(error: any): void;
		}

		export interface PromiseProgback {
			(progress: any): void;
		}

		export interface Promise<T> {
			then<U>(callback?: PromiseCallback<T, U>, errback?: PromiseErrback, progback?: PromiseProgback): Promise<U>;
			cancel(reason: any, strict?: boolean): any;
			isResolved(): boolean;
			isRejected(): boolean;
			isFulfilled(): boolean;
			isCanceled(): boolean;
			always<U>(callbackOrErrback: PromiseCallback<T, U>|PromiseErrback): Promise<U>;
			otherwise(errback: PromiseErrback): Promise<T>;
			trace(): Promise<T>;
			traceRejected(): Promise<T>;
			toString(): string;
		}
	}
}
