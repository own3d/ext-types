/**
 * Type Definitions for OWN3D Extensions.
 *
 * @see https://dev.own3d.tv/docs/extensions/
 */
declare namespace OWN3D.ext {
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

export interface Product {
    sku: string;
    name: string;
    cost: {
        amount: number;
        type: 'coins';
    }
    environment: string;
}

export interface Metadata {
    [key: string]: string;
}

export interface Transaction {
    id: string;
    client_id: string;
    user_id: string;
    channel_id: string;
    product: Product;
    metadata: Metadata
    status: 'pending' | 'completed' | 'cancelled';
}

export interface Authorized {
    client_id: string;
    channel_id: string;
    user_id: string;
    token: string;
}

export interface Context {
    environment: string;
    language: string;
    mode: 'widget' | 'standalone' | 'browser-source' | 'config';
    theme: 'light' | 'dark';

    [key: string]: any;
}
