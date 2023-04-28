import { GraphQLLayoutService, GraphQLLayoutServiceConfig, GraphQLRequestClient, LayoutServiceData, RestLayoutService, RestLayoutServiceConfig } from "@sitecore-jss/sitecore-jss-nextjs";


interface FetchParams {
  sc_apikey: string;
  sc_site: string;
  sc_lang: string;
  tracking: boolean;
  [param: string]: string | number | boolean;
}

export class ParameterizedRestLayoutService extends RestLayoutService {
    constructor(private config: RestLayoutServiceConfig){
        super(config);
    }

    protected getFetchParams = (language?: string | undefined) : FetchParams => {
        return {
            sc_apikey: this.config.apiKey,
            sc_site: this.config.siteName,
            sc_lang: language || '',
            tracking: this.config.tracking ?? true,
            custom_parameter: 'test data',
        }
    }

}

export class ParameterizeGraphQLLayoutService extends GraphQLLayoutService {
    constructor(private config: GraphQLLayoutServiceConfig){
        super(config);
    }    

    localFetch = (input: RequestInfo, init: RequestInit): Promise<Response> => {
        console.log("Input", input);                
        console.log("Init", init);
        init.headers = new Headers();
        init.headers.append("sc_apikey", this.config.apiKey);
        init.headers.append("accept", "application/json");
        init.headers.append("Content-Type", "application/json");
        init.headers.append("Param", "test data");
        return fetch(input, init);
    }

    override fetchLayoutData = async (itemPath: string, language?: string | undefined): Promise<LayoutServiceData> => {   
        const query = this.getLayoutQuery(itemPath, language);
        const client = new GraphQLRequestClient(this.config.endpoint, {apiKey: this.config.apiKey, fetch: this.localFetch});
        var response = await client.request<any>(query);
        return response?.layout?.item?.rendered;
    }
   
}