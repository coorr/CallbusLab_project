import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '../components/css/User.module.css'
import Header from "../components/Header";
import { useRouter } from "next/router";
import { GET_ITEM_ONE_REQUEST, UPDATE_ITEM_REQUEST } from "../reducers/item";
import useInput from "../hooks/useInput";

const Item = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const itemId = router.query.id;
  const [title, onChangeTitle, setTitle] = useInput(null);
  const [content, onChangeContent, setContent] = useInput(null);

  const { itemOne } = useSelector((state) => state.item)
  
  useEffect(() => {
      console.log("id useEffect");
      if(itemId !== undefined) {
        const history = router;
        dispatch({
            type: GET_ITEM_ONE_REQUEST,
            itemId,
            history
        })
      }
  },[itemId])

 
  useEffect(() => {
      if(title === null && Object.keys(itemOne).length !== 0) {
        setTitle(itemOne.title)
        setContent(itemOne.content)
      }
  },[itemOne,title, content])

  const handleComplete = useCallback(() => {
     if(title.length === 0) {
         return alert("제목을 입력해주세요.")
     } else if(content.length === 0) {
         return alert("내용을 입력해주세요.")
     }
     const history = router;
     const itemData = {
         title: title,
         content: content
     }
     dispatch({
        type: UPDATE_ITEM_REQUEST,
        itemId,
        itemData,
        history
     })
  },[itemId, title, content])
 
  return (
    <>
      <Header />
      <div className="col-md-12">
          <div className={styles.add_cloth_cotainer}>
            <br />
            <br />
              <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    value={title == null ? '' : title} 
                    onChange={onChangeTitle} 
                    placeholder="제목을 입력해주세요"
                    style={{fontSize: "30px"}}
                />
              </div>
              <br/>
              <div className="form-group">
                <textarea 
                    type="text" 
                    className={styles.textarea_form_control } 
                    value={content == null ? '' : content} 
                    onChange={onChangeContent} 
                    placeholder="내용을 입력해주세요"
                />
              </div>

              <br />
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  onClick={handleComplete}
                >
                  <span>완료</span>
                </button>
              </div>
          </div>
        </div>
    </>
  )
}

export default Item