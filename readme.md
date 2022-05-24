## 실행 방법

1. back
```
- DB 경로 및 `call_db` 데이터베이스 생성
- Run
```

1. front
```
- npm install
- npm run dev
```

front port : 7000

back port : 7001


## **개발 환경**

- IntelliJ
- Visual Studio Code
- Postman
- GitHub
- Mysql

## **사용 기술**

### **백엔드**

### **주요 프레임워크 / 라이브러리**

- Java 8
- SpringBoot
- SpringBoot Security
- SpringBoot Validation
- Spring Data JPA

### **Build tool**

- Gradle

### **Database**

- Mysql

### **프론트엔드**

- React
- Redux
- CSS (Bootstrap)

### **기타 주요 라이브러리**

- Jwt
- Junit(mock)

<br />

## ****E-R 다이어그램****

![image](https://github.com/coorr/Algorithm/blob/main/img/baslab/baslab_erd.png)

## 기능 설명

### 로그인

로그인 구현을 위해 스프링 시큐리티와 JWT 인증방식을 사용했으며,

액세스 토큰을 통해 사용자의 정보를 인증하도록 설계하였습니다.

비사용자는 사용자의 API 요청을 할 수 없으며,

패스워드는 암호화하여  DB에 저장하게 하였습니다.

<br />

### 기본적인 CRUD

게시물에 대한 기본적인 CRUD를 모두 구현하였습니다.

글 작성은 사용자/비사용자에 따른 게시물 등록이 가능하고,

글 읽기는 메인 페이지에서 조회하게 됩니다.

수정과 삭제의 경우 자신의 글만 할 수 있도록 하였습니다.

좋아요 기능은 다대다 관계가 아닌 일대다 관계로 풀었으며

하나의 계정에는 한 개만 좋아요가 가능합니다.

<br />

### 히스토리

게시글 테이블의 수정/삭제/생성 시간을 통해 히스토리를 파악할 수 있습니다.

## 캡처
![image](https://github.com/coorr/Algorithm/blob/main/img/baslab/basleb_main.png)
![image](https://github.com/coorr/Algorithm/blob/main/img/baslab/basleb_write.png)
![image](https://github.com/coorr/Algorithm/blob/main/img/baslab/basleb_login.png)
![image](https://github.com/coorr/Algorithm/blob/main/img/baslab/basleb_sign.png)