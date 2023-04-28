
import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import { sitecoreApiKey } from 'temp/config';
import { withRouter } from 'next/router';


const PersonalForm = ({ fields, router }: any): JSX.Element => {
  return (
    <Form form={fields} sitecoreApiHost={''} sitecoreApiKey={sitecoreApiKey} onRedirect={(url) => router.push(url)}>
      </Form>
    );
}

export default withRouter(PersonalForm);
