import React, { useCallback } from 'react'
import { Modal, Container, Form , Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_MODAL_REQUEST } from '../reducers/user';

const Login =  ({show, onHide})  => {
  const dispatch = useDispatch();


  const onClickModelClose = useCallback(() => {
        dispatch({
            type: LOGIN_MODAL_REQUEST
        })
    })

  const onClickLoginComplete = useCallback(() => {

  })
  return (
    <>
        <Modal
        show={show}
        onHide={onHide}
        size="md" 
        aria-labelledby="contained-modal-title-vcenter"
        > 
        <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
        <button onClick={onClickModelClose} style={{fontSize:'25px', color: 'black', border: 0, backgroundColor: 'white'}}>X</button>
        </Modal.Header>
            <Modal.Body>
                <Container>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>  
                        아이디
                    </Form.Label>
                    <Col sm={9}>
                    <Form.Control type="text" placeholder="아이디" name="username" required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>  
                        비밀번호
                    </Form.Label>
                    <Col sm={9}>
                    <Form.Control type="password" placeholder="비밀번호" name="username"/>
                    </Col>
                </Form.Group>
                <Form.Group style={{textAlign:"center"}}>
                    <button onClick={onClickModelClose}  style={{border:'1px solid black', backgroundColor: "white",  color: "black"}} >닫기</button>
                    &nbsp;
                    <button  type="submit" onClick={onClickLoginComplete} style={{border:'1px solid #6693d7', backgroundColor: "#6693d7", color:'#fff'}}>완료</button>
                </Form.Group>
                </Container>
            </Modal.Body>

            
        </Modal>
    </>
  )
}

export default Login