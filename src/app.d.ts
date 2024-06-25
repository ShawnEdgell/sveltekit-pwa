// src/app.d.ts
/// <reference lib="webworker" />

declare var self: ServiceWorkerGlobalScope;

interface ServiceWorkerGlobalScopeEventMap {
	install: ExtendableEvent;
	activate: ExtendableEvent;
	fetch: FetchEvent;
}

interface ServiceWorkerGlobalScope extends EventTarget {
	addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(
		type: K,
		listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerGlobalScopeEventMap[K]) => void,
		options?: boolean | AddEventListenerOptions
	): void;
	removeEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(
		type: K,
		listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerGlobalScopeEventMap[K]) => void,
		options?: boolean | EventListenerOptions
	): void;
}

interface ExtendableEvent extends Event {
	waitUntil(promise: Promise<void>): void;
}

interface FetchEvent extends Event {
	request: Request;
	respondWith(response: Response | Promise<Response> | PromiseLike<Response>): void;
}
