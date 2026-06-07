const APP_VERSION = "v1.6.3";
const flashcards = [
  { id:"n01", cat:"숫자", q:"보완조치와 재조치 요구기간은?", a:"보완조치 40일 + 재조치 60일 = 최대 100일", note:"40 + 60 = 100" },
  { id:"n02", cat:"숫자", q:"심사결과 또는 인증취소 처분에 대한 이의신청 기한은?", a:"결과를 통보받은 날부터 15일 이내", note:"이의는 15일" },
  { id:"n03", cat:"숫자", q:"사후심사와 인증서 유효기간은?", a:"사후심사: 인증서 유효기간 중 연 1회 이상\n인증서 유효기간: 3년", note:"사후 1년, 인증 3년" },
  { id:"n04", cat:"숫자", q:"갱신심사는 언제 신청해야 하는가?", a:"인증서 유효기간 만료 3개월 전", note:"갱신은 3개월 전" },
  { id:"n05", cat:"숫자", q:"인증 신청 전 관리체계 최소 운영기간은?", a:"최소 2개월 이상 운영 후 신청", note:"예비인증은 예외" },
  { id:"n06", cat:"숫자", q:"인증위원회 구성 숫자는?", a:"위원 35인 이내로 구성\n회의마다 6인 이상의 인증위원으로 구성", note:"35 안에서 회의 6+" },
  { id:"n07", cat:"숫자", q:"개인정보 유출 시 통지 기한과 신고 기준은?", a:"정보주체 통지: 유출 건수와 관계없이 72시간 이내\n정부당국 신고: 1천명 이상 등 법정 요건 해당 시", note:"72시간 / 1천명" },
  { id:"n08", cat:"숫자", q:"개인정보 파기와 정보주체 권리요구 회신 기한은?", a:"불필요하게 된 날부터 5일 이내 파기\n열람 등 요구를 받은 날부터 10일 이내 회신", note:"파기 5, 회신 10" },
  { id:"n09", cat:"숫자", q:"접속기록 보관·점검 기준은?", a:"기본 1년 이상 보관, 특정 대상은 2년 이상 보관\n월 1회 이상 점검", note:"1년 / 2년 / 월 1회" },
  { id:"n10", cat:"숫자", q:"심사원과 선임심사원 자격 요건은?", a:"심사원: 심사 4회 이상 + 합계 20일 이상\n선임심사원: 심사원 취득 후 심사 3회 이상 + 합계 15일 이상", note:"4·20 → 3·15" },
  { id:"law01", cat:"개인정보", q:"개인정보 수집·이용 동의 시 고지할 4가지는?", a:"목적, 항목, 보유·이용기간, 동의 거부권 및 불이익", note:"목·항·기·거" },
  { id:"law02", cat:"개인정보", q:"개인정보 제3자 제공 동의 시 고지할 5가지는?", a:"제공받는 자, 이용 목적, 제공 항목, 보유·이용기간, 동의 거부권 및 불이익", note:"받·목·항·기·거" },
  { id:"law03", cat:"개인정보", q:"정보주체 이외로부터 수집 시 통지할 3가지는?", a:"수집 출처, 처리 목적, 처리정지 요구 또는 동의철회 권리", note:"출·목·권" },
  { id:"law04", cat:"개인정보", q:"가명정보를 동의 없이 처리할 수 있는 목적은?", a:"통계작성, 과학적 연구, 공익적 기록보존", note:"통·과·공" },
  { id:"law05", cat:"개인정보", q:"고정형 영상정보처리기기 안내판 필수 항목은?", a:"설치 목적 및 장소, 촬영 범위 및 시간, 관리책임자 연락처, 위탁받은 자의 명칭 및 연락처", note:"목·장·시·범·관·위" },
  { id:"law06", cat:"개인정보", q:"위탁과 제3자 제공의 핵심 차이는?", a:"위탁은 개인정보처리자의 업무 목적 달성을 위한 처리 위임이고, 제3자 제공은 제공받는 자의 목적을 위해 개인정보가 이전되는 것", note:"누구의 목적?" },
  { id:"law07", cat:"개인정보", q:"주민등록번호를 처리할 수 있는 대표적인 경우는?", a:"법령이 구체적으로 요구·허용, 급박한 생명·신체·재산 이익, 보호위원회 고시 사유 등", note:"동의만으로 처리 불가" },
  { id:"law08", cat:"개인정보", q:"국외이전 시 계약에 반영할 3가지는?", a:"안전성 확보조치, 개인정보 침해 고충처리·분쟁해결 조치, 그 밖에 개인정보 보호에 필요한 조치", note:"안전·고충·기타" },
  { id:"sys01", cat:"인증제도", q:"ISMS-P 101개 인증기준의 구성은?", a:"관리체계 수립 및 운영 16개 + 보호대책 요구사항 64개 + 개인정보 처리단계별 요구사항 21개 = 101개", note:"16 + 64 + 21" },
  { id:"sys02", cat:"인증제도", q:"인증심사 일부 생략이 가능한 대표 경우는?", a:"ISO/IEC 27001 인증, 주요정보통신기반시설 취약점 분석·평가, 인증받은 수탁자 범위의 현장심사 등", note:"국제표준·기반시설·수탁자" },
  { id:"sys03", cat:"인증제도", q:"수수료 감면 비율은?", a:"소기업 30%, 인증심사 일부 생략 20%, 정보보호 공시 30%", note:"30 · 20 · 30" },
  { id:"sys04", cat:"인증제도", q:"서면심사와 현장심사의 초점은?", a:"서면심사: 정책·지침·절차·증적 등 관리적 요소\n현장심사: 실제 이행 여부와 기술적·물리적 요소 확인", note:"문서 vs 현장 이행" },
  { id:"tech01", cat:"기술", q:"안전하지 않은 대표 암호 알고리즘은?", a:"대칭키: DES, RC4\n일방향: SHA-1, HAS-160, MD5", note:"DES·RC4 / SHA-1·MD5" },
  { id:"tech02", cat:"기술", q:"비밀번호 저장 시 핵심 원칙은?", a:"복호화할 수 없도록 안전한 일방향 암호화 적용", note:"비밀번호는 일방향" },
  { id:"tech03", cat:"기술", q:"RPO와 RTO의 차이는?", a:"RPO: 어느 시점까지 데이터를 복구할 것인가\nRTO: 얼마의 시간 안에 서비스를 복구할 것인가", note:"Point vs Time" },
  { id:"tech04", cat:"기술", q:"개인정보처리시스템 접속기록에서 확인할 핵심 항목은?", a:"계정, 접속일시, 접속지 정보, 처리한 정보주체 정보, 수행업무 등", note:"누가·언제·어디서·누구정보·무엇을" },
  { id:"judge01", cat:"판단", q:"결함 기준이 겹칠 때 선택 원칙은?", a:"인과관계가 있으면 더 근본적인 원인(root cause), 인과관계가 없으면 더 정확히 맞는 기준(best fit)", note:"원인 먼저, 다음은 정확성" },
  { id:"judge02", cat:"판단", q:"서버에서 CURL로 외부 인터넷 접속이 가능하다면?", a:"2.6.7 인터넷 접속 통제 결함", note:"CURL = 인터넷 접속" },
  { id:"judge03", cat:"판단", q:"서버에서 TELNET 서비스가 열려 있다면?", a:"2.6.2 정보시스템 접근 결함", note:"TELNET = 시스템 접근" },
  { id:"judge04", cat:"판단", q:"PMS 접근통제가 미흡하다면?", a:"2.10.8 패치관리 결함이 best fit", note:"PMS는 패치관리" },
  { id:"judge05", cat:"판단", q:"운영 환경에 소스코드가 존재할 때 구분할 3가지 기준은?", a:"운영에서 직접 개발: 2.8.3\n소스 보관·관리: 2.8.5\n운영에 불필요한 파일 이관: 2.8.6", note:"개발·보관·이관" },
  { id:"judge06", cat:"판단", q:"ISMS 심사 중 개인정보보호법 위반을 발견했다면?", a:"ISMS에는 3.x 기준이 적용되지 않으므로 1.4.1 법적 요구사항 준수 검토 결함으로 판단 가능", note:"ISMS인가 ISMS-P인가" }
];

