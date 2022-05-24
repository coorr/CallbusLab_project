import React, { useCallback } from 'react'
import { Modal, Container, Form , Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  REGISTER_MODAL_REQUEST, SIGNUP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput'

const Register =  ({show, onHide})  => {
  const dispatch = useDispatch();
  const [username, onChangeUsername] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [authen, onChangeAuth] = useInput('ROLE_LESSOR')

  const onClickModelClose = useCallback(() => {
        dispatch({
            type: REGISTER_MODAL_REQUEST
        })
    })

  const onClickRegisterComplete = useCallback(() => {
        if(username === '') {
            return alert("아이디를 입력해주세요")
        } else if(password === '') {
            return alert("패스워드를 입력해주세요")
        }
        if(username.length < 3 || username.length > 20) {
            return alert("아이디는 영문소문자 또는 숫자 4~20자로 입력해 주세요.")
        }
        if(password.length < 6 || password.length > 16) {
            return alert("비밀번호는 영문소문자 또는 숫자 4~16자로 입력해 주세요.")
        }


        dispatch({
            type: SIGNUP_REQUEST,
            username,
            password,
            authen
        })
  },[username,password,authen])
  return (
    <>
        <Modal
        show={show}
        onHide={onHide}
        size="md" 
        aria-labelledby="contained-modal-title-vcenter"
        > 
        <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
        <button onClick={onClickModelClose} style={{fontSize:'25px', color: 'black', border: 0, backgroundColor: 'white'}}>X</button>
        </Modal.Header>
            <Modal.Body>
                <Container>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>아이디</Form.Label>
                    <Col sm={9}>
                    <Form.Control type="text" placeholder="아이디" name="username" value={username} onChange={onChangeUsername}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>비밀번호</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="password" placeholder="비밀번호" name="password" value={password} onChange={onChangePassword} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3} style={{fontSize: '13px'}}>나는 누구인가?</Form.Label>
                    <Col sm={9}>
                        <select defaultValue={authen} onChange={onChangeAuth}>
                            <option value="ROLE_LESSOR">임대인</option>
                            <option value="ROLE_REALTOR">공인 중개사</option>
                            <option value="ROLE_LESSEE">임차인</option>
                        </select>                   
                     </Col>
                    
                </Form.Group>
                <Form.Group style={{textAlign:"center"}}>
                    <button onClick={onClickModelClose}  style={{border:'1px solid black', backgroundColor: "white",  color: "black"}} >닫기</button>
                    &nbsp;
                    <button  type="submit" onClick={onClickRegisterComplete} style={{border:'1px solid #6693d7', backgroundColor: "#6693d7", color:'#fff'}}>완료</button>
                </Form.Group>
                </Container>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Register