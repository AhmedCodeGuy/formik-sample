import React from 'react'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

const Input = ({ field, form, ...props }) => {
  return <input {...field} {...form} {...props} />
}

const App = ({ values, errors, touched, isSubmiting }) => (
  <Form>
    <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type='email' name='email' placeholder='Email' component={Input} />
    </div>
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type='password' name='password' placeholder='Password' />
    </div>
    <label>
      <Field type='checkbox' name='newsletter' checkbox={values.newsletter} />
      Join our newsletter
    </label>
    <Field component='select' name='plan'>
      <option value='free'>Free</option>
      <option value='premium'>Premium</option>
    </Field>
    <button disabled={isSubmiting}>Submit</button>
  </Form>
)

const FormikApp = withFormik({
  mapPropsToValues ({ email, password, newsletter, plan }) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || false,
      plan: plan || 'free'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string()
      .min(9, 'Password must be more than 9 characters or longer')
      .required('Password is required')
  }),
  handleSubmit (values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'ahmed@hussein.io') {
        setErrors({ email: 'That email already taken ' })
      } else {
        resetForm()
      }
      setSubmitting(false)
    }, 2000)
  }
})(App)

export default FormikApp