const detailFacts = [
  ["숫자","ISMS 의무대상자의 인증 의무 취득기한은?","의무대상자가 된 다음 해 8월 31일까지","차년도 8·31"],
  ["숫자","인증기관 및 심사기관 지정의 유효기간은?","지정일로부터 3년","기관 지정 3년"],
  ["숫자","인증기관·심사기관 재지정 신청 가능 시기는?","유효기간 만료 6개월 전부터 만료일까지","재지정 6개월 전"],
  ["숫자","인증심사원 자격 유효기간은?","자격을 부여받은 날부터 3년","심사원 자격 3년"],
  ["숫자","심사수행기관의 보완조치 요구 기한은?","인증위원회 종료 다음 날부터 30일 이내","위원회 후 30일"],
  ["숫자","인증위원회 심의안건 제출 시기는?","위원회 개최 5일 전까지","안건 5일 전"],
  ["숫자","정보주체 이외 수집 시 기본 통지 기한은?","개인정보를 제공받은 날부터 3개월 이내","수집출처 3개월"],
  ["숫자","이용내역 통지 대상 규모 기준은?","민감·고유식별정보 5만명 이상 또는 개인정보 100만명 이상","5만 민감 / 100만 일반"],
  ["숫자","연락처를 모르는 유출 정보주체를 위한 게시 기간은?","홈페이지 또는 사업장에 30일 이상 게시","유출 게시 30일"],
  ["숫자","권한 변경 기록의 보관기간은?","최소 3년 보관","권한 기록 3년"],
  ["숫자","전자금융 중요원장 직접 작업 기록 보관기간은?","작업자와 작업내용을 5년 이상 보관","중요원장 5년"],
  ["숫자","광고 수신 의사 처리결과 통지 기한은?","수신동의·거부·철회 처리 후 14일 이내","광고 처리 14일"],

  ["인증제도","ISMS-P 인증번호의 기본 구성은?","ISMS - P - 인증기관 - 최초 인증발행 연도 - 연도별 부여순서","ISMS-P-OOOO-0000-0000"],
  ["인증제도","심사원보의 자격 취득 절차는?","신청 요건을 만족하고 인터넷진흥원의 인증심사원 양성과정을 통과","심사원보 = 양성과정"],
  ["인증제도","선임심사원 자격 요건은?","심사원 자격 취득 후 인증심사 3회 이상, 심사일수 합계 15일 이상","선임 3회·15일"],
  ["인증제도","서면심사에서 주로 확인하는 것은?","정책·지침·절차와 이행 증거자료 등 관리적 요소","서면 = 문서와 증적"],
  ["인증제도","현장심사에서 주로 확인하는 것은?","보호대책의 실제 이행 여부와 기술적·물리적 요소","현장 = 실제 이행"],
  ["인증제도","인증심사 일부 생략의 국제표준 사례는?","인증범위에 해당하는 ISO/IEC 27001 인증","일부 생략 = ISO 27001"],
  ["인증제도","인증심사 일부 생략의 기반시설 사례는?","주요정보통신기반시설 취약점 분석·평가를 받은 범위","일부 생략 = 기반시설"],
  ["인증제도","인증받은 수탁자에 대해 생략 가능한 심사는?","수탁자가 인증받은 범위의 현장심사","인증 수탁자 현장 생략"],
  ["인증제도","사후심사는 얼마나 자주 신청하는가?","인증서 유효기간 중 연 1회 이상","사후 = 매년"],
  ["인증제도","인증위원회 위원장은 어떻게 정하는가?","인증위원 중에서 호선","위원장 = 호선"],
  ["인증제도","인증 취소 심의·의결 주체는?","인증위원회","취소도 인증위원회"],
  ["인증제도","시험의 기본 문항 수와 시간은?","객관식 5지선다 50문항, 시험시간 2시간","50문항·120분"],

  ["개인정보","서면 동의 시 중요하게 표시할 민감 항목은?","민감정보, 여권번호, 운전면허번호, 외국인등록번호 등","중요표시 = 민·여·운·외"],
  ["개인정보","서면 동의의 중요한 내용 표시 방법은?","글씨 크기·색깔·굵기·밑줄 등으로 명확히 표시하고 필요 시 별도 구분","크기·색·굵기·밑줄"],
  ["개인정보","정보주체의 대표적인 권리 4가지는?","열람, 정정, 삭제, 처리정지 요구","열·정·삭·정"],
  ["개인정보","처리방침에 포함할 보호책임자 정보는?","보호책임자 성명 또는 고충처리 부서 명칭과 연락처","책임자·고충부서 연락처"],
  ["개인정보","처리방침에 포함할 파기 관련 내용은?","개인정보 파기절차와 파기방법, 별도 보존 시 근거와 항목","파기 절차·방법·보존근거"],
  ["개인정보","개인정보 이용내역 통지 주기는?","연 1회 이상","이용내역 매년"],
  ["개인정보","유출 통지 시 알려야 할 핵심 항목은?","유출 항목, 발생 시점·경위, 피해 최소화 조치, 대응·구제절차, 담당부서 연락처","항목·시점·조치·구제·연락"],
  ["개인정보","국외 이전 동의 시 추가 고지할 내용은?","이전 국가, 이전 일시와 방법, 이전받는 자, 이용목적과 보유기간 등","국가·일시·방법·받는 자"],
  ["개인정보","위탁계약에 포함할 감독 관련 사항은?","개인정보 관리현황 점검 등 수탁자 감독에 관한 사항","위탁 = 수탁자 감독"],
  ["개인정보","주민등록번호 처리가 가능한 기본 원칙은?","정보주체 동의만으로는 부족하며 법령상 근거 등 예외 사유가 필요","주민번호는 동의만으로 불가"],
  ["개인정보","고정형 영상정보처리기기 설치 가능 사유는?","법령 허용, 범죄 예방·수사, 시설안전·화재 예방, 교통단속·교통정보 등","법·범·시·교"],
  ["개인정보","고정형 영상정보처리기기 운영방침의 핵심은?","설치 근거·목적, 대수·위치·범위, 접근권한자, 촬영·보관·처리, 열람조치 등","근거부터 열람까지"],
  ["개인정보","가명정보의 추가정보는 어떻게 관리하는가?","원래 상태로 복원하기 위한 추가정보를 별도로 분리 보관·관리","추가정보 분리"],
  ["개인정보","가명정보 처리 시 금지되는 행위는?","특정 개인을 알아보기 위한 목적으로 처리하는 행위","재식별 목적 금지"],
  ["개인정보","개인정보 손해배상 책임보장 최소 대상 기준은?","정보주체 1만명 이상이면서 매출액 10억원 이상 등 법정 기준","1만명·10억원"],
  ["개인정보","전자상거래 계약·청약철회 기록 보유기간은?","5년","계약·청약 5년"],
  ["개인정보","전자상거래 표시·광고 기록 보유기간은?","6개월","표시·광고 6개월"],
  ["개인정보","전자상거래 소비자 불만·분쟁 기록 보유기간은?","3년","불만·분쟁 3년"],
  ["개인정보","인터넷 로그기록·접속지 추적자료 보유 예시는?","통신비밀보호법에 따라 3개월","인터넷 로그 3개월"],
  ["개인정보","개인정보 암호화 전송 대상의 기본 범위는?","고유식별정보, 비밀번호, 생체인식정보 등 중요정보","전송 = 고유·비번·생체"],
  ["개인정보","내부 관리계획에서 다룰 접근 관련 사항은?","접근권한 관리, 접근통제, 접속기록 보관 및 점검","권한·통제·기록"],
  ["개인정보","내부 관리계획에서 다룰 사고 관련 사항은?","개인정보 유출사고 대응 계획 수립·시행","유출 대응계획"],
  ["개인정보","개인정보 망분리의 대표 규모 기준은?","전년도 말 직전 3개월 일일평균 개인정보 이용자 100만명 이상 등","망분리 100만명"],
  ["개인정보","개인정보 처리 위탁과 제3자 제공을 가르는 질문은?","개인정보 이용 목적이 위탁자의 목적이라면 위탁, 제공받는 자의 목적이라면 제3자 제공","누구의 목적?"],

  ["기술","안전한 대칭키 암호 알고리즘 예시는?","SEED, ARIA, AES, HIGHT, LEA 등","SEED·ARIA·AES"],
  ["기술","안전한 일방향 암호 알고리즘 예시는?","SHA-256, SHA-384, SHA-512 등","SHA-2 계열"],
  ["기술","AH가 제공하는 보안 속성은?","무결성과 인증을 제공하며 암호화는 제공하지 않음","AH = 인증·무결성"],
  ["기술","ESP가 제공하는 보안 속성은?","인증·무결성과 함께 암호화를 통한 기밀성 제공","ESP = AH + 암호화"],
  ["기술","IPSec 전송모드의 보호 범위는?","원본 IP 헤더를 제외한 페이로드를 보호","전송모드 = 페이로드"],
  ["기술","IPSec 터널모드의 보호 범위는?","원본 IP 패킷 전체를 보호","터널모드 = 전체"],
  ["기술","K-익명성이 방어하는 대표 공격은?","연결 공격","K = 연결 공격"],
  ["기술","L-다양성이 방어하는 대표 공격은?","동질성 공격과 배경지식 공격","L = 동질성·배경지식"],
  ["기술","T-근접성이 방어하는 대표 공격은?","쏠림 공격과 유사성 공격","T = 쏠림·유사성"],
  ["기술","Ping of Death의 특징은?","비정상적으로 큰 IP 단편을 재조합하게 해 부하를 유발","Ping = 단편 재조합"],
  ["기술","Smurf Attack의 특징은?","피해자 IP로 위조한 ICMP 요청을 브로드캐스트해 응답 부하를 유발","Smurf = ICMP 방송"],
  ["기술","Teardrop Attack의 특징은?","분할된 IP 단편의 offset 값을 중첩시켜 오류와 부하를 유발","Teardrop = offset 중첩"],
  ["기술","SYN Flooding의 특징은?","다량의 TCP SYN 패킷으로 연결 대기 자원을 고갈","SYN = 반개방 연결"],
  ["기술","DNS Reflection 공격의 방어 단서는?","출발지 포트가 53/UDP이면서 목적지가 DNS 서버가 아닌 패킷 통제","DNS 반사 = 53/UDP"],
  ["기술","NTP Reflection 공격의 방어 단서는?","출발지 포트가 123/UDP인 비정상 응답 패킷 통제","NTP 반사 = 123/UDP"],
  ["기술","Memcached Reflection 공격의 방어 단서는?","11211/UDP 외부 노출 차단과 비정상 응답 통제","Memcached = 11211/UDP"],
  ["기술","전체 백업의 특징은?","모든 데이터를 백업하고 Archive Bit를 재설정","Full = 전체·재설정"],
  ["기술","증분 백업의 특징은?","직전 백업 이후 수정분만 백업하고 Archive Bit를 재설정","증분 = 변경분·재설정"],
  ["기술","차등 백업의 특징은?","전체 백업 이후 수정분을 누적 백업하며 Archive Bit를 재설정하지 않음","차등 = 누적·미재설정"],
  ["기술","CDP 백업의 특징은?","이미지 방식으로 짧은 주기까지 백업하고 특정 시점으로 복원","CDP = 특정시점 복원"],

  ["판단","1.2.1 정보자산 식별의 핵심 판단 단서는?","자산 목록 누락, 중요도 평가, 보안등급 부여·현행화 문제","식별 = 목록·등급"],
  ["판단","2.1.3 정보자산 관리의 핵심 판단 단서는?","부여된 보안등급에 따른 라벨·워터마킹·취급 문제","관리 = 표시·취급"],
  ["판단","1.1.3 조직 구성과 1.1.6 자원 할당의 차이는?","구성 자체와 전문성 문제는 조직 구성, 필요성을 알지만 인력·예산이 부족하면 자원 할당","조직인가 자원인가"],
  ["판단","1.2.4 보호대책 선정의 핵심은?","위험평가 결과에 맞는 대책을 선정하고 이행계획을 승인받는 과정","선정 = 무엇을 할지"],
  ["판단","1.3.1 보호대책 구현의 핵심은?","선정·승인된 보호대책을 실제로 이행하는 과정","구현 = 실제 수행"],
  ["판단","1.4.2 관리체계 점검의 범위는?","점검 수행뿐 아니라 발견사항 조치와 결과 보고까지 포함","점검 = 조치 보고까지"],
  ["판단","1.4.3 관리체계 개선의 핵심은?","반복 문제의 근본 원인을 분석하고 재발을 방지","개선 = 반복 원인 제거"],
  ["판단","2.3.1과 2.3.3 외부자 기준의 차이는?","보호대책 자체가 없으면 2.3.1, 대책이 있으나 지키지 않으면 2.3.3","대책 없음 vs 미이행"],
  ["판단","2.8.3 시험과 운영 환경 분리의 핵심은?","운영환경에서 직접 개발하거나 시험하지 않도록 분리","2.8.3 = 운영에서 개발 금지"],
  ["판단","2.8.5 소스 프로그램 관리의 핵심은?","소스코드를 별도 저장소에서 안전하게 보관·변경 관리","2.8.5 = 소스 보관"],
  ["판단","2.8.6 운영환경 이관의 핵심은?","승인된 실행파일 등 운영에 필요한 파일만 이관","2.8.6 = 필요한 파일만"],
  ["판단","2.10.1 보안시스템 운영의 방화벽 판단 단서는?","실제 동작하지 않는 불필요한 정책이 방치된 경우","미동작 정책 = 운영"],
  ["판단","2.6.1 네트워크 접근의 방화벽 판단 단서는?","취약한 접근 허용 정책이 실제로 동작하는 경우","실제 접근 = 네트워크"],
  ["판단","2.8.2 보안 요구사항 검토 및 시험의 판단 단서는?","정의된 요구사항과 실제 구현·검증 결과가 불일치","정의와 구현 불일치"],
  ["판단","2.12.1 재해·재난 대비 안전조치의 판단 단서는?","백업 주기 등이 재해복구계획의 RPO·RTO를 충족하지 못함","RPO·RTO 불충족"],
  ["판단","2.5.5 특수 계정 및 권한 관리의 판단 단서는?","외부 유지보수 등 특수권한을 업무 종료 후 즉시 삭제·정지하지 않음","유지보수 계정 종료 즉시"]
];

