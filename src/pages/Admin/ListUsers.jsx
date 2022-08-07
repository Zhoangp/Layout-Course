import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getPageUser } from "../../redux/action/GetPageUser";
import Popup from "./Popup";
import User from "./User";

const ListUsers = (props) => {
  
  const [display, setDisplay] = useState("none");
  const [user, setUser] = useState({ name: "", id: 0 });
  const arrUsers = [
    {  username: "Nguyen van Me",
  email : "vanme@gmail.com",
  phone: "025252424"}, 
  {  username: "Nguyen An",
  email : "abczyxasfaf@gmail.com",
  phone: "09141442424"},
  {  username: "Nguyen van Chu",
  email : "vanme@gmail.com",
  phone: "025252424"},
  {  username: "Tran Thi Ce Chi Na",
  email : "vanme@gmail.com",
  phone: "025252424"}

  ]
  const [openSearch, setOpenSearch] = useState(false)
  const [arrUsers2, setArrUsers2] = useState([])
  const ref = useRef()
  
  const [content, setContent] = useState();

  const { pageUser, totalPage } = useSelector((state) => state.ListUser);
  const dispatch = useDispatch();

  const handlePageClick = (data) => {
    dispatch(getPageUser(data.selected + 1, 5));
  };
  
  const handleChange = async (e) => {

    await setArrUsers2([]) // xoá mỗi khi nhập tìm kiếm

    if(e.target.value) {
      let res = arrUsers.filter(item => item.username.toLowerCase().includes(ref.current.value.toLowerCase()))
      setArrUsers2(res)
      console.log(arrUsers2)
      setOpenSearch(true)
    }
    else {
      setOpenSearch(false)
    }
  }
  
  
  
  return (
    <div>
      <div className="search">
        <div className="input">
        <input onChange={handleChange} type="text" ref={ref} placeholder="search"/>
        </div>
      </div>
    <div className="listUsers">
      { !openSearch ?
        arrUsers.map((item, index) => {
          return (
            <User object={item} key={index}></User>
          )
        }) :  arrUsers2.map((item, index) => {
        return (
          <User object={item} key={index}/>
          
        )
      })
      }
      
      
     
      {/* {pageUser.map((item, index) => {
        return (
          <div className="listUsers__item" key={index}>
            <div className="listUsers__infor">
              <span>{item.username}</span>
              <span>{item.email}</span>
              <span>{item.phone}</span>
            </div>
            <div className="listUsers__button">
              <button className="edit">sua</button>
              <button
                className="delete"
                onClick={() => {
                  setContent(`Bạn có chắc là muốn xoá người dùng ${user.name}`);
                  console.log(content);
                  setDisplay("block");
                  setUser({ name: item.username, id: item.id });
                }}
              >
                xoa
              </button>
            </div>
          </div>
        );
      })} */}

      <ReactPaginate
        breakLabel="..."
        //initialPage={0}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(totalPage)}
        containerClassName={"pagination"}
        pageClassName={"pagenate__item"}
      />
    
    </div>
    </div>
  );
};

export default ListUsers;
