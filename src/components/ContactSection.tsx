import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContactSectionProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const ContactSection = (props: ContactSectionProps): JSX.Element => {
   console.log(props);
   return (
  <div className="contact_section layout_padding">
         <div className="container">
            <div className="contact_section_2">
               <div className="row">
                  <div className="col-md-6">
                     <div className="mail_section_1">
                        <h1 className="contact_taital">Contact Us</h1>
                        <input type="text" className="mail_text" placeholder="Name" name="text" />
                        <input type="text" className="mail_text" placeholder="Email" name="text" />
                        <input type="text" className="mail_text" placeholder="Phone Number" name="text" />
                        <textarea className="massage-bt" placeholder="Massage" rows={5} id="comment" name="Massage"></textarea>
                        <div className="send_bt"><a href="#">SEND</a></div>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="map_main">
                        <div className="map-responsive">
                           <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&amp;q=Eiffel+Tower+Paris+France" width="600" height="360" style={{border:"0", width: "100%"}} allowFullScreen={false}></iframe>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
);
   }

export default withDatasourceCheck()<ContactSectionProps>(ContactSection);
