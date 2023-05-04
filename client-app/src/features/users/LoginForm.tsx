import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {

    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(err =>
                setErrors({ error: 'Invalid Username or Password' }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" autoComplete='off' onSubmit={handleSubmit}>
                    <Header as ='h2' content='Login to Reactivities' color="teal" textAlign="center" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type='password' />
                    <ErrorMessage name='error'
                        render={() =>
                            <Label 
                             style={{ marginBottom: 10 }} 
                             basic 
                             color='red' 
                             content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})