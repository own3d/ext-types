/**
 * Type Definitions for OWN3D Extensions.
 *
 * @see https://dev.own3d.tv/docs/extensions/
 */
export declare namespace OWN3D.ext {
    /**
     * The current version of the extension API.
     */
    const version: string

    /**
     * The current environment of the extension API.
     */
    const environment: 'production'

    /**
     * A socket is basically an EventEmitter which sends events
     * to — and receive events from — the server over the network.
     */
    namespace socket {
        /**
         * Register a callback to be invoked when a specific event is emitted.
         */
        function on(event: string, callback: (data: any) => void): void;
    }

    /**
     * Inter-Process Communication (IPC) is a process of exchanging information between processes.
     * It can be used to communicate with the supervisor process from the extension process.
     */
    namespace ipc {
        /**
         * Register a callback to be invoked when a specific event is emitted from the supervisor.
         */
        function on(channel: string, listener: (payload: any) => void): void;

        /**
         * Send a message to the supervisor.
         */
        function send(channel: string, payload: any): void;

        /**
         * Send a message to the supervisor and wait for a response.
         */
        function invoke(channel: string, payload: any): Promise<any>;
    }

    /**
     * The user namespace provides information about the current user interacting with the extension.
     */
    namespace user {
        /**
         * The user's ID.
         */
        const id: string | null

        /**
         * The user's extension scopes.
         */
        const scopes: string[]

        /**
         * The user's pro subscription status.
         */
        const pro_subscription: ProSubscription | null

        /**
         * The user's extension based subscription status.
         */
        const subscription: Subscription | null

        /**
         * The user's extension token.
         */
        const token: string
    }

    /**
     * The feature-flag namespace provides information about the current global feature flags.
     */
    namespace features {
        /**
         * Whether the current feature flag is enabled.
         */
        function isEnabled(feature: string): boolean

        /**
         * Returns a list of all available feature flags.
         */
        function getFeatures(): string[]
    }

    /**
     * Coins are digital content that can be exchanged for products.
     */
    namespace coins {
        /**
         * Get products available for exchange.
         */
        function getProducts(): Promise<Product[]>;

        /**
         * Show current coins balance.
         */
        function showCoinsBalance(): void;

        /**
         * Use coins to exchange for a product.
         */
        function useCoins(sku: string, metadata: Metadata): Promise<Transaction>;

        /**
         * Register a callback to be invoked when a transaction is completed.
         */
        function onTransactionComplete(callback: (transaction: Transaction) => void): void;

        /**
         * Register a callback to be invoked when a transaction is cancelled.
         */
        function onTransactionCancelled(callback: (transaction: Transaction) => void): void;

        /**
         * Register a callback to be invoked when a subscription is cancelled.
         */
        function onSubscriptionCancelled(callback: (subscription: Subscription) => void): void;

        /**
         * Register a callback to be invoked when a subscription is renewed.
         */
        function onSubscriptionRenewed(callback: (subscription: Subscription) => void): void;

        /**
         * Register a callback to be invoked when a subscription is expired.
         */
        function onSubscriptionExpired(callback: (subscription: Subscription) => void): void;

        /**
         * Register a callback to be invoked when a subscription is changed.
         */
        function onSubscriptionChanged(callback: (subscription: Subscription) => void): void;
    }

    /**
     * The config namespace allows streamers and developers to store and retrieve data.
     */
    namespace config {
        /**
         * Get all segments.
         */
        function getSegments(): Promise<ConfigSegments>

        /**
         * Set the value of a key.
         *
         * @throws {Error} if the user has insufficient permissions to set the key.
         */
        function setSegment(segment: ConfigSegmentKey, content: JsonObject): Promise<void>
    }

    /**
     * Register a callback to be invoked when the extension is authorized.
     */
    function onAuthorized(authCallback: (auth: Authorized) => void): void;

    /**
     * Register a callback to be invoked when the extension context changes.
     */
    function onContext(
        contextCallback: <T extends Partial<Context>>(context: T, changed: ReadonlyArray<keyof T>) => void,
    ): void;
}

export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = Array<JsonValue>;
export type JsonValue = string | number | boolean | null | JsonArray | JsonObject;
export type ConfigSegmentKey = 'creator' | 'developer' | 'global';
export type ConfigSegments = {
    [key in ConfigSegmentKey]: JsonObject
}

export interface ProSubscription {
    // tbd definition
    features: string[];
}

export interface Cost {
    amount: number;
    type: 'coins';
}

export interface Product {
    sku: string;
    name: string;
    cost: Cost
    environment: string;
    recurrence: 'one-time' | 'weekly' | 'monthly' | 'yearly';
}

export interface Subscription {
    id: string;
    status: 'active' | 'canceled';
    created_at: string;
    expires_at: string;
    canceled_at: string;
    cost: Cost;
}

export interface Metadata {
    [key: string]: string;
}

export interface Transaction {
    id: string;
    client_id: string;
    user_id: string;
    channel_id: string;
    subscription: Subscription | null;
    product: Product;
    metadata: Metadata
    status: 'pending' | 'completed' | 'canceled';
}

export interface Authorized {
    client_id: string;
    client_token: string;
    channel_id: string;
    user_id: string;
    scopes: string[];
    token: string;
}

export interface Context {
    environment: string;
    language: string;
    mode: 'widget' | 'standalone' | 'browser-source' | 'config';
    theme: 'light' | 'dark';

    [key: string]: any;
}