detailFacts.forEach((fact, index) => {
  const [cat, q, a, note] = fact;
  const n = String(index + 1).padStart(3, "0");
  flashcards.push(
    {id:`detail${n}a`, cat, q, a, note},
    {id:`detail${n}b`, cat, q:`암기 단서 “${note}”가 가리키는 핵심 내용은?`, a, note:`역회상 · ${q.replace(/\?$/, "")}`}
  );
});

const comparisons = [
  { cat:"관리체계", title:"자산을 식별했는가, 관리하고 있는가", a:["1.2.1","정보자산 식별","자산을 빠짐없이 식별하고 중요도에 따라 보안등급을 부여한다.","목록·중요도·보안등급"], b:["2.1.3","정보자산 관리","부여받은 보안등급에 따라 자산을 취급하고 표시·관리한다.","라벨·워터마킹·취급"] },
  { cat:"관리체계", title:"조직 문제인가, 자원 문제인가", a:["1.1.3","조직 구성","전문성과 역할을 고려해 정보보호·개인정보보호 조직을 구성하고 운영한다.","구성 자체가 부적절"], b:["1.1.6","자원 할당","필요한 인력·예산·시설 등 자원을 확보하고 할당한다.","필요성을 알지만 지원 부족"] },
  { cat:"관리체계", title:"선정이 문제인가, 이행이 문제인가", a:["1.2.4","보호대책 선정","위험평가 결과에 따라 대책을 선정하고 이행계획을 승인받는다.","무엇을 할지 결정"], b:["1.3.1","보호대책 구현","선정되고 승인된 보호대책을 계획대로 구현한다.","정한 것을 실제 수행"] },
  { cat:"관리체계", title:"점검 후 미조치인가, 반복 원인 미개선인가", a:["1.4.2","관리체계 점검","점검을 수행하고 발견사항의 조치 결과까지 보고한다.","단순 미이행 포함"], b:["1.4.3","관리체계 개선","반복 문제의 근본 원인을 분석하여 관리체계를 개선한다.","재발 방지·근본 개선"] },
  { cat:"보호대책", title:"외부자 대책이 없는가, 있는데 안 지키는가", a:["2.3.1","외부자 현황 관리","외부자 유형과 업무를 식별하고 필요한 보호대책을 마련한다.","대책 자체가 없음"], b:["2.3.3","외부자 보안 이행 관리","마련된 외부자 보호대책의 준수 여부를 점검하고 관리한다.","대책은 있으나 미이행"] },
  { cat:"보호대책", title:"운영계 소스코드 문제를 구분하라", a:["2.8.5","소스 프로그램 관리","소스 프로그램을 안전하게 보관·관리하고 변경을 통제한다.","운영계에 소스 보관"], b:["2.8.6","운영환경 이관","승인된 실행파일 등 운영에 필요한 파일만 이관한다.","불필요한 파일까지 배포"] },
  { cat:"보호대책", title:"방화벽 정책의 존재와 실제 동작", a:["2.10.1","보안시스템 운영","사용하지 않거나 불필요한 보안시스템 정책을 정리하지 않았다.","정책은 있으나 실제 미동작"], b:["2.6.1","네트워크 접근","취약한 네트워크 접근 정책이 실제 동작하여 접근을 허용한다.","실제 네트워크 접근 가능"] },
  { cat:"개인정보", title:"과다 수집인가, 동의 절차 문제인가", a:["3.1.1","개인정보 수집 제한","목적에 필요한 최소한의 개인정보만 수집한다.","왜 이 항목까지 받지?"], b:["3.1.2","개인정보 수집 동의","법정 고지사항과 방법에 따라 적법한 동의를 받는다.","어떻게 동의받았지?"] },
  { cat:"보호대책", title:"일반 파기보다 구체 기준이 우선", a:["2.8.4","시험 데이터 보안","실데이터를 시험에 사용했다면 시험 종료 후 즉시 파기한다.","시험용 실데이터 잔존"], b:["3.4.1","개인정보 파기","보유기간 경과나 목적 달성 등 불필요해진 개인정보를 파기한다.","일반적 생명주기 종료"] }
];

