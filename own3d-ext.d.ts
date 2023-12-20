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
     * The config namespace allows streamers and developers to store and retrieve data.
     */
    namespace config {
        /**
         * Get the value of a key.
         */
        function getSegments(): Promise<ConfigSegments>

        /**
         * Set the value of a key.
         *
         * @throws {Error} if the user has insufficient permissions to set the key.
         */
        function setSegment(key: ConfigSegmentKey, value: JsonObject): Promise<void>
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

export interface Authorized {
    client_id: string;
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
