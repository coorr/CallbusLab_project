import React, { useCallback,useState,useRef, useEffect } from 'react'
import  { useRouter } from 'next/router'
import styles from '../components/css/User.module.css'
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import Header from '../components/Header';
import AuthService from '../../service/user/Auth.service';
import { CREATE_ITEM_REQUEST } from '../reducers/item';

const write = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [title, onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user === null) {
      router.push("/")
    }
    if (userId === '' && user !== null) {
        setUserId(user.id);
    } 
    console.log("write useEffect");
  }, [userId]);

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
        type: CREATE_ITEM_REQUEST,
        userId,
        itemData,
        history
      })

  },[userId, title, content])

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
                    value={title} 
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
                    value={content} 
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

export default write