const quiz = [
  {type:"단순질의",tag:"인증제도",q:"ISMS-P 인증기준 101개의 구성으로 옳은 것은?",options:["16·64·21","21·64·16","16·65·20","21·63·17"],answer:0,why:"관리체계 수립 및 운영 16개, 보호대책 요구사항 64개, 개인정보 처리단계별 요구사항 21개입니다."},
  {type:"단순질의",tag:"인증제도",q:"인증 신청 전 관리체계를 최소 얼마 이상 운영해야 하는가?",options:["1개월","2개월","3개월","6개월"],answer:1,why:"원칙적으로 인증 신청 전에 최소 2개월 이상 운영해야 합니다."},
  {type:"단순질의",tag:"인증제도",q:"보완조치와 재조치 요구기간의 합계는 최대 얼마인가?",options:["60일","80일","100일","120일"],answer:2,why:"보완조치 40일과 재조치 요구기간 60일을 합쳐 최대 100일입니다."},
  {type:"단순질의",tag:"인증제도",q:"인증심사 결과에 대한 이의신청 기한은?",options:["7일 이내","15일 이내","30일 이내","40일 이내"],answer:1,why:"결과를 통보받은 날부터 15일 이내입니다."},
  {type:"단순질의",tag:"인증제도",q:"인증서의 유효기간은?",options:["1년","2년","3년","5년"],answer:2,why:"인증서 유효기간은 3년이며 유효기간 중 연 1회 이상 사후심사를 받습니다."},
  {type:"단순질의",tag:"인증제도",q:"갱신심사를 신청해야 하는 시기는?",options:["만료 1개월 전","만료 2개월 전","만료 3개월 전","만료 6개월 전"],answer:2,why:"유효기간 만료 3개월 전에 갱신심사를 신청해야 합니다."},
  {type:"단순질의",tag:"인증제도",q:"인증위원회 전체 위원 수와 회의별 구성 인원의 조합은?",options:["20인 이내·5인 이상","30인 이내·5인 이상","35인 이내·6인 이상","40인 이내·7인 이상"],answer:2,why:"위원은 35인 이내이며 회의마다 6인 이상의 인증위원으로 구성합니다."},
  {type:"단순질의",tag:"심사원",q:"심사원 자격 요건으로 옳은 것은?",options:["심사 3회·10일","심사 4회·20일","심사 5회·15일","심사 6회·20일"],answer:1,why:"심사원보 자격 취득 후 인증심사 4회 이상, 심사일수 합계 20일 이상입니다."},
  {type:"단순질의",tag:"개인정보",q:"개인정보가 불필요하게 된 때 원칙적인 파기 기한은?",options:["즉시","3일 이내","5일 이내","10일 이내"],answer:2,why:"특별한 사정이 없는 한 불필요하게 된 때부터 5일 이내 파기합니다."},
  {type:"단순질의",tag:"개인정보",q:"개인정보 유출 사실을 정보주체에게 통지하는 기한은?",options:["24시간","48시간","72시간","5일"],answer:2,why:"유출 사실을 알게 된 때부터 72시간 이내 통지가 원칙입니다."},
  {type:"단순질의",tag:"개인정보",q:"정보주체 이외로부터 개인정보를 수집한 경우 통지할 사항이 아닌 것은?",options:["수집 출처","처리 목적","처리정지 요구권","개인정보처리자의 매출액"],answer:3,why:"수집 출처, 처리 목적, 처리정지 요구 또는 동의철회 권리를 알려야 합니다."},
  {type:"단순질의",tag:"개인정보",q:"가명정보를 정보주체 동의 없이 처리할 수 있는 목적이 아닌 것은?",options:["통계작성","과학적 연구","공익적 기록보존","맞춤형 광고"],answer:3,why:"통계작성, 과학적 연구, 공익적 기록보존 목적에 한정됩니다."},
  {type:"단순질의",tag:"개인정보",q:"개인정보 수집·이용 동의 고지사항이 아닌 것은?",options:["수집·이용 목적","수집 항목","보유·이용기간","수탁자 임직원 수"],answer:3,why:"목적, 항목, 보유·이용기간, 동의 거부권 및 불이익을 고지합니다."},
  {type:"단순질의",tag:"개인정보",q:"개인정보 접속기록의 기본 보관기간은?",options:["6개월","1년","2년","3년"],answer:1,why:"기본은 최소 1년이며 특정 대상은 최소 2년입니다."},
  {type:"단순질의",tag:"개인정보",q:"개인정보 접속기록의 점검 주기는?",options:["주 1회 이상","월 1회 이상","분기 1회 이상","연 1회 이상"],answer:1,why:"접속기록은 월 1회 이상 점검해야 합니다."},
  {type:"단순질의",tag:"기술",q:"안전하지 않은 일방향 암호 알고리즘은?",options:["SHA-256","SHA-384","SHA-512","MD5"],answer:3,why:"MD5, SHA-1, HAS-160 등은 안전하지 않은 일방향 알고리즘으로 분류됩니다."},
  {type:"단순질의",tag:"기술",q:"IPSec에서 기밀성까지 제공하는 프로토콜은?",options:["AH","ESP","ARP","ICMP"],answer:1,why:"AH는 무결성과 인증을 제공하며, ESP는 여기에 암호화를 통한 기밀성도 제공합니다."},
  {type:"단순질의",tag:"기술",q:"RPO가 의미하는 것은?",options:["복구 목표 시간","복구 목표 시점","최대 서비스 용량","백업 보관기간"],answer:1,why:"RPO는 데이터가 어느 시점까지 복구되어야 하는지를 뜻합니다."},
  {type:"단순질의",tag:"기술",q:"차등 백업의 특징으로 옳은 것은?",options:["매번 모든 데이터 백업","직전 백업 이후 변경분만 백업 후 Archive Bit 재설정","전체 백업 이후 변경분을 누적하고 Archive Bit 미재설정","실시간 이미지 백업만 수행"],answer:2,why:"차등 백업은 전체 백업 이후 변경분을 누적하며 Archive Bit를 재설정하지 않습니다."},
  {type:"단순질의",tag:"정보보호",q:"정보보호 공시기한은 매년 언제까지인가?",options:["3월 31일","6월 30일","8월 31일","12월 31일"],answer:1,why:"정보보호 공시는 매년 6월 30일까지 해야 합니다."},

  {type:"복합응용",tag:"인증제도",q:"인증 신청 기업이 소기업이며 인증심사 일부 생략도 적용된다. 자료의 감면율을 각각 올바르게 연결한 것은?",options:["소기업 20%·일부 생략 20%","소기업 30%·일부 생략 20%","소기업 30%·일부 생략 30%","소기업 20%·일부 생략 30%"],answer:1,why:"수수료 감면은 소기업 30%, 인증심사 일부 생략 20%, 정보보호 공시 30%입니다."},
  {type:"복합응용",tag:"인증제도",q:"다음 중 인증심사 일부 생략과 가장 관련이 적은 것은?",options:["ISO/IEC 27001 인증","주요정보통신기반시설 취약점 분석·평가","인증받은 수탁자의 해당 범위","개인정보처리방침 공개"],answer:3,why:"개인정보처리방침 공개는 법적 의무일 수 있으나 인증심사 일부 생략 사유는 아닙니다."},
  {type:"복합응용",tag:"개인정보",q:"정보주체 5만 명의 민감정보를 처리하는 자가 정보주체 이외로부터 개인정보를 제공받았다. 원칙적인 통지 시기는?",options:["제공받은 날부터 15일 이내","제공받은 날부터 1개월 이내","제공받은 날부터 3개월 이내","연말까지"],answer:2,why:"통지 대상에 해당하며 개인정보를 제공받은 날부터 3개월 이내 알려야 합니다."},
  {type:"복합응용",tag:"개인정보",q:"개인정보 제3자 제공 동의 항목에는 포함되지만 수집·이용 동의 항목에는 포함되지 않는 것은?",options:["개인정보 항목","보유·이용기간","동의 거부권","제공받는 자"],answer:3,why:"제공받는 자는 제3자 제공 동의에서 추가되는 핵심 항목입니다."},
  {type:"복합응용",tag:"개인정보",q:"위탁업무 계약서에 포함할 내용으로 가장 거리가 먼 것은?",options:["목적 외 처리 금지","재위탁 제한","수탁자 감독","정보주체에게 지급할 할인율"],answer:3,why:"위탁 계약에는 목적 외 처리 금지, 보호조치, 재위탁 제한, 감독, 손해배상 책임 등을 포함합니다."},
  {type:"복합응용",tag:"개인정보",q:"개인정보처리시스템에 저장하는 비밀번호의 적절한 보호 방식은?",options:["평문 저장","복호화 가능한 대칭키 암호화","안전한 일방향 암호화","Base64 인코딩"],answer:2,why:"비밀번호는 복호화할 수 없도록 안전한 일방향 암호화를 적용해야 합니다."},
  {type:"복합응용",tag:"개인정보",q:"고정형 영상정보처리기기 안내판에 반드시 포함할 사항이 아닌 것은?",options:["설치 목적 및 장소","촬영 범위 및 시간","관리책임자 연락처","모든 촬영 대상자의 성명"],answer:3,why:"목적·장소, 촬영 범위·시간, 관리책임자 연락처, 위탁 시 수탁자 정보를 표시합니다."},
  {type:"복합응용",tag:"개인정보",q:"공개된 장소에 고정형 영상정보처리기기를 설치할 수 있는 경우가 아닌 것은?",options:["범죄 예방 및 수사","시설안전 및 화재 예방","교통단속","직원 근태 감시만을 위한 임의 설치"],answer:3,why:"공개된 장소의 설치는 법령상 허용 사유 등으로 제한됩니다."},
  {type:"복합응용",tag:"정보보호",q:"정보보호최고책임자를 임원으로 지정하고 겸직을 금지해야 하는 대상은?",options:["모든 소기업","자산총액 5조원 이상인 자","자본금 1억원 이하인 자","모든 개인정보처리자"],answer:1,why:"직전 사업연도 말 자산총액 5조원 이상인 자 등이 해당합니다."},
  {type:"복합응용",tag:"정보보호",q:"정보보호 공시 의무 대상에서 제외되는 자의 조합은?",options:["공공기관·소기업·금융회사 및 전자금융업자","ISP·IDC·CSP","상급종합병원·ISP","매출액 3천억 이상 기업"],answer:0,why:"공공기관, 소기업, 금융회사 및 전자금융업자는 제외 대상입니다."},
  {type:"복합응용",tag:"기술",q:"동질 집합에 최소한 서로 다른 민감정보가 일정 수 이상 존재하도록 하는 모델은?",options:["K-익명성","L-다양성","T-근접성","차등 백업"],answer:1,why:"L-다양성은 동질 집합 내 민감정보의 다양성을 확보해 동질성 공격 등을 방어합니다."},
  {type:"복합응용",tag:"기술",q:"공격자가 피해자 IP로 위장해 DNS 서버 응답을 피해자에게 집중시키는 공격은?",options:["SYN Flooding","DNS Reflection","Land Attack","Teardrop"],answer:1,why:"DNS Reflection은 스푸핑된 피해자 IP로 DNS 질의를 보내 증폭된 응답을 피해자에게 향하게 합니다."},
  {type:"복합응용",tag:"기술",q:"Land Attack의 특징은?",options:["출발지와 목적지 IP가 동일","IP 단편 offset 중첩","대량 TCP SYN 전송","ICMP 브로드캐스트 악용"],answer:0,why:"Land Attack은 출발지와 목적지를 공격 대상과 동일하게 조작합니다."},
  {type:"복합응용",tag:"기술",q:"리눅스 shadow 파일에서 암호화된 패스워드 앞의 느낌표(!)가 의미하는 것은?",options:["관리자 계정","계정 잠김","비밀번호 없음","만료 없음"],answer:1,why:"암호화된 패스워드 앞의 !는 계정이 잠긴 상태임을 나타냅니다."},
  {type:"복합응용",tag:"기술",q:"증분 백업과 차등 백업을 올바르게 비교한 것은?",options:["둘 다 Archive Bit를 재설정","증분은 재설정, 차등은 미재설정","증분은 미재설정, 차등은 재설정","둘 다 전체 데이터 백업"],answer:1,why:"증분 백업은 Archive Bit를 재설정하고 차등 백업은 재설정하지 않아 변경분이 누적됩니다."},
  {type:"복합응용",tag:"인증기준",q:"정보자산에 보안등급이 누락되었고 등급 표시도 없다. 먼저 판단할 root cause는?",options:["1.2.1 정보자산 식별","2.1.3 정보자산 관리","1.2.3 위험 평가","2.10.1 보안시스템 운영"],answer:0,why:"보안등급 부여가 선행되어야 표시·취급할 수 있으므로 정보자산 식별이 근본 원인입니다."},
  {type:"복합응용",tag:"인증기준",q:"외부자 보호대책 자체가 마련되어 있지 않은 경우의 결함 기준은?",options:["2.3.1 외부자 현황 관리","2.3.3 외부자 보안 이행 관리","2.5.5 특수 계정 관리","2.10.6 업무용 단말기기 보안"],answer:0,why:"대책 자체가 없다면 외부자 현황 관리, 대책은 있으나 미이행이면 외부자 보안 이행 관리입니다."},
  {type:"복합응용",tag:"인증기준",q:"관리체계 점검에서 발견된 사항을 단순히 조치하지 않았다. 가장 적합한 기준은?",options:["1.4.1 법적 요구사항 준수 검토","1.4.2 관리체계 점검","1.4.3 관리체계 개선","1.3.1 보호대책 구현"],answer:1,why:"1.4.2는 점검뿐 아니라 기본적인 이행 및 조치 결과 보고까지 포함합니다."},
  {type:"복합응용",tag:"인증기준",q:"위험평가 결과 대책과 이행계획을 승인받았지만 일부 대책을 수행하지 않았다.",options:["1.2.3 위험 평가","1.2.4 보호대책 선정","1.3.1 보호대책 구현","1.4.2 관리체계 점검"],answer:2,why:"대책 선정과 승인은 끝났고 실제 이행이 미흡하므로 보호대책 구현 결함입니다."},
  {type:"복합응용",tag:"인증기준",q:"ISMS 심사에서 개인정보보호법 위반이 발견되었다. 3.x 기준이 적용되지 않을 때 사용할 수 있는 기준은?",options:["1.4.1 법적 요구사항 준수 검토","2.6.3 응용프로그램 접근","3.1.1 개인정보 수집 제한","3.4.1 개인정보 파기"],answer:0,why:"ISMS 심사에서는 3.x가 대상이 아니므로 명백한 법 위반은 1.4.1로 판단할 수 있습니다."},

  {type:"상황판단",tag:"접근통제",q:"운영 서버에서 CURL 명령으로 외부 인터넷 사이트에 접속할 수 있다. 가장 적합한 결함 기준은?",options:["2.6.1 네트워크 접근","2.6.2 정보시스템 접근","2.6.7 인터넷 접속 통제","2.10.1 보안시스템 운영"],answer:2,why:"서버의 인터넷 접속 가능 여부가 직접적인 쟁점이므로 2.6.7이 best fit입니다."},
  {type:"상황판단",tag:"접근통제",q:"서버에서 보안에 취약한 TELNET 서비스가 활성화되어 있다.",options:["2.6.2 정보시스템 접근","2.6.7 인터넷 접속 통제","2.7.1 암호정책 적용","2.10.8 패치관리"],answer:0,why:"불필요하거나 취약한 시스템 서비스와 포트 관리는 정보시스템 접근 기준에서 다룹니다."},
  {type:"상황판단",tag:"보안시스템",q:"망분리 대상 PC의 방화벽에 인터넷 허용 정책이 남아 있지만 다른 장비에서 실제 접속은 차단하고 있다.",options:["2.6.1 네트워크 접근","2.6.7 인터넷 접속 통제","2.10.1 보안시스템 운영","2.10.6 업무용 단말기기 보안"],answer:2,why:"실제 인터넷 접근은 차단되고 있어 불필요한 방화벽 정책을 정리하지 않은 운영 문제가 핵심입니다."},
  {type:"상황판단",tag:"외부자",q:"사내에서 근무하는 위탁업체 직원이 개인 노트북을 가져와 사용하며 백신을 설치하지 않았다.",options:["2.3.1 외부자 현황 관리","2.3.3 외부자 보안 이행 관리","2.10.6 업무용 단말기기 보안","2.10.1 보안시스템 운영"],answer:1,why:"외부자가 반입한 장비의 보안조치 미이행이므로 외부자 보안 이행 관리가 가장 적합합니다."},
  {type:"상황판단",tag:"개발보안",q:"불가피하게 운영 데이터를 시험 데이터로 사용했으나 프로젝트 종료 후에도 파기하지 않았다.",options:["2.8.4 시험 데이터 보안","3.4.1 개인정보 파기","2.6.4 데이터베이스 접근","2.9.1 변경관리"],answer:0,why:"일반적인 개인정보 파기보다 시험 데이터 사용 후 파기를 직접 다루는 2.8.4가 best fit입니다."},
  {type:"상황판단",tag:"계정관리",q:"계정 발급 절차가 없고, 그 결과 다수의 공용계정이 생성되어 실제 사용자를 식별할 수 없다.",options:["2.5.1 사용자 계정 관리","2.5.2 사용자 식별","2.5.5 특수 계정 및 권한 관리","1.1.5 정책 수립"],answer:0,why:"사용자 식별 문제의 근본 원인이 계정 발급 절차 부재이므로 2.5.1이 root cause입니다."},
  {type:"상황판단",tag:"패치관리",q:"패치관리시스템(PMS)에 접근통제가 적용되지 않아 외주 직원이 상시 접근할 수 있다.",options:["2.6.1 네트워크 접근","2.6.3 응용프로그램 접근","2.10.1 보안시스템 운영","2.10.8 패치관리"],answer:3,why:"PMS 접근통제는 패치관리 기준에서 직접 다루므로 2.10.8이 가장 구체적입니다."},
  {type:"상황판단",tag:"변경관리",q:"정상적인 배포 절차는 있으나 담당자의 검토 실수로 잘못된 업데이트가 운영에 배포되어 장애가 발생했다.",options:["2.8.6 운영환경 이관","2.9.1 변경관리","2.11.1 사고 예방 및 대응체계 구축","1.3.1 보호대책 구현"],answer:1,why:"절차 부재가 아니라 배포 과정의 실무적 검토 실패이므로 변경관리 결함입니다."},
  {type:"상황판단",tag:"DB접근",q:"재해복구 중 생성한 개인정보 임시 테이블이 목록에 반영되지 않아 작업 후에도 방치되었다.",options:["3.4.1 개인정보 파기","2.6.4 데이터베이스 접근","2.9.3 백업 및 복구관리","2.12.1 재해·재난 대비 안전조치"],answer:1,why:"파기 누락의 근본 원인은 생성된 테이블 목록을 식별·현행화하지 못한 것입니다."},
  {type:"상황판단",tag:"조직",q:"사원·대리급만으로 잘못 구성된 정보보호위원회가 정책을 의결했고 경영진 보고 없이 배포되었다.",options:["1.1.1 경영진의 참여","1.1.3 조직 구성","1.1.5 정책 수립","1.3.2 보호대책 공유"],answer:1,why:"이후 문제들이 잘못 구성된 위원회에서 시작되었으므로 조직 구성이 root cause입니다."},
  {type:"상황판단",tag:"보안시스템",q:"업무용 단말에 보안 프로그램은 설치되어 있으나 잘못된 예외 정책 때문에 보안 기능이 작동하지 않는다.",options:["2.10.1 보안시스템 운영","2.10.6 업무용 단말기기 보안","2.6.3 응용프로그램 접근","2.3.3 외부자 보안 이행 관리"],answer:0,why:"설치 여부가 아니라 설치된 보안 프로그램의 잘못된 운영과 예외처리가 쟁점입니다."},
  {type:"상황판단",tag:"특수계정",q:"시스템 유지보수를 담당한 외부 직원이 퇴사했지만 유지보수용 특수계정이 삭제되지 않았다.",options:["2.5.1 사용자 계정 관리","2.5.2 사용자 식별","2.5.5 특수 계정 및 권한 관리","2.3.1 외부자 현황 관리"],answer:2,why:"외부 유지보수 인력의 특수권한은 필요시에만 생성하고 업무 종료 후 즉시 삭제·정지해야 합니다."},
  {type:"상황판단",tag:"재해복구",q:"백업 지침의 백업 주기는 주 1회지만 재해복구계획의 RPO는 3일이다.",options:["2.1.1 정책의 유지관리","2.9.3 백업 및 복구관리","2.12.1 재해·재난 대비 안전조치","1.4.1 법적 요구사항 준수 검토"],answer:2,why:"백업 주기가 재해복구 목표인 RPO를 충족하지 못하므로 재해·재난 대비 안전조치가 핵심입니다."},
  {type:"상황판단",tag:"개발보안",q:"내부 지침은 영문+숫자 10자리 이상인데 신규 시스템의 검증 로직은 8자리 이상만 요구한다.",options:["2.5.4 비밀번호 관리","2.8.1 보안 요구사항 정의","2.8.2 보안 요구사항 검토 및 시험","2.9.1 변경관리"],answer:2,why:"정의된 요구사항과 실제 구현 로직의 불일치를 검토·시험에서 발견하지 못한 문제입니다."},
  {type:"상황판단",tag:"보안성검토",q:"새롭게 도입한 장비와 시스템에 대해 보안성 검토 자체를 수행하지 않았다.",options:["2.8.1 보안 요구사항 정의","2.8.2 보안 요구사항 검토 및 시험","2.10.8 패치관리","1.4.2 관리체계 점검"],answer:0,why:"새 시스템 도입 시 보안 요구사항과 보안성 검토 기준을 정의·적용하는 문제로 2.8.1입니다."},
  {type:"상황판단",tag:"암호화",q:"회원가입과 개인정보 수정 화면에서 HTTPS가 적용되지 않아 개인정보가 평문 전송된다.",options:["2.6.3 응용프로그램 접근","2.7.1 암호정책 적용","2.8.2 보안 요구사항 검토 및 시험","3.2.1 개인정보 현황관리"],answer:1,why:"중요정보 전송 시 안전한 암호화 적용 문제이므로 암호정책 적용 결함입니다."},
  {type:"상황판단",tag:"운영이관",q:"운영 서버에 서비스 실행에 필요하지 않은 소스코드, 배포 압축파일, 개발 문서가 함께 남아 있다.",options:["2.8.3 시험과 운영 환경 분리","2.8.5 소스 프로그램 관리","2.8.6 운영환경 이관","2.9.1 변경관리"],answer:2,why:"운영에 필요한 파일 외의 불필요한 파일까지 이관·잔존한 문제로 2.8.6이 best fit입니다."},
  {type:"상황판단",tag:"관리체계",q:"관리체계 점검에서 같은 문제가 매년 반복되지만 매번 임시조치만 하고 근본 원인을 분석하지 않았다.",options:["1.4.1 법적 요구사항 준수 검토","1.4.2 관리체계 점검","1.4.3 관리체계 개선","1.3.1 보호대책 구현"],answer:2,why:"반복 문제의 근본 원인을 분석하고 재발을 방지하지 못한 경우 관리체계 개선 결함입니다."},
  {type:"상황판단",tag:"응용접근",q:"개인정보 조회 화면에서 이름 한 글자만 입력해도 수많은 정보주체가 LIKE 검색으로 노출된다.",options:["2.6.2 정보시스템 접근","2.6.3 응용프로그램 접근","2.6.4 데이터베이스 접근","2.10.1 보안시스템 운영"],answer:1,why:"응용프로그램에서 중요정보가 필요 이상 노출되는 문제로 응용프로그램 접근 기준에 해당합니다."},
  {type:"상황판단",tag:"사고대응",q:"글로벌 클라우드 시스템이 UTC를 사용하는 사실을 담당자가 인지하지 못해 사고 시각을 잘못 판단하고 신고가 지연되었다.",options:["2.9.6 시간 동기화","2.11.1 사고 예방 및 대응체계 구축","1.4.1 법적 요구사항 준수 검토","2.9.3 백업 및 복구관리"],answer:1,why:"UTC 사용 자체는 결함이 아닐 수 있으며, 이를 고려하지 못한 사고 대응체계가 핵심입니다."}
];

