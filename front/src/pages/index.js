import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container,Row,Col, Card, Button } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiUserFill } from 'react-icons/ri';
import Header from "../components/Header";
import { useRouter } from "next/router";
import AuthService from "../../service/user/Auth.service";
import { DELETE_ITEM_REQUEST, GET_ITEM_REQUEST, LIKE_ITEM_REQUEST, UNLIKE_ITEM_REQUEST } from "../reducers/item";
import { LOGIN_MODAL_REQUEST } from "../reducers/user";



const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userId, setUserId] = useState('')
  const { item } = useSelector((state) => state.item)
  

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (userId === '' && user !== null) {
        setUserId(user.id);
    }
    console.log("main useEffect");
  }, [userId]);

  useEffect(() => {
    dispatch({
      type: GET_ITEM_REQUEST
    })
  },[])

  const onClickWriteBtn = useCallback(() => {
    router.push("/write")
  })

  const onClickRevisedItem = useCallback((itemId) => () => {
    router.push(`/${itemId}`)
  })

  const onClickRemoveItem = useCallback((itemId) => () => {
    dispatch({
      type: DELETE_ITEM_REQUEST,
      itemId,
    })
  })

  const onClickLike = useCallback((itemId) => () => {
      if(userId === '') {
        return dispatch({
          type: LOGIN_MODAL_REQUEST
        })
      }
      dispatch({
        type: LIKE_ITEM_REQUEST,
        itemId,
        userId
      })
  })

  const onClickUnLike = useCallback((itemId) => () => {
       if(userId === '') {
        return dispatch({
          type: LOGIN_MODAL_REQUEST
        })
       }
      dispatch({
        type: UNLIKE_ITEM_REQUEST,
        itemId,
        userId
      })
  })

  
  return (
    <>
      <Header />
        <Container  style={{maxWidth: '900px', }}>
         <Row>
           <Col xs={12} md={12} style={{fontSize : '14px'}}>
             { userId && (
                <span style={{display: 'flex', fontSize: '14px'}}>
                  <button onClick={onClickWriteBtn} style={{border: '1px solid black', backgroundColor: "white", padding:"5px"}}>게시글 작성</button>            
                </span>
             )}
            <br/>
            { item.map((v,i) => (
              <Card key={v.itemId}>
                <Card.Body>
                  <RiUserFill />&nbsp;<span>{v.usernameType}</span>
                  {
                    userId == v.userId && (
                    <>
                      <button onClick={onClickRevisedItem(v.itemId)} style={{padding: "8px",backgroundColor:"white", float: "right", border: "1px solid #6693D7", fontSize:"12px", color:"#6693D7"}}>
                          수정하기
                      </button>
                      <button onClick={onClickRemoveItem(v.itemId)} style={{marginRight: "3px",padding: "8px",backgroundColor:"white", float: "right", border: "1px solid black", fontSize:"12px", color:"black"}}>
                          삭제하기
                      </button>
                    </>
                    )
                }
                  <br /><br />
                    <Card.Title style={{fontSize: "18px"}}>{v.title}</Card.Title>
                    <br />
                    <Card.Subtitle className="mb-2 text-muted">{v.content}</Card.Subtitle>
                  <br />
                  { v.likes.find((v) => v.user === userId) ? 
                    <button onClick={onClickUnLike(v.itemId)} style={{border: 0, backgroundColor: "white"}}><AiFillHeart color="red" size="17" /></button>
                   : 
                    <button onClick={onClickLike(v.itemId)} style={{border: 0, backgroundColor: "white"}}><AiOutlineHeart  size="17" /></button>
                  }
                  <span style={{fontSize: "12px"}}>{v.likes.length}개</span>
                  <br/>
                </Card.Body>
              </Card>
            ))}
           </Col>
        </Row>
      </Container>
      
      
      
      
    </>
  )
}


export default index