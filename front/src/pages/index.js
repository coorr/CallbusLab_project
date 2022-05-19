import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container,Row,Col, Card, Button } from "react-bootstrap";
import styles from '../components/css/User.module.css'
import { AiFillHeart } from 'react-icons/ai';
import { RiUserFill } from 'react-icons/ri';
import Header from "../components/Header";



const index = () => {
  const dispatch = useDispatch();
  

  return (
    <>
      <Header />
      
      <Container style={{maxWidth: '900px', }}>
         <Row>
           <Col xs={12} md={12} style={{fontSize : '14px'}}>
            <span style={{display: 'flex', fontSize: '14px'}}>
             <button style={{border: '1px solid black', backgroundColor: "white", padding:"5px"}}>게시글 작성</button>            
            </span>
            <br/>
            <Card>
              
              <Card.Body>
                <RiUserFill />&nbsp;<span>김진성(공인중개사)</span>
                <br /><br />
                <Card.Title style={{fontSize: "18px"}}>서비스업에서 HR 이직..어떻게 해야할지 모르겠네요😭</Card.Title>
                <br />
                <Card.Subtitle className="mb-2 text-muted">서비스 업계 경력 3년 조금 더 된 현재 이직준비로 휴직중인 27살 입니다..</Card.Subtitle>
                <br />
                <button style={{border: 0, backgroundColor: "white"}}><AiFillHeart color="red" size="17" /></button>
                <span style={{fontSize: "12px"}}>50개</span>
                <br/>
                <br />

              </Card.Body>
            </Card>
           </Col>
        </Row>
      </Container>
      
    </>
  )
}


export default index