import React, { useCallback } from 'react'
import { Container,Navbar,Nav, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_MODAL_REQUEST, REGISTER_MODAL_REQUEST } from '../reducers/user';
import styles from "./css/User.module.css"
import Login from './Login';
import Register from './Register';

const Header = () => {
  const dispatch = useDispatch();
  const { loginModal, registerModal } = useSelector((state) => state.user)

  const onClickLoginModel = useCallback(() => {
      dispatch({
          type: LOGIN_MODAL_REQUEST
      })
  }, [loginModal])

  const onClickRegisterModel = useCallback(() => {
      dispatch({
          type: REGISTER_MODAL_REQUEST
      })
  },[registerModal])

  return (
    <>
    <Navbar  expand="lg" style={{borderBotton: "1px solid #eee"}} >
        <Container className={styles.headerLayout}>
          <Navbar.Brand href="/" className={styles.headerColor}>커뮤니티</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto" >
              <Nav.Link id={styles.navLink} onClick={onClickRegisterModel} >회원가입</Nav.Link>
                {registerModal && (
                    <Register show={registerModal} onHide={onClickRegisterModel} />
                )}
              <Nav.Link id={styles.navLink} onClick={onClickLoginModel} >로그인</Nav.Link>
                {loginModal  && (
                    <Login show={loginModal} onHide={onClickLoginModel} />
                )}
            </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}

export default Header