function criterionOptions(criterion, index) {
  const area = criterion.code.split(".")[0];
  const candidates = scenarioCriteria.filter(item => item.code !== criterion.code && item.code.startsWith(`${area}.`));
  const fallback = scenarioCriteria.filter(item => item.code !== criterion.code);
  const pool = [...candidates, ...fallback];
  const distractors = [];
  for (let offset = 0; distractors.length < 4; offset++) {
    const item = pool[(index * 7 + offset * 13) % pool.length];
    const label = `${item.code} ${item.name}`;
    if (!distractors.includes(label)) distractors.push(label);
  }
  const answer = index % 5;
  const options = [...distractors];
  options.splice(answer, 0, `${criterion.code} ${criterion.name}`);
  return {options, answer};
}

function cleanEvidence(criterion) {
  const cleaned = criterion.evidence
    .filter(item => !item.includes("제2장") && !item.includes("관 리 체 계") && item.length < 180)
    .slice(0, 4);
  const supplements = [
    `${criterion.code} ${criterion.name} 점검 결과서`,
    `${criterion.name} 관련 승인 및 검토 기록`,
    `${criterion.name} 관련 운영 이행 증적`
  ];
  return [...new Set([...cleaned, ...supplements])].slice(0, 4);
}

const organizations = ["온라인 쇼핑몰 A사","금융 플랫폼 B사","클라우드 서비스 C사","공공기관 D","의료기관 E","교육 서비스 F사"];
const audits = ["최초심사","사후심사","갱신심사","내부감사"];
const scenarioQuiz = Array.from({length:400}, (_, index) => {
  const criterion = scenarioCriteria[index % scenarioCriteria.length];
  const round = Math.floor(index / scenarioCriteria.length);
  const caseText = criterion.cases[round % criterion.cases.length];
  const check = criterion.checks[(round + index) % criterion.checks.length];
  const evidence = cleanEvidence(criterion);
  const choice = criterionOptions(criterion, index);
  return {
    type:"상황판단",
    tag:`${criterion.code} 사례`,
    q:`${organizations[index % organizations.length]}의 ${audits[index % audits.length]} 과정에서 다음 사항이 확인되었다.\n\n${caseText}\n\n위 상황에서 결함으로 판단하기에 가장 적절한 인증기준은?`,
    options:choice.options,
    answer:choice.answer,
    why:`정답은 ${criterion.code} ${criterion.name}이다.\n\n주요 확인사항: ${check}\n\n판단근거: ${criterion.requirement}`,
    evidence,
    source:`ISMS-P 인증기준 안내서 p.${criterion.page} · 세부점검항목 ${criterion.code}`
  };
});

