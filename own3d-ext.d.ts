declare namespace OWN3D.ext {
    const version: string;
    const environment: 'production';
    function onAuthorized(authCallback: (auth: Authorized) => void): void;
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
