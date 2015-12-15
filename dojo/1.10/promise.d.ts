declare namespace dojo {
	namespace promise {
		export interface PromiseCallback<T> {
			(result: T): void;
		}

		export interface PromiseErrback {
			(error: any): void;
		}

		export interface PromiseProgback {
			(progress: any): void;
		}

		export interface Promise<T> {
			then<U>(callback?: PromiseCallback<T>, errback?: PromiseErrback, progback?: PromiseProgback): Promise<U>;
			cancel(reason: any, strict?: boolean): any;
			isResolved(): boolean;
			isRejected(): boolean;
			isFulfilled(): boolean;
			isCanceled(): boolean;
			always(callbackOrErrback: PromiseCallback<T>|PromiseErrback): Promise<T>;
			otherwise(errback: PromiseErrback): Promise<T>;
			trace(): Promise<T>;
			traceRejected(): Promise<T>;
			toString(): string;
		}
	}
}