const evidenceQuiz = Array.from({length:40}, (_, index) => {
  const criterion = scenarioCriteria[(index * 5 + 2) % scenarioCriteria.length];
  const correct = cleanEvidence(criterion).slice(0, 3);
  const other = scenarioCriteria[(index * 5 + 19) % scenarioCriteria.length];
  const wrong = cleanEvidence(other).slice(0, 2).map(item => `${item} (타 기준 확인자료)`);
  const statements = [...correct, ...wrong];
  const order = statements.map((_, position) => (position + index) % statements.length);
  const options = order.map(position => statements[position]);
  const answers = order.map((original, position) => original < correct.length ? position : -1).filter(position => position >= 0);
  return {
    type:"복합응용",
    tag:`${criterion.code} 증적`,
    q:`${organizations[index % organizations.length]}에서 ${criterion.code} ${criterion.name} 기준을 점검하려 한다. 안내서상 관련 증거자료로 적절한 것을 모두 고르시오. (정답 ${answers.length}개)`,
    options,
    answer:answers,
    why:`${criterion.code} ${criterion.name}의 주요 확인사항:\n${criterion.checks[0]}`,
    evidence:correct,
    source:`ISMS-P 인증기준 안내서 p.${criterion.page} · 세부점검항목 ${criterion.code}`
  };
});
quiz.push(...scenarioQuiz, ...evidenceQuiz);

