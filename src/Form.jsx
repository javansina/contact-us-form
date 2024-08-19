import { useState } from 'react';

function Form() {
   const [submitSuccessful, setSubmitSuccessful] = useState(false);

   const [firstName, setFisrtName] = useState({
      value: '',
      status: true,
      submitStatus: false,
   });
   const [lastName, setLastName] = useState({
      value: '',
      status: true,
      submitStatus: false,
   });
   const [email, setEmail] = useState({
      value: '',
      status: true,
      submitStatus: false,
   });
   const [queryType, setQueryType] = useState({
      selected: '',
      status: true,
      submitStatus: false,
   });
   const [message, setMessage] = useState({
      value: '',
      status: true,
      submitStatus: false,
   });
   const [rule, setRule] = useState({
      status: true,
      submitStatus: false,
   });

   const nameValidation = (e, whitchName) => {
      const firstName = e.target.value;
      const nameRegex = /^[a-zA-Z\ ]+$/;
      const result = nameRegex.test(firstName);
      if (result) {
         if (whitchName === 'first') {
            setFisrtName({
               value: firstName,
               status: true,
               submitStatus: true,
            });
         } else {
            setLastName({ value: firstName, status: true, submitStatus: true });
         }
      } else {
         if (whitchName === 'first') {
            setFisrtName({
               value: firstName,
               status: false,
               submitStatus: false,
            });
         } else {
            setLastName({
               value: firstName,
               status: false,
               submitStatus: false,
            });
         }
      }
   };

   const emailValidation = (e) => {
      const email = e.target.value;
      const emailRegex = /^[\w_\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
      const result = emailRegex.test(email);
      if (result) {
         setEmail({ value: email, status: true, submitStatus: true });
      } else {
         setEmail({ value: email, status: false, submitStatus: false });
      }
   };

   const queryTypeValidation = (selected) => {
      setQueryType({
         selected,
         status: true,
         submitStatus: true,
      });
   };

   const messageValidation = (e) => {
      const message = e.target.value;
      if (message.length) {
         setMessage({
            value: message,
            status: true,
            submitStatus: true,
         });
      } else {
         setMessage({
            value: '',
            status: false,
            submitStatus: false,
         });
      }
   };

   const ruleValidation = (e) => {
      const bol = e.target.checked;

      setRule({
         status: bol,
         submitStatus: bol,
      });
   };

   const subList = [
      {
         state: firstName,
         stateFunc: setFisrtName,
      },
      {
         state: lastName,
         stateFunc: setLastName,
      },
      { state: email, stateFunc: setEmail },
      {
         state: queryType,
         stateFunc: setQueryType,
      },
      {
         state: message,
         stateFunc: setMessage,
      },
      { state: rule, stateFunc: setRule },
   ];

   const submitHandler = (e) => {
      e.preventDefault();
      const notReady = [];
      subList.map((i, index) => {
         if (!i.state.submitStatus) {
            notReady.push(index);
         }
      });
      notReady.map((i) => {
         const setAlert = subList[i].stateFunc;
         setAlert({ ...subList[i].state, status: false });
      });
      if (!notReady.length) {
         setSubmitSuccessful(true);
      }
   };

   return (
      <>
         <div
            className={`absolute ${
               submitSuccessful ? 'top-0' : '-top-28'
            }  right-0 left-0 w-fit mx-auto text-left p-5 mt-2 shadow-lg rounded-xl bg-teal-1000 text-white transition-all duration-100`}
         >
            <div className="relative mb-3">
               <svg
                  className="absolute left-0 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
               </svg>

               <h1 className="ml-8 font-medium">submit successfuly!</h1>
            </div>
            <p className="text-slate-300">
               Thanks for completing the form. We&apos;ll be in touch soon!
            </p>
         </div>

         <form
            className="sm:container xs:mx-5 mx-3 mt-24 "
            onSubmit={(e) => submitHandler(e)}
         >
            <div className="border p-7 rounded-xl bg-white gap-y-3">
               <h3 className="font-medium text-2xl text-slate-700 mb-5 tracking-wider">
                  Contact Us
               </h3>
               <div className="grid grid-cols-12 gap-x-5">
                  <div className="flex flex-col lg:col-span-6 col-span-12">
                     <label
                        htmlFor="first-name"
                        className="w-fit lg:pt-5 pt-3 pb-3 text-slate-500 ml-0.5"
                     >
                        First Name <span className="text-teal-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="first-name"
                        value={firstName.value}
                        onPaste={(e) => e.preventDefault()}
                        onChange={(e) => nameValidation(e, 'first')}
                        className={`border border-slate-400 focus:outline-none ${
                           !firstName.status
                              ? 'border-red-400 focus:border-red-700'
                              : 'focus:border-teal-600'
                        } rounded-lg p-3`}
                     />
                     {!firstName.status && (
                        <span className="my-2 text-red-600">
                           This field is required
                        </span>
                     )}
                  </div>
                  <div className="flex flex-col lg:col-span-6 col-span-12">
                     <label
                        htmlFor="last-name"
                        className="w-fit lg:pt-5 pt-3 pb-3 text-slate-500 ml-0.5"
                     >
                        Last Name <span className="text-teal-500">*</span>
                     </label>
                     <input
                        type="text"
                        id="last-name"
                        onPaste={(e) => e.preventDefault()}
                        className={`border border-slate-400 focus:outline-none ${
                           !lastName.status
                              ? 'border-red-400 focus:border-red-700'
                              : 'focus:border-teal-600'
                        } rounded-lg p-3`}
                        onChange={(e) => nameValidation(e, 'last')}
                     />
                     {!lastName.status && (
                        <span className="my-2 text-red-600">
                           This field is required
                        </span>
                     )}
                  </div>
               </div>
               <div className="flex flex-col">
                  <label
                     htmlFor="email-address"
                     className="w-fit lg:pt-5 pt-3 pb-3 text-slate-500 ml-0.5"
                  >
                     Email Address <span className="text-teal-500">*</span>
                  </label>
                  <input
                     onPaste={(e) => e.preventDefault()}
                     className={`w-full border border-slate-400 focus:outline-none ${
                        !email.status
                           ? 'border-red-400 focus:border-red-700'
                           : 'focus:border-teal-600'
                     } rounded-lg p-3`}
                     onChange={(e) => emailValidation(e)}
                     type="text"
                     id="email-address"
                  />
                  {!email.status && (
                     <p className="my-2 text-red-600">
                        Please enter a valid email address.
                        <br />
                        for example email@example.com
                     </p>
                  )}
               </div>
               <div className="flex flex-col">
                  <label className="w-fit lg:pt-5 pt-3 pb-3 text-slate-500 ml-0.5">
                     Query Type <span className="text-teal-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-5">
                     <div
                        className={`col-span-2 md:col-span-1 flex justify-left items-center border border-slate-400 ${
                           queryType.selected === 'general-enquiry' &&
                           'border-teal-700 bg-green-700/20'
                        } rounded-lg`}
                     >
                        <input
                           className="ml-7 accent-teal-600"
                           type="radio"
                           name="query-type"
                           id="general-enquiry"
                           onChange={() =>
                              queryTypeValidation('general-enquiry')
                           }
                        />
                        <label
                           className="w-full px-3 py-2 text-slate-600"
                           htmlFor="general-enquiry"
                        >
                           General Enquiry
                        </label>
                     </div>
                     <div
                        className={`col-span-2 md:col-span-1 flex justify-left items-center border border-slate-400 ${
                           queryType.selected === 'support-request' &&
                           'border-teal-700 bg-green-700/20'
                        } rounded-lg`}
                     >
                        <input
                           className="ml-7 accent-teal-600"
                           type="radio"
                           name="query-type"
                           id="support-request"
                           onChange={() =>
                              queryTypeValidation('support-request')
                           }
                        />
                        <label
                           className="w-full px-3 py-2 text-slate-600"
                           htmlFor="support-request"
                        >
                           Support Request
                        </label>
                     </div>
                  </div>
                  {!queryType.status && (
                     <span className="my-2 text-red-600">
                        Please select a query type
                     </span>
                  )}
               </div>

               <div className="flex flex-col">
                  <label className="w-fit lg:pt-5 pt-3 pb-3 text-slate-500 ml-0.5">
                     Message <span className="text-teal-500">*</span>
                  </label>
                  <textarea
                     onPaste={(e) => e.preventDefault()}
                     className={`border border-slate-400 focus:outline-none ${
                        !message.status
                           ? 'border-red-400 focus:border-red-700'
                           : 'focus:border-teal-600'
                     } rounded-lg resize-none py-3 px-5`}
                     id="w3review"
                     name="w3review"
                     rows="4"
                     cols="50"
                     onChange={(e) => messageValidation(e)}
                  ></textarea>
                  {!message.status && (
                     <span className="my-2 text-red-600">
                        This field is required
                     </span>
                  )}
               </div>

               <div>
                  <div className="pt-5 pb-3 ml-1">
                     <input
                        type="checkbox"
                        id="rule"
                        className="mr-4 accent-emerald-700"
                        onClick={(e) => ruleValidation(e)}
                     />
                     <label htmlFor="rule" className="text-slate-500">
                        I contsent to being contacted by the team
                        <span className="text-teal-500"> *</span>
                     </label>
                  </div>
                  {!rule.status && (
                     <span className="my-2 text-red-600">
                        To submit this form, please consent to being contacted
                     </span>
                  )}
               </div>
               <button
                  className="text-center w-full py-5 mt-8 text-white text-xl font-medium bg-teal-700 hover:bg-teal-700/90 outline-none rounded-lg"
                  type="submit"
               >
                  Submit
               </button>
            </div>
         </form>
      </>
   );
}

export default Form;
