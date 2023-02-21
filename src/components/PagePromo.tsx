import { Text, Field, withDatasourceCheck, Link, LinkField, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type PagePromoProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    CTA: LinkField;
    PromoImage: ImageField;
  };
};

const PagePromo = (props: PagePromoProps): JSX.Element => (
  <div className="banner_section layout_padding" style={{marginTop: "20px"}}>
         <div className="container">
            <div className="row">
               <div className="col-md-6">
                  <div className="imgage_6">{<Image field={props.fields.PromoImage}></Image>}</div>
               </div>
               <div className="col-md-6">
                  <h1 className="newsletter_taital"><Text field={props.fields.heading}></Text></h1>
                  {/* <input type="text" className="email_text" placeholder="Enter Your Email" name="Enter Your Email" /> */}
                  <div className="subscribe_bt"><Link field={props.fields.CTA}></Link></div>
               </div>
            </div>
         </div>
      </div>
);

export default withDatasourceCheck()<PagePromoProps>(PagePromo);
