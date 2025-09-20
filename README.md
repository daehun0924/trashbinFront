# 프로젝트: 스마트 쓰레기통 SW시스템

## 📌 프로젝트 개요

이 프로젝트는 사용자 인증부터 폐기물 등록·조회, 쓰레기통 상태 확인 및 관리자 수거 처리까지 전 과정을 웹으로 처리할 수 있는 스마트 폐기물 관리 플랫폼입니다.

---

## 🗓️개발 기간

2025.03.20 ~ 2025.04.01

---

## 🖥️ 플랫폼

**Web**

---

## 👥 개발 인원

**1명 (개인 프로젝트)**

---

## 🗨️ 개발 언어 및 서버

Spring Security

---

## 💽 DB

MySQL

---

## 개발 범위
<img src="images/bowling.png" width="600" alt="개발 범위 사진"/>

## 프로젝트 동작 화면
1. 회원 관리(S1-T01)

2. 폐기물 관리(S1-T02)

3. 카테고리 관리(S1-T03)

4. 배출 관리(S1-T04)

5. 통계 관리(S1-T05)


---

## ⚠️개발 특이사항

1. **권한(Role) 구조 설계**

| 구분 | 역할 | 접근 가능한 URL |
| --- | --- | --- |
| `ROLE_USER` | 일반 사용자 | `/user/**`, `/waste/**`, `/info/**` 등 |
| `ROLE_ADMIN` | 관리자 | `/admin/**`, `/dashboard/**`, `/manage/**` 등 |

`Spring Security` 설정을 통해 `antMatchers()`로 URL 접근 제어

사용자 로그인 시 `ROLE` 정보를 기반으로 적절한 페이지로 리디렉션 처리

**❗구현 중 겪었던 문제와 해결 과정**

**1. `403 Forbidden` 에러**

🟥문제

로그인 후에도 /user/**, /admin/** 접근 시 403 오류.

🟦원인

DB의 role 값이 USER 또는 ADMIN으로 되어 있었고, Spring Security는 자동으로

ROLE_ prefix를 붙여 비교.

🟩해결 방안

```jsx
authorities.add(new SimpleGrantedAuthority("ROLE_" + member.getRole()));
```

1. **로그인 후 리디렉션 무한 루프**

🟥문제
로그인 성공 후 `/login`으로 계속 리다이렉트

🟦원인

기본 리다이렉션 설정이 잘못되었거나 권한 없는 페이지로 리디렉트

🟩해결 방안

```jsx
.successHandler((request, response, authentication) -> {
  String role = authentication.getAuthorities().iterator().next().getAuthority();
  if (role.equals("ROLE_ADMIN")) {
      response.sendRedirect("/admin/home");
  } else {
      response.sendRedirect("/user/home");
  }
});
```

1. **관리자가 일반 유저 페이지 접근 시 템플릿 오류 발생**

🟩해결 방안

Security 설정에서 먼저 접근 차단 처리

Thymeleaf 내부에서는 다음처럼 role에 따라 조건 렌더링

```jsx
<div sec:authorize="hasRole('ROLE_ADMIN')">
  관리자 메뉴
</div>
```

✅ **성과 및 느낀 점**

- Spring Security를 통해 역할 기반 권한 분리를 완성하고, 실제 에러를 디버깅하면서 보안 흐름에 대한 이해를 높였음
- 에러 메시지를 기반으로 로그를 분석하고, Security 구조를 설계함으로써 **예외 처리 역량**과 **구조 설계 능력**이 향상될 수 있었음
