import { Text, Field, withDatasourceCheck, Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContactProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Contact = (props: ContactProps): JSX.Element => (  
  <div className="contact_section layout_padding">
  <div className="container">
     <div className="contact_section_2">
        <div className="row">
           <div className="col-md-6">
              <div className="mail_section_1">
                 <h1 className="contact_taital"><Text field={props.fields.heading} /></h1>
                 <input type="text" className="mail_text" placeholder="Name" name="text" />
                 <input type="text" className="mail_text" placeholder="Email" name="text" />
                 <input type="text" className="mail_text" placeholder="Phone Number" name="text" />
                 <textarea className="massage-bt" placeholder="Massage" rows={5} id="comment" name="Massage"></textarea>
                 <div className="send_bt"><a href="#">SEND</a></div>
              </div>
           </div>
           <div className="col-md-6">
              <Placeholder name='map-placeholder' rendering={props.rendering}></Placeholder>              
           </div>
        </div>
     </div>
  </div>
</div>
);

export default withDatasourceCheck()<ContactProps>(Contact);