const sources = [
  ["시험개요","출제범위/출제범위.md","출제범위, 50문항, 2시간, 문제유형 정리"],
  ["암기자료","ISMS-P 인증심사원 주요 암기사항/ISMS-P 인증심사원 주요 암기사항.md","제도 숫자, 개인정보보호, 기술, 오답 보기"],
  ["판단훈련","ISMS-P 인증심사원 인증 기준 풀이/ISMS-P 인증심사원 인증 기준 풀이.md","유사 기준, 빈출 결함, root cause와 best fit"],
  ["인증제도","인증제도안내서에없는주요내용/2.3 인증 제도 안내서에 없는 주요 내용.md","심사원 자격, 일부 생략, 인증위원회 구성"],
  ["세부점검","ISMS-P_인증기준_세부점검항목(2023.10.31).xlsx","101개 기준의 세부점검항목"],
  ["법령","정보보호 및 개인정보보호 관리체계 인증 등에 관한 고시(개인정보보호위원회고시)(제2024-8호)(20240724).md","인증 신청, 심사, 사후관리 및 갱신"],
  ["법령","개인정보 보호법(법률)(제20897호)(20251002).md","개인정보 처리 전 생명주기와 정보주체 권리"],
  ["법령","개인정보 보호법 시행령(대통령령)(제35780호)(20251002).md","법률의 대상, 기한, 방법 등 세부 기준"],
  ["안내서","ISMS-P 인증기준 안내서(2023.11.23).pdf","기준별 주요 확인사항, 결함사례, 증적자료"]
];

const shuffle = items => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const state = {
  learned: new Set(JSON.parse(localStorage.getItem("ismsLearned") || "[]")),
  saved: new Set(JSON.parse(localStorage.getItem("ismsSaved") || "[]")),
  cardFilter: "전체", cardLimit: 30, cardDeck: shuffle(flashcards), criteriaFilter: "전체", savedOnly: false,
  quizMode: "전체", quizSet: shuffle(quiz), quizIndex: 0, score: 0, answered: false
};
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const persist = () => {
  localStorage.setItem("ismsLearned", JSON.stringify([...state.learned]));
  localStorage.setItem("ismsSaved", JSON.stringify([...state.saved]));
  updateDashboard();
};

function switchView(id) {
  $$(".view").forEach(v => v.classList.toggle("active", v.id === id));
  $$(".nav-item").forEach(v => v.classList.toggle("active", v.dataset.view === id));
  window.scrollTo({top:0, behavior:"smooth"});
}
$$("[data-view]").forEach(b => b.addEventListener("click", () => switchView(b.dataset.view)));
$$("[data-go]").forEach(b => b.addEventListener("click", () => {
  if (b.dataset.filterGo) { state.cardFilter = b.dataset.filterGo; renderCards(); }
  if (b.dataset.criteriaGo) { state.criteriaFilter = b.dataset.criteriaGo; renderCriteria(); }
  switchView(b.dataset.go);
}));

function filterButtons(el, items, current, onClick) {
  el.innerHTML = items.map(x => `<button class="filter-button ${x===current?"active":""}" data-value="${x}">${x}</button>`).join("");
  $$("button", el).forEach(b => b.addEventListener("click", () => onClick(b.dataset.value)));
}

function renderCards() {
  const term = $("#cardSearch").value.trim().toLowerCase();
  const items = state.cardDeck.filter(c => (state.cardFilter === "전체" || c.cat === state.cardFilter) && (!state.savedOnly || state.saved.has(c.id)) && `${c.q} ${c.a} ${c.note}`.toLowerCase().includes(term));
  const visibleItems = items.slice(0, state.cardLimit);
  filterButtons($("#cardFilters"), ["전체","숫자","인증제도","개인정보","기술","판단"], state.cardFilter, v => { state.cardFilter=v; state.cardLimit=30; renderCards(); });
  $("#savedOnly").classList.toggle("active", state.savedOnly);
  $("#cardVisibleCount").textContent = items.length;
  $("#cardLoadMore").hidden = visibleItems.length >= items.length;
  $("#cardLoadMore").textContent = `카드 더 보기 · ${visibleItems.length} / ${items.length}`;
  $("#cardGrid").innerHTML = items.length ? visibleItems.map(c => `
    <article class="study-card ${state.learned.has(c.id)?"learned":""}" data-id="${c.id}">
      <div class="card-inner">
        <div class="card-face card-front">
          <div class="card-top"><span class="tag">${c.cat}</span><button class="save-button ${state.saved.has(c.id)?"active":""}" aria-label="북마크">${state.saved.has(c.id)?"★":"☆"}</button></div>
          <h3>${c.q}</h3><div class="card-bottom"><span>${c.note}</span><span>눌러서 정답 보기 ↗</span></div>
        </div>
        <div class="card-face card-back">
          <div class="card-top"><span class="tag">ANSWER</span><button class="save-button ${state.saved.has(c.id)?"active":""}" aria-label="북마크">${state.saved.has(c.id)?"★":"☆"}</button></div>
          <h3>${c.q}</h3><p class="card-answer">${c.a}</p>
          <div class="card-bottom"><span>카드를 눌러 돌아가기</span><button class="learn-button ${state.learned.has(c.id)?"done":""}">${state.learned.has(c.id)?"완료 취소":"학습 완료"}</button></div>
        </div>
      </div>
    </article>`).join("") : `<div class="empty">조건에 맞는 카드가 없습니다.</div>`;
  $$(".study-card").forEach(card => {
    card.addEventListener("click", e => { if (!e.target.closest("button")) card.classList.toggle("flipped"); });
    $$(".save-button", card).forEach(b => b.addEventListener("click", e => {
      e.stopPropagation(); const id=card.dataset.id; state.saved.has(id)?state.saved.delete(id):state.saved.add(id);
      $$(".save-button", card).forEach(button => { button.classList.toggle("active", state.saved.has(id)); button.textContent=state.saved.has(id)?"★":"☆"; });
      persist();
    }));
    $(".learn-button", card).addEventListener("click", e => {
      e.stopPropagation(); const id=card.dataset.id; state.learned.has(id)?state.learned.delete(id):state.learned.add(id);
      e.currentTarget.classList.toggle("done", state.learned.has(id)); e.currentTarget.textContent=state.learned.has(id)?"완료 취소":"학습 완료";
      e.currentTarget.blur();
      persist();
    });
  });
}

