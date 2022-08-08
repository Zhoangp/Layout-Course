import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { actionTypes } from "../../redux/action/types";
import * as yup from "yup";
import { upLoadFile } from "../../redux/action/Uploadfile";

const Courses = (props) => {
  const dispatch = useDispatch();
  const ref = useRef();
  
  const handleClick = (e) => {
    e.preventDefault();
    const x = ref.current.files[0];
    dispatch(upLoadFile(x, "images"))
    
  };
  const validate = yup.object().shape({
    tenKH: yup.string().required("Vui lòng nhập tên khoá học"),
    tacGia: yup.string().required("Vui lòng nhập tên tác giả"),
  });
  const styleInput = {
    width: "50%"
  }

  return (
    <div>
      <Formik
        validationSchema={validate}
        initialValues={{
          tenKH: "",
          tacGia: "",
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <div className="input">
                <Field
                  name="tenKH"
                  type="string"
                  onChange={formikProps.handleChange}
                  placeholder="Tên khoá học"
                  style={styleInput}
                />
                <ErrorMessage
                  name="tenKH"
                  render={(mess) => {
                    return <p className="error_mess">{mess}</p>;
                  }}
                />
              </div>
              <div className="input">
                <Field
                style={styleInput}
                  name="tacGia"
                  type="string"
                  onChange={formikProps.handleChange}
                  placeholder="Tên tác giả"
                />
                <ErrorMessage
                  name="tacGia"
                  render={(mess) => {
                    return <p className="error_mess">{mess}</p>;
                  }}
                />
              </div>
              <div style={{marginTop: "1.5rem"}}>
              <label htmlFor="categorys">Thể loại</label>
              <select id="Category" onChange={(e) => {
                console.log(e.target.value)
              }}>
                <option value="a">Marketing</option>
                <option value="b">Developer</option>
                <option value="c">CEO</option>
              </select>
              </div>
              <div style={{marginTop: "1.5rem"}}>
              <label htmlFor="img" style={{display: "block"}}>Vui lòng chọn ảnh
                </label>
              <input accept="image" id="img" ref={ref} type="file"></input>
              </div>
              <button style={{marginTop: "1.5rem", padding: "5px 20px"}} onClick={handleClick}>Import</button>
            </Form>
          );
        }}
      </Formik>
      <form></form>
    </div>
  );
};

export default Courses;
