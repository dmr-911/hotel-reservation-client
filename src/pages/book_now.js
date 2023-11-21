import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import useRoom from "@/hooks/useRoom";
import { useRouter } from "next/router";
import axios from "axios";

const validationSchema = (values) => {
  return Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    paymentMethod: Yup.string()
      .required("Payment Method is required")
      .oneOf(["Paypal", "Other"], "Invalid Payment Method"),
    cardNumber:
      values && values?.paymentMethod !== "Paypal"
        ? Yup.string()
            .required("Card Number is required")
            .matches(/^\d{16}$/, "Card Number must be exactly 16 digits")
        : Yup.string().matches(
            /^\d{16}$/,
            "Card Number must be exactly 16 digits"
          ),
    number_of_people: Yup.number()
      .typeError("Please enter a valid number")
      .required("This field is required"),
    stay_duration: Yup.number()
      .typeError("Please enter a valid number")
      .required("This field is required"),
    day:
      values && values?.paymentMethod !== "Paypal"
        ? Yup.number().required("Day is required")
        : Yup.number(),
    month:
      values && values.paymentMethod !== "Paypal"
        ? Yup.number().required("Month is required")
        : Yup.number(),
    cvc:
      values && values.paymentMethod !== "Paypal"
        ? Yup.number()
            .required("This field is required")
            .matches(/^\d{3}$/, "CVC must be 3 digits")
        : Yup.string().matches(/^\d{3}$/, "CVC must be 3 digits"),
  });
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone_number: "",
  address: "",
  paymentMethod: "",
  cardNumber: "",
  number_of_people: undefined,
  stay_duration: undefined,
  day: "",
  month: "",
  cvc: "",
};

function MyForm() {
  const { rType } = useRoom();
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", { ...values, roomType: rType });

    const url = `${process.env.NEXT_HOST_URL}/reservations/`;
    const data = {
      full_name: `${values.firstName} ${values.lastName}`,
      address: values.address,
      email: values.email,
      phone: values.phone_number,
      number_of_people: values.number_of_people,
      payment_card_info: `${values.cardNumber}, ${values.day < 10 && 0}${
        values.day
      }/${values.month < 10 && 0}${values.month}, ${values.cvc}`,
      stay_duration: values.stay_duration,
      room_type: rType,
    };

    console.log(data);
    try {
      const response = await axios.post(url, data);
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    // Redirect if rType is not available
    if (!rType) {
      router.push("/");
    }
  }, [rType, router]);

  return (
    <div className="flex justify-center items-center h-auto py-8 bg-gray-900">
      <Formik
        initialValues={initialValues}
        validationSchema={(values) => validationSchema(values)}
        onSubmit={handleSubmit}
      >
        <Form className="w-full max-w-lg bg-gray-800 p-8 rounded-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <Field
                type="text"
                id="grid-first-name"
                name="firstName"
                placeholder="Jane"
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
              />
              <ErrorMessage
                name="firstName"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <Field
                type="text"
                id="grid-last-name"
                name="lastName"
                placeholder="Doe"
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              />
              <ErrorMessage
                name="lastName"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <Field
                type="text"
                id="grid-email"
                name="email"
                placeholder="email"
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-phone"
              >
                Phone
              </label>
              <Field
                type="text"
                id="grid-phone"
                name="phone_number"
                placeholder="Phone"
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              />
              <ErrorMessage
                name="phone_number"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-address"
              >
                Address
              </label>
              <Field
                type="text"
                id="grid-address"
                name="address"
                placeholder="Address"
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              />
              <ErrorMessage
                name="address"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>

          <div className="w-full mb-6">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-people"
            >
              Number of People
            </label>
            <Field
              type="number"
              id="grid-people"
              name="number_of_people"
              placeholder="Enter number of people"
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
            />
            <ErrorMessage
              name="number_of_people"
              component="p"
              className="text-red-500 text-xs italic"
            />
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-duration"
              >
                Stay Duration (in days)
              </label>
              <Field
                type="number"
                id="grid-duration"
                name="stay_duration"
                placeholder="Enter stay duration"
                className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              />
              <ErrorMessage
                name="stay_duration"
                component="p"
                className="text-red-500 text-xs italic"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                htmlFor="grid-payment"
              >
                Payment Method
              </label>
              <Field
                as="select"
                id="grid-payment"
                name="paymentMethod"
                className="block appearance-none w-full bg-gray-700 border border-gray-500 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              >
                <option value="">Choose one..</option>
                <option>Paypal</option>
                <option>Other</option>
              </Field>
              <ErrorMessage
                name="paymentMethod"
                component="p"
                className="text-red-500 text-xs italic mt-2"
              />
            </div>
          </div>

          <FormikCvcField />

          <input
            type="submit"
            value="Book Now"
            className="w-full text-center bg-gray-700 rounded-sm py-2 text-lg font-bold mt-6 hover:bg-gray-600 transition duration-300"
          />
        </Form>
      </Formik>
    </div>
  );
}

export default MyForm;

function FormikCvcField() {
  const { values, errors } = useFormikContext();

  // Check if paymentMethod is not Paypal to conditionally render the CVC field
  return (
    <>
      {values.paymentMethod !== "Paypal" && (
        <div className="w-full mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="cardNumber"
          >
            Card Number
          </label>
          <Field
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Albuquerque"
            className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
          />
          <ErrorMessage
            name="cardNumber"
            component="p"
            className="text-red-500 text-xs italic"
          />
        </div>
      )}
      ;
      {values.paymentMethod !== "Paypal" && (
        <div className="flex flex-wrap -mx-3 my-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-day"
            >
              DD
            </label>
            <Field
              type="number"
              id="grid-day"
              name="day"
              placeholder="90210"
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
            />
            <ErrorMessage
              name="day"
              component="p"
              className="text-red-500 text-xs italic mt-2"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-day"
            >
              MM
            </label>
            <Field
              type="number"
              id="grid-month"
              name="month"
              placeholder="90210"
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
            />
            <ErrorMessage
              name="month"
              component="p"
              className="text-red-500 text-xs italic mt-2"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="grid-cvc"
            >
              CVC
            </label>
            <Field
              type="number"
              id="grid-cvc"
              name="cvc"
              placeholder="90210"
              className="appearance-none block w-full bg-gray-700 text-white border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
            />
            <ErrorMessage
              name="cvc"
              component="p"
              className="text-red-500 text-xs italic"
            />
          </div>
        </div>
      )}
    </>
  );
}
