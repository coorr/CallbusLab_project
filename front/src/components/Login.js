import React, { useCallback } from 'react'
import { Modal, Container, Form , Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_MODAL_REQUEST, LOG_IN_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput'
import { useRouter } from 'next/router';

const Login =  ({show, onHide})  => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, onChangeUsername] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onClickModelClose = useCallback(() => {
        dispatch({
            type: LOGIN_MODAL_REQUEST
        })
    })

  const onClickLoginComplete = useCallback(() => {
    const history = router;
    if(username === '') {
        return alert("아이디를 입력해주세요")
    } else if(password === '') {
        return alert("패스워드를 입력해주세요")
    }

    dispatch({
        type: LOG_IN_REQUEST,
        username,
        password,
        history
    })

  },[username,password])
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
                    <Form.Control type="text" placeholder="아이디" name="username" value={username} onChange={onChangeUsername} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>  
                        비밀번호
                    </Form.Label>
                    <Col sm={9}>
                    <Form.Control type="password" placeholder="비밀번호" name="password" value={password} onChange={onChangePassword}/>
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