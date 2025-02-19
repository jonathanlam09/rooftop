declare global {
    interface Window {
        helper: any;
        config: {
            properties: {
                baseURL: string;
                assetPath: string;
                apiHeader: { [key: string]: string };
            };
            methods: any;
        };
    }

    var config: {
        properties: {
            baseURL: string;
            assetPath: string;
            apiHeader: { [key: string]: string };
        };
        methods: any;
    };
}
export {};
  