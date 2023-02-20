import { Field, withDatasourceCheck, constants, GraphQLRequestClient, GetStaticComponentProps, useComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import config from 'temp/config';

type MultiPromoProps = ComponentProps & {
  fields: {
    Title: Field<string>;
  };
};

const MultiPromo = (props: MultiPromoProps): JSX.Element => {
  const data = useComponentProps<any>(props.rendering.uid);
  const getValueByFields: any = (fields: Array<any>, fieldDef: string) => {  
    let value: any = "";
    fields.forEach(field => {
      if(field["name"] === fieldDef){      
        value = field["jsonValue"].value;
        return;
      }
    });
    return value;;
  }

  return (
    <div className="banner_section layout_padding">
    <div id="main_slider" className="carousel slide" data-ride="carousel">
       <div className="carousel-inner">
        {data.item.children.results && data.item.children.results.map((promo:any, index: number) => (
          <div key={index} className={index == 0 ? "carousel-item active":  "carousel-item"}>
            <div className="container">
              <div className="row">
                  <div className="col-md-6">
                    <h1 className="banner_taital">{getValueByFields(promo.fields, "Title")}</h1>
                    <p className="banner_text"> {getValueByFields(promo.fields, "SubTitle")}</p>
                    <div className="btn_main">
                        <div className="contact_bt"><a href="#">{getValueByFields(promo.fields, "CTA").text}</a></div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="image_1"><img src={getValueByFields(promo.fields, "Picture").src} /></div>
                  </div>
              </div>
            </div>
          </div>
        ))}         
       </div>
       <a className="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
       <i style={{fontStyle: "initial"}}>01</i>
       </a>
       <a className="carousel-control-next" href="#main_slider" role="button" data-slide="next">
       <i style={{fontStyle: "initial"}}>02</i>
       </a>
    </div>
 </div>
);
}

export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: '{4672EB7C-E577-43CC-8B6C-EA04611866A8}',
  });

  const query = `{
    item(path: "/sitecore/content/Headless Tenant/easyshop/Home/Page Data/MultiPromo", language: "en"){
      children {
        results {
          displayName
          fields {
            id
            name
            definition {
              name
            }
            jsonValue
          }
        }
      }
    }
  }`;
  // const query = `query {
  //   search(where: {
  //     AND: [
  //         {
  //           name: "_templates"
  //           value: "15E850DB-1D8A-46C9-B9FD-04AA808BBC51"
  //           operator: CONTAINS
  //         },
  //         {
  //           name: "_language",
  //           value: "en",
  //           operator: EQ
  //         }
  //       ]
  //     }, 
  //     first: 5
  //     orderBy: { name: "_name", direction: ASC }
  //     )
  //   {
  //     results {
  //       displayName,
  //       id,
  //       fields {
  //         id,
  //         name,
  //         definition {
  //           name
  //         },
  //         jsonValue
  //       }
  //     }
  //   }
  // }`;

  

  const result = await graphQLClient.request<any>(query, {
    datasource: rendering.dataSource,
    contextItem: layoutData?.sitecore?.route?.itemId,
    language: layoutData?.sitecore?.context?.language,
  });

  return result;
};

export default withDatasourceCheck()<MultiPromoProps>(MultiPromo);
