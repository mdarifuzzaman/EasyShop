import { Text, Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
//import { sitecoreApiHost } from '../../src/temp/config';


type OurWorkProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Page1: any;
    Page2: any;
    Page3: any;  
    Page2Title: Field<string>;
    Page2Description: Field<string>;
    Page3Title: Field<string>;
    Page3Description: Field<string>;
  };
};

const OurWork = (props: OurWorkProps): JSX.Element => {  
  return (
    <div className="design_section layout_padding">
         <div id="my_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
               <div className="carousel-item active">
                  <div className="container">
                     <h1 className="design_taital">{<Text field={props.fields.Title}></Text>}</h1>
                     <p className="design_text">{<RichText field={props.fields.Description}></RichText> }</p>
                     <div className="design_section_2">
                        <div className="row">
                          {props.fields.Page1 && props.fields.Page1.map((pro: any,index: number) => (
                            <div className="col-md-4" key={index}>
                              <div className="box_main">
                                <p className="chair_text">{pro.fields.Title.value}</p>
                                <div className="image_3"><img src = {pro.fields.Images[0].url}></img></div>
                                <p className="chair_text">Price ${pro.fields.Price.value}</p>
                                <div className="buy_bt"><a href="#">Buy Now</a></div>
                              </div>
                            </div>
                          ))}                           
                        </div>
                     </div>
                  </div>
               </div>
               <div className="carousel-item">
                  <div className="container">
                     <h1 className="design_taital">{<Text field={props.fields.Page2Title}></Text>}</h1>
                     <p className="design_text">{<RichText field={props.fields.Page2Description}></RichText>}</p>
                     <div className="design_section_2">
                        <div className="row">
                          {props.fields.Page2 && props.fields.Page2.map((pro: any,index: number) => (
                            <div className="col-md-4" key={index}>
                              <div className="box_main">
                                <p className="chair_text">{pro.fields.Title.value}</p>
                                <div className="image_3"><img src = {pro.fields.Images[0].url}></img></div>
                                <p className="chair_text">Price ${pro.fields.Price.value}</p>
                                <div className="buy_bt"><a href="#">Buy Now</a></div>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="carousel-item">
                  <div className="container">
                     <h1 className="design_taital">{<Text field={props.fields.Page3Title}></Text>}</h1>
                     <p className="design_text">{<RichText field={props.fields.Page3Description}></RichText>}</p>
                     <div className="design_section_2">
                        <div className="row">
                          {props.fields.Page3 && props.fields.Page3.map((pro: any,index: number) => (
                            <div className="col-md-4" key={index}>
                              <div className="box_main">
                                <p className="chair_text">{pro.fields.Title.value}</p>
                                <div className="image_3"><img src = { pro.fields.Images[0].url}></img></div>
                                <p className="chair_text">Price ${pro.fields.Price.value}</p>
                                <div className="buy_bt"><a href="#">Buy Now</a></div>
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <a className="carousel-control-prev" href="#my_slider" role="button" data-slide="prev">
            <i className="fa fa-long-arrow-left" style={{fontSize: "24px"}}></i>
            </a>
            <a className="carousel-control-next" href="#my_slider" role="button" data-slide="next">
            <i className="fa fa-long-arrow-right" style={{fontSize: "24px"}}></i>
            </a>
         </div>
         <div className="container">
            <div className="read_bt"><a href="/product-category">Read More</a></div>
         </div>
      </div>
);
}

// export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
//   if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
//     return null;
//   }

//   const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
//     apiKey: '{4672EB7C-E577-43CC-8B6C-EA04611866A8}',
//   });

//   const query = `{
//     item(path: "/sitecore/content/Headless Tenant/easyshop/Home/products", language: "en"){
//       children {
//         results {
//           displayName
//           fields {
//             id
//             name
//             definition {
//               name
//             }
//             jsonValue
//           }
//         }
//       }
//     }
//   }`;
//   // const query = `query {
//   //   search(where: {
//   //     AND: [
//   //         {
//   //           name: "_templates"
//   //           value: "15E850DB-1D8A-46C9-B9FD-04AA808BBC51"
//   //           operator: CONTAINS
//   //         },
//   //         {
//   //           name: "_language",
//   //           value: "en",
//   //           operator: EQ
//   //         }
//   //       ]
//   //     }, 
//   //     first: 5
//   //     orderBy: { name: "_name", direction: ASC }
//   //     )
//   //   {
//   //     results {
//   //       displayName,
//   //       id,
//   //       fields {
//   //         id,
//   //         name,
//   //         definition {
//   //           name
//   //         },
//   //         jsonValue
//   //       }
//   //     }
//   //   }
//   // }`;

  

//   const result = await graphQLClient.request<any>(query, {
//     datasource: rendering.dataSource,
//     contextItem: layoutData?.sitecore?.route?.itemId,
//     language: layoutData?.sitecore?.context?.language,
//   });

//   return result;
// };


export default withDatasourceCheck()<OurWorkProps>(OurWork);
