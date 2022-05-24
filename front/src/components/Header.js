import React, { useCallback, useState, useEffect } from 'react'
import { Container,Navbar,Nav, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_MODAL_REQUEST, REGISTER_MODAL_REQUEST } from '../reducers/user';
import styles from "./css/User.module.css"
import Login from './Login';
import Register from './Register';
import AuthService from '../../service/user/Auth.service';

const Header = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser ]  = useState('');

  const { loginModal, registerModal } = useSelector((state) => state.user)

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("header useEffect");
    if(currentUser === '' && user !== null) {
        setCurrentUser(user)
    }
    
  }, [currentUser])


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

  const onClickLogout = useCallback(() => {
    AuthService.logout();
    setCurrentUser('')
    window.location.reload();
  },[currentUser]);

  return (
    <>
    <Navbar  expand="lg" style={{borderBotton: "1px solid #eee"}} >
        <Container className={styles.headerLayout}>
          <Navbar.Brand href="/" className={styles.headerColor}>커뮤니티</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto" >
                
                
                { currentUser ? (
                    <Nav.Link id={styles.navLink} onClick={onClickLogout} >로그아웃</Nav.Link>
                ) : (
                    <>
                      <Nav.Link id={styles.navLink} onClick={onClickRegisterModel} >회원가입</Nav.Link>
                      <Nav.Link id={styles.navLink} onClick={onClickLoginModel} >로그인</Nav.Link>
                    </>
                )}

                {loginModal  && <Login show={loginModal} onHide={onClickLoginModel} /> }
                {registerModal && <Register show={registerModal} onHide={onClickRegisterModel} />}
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