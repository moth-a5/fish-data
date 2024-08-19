import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import validator from "validator"; // For phone number validation

import { UploadButton, UploadDropzone } from "../../utils/uploadthing";
import React, { useState } from "react";
import Image from "next/image";


// Import custom UI components for buttons, forms, and inputs
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// ปรับแก้ให้สอดคล้องกับข้อมูล
const FormSchema = z.object({
  id: z.string().min(1, "กรุณาระบุ ID ด้วยครับ"), // Set custom error message
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  category: z.string().min(1, "กรุณาระบุ ประเภทของสินค้า ด้วยครับ"),
  price: z.string(),
  imageSrc: z.string()
});

// // ปรับแก้ให้สอดคล้องกับข้อมูล web api
const webAppURL = process.env.NEXT_PUBLIC_WEB_APP_URL;

const FormAdditem = ({ loading, setLoading, submitted, setSubmitted }) => {
  // Use the `useForm` hook from react-hook-form to manage form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    ...form
  } = useForm({
    resolver: zodResolver(FormSchema), // Set the Zod schema for validation
    defaultValues: {
      id: "",
      name: "",
      category: "",
      price: "",
      imageSrc: "",
    },
  });
  const [imageUrl, setImageUrl] = useState("");
  // Async function to handle form submission
  async function onSubmit(data) {
    setLoading(true); // Set loading state to true while submitting
    data.imageSrc = imageUrl; //กำหนด Link ของรูปสินค้าลงใน Google Sheet
    // Create a form element to manually submit data
    const formElement = document.createElement("form");

    // Loop through each field in the schema and create input elements
    for (const [key, value] of Object.entries(FormSchema.shape)) {
      const input = document.createElement("input");
      input.name = key;
      input.value = data[register(key).name]; // Get the value from form data using register
      formElement.appendChild(input);
    }

    // Send a POST request with form data using FormData and handle response
    await fetch(webAppURL, {
      method: "POST",
      body: new FormData(formElement), // Create form data from the created form element
      mode: "no-cors", // Handle CORS if necessary
    })
      .then((response) => {
        setLoading(false); // Set loading state to false after successful submission
        setSubmitted(true); // Set submitted state to true to display success message
      })
      .catch((error) => {
        alert("Error occured");
        console.log("Error:", error);
      });
  }


  // Render the form component
  return (
    <Form {...form} className="form">
      {/* Conditionally render form if not submitted */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)} // Handle form submission using handleSubmit
          className="form"
          name="item-form"
        >

          {/*ปรับแก้ให้สอดคล้องกับข้อมูลที่กรอก} 
 {/* Render form field using FormField component */}
          <FormField
            control={form.control} // Pass form control to FormField
            name="id"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  รหัสสินค้า <span className="span">*</span>
                </FormLabel>

                <FormControl className="form-control">
                  <Input placeholder="กรอกรหัสสินค้า" {...field} />
                </FormControl>

                {/* Display validation error message if any */}
                <FormMessage
                  msg={"กรุณากรอกรหัสสินค้า"}
                  className="form-message"
                />
              </FormItem>
            )}
          />

          {/* Render form field using FormField component */}
          <FormField
            control={form.control} // Pass form control to FormField
            name="name"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  ชื่อสินค้า <span className="span">*</span>
                </FormLabel>

                <FormControl className="form-control">
                  <Input placeholder="กรอกชื่อสินค้า" {...field} />
                </FormControl>

                {/* Display validation error message if any */}
                <FormMessage
                  msg={"กรุณากรอกชื่อสินค้า"}
                  className="form-message"
                />
              </FormItem>
            )}
          />

          {/* Render form field using FormField component */}
          <FormField
            control={form.control} // Pass form control to FormField
            name="category"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  ประเภทสินค้า <span className="span">*</span>
                </FormLabel>

                <FormControl className="form-control">
                  <Input placeholder="กรอกประเภทสินค้า" {...field} />
                </FormControl>

                {/* Display validation error message if any */}
                <FormMessage
                  msg={"กรุณากรอกประเภทสินค้า"}
                  className="form-message"
                />
              </FormItem>
            )}
          />

          {/* Render form field using FormField component */}
          <FormField
            control={form.control} // Pass form control to FormField
            name="price"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  ราคาสินค้า <span className="span"></span>
                </FormLabel>

                <FormControl className="form-control">
                  <Input placeholder="กรอกราคาสินค้า" {...field} />
                </FormControl>

                {/* Display validation error message if any */}
                <FormMessage
                  msg={"กรุณากรอกราคาสินค้า"}
                  className="form-message"
                />
              </FormItem>
            )}
          />

          {/* Render form field using FormField component */}
          <FormField
            control={form.control} // Pass form control to FormField
            name="imageSrc"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">
                  Link รูปสินค้า <span className="span"></span>
                </FormLabel>

                <FormControl className="form-control">
                  <Input placeholder="กรอก Link รูปสินค้า" {...field} />
                </FormControl>

                {/* Display validation error message if any */}
                <FormMessage
                  msg={"กรุณากรอก Link รูปสินค้า"}
                  className="form-message"
                />
              </FormItem>
            )}
          />

          {/* ปุ่มอัปโหลด ************************************/}
          <div>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                // console.log("Files: ", res);
                setImageUrl(res[0].url);
                alert("Upload Completed ");
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          {/* แสดงรูป ****************************************/}
          {imageUrl ? (
            <div>
              <img
                width={1080}
                height={1080}
                src={imageUrl}
                alt=""
                className="w-fit h-40"
              />
            </div>
          ) : null}


          <div className="bg-blue-50">
            <Button
              type="submit"
              disabled={loading}
            >
              บันทึก
            </Button>
          </div>

        </form>
      ) : (
        // Display submission confirmation message
        <>
          <div className="submission-container">
            <div className="submission-message">
              บันทึกข้อมูลสินค้าเรียบร้อยแล้ว
            </div>

            {/* A button for submittin another form */}
            <div className="button-container">
              <Button
                className="button bg-blue-600 text-white"
                disabled={loading}
              >
                <a href="/">แสดงรายการสินค้า</a>
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  );
};

export default FormAdditem;