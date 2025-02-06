# MyChatApp: 나만의 채팅앱


## 프로젝트 소개

> 이 채팅앱은 Firestore를 이용한 실시간 메시징 기능과 Firestore Authentication을 활용한 사용자 인증을 지원하는 React Native CLI 기반의 애플리케이션이다. 익숙한 UI/UX로 누구나 쉽게 사용할 수 있으며, Firebase의 실시간 데이터 동기화 기능을 활용하여 원활한 채팅 경험을 제공한다.

## 기술 스택

> `React Native CLI`, `Firebase Firestore`, `Firestore Authentication`, `React Context API`, `Firebase Cloud Messaging`


## 주요 기능
- **회원가입 및 로그인**: Firestore Authentication을 이용한 사용자 인증
- **실시간 채팅**: Firestore onSnapshot을 활용하여 메시지 실시간 반영
- **1:1 채팅 및 그룹 채팅**
- **프로필 관리**: 사용자의 닉네임, 프로필 사진 변경 기능 (작업 중)
- **읽음 표시**: 메시지 읽음/안 읽음 상태 확인 (적용 예정)
- **푸시 알림** (적용 예정)


## 성과
✅ Firestore onSnapshot을 활용하여 실시간 메시지 동기화 구현

✅ Firestore Authentication을 적용하여 안전한 사용자 인증 및 관리

✅ React Native CLI 기반으로 개발하여 성능 최적화 및 네이티브 기능 활용

✅ Firebase를 활용한 백엔드 구축으로 서버리스 환경에서의 개발 경험 축적


## 프로젝트 구성
### 로그인 / 회원가입 페이지

- Firestore Authentication을 이용하여 이메일/비밀번호 로그인 

![](https://velog.velcdn.com/images/so2i/post/04e1dc9f-0625-439d-894f-e6b52a169052/image.gif) | ![](https://velog.velcdn.com/images/so2i/post/ef1facd4-e547-4cd6-ba01-b2925c3e9563/image.gif) 
--- | --- |


### 사용자 리스트

- 현재 활동중인 사용자의 리스트를 표시

<img src="https://velog.velcdn.com/images/so2i/post/f7c75c1f-faf8-4095-9938-063865efddbf/image.png" width="50%" height="50%">



### 채팅방 페이지

- Firestore onSnapshot을 이용하여 실시간 채팅 구현

<img src="https://velog.velcdn.com/images/so2i/post/71212397-f9ce-41e7-a519-61762c1cc259/image.gif" width="100%" height="80%">


### 프로필 페이지 (작업 중)

- 사용자 프로필 수정 (닉네임, 프로필 사진)

<img src="https://velog.velcdn.com/images/so2i/post/9435ab71-6cb2-44dc-ac1c-08a8f694bbaf/image.gif" width="50%" height="50%">
