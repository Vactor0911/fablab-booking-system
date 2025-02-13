# 📁 팹랩 예약 시스템
[ 팹랩 예약 시스템 ] 서비스를 위한 리포지토리입니다.  
- [팹랩 예약 시스템 프론트엔드 리포지토리](https://github.com/Vactor0911/fablab-booking-system)
- [팹랩 예약 시스템 백엔드 리포지토리](https://github.com/Vactor0911/fablab-booking-system-server)

<br />

## 📖 Description

**팹랩 예약 시스템**은 목원대학교 **컴퓨터공학과 팹랩(Fab Lab)** 이용을 효율적으로 관리하기 위한 **온라인 예약 플랫폼**입니다.

### 팹랩이란?
컴공인의 꿈을 키우는 창의공간 팹랩
팹랩(Fab-Lab)은 "Fabrication Laboratory"의 약자로, MIT 미디어랩 닐 거센필드 교수가 고안한 디지털 제작 공방을 말합니다. 이 공간은 교육, 학습, 회의, 토론, 연구개발, 제작을 연계하는 다목적 기능의 학습 공간입니다.
- Learn: 도구의 사용법을 배우고
- Make: 도구를 사용하여 물건을 만들며
- Share: 경험과 지식을 공유하는 학습 과정을 제공합니다.

[FabLab 소개](팹랩 소개 프론트엔드 링크 삽입 예정)

### 사용 방법
- 회원가입: 학번과 이메일을 사용하여 회원가입 
- 온라인 예약: 예약 시스템을 통해 좌석을 예약
- 사용 후 정리 및 퇴실: 다음 사용자를 위해 좌석 정리 및 예약 시스템 퇴실  
- 운영 시간: 평일 09:00~22:00 (야간 및 주말 사용은 별도 신청, 운영 시간은 변동이 있을 수 있음.)

<br />


## 📱 Functions

1. 사용자 기능
- 좌석 예약: 사용자가 팹랩 내 좌석을 선택하여 예약 가능
- 예약 현황 조회: 현재 예약된 좌석 및 사용 가능 좌석 실시간 확인
- 좌석 예약 취소 및 수정: 기존 예약을 취소하거나 변경 가능
- 사용 가능 시간 제한: 기본 예약한 날짜의 사용 종료 시간까지 사용 가능
- 공지사항 조회: 팹랩 공지사항 열람 가능
- 이메일 인증 및 회원가입: 신규 사용자 계정 생성 및 인증
2. 관리자 기능
- 좌석 예약 현황 조회 및 관리: 특정 날짜 및 시간별 좌석 예약 상태 확인
- 예약 강제 취소: 비정상적인 예약 또는 규칙 위반 사용자의 예약 강제 취소 가능
- 예약 제한 설정: 특정 좌석 또는 사용자에 대한 예약 제한 기능
- 사용자 관리: 학번, 이름, 학과 정보 업데이트 및 사용자 계정 관리
- 공지사항 관리: 공지사항 작성, 수정, 삭제 기능
- 로그 조회: 좌석 예약, 퇴실, 강제 퇴실, 공지사항 수정 등의 로그 확인
3. 시스템 운영 기능
- 토큰 관리: CSRF 토큰 요청 및 사용자 로그인 세션 유지
- 예약 로그 기록: 모든 예약 관련 데이터 저장 및 분석 가능


<br />

## ⭐ Contributors
<table style="text-align: center">
    <tr>
        <th style="text-align: center;">[ PM ]<br />데이터베이스</th>
        <th style="text-align: center;">프론트엔드</th>
        <th style="text-align: center;">백엔드</th>
        <th style="text-align: center;">서버</th>
        <th style="text-align: center;">디자인</th>
    <tr>
    <tr>
        <td>
            <a href="https://github.com/Vactor0911" target="_blank"><img src="https://avatars.githubusercontent.com/u/30544681?v=4" alt="limhuijin" width="100"></a>
        </td>
        <td>
            <a href="https://github.com/Vactor0911" target="_blank"><img src="https://avatars.githubusercontent.com/u/85281049?v=4" alt="Vactor0911" width="100"></a>
        </td>
        <td>
            <a href="https://github.com/L-Hits" target="_blank"><img src="https://avatars.githubusercontent.com/u/130430768?v=4" alt="L-Hits" width="100"></a>
        </td>
        <td>
            <a href="https://github.com/JSukhen2" target="_blank"><img src="https://avatars.githubusercontent.com/u/106506127?v=4" alt="ssong77" width="100"></a>
        </td>
        <td>
            <a href="https://github.com/JSukhen2" target="_blank"><img src="https://avatars.githubusercontent.com/u/151798040?v=4" alt="JSukhen2" width="100"></a>
        </td>
    </tr>
    <tr>
        <td style="text-align: center;">
            <a href="https://github.com/limhuijin" target="_blank">limhuijin</a>
        </td>
        <td style="text-align: center;">
            <a href="https://github.com/Vactor0911" target="_blank">Vactor0911</a>
        </td>
        <td style="text-align: center;">
            <a href="https://github.com/L-Hits" target="_blank">L-Hits</a>
        </td>
        <td style="text-align: center;">
            <a href="https://github.com/ssong77" target="_blank">ssong77</a>
        </td>
        <td style="text-align: center;">
            <a href="https://github.com/JSukhen2" target="_blank">JSukhen2</a>
        </td>
    </tr>
</table>

<br />

## 🔧 Stack
[![React](https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev/)
[![Vite](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/guide/)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Ubuntu](https://img.shields.io/badge/UBUNTU-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)](https://ubuntu.com/)
[![NodeJS](https://img.shields.io/badge/NODE.JS-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![Pm2](https://img.shields.io/badge/PM2-%232B037A?style=for-the-badge&logo=pm2&logoColor=white)](https://pm2.keymetrics.io/)

[![Docker](https://img.shields.io/badge/DOCKER-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![MariaDB](https://img.shields.io/badge/MARIA%20DB-%23003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org/)

<br />

## 🔨 Structure
![FabLab 예약 시스템 구조도](https://github.com/user-attachments/assets/9e9bf655-00fb-46b8-8345-93fb5f8bcd82)

<br />

### 사용 라이브러리

- **프론트엔드**
  - [axios](https://www.npmjs.com/package/axios)
  - [dayjs](https://www.npmjs.com/package/dayjs)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [emotion](https://emotion.sh/docs/introduction)
  - [jotai](https://www.npmjs.com/package/jotai)
  - [mui](https://mui.com/)
  - [overlayscrollbars](https://www.npmjs.com/package/overlayscrollbars)
  - [react-router](https://www.npmjs.com/package/react-router)
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom)

- **백엔드**
  - [body-parser](https://www.npmjs.com/package/body-parser)
  - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [express](https://www.npmjs.com/package/express)
  - [mariadb](https://www.npmjs.com/package/mariadb)
