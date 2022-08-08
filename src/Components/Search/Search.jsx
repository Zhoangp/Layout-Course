import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../redux/action/Search';
import { actionTypes } from '../../redux/action/types';

const Search = (props) => {
  const [openSearch, setOpenSearch] = useState(false)
    const dispatch = useDispatch()

    const handleChange = async (e) => {

        await dispatch(search([]))
         // xoá mỗi khi nhập tìm kiếm

        if(e.target.value) {
          let res = props.arr.filter(item => item.username.toLowerCase().includes(e.target.value.toLowerCase().replace(/\s+/g,' ').trim()))
          dispatch(search(res))
          dispatch(() => {
            dispatch({type: actionTypes.SET_SEARCH_OPEN, payload: true})
          })
        }
        else {
          dispatch(() => {
            dispatch({type: actionTypes.SET_SEARCH_OPEN, payload: false})
          })
        }
    }
    return (
        <div className="search">
        <div className="input">
        <input onChange={handleChange} type="text"  placeholder="search"/>
        </div>
      </div>
    );
};

export default Search;