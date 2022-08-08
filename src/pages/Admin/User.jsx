import React, { Fragment, useRef, useState } from 'react';
import { Field, Form, Formik } from "formik";
import Popup from './Popup';
import { deleteUser } from '../../redux/action/User';
import { useDispatch } from 'react-redux';


const User = (props) => {
  const ref = useRef()
  const [object, setObject] = useState(props.object)
  const [disable, setDisable] = useState(true);
  const [display, setDisplay] = useState("none");
  const [content, setContent] = useState();
  const dispatch = useDispatch()

    return (
        <div className='listUsers__item'>
             <div className="listUsers__infor">
          <Formik 
            innerRef={ref}
          initialValues={object}>
            {formikProps => {
              return (
                <Form>
                         <div className="input" style={{ display: "flex" }}>
            <Field
              onChange={formikProps.handleChange}
              className={`${disable && "unEdit"}`}
              disabled={disable}
              style={{ marginRight: 10 }}
              type="string"
              name="username"

            ></Field>
            <Field
              onChange={formikProps.handleChange}

              className={`${disable && "unEdit"}`}

              disabled={disable}
              type="string"
              name="phone"

            ></Field>
            <Field
              onChange={formikProps.handleChange}
              className={`${disable && "unEdit"}`}
              disabled={disable}
              type="email"
              name="email"

            ></Field>
          </div>
                </Form>
              )
            }}
          </Formik>
        </div>
        {disable ? 
        <div className="listUsers__button">
        <button
          className="edit"
          onClick={() => {
            setDisable(!disable)
          }}
        >
          sua
        </button>
        <button
          className="delete"
          onClick={() => {
            setContent(`Bạn có chắc là muốn xoá người dùng`);
            setDisplay("block");
          }}
        >
          xoa
        </button>
      </div> :  
      <div className="listUsers__button">
          <button
          style={{background: "rgb(157, 48, 63)"}}
          onClick={() => {
            ref.current.setValues(object)
              setDisable(!disable)
            }}
          >
            Huy
          </button>
          <button  
          style={{background: "rgb(13, 144, 96)"}}

          onClick={() => {
              setObject(ref.current.values)
              setDisable(!disable)
              console.log(ref.current.values)
            }}>
            Luu
          </button>
        </div> 
}
        <Popup
        content={content}
        function={() => 
            dispatch(deleteUser(1))
            }
        display={display}
        setDisplay={setDisplay}
      />
        </div>
    );
};

export default User;