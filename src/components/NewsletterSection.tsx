
const NewsletterSection = (): JSX.Element => (
  <div className="newsletter_section layout_padding">
         <div className="container">
            <div className="row">
               <div className="col-md-6">
                  <div className="imgage_6"><img src="images/img-6.png" /></div>
               </div>
               <div className="col-md-6">
                  <h1 className="newsletter_taital">Subscribe Newsletter</h1>
                  <input type="text" className="email_text" placeholder="Enter Your Email" name="Enter Your Email" />
                  <div className="subscribe_bt"><a href="#">Subscribe Now</a></div>
               </div>
            </div>
         </div>
      </div>
);

export default NewsletterSection;
