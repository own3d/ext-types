/**
 * Type Definitions for OWN3D Extensions.
 *
 * @see https://dev.stream.tv/docs/
 */
declare namespace OWN3D.ext {
    /**
     * The current version of the extension API.
     */
    const version: string;

    /**
     * The current environment of the extension API.
     */
    const environment: 'production';

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
         * Register a callback to be invoked when a specific event is emitted.
         */
        function on(channel: string, listener: (payload: any) => void): void;

        /**
         * Send a message to the supervisor.
         */
        function send(channel: string, payload: any): void;
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

interface Authorized {
    id: string;
    token: string;
}

interface Context {
    environment: string;
    language: string;
    mode: 'widget' | 'standalone';
    theme: 'light' | 'dark';
}
