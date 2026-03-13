# Browser-only lotto page

이 폴더는 서버 없이 배포할 수 있는 정적 버전입니다.

## 파일

- `index.html`
- `styles.css`
- `app.js`

## 동작 방식

- 브라우저 안에서 100개 번호 조합 풀을 만듭니다.
- 그 안에서 5개 조합을 다시 무작위로 뽑습니다.
- 서버 요청, 세션, 쿠키 없이 동작합니다.

## GitHub Pages

이 저장소에는 `browser-only` 폴더를 GitHub Pages로 배포하는 워크플로가 포함되어 있습니다.

1. 저장소를 GitHub에 올립니다.
2. 기본 브랜치를 `main`으로 둡니다.
3. GitHub 저장소 설정에서 `Settings > Pages > Build and deployment`로 이동합니다.
4. `Source`를 `GitHub Actions`로 선택합니다.
5. `main` 브랜치에 푸시하면 `browser-only` 폴더가 배포됩니다.

## 다른 정적 호스팅

아래 서비스에서는 이 폴더를 배포 루트로 지정하면 됩니다.

- Cloudflare Pages
- Netlify
