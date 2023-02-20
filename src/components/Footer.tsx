import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type FooterProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Footer = (props: FooterProps): JSX.Element => {
   console.log(props);
   return (
  <div className="footer_section">
         <div className="container">
            <div className="footer_location_text">
               <ul>
                  <li><img src="images/map-icon.png" /><span className="padding_left_10"><a href="#">Loram Ipusm hosting web</a></span></li>
                  <li><img src="images/call-icon.png" /><span className="padding_left_10"><a href="#">Call : +7586656566</a></span></li>
                  <li><img src="images/mail-icon.png" /><span className="padding_left_10"><a href="#">demo@gmail.com</a></span></li>
               </ul>
            </div>
            <div className="row">
               <div className="col-lg-3 col-sm-6">
                  <h2 className="useful_text">Useful link </h2>
                  <div className="footer_menu">
                     <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="design.html">Our Designe</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                     </ul>
                  </div>
               </div>
               <div className="col-lg-3 col-sm-6">
                  <h2 className="useful_text">Repair</h2>
                  <p className="lorem_text">Lorem ipsum dolor sit amet, consectetur  adipiscinaliqua  Loreadipiscing </p>
               </div>
               <div className="col-lg-3 col-sm-6">
                  <h2 className="useful_text">Social Media</h2>
                  <div id="social">
                     <a className="facebookBtn smGlobalBtn active" href="#" ></a>
                     <a className="twitterBtn smGlobalBtn" href="#" ></a>
                     <a className="googleplusBtn smGlobalBtn" href="#" ></a>
                     <a className="linkedinBtn smGlobalBtn" href="#" ></a>
                  </div>
               </div>
               <div className="col-sm-6 col-lg-3">
                  <h1 className="useful_text">Our Repair center</h1>
                  <p className="footer_text">Lorem ipsum dolor sit amet, consectetur adipiscinaliquaLoreadipiscing </p>
               </div>
            </div>
         </div>
      </div>
);
   }
export default withDatasourceCheck()<FooterProps>(Footer);