function renderCriteria() {
  const term = $("#criteriaSearch").value.trim().toLowerCase();
  const items = comparisons.filter(c => (state.criteriaFilter==="전체" || c.cat===state.criteriaFilter) && JSON.stringify(c).toLowerCase().includes(term));
  filterButtons($("#criteriaFilters"), ["전체","관리체계","보호대책","개인정보"], state.criteriaFilter, v => { state.criteriaFilter=v; renderCriteria(); });
  $("#criteriaCount").textContent = items.length;
  $("#comparisonList").innerHTML = items.length ? items.map(c => `
    <article class="comparison"><header class="comparison-head"><div><span class="tag">${c.cat}</span><p>${c.title}</p></div><small>VS</small></header>
    <div class="comparison-body">${[c.a,c.b].map(x => `<section class="criterion"><b>${x[0]}</b><h3>${x[1]}</h3><p>${x[2]}</p><div class="cue">판단 단서 · ${x[3]}</div></section>`).join("")}</div></article>`).join("") : `<div class="empty">조건에 맞는 비교 기준이 없습니다.</div>`;
}

function startQuiz(mode) {
  state.quizMode = mode;
  const pool = mode === "전체" || mode === "모의시험" ? quiz : quiz.filter(q => q.type === mode);
  state.quizSet = shuffle(pool).slice(0, mode === "모의시험" ? 50 : pool.length);
  state.quizIndex = 0; state.score = 0; state.answered = false;
  renderQuizModes(); renderQuiz();
}
function renderQuizModes() {
  const countByType = type => quiz.filter(q => q.type === type).length;
  const modes = [["전체",quiz.length],["단순질의",countByType("단순질의")],["복합응용",countByType("복합응용")],["상황판단",countByType("상황판단")],["모의시험","무작위 50"]];
  $("#quizModes").innerHTML = modes.map(([name,count]) => `<button class="quiz-mode ${state.quizMode===name?"active":""}" data-mode="${name}"><strong>${name}</strong><span>${count} QUESTIONS</span></button>`).join("");
  $$(".quiz-mode").forEach(b => b.addEventListener("click", () => startQuiz(b.dataset.mode)));
}
function renderQuiz() {
  const q = state.quizSet[state.quizIndex];
  state.answered = false;
  state.quizSelected = new Set();
  $("#quizTotal").textContent = state.quizSet.length; $("#currentScore").textContent = state.score;
  $("#quizNumber").textContent = String(state.quizIndex+1).padStart(2,"0"); $("#quizTag").textContent = `${q.type} · ${q.tag}`;
  $("#quizQuestion").textContent = q.q; $("#quizStep").textContent = `${state.quizMode} · ${state.quizIndex+1} / ${state.quizSet.length}`;
  $("#quizBar").style.width = `${((state.quizIndex+1)/state.quizSet.length)*100}%`;
  const multi = Array.isArray(q.answer);
  $("#quizOptions").innerHTML = q.options.map((x,i) => `<button class="quiz-option" data-index="${i}"><b>${multi ? "□" : String.fromCharCode(65+i)+"."}</b> ${x}</button>`).join("");
  $("#quizConfirm").classList.toggle("show", multi);
  const evidence = q.evidence?.length ? `<strong>확인할 증거자료 예시</strong>${q.evidence.map(item => `• ${item}`).join("<br>")}` : "";
  const source = q.source ? `<span class="quiz-source">${q.source}</span>` : "";
  $("#quizExplanation").className = "quiz-explanation"; $("#quizExplanation").innerHTML = `<strong>판단 근거</strong>${q.why.replaceAll("\n","<br>")}<br><br>${evidence}${source}`;
  $("#quizNext").classList.remove("show"); $("#quizNext").textContent = state.quizIndex === state.quizSet.length-1 ? "결과 저장" : "다음 문제";
  $$(".quiz-option").forEach(b => b.addEventListener("click", () => {
    if (state.answered) return; state.answered = true;
    const picked = +b.dataset.index;
    if (multi) {
      state.answered = false;
      state.quizSelected.has(picked) ? state.quizSelected.delete(picked) : state.quizSelected.add(picked);
      b.classList.toggle("selected", state.quizSelected.has(picked));
      b.querySelector("b").textContent = state.quizSelected.has(picked) ? "■" : "□";
      return;
    }
    if (picked === q.answer) state.score++;
    finishQuizAnswer(q, new Set([picked]));
  }));
}
function finishQuizAnswer(q, picked) {
  const answers = new Set(Array.isArray(q.answer) ? q.answer : [q.answer]);
  const correct = picked.size === answers.size && [...picked].every(i => answers.has(i));
  if (Array.isArray(q.answer) && correct) state.score++;
  state.answered = true;
  $$(".quiz-option").forEach((o,i) => { o.disabled=true; if(answers.has(i))o.classList.add("correct"); else if(picked.has(i))o.classList.add("wrong"); });
  $("#quizConfirm").classList.remove("show");
  $("#currentScore").textContent = state.score; $("#quizExplanation").classList.add("show"); $("#quizNext").classList.add("show");
}
$("#quizConfirm").addEventListener("click", () => {
  if (!state.quizSelected.size || state.answered) return;
  finishQuizAnswer(state.quizSet[state.quizIndex], state.quizSelected);
});
$("#quizNext").addEventListener("click", () => {
  if (!state.answered) return;
  if (state.quizIndex === state.quizSet.length-1) {
    const percent = Math.round(state.score / state.quizSet.length * 100);
    const best = Math.max(+localStorage.getItem("ismsQuizBest") || 0, percent);
    localStorage.setItem("ismsQuizBest", best); updateDashboard();
    alert(`${state.quizMode} 완료: ${state.score} / ${state.quizSet.length} (${percent}점)`);
    state.quizIndex=0; state.score=0;
  } else state.quizIndex++;
  renderQuiz();
});
$("#quizReset").addEventListener("click", () => { state.quizIndex=0; state.score=0; renderQuiz(); });
$("#quizShuffle").addEventListener("click", () => {
  state.quizSet = shuffle(state.quizMode === "모의시험" ? quiz : state.quizSet).slice(0, state.quizMode === "모의시험" ? 50 : state.quizSet.length);
  state.quizIndex=0; state.score=0; renderQuiz();
});

function renderSources() {
  $("#sourceGrid").innerHTML = sources.map((s,i) => `<article class="source-card"><span>${s[0]} · ${String(i+1).padStart(2,"0")}</span><h3>${s[1]}</h3><p>${s[2]}</p><a href="../isms-p/${encodeURI(s[1])}" target="_blank">로컬 원문 열기 →</a></article>`).join("");
}
function updateDashboard() {
  const p = Math.round(state.learned.size / flashcards.length * 100);
  $("#progressPercent").textContent=`${p}%`; $("#progressRing").style.setProperty("--p",`${p}%`);
  $("#learnedCount").textContent=state.learned.size; $("#savedCount").textContent=state.saved.size; $("#quizBest").textContent=`${localStorage.getItem("ismsQuizBest") || 0}%`;
}

$("#cardSearch").addEventListener("input", () => { state.cardLimit=30; renderCards(); });
$("#criteriaSearch").addEventListener("input", renderCriteria);
$("#savedOnly").addEventListener("click", () => { state.savedOnly=!state.savedOnly; state.cardLimit=30; renderCards(); });
$("#cardLoadMore").addEventListener("click", () => { state.cardLimit+=30; renderCards(); });
$("#themeToggle").addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("ismsTheme", document.body.classList.contains("dark")?"dark":"light"); });
if (localStorage.getItem("ismsTheme")==="dark") document.body.classList.add("dark");
$("#versionBadge").textContent = APP_VERSION;
$("#todayLabel").textContent = new Intl.DateTimeFormat("ko-KR",{month:"long",day:"numeric",weekday:"short"}).format(new Date());
renderCards(); renderCriteria(); renderQuizModes(); renderQuiz(); renderSources(); updateDashboard();
