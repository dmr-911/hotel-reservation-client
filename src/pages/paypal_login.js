// LoginPage.jsx
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import axios from "axios";
import { useRouter } from "next/router";
import { axiosInterceptorInstance } from "@/axios/axios";

const LoginPage = () => {
  const initialValues = {
    paypal_email: "",
    paypal_password: "",
  };

  const validationSchema = Yup.object().shape({
    paypal_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    paypal_password: Yup.string().required("Password is required"),
  });
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    // You can handle form submission logic here
    try {
      const id = sessionStorage.getItem("id");
      const url = `http://www.localhost:8000/reservations/${id}/`;
      console.log("url", url);
      // console.log(response);
      const response = await axiosInterceptorInstance(url, values);
      if (response.status === 200) {
        sessionStorage.removeItem("id");
        router.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }

    // Simulate an API call or other async operation
    setTimeout(() => {
      // Reset submitting state after the async operation is complete
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto bg-white p-8 rounded shadow-md w-96">
        <Image
          height={60}
          width={60}
          alt=""
          src={Logo.src}
          className="mx-auto"
          priority
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="email"
                id="email"
                name="paypal_email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="paypal_email"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                id="password"
                name="paypal_password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="paypal_password"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 w-full text-white p-2 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
