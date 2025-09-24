import pymysql
import random
from datetime import datetime, timedelta

# TODO: 본인의 데이터베이스 정보로 수정해주세요.
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = "Root1234!"
DB_NAME = "runnershigh"

# 채팅 메시지 예시 목록
CHAT_MESSAGES = [
    "안녕하세요! 반갑습니다~",
    "오늘 날씨 정말 좋네요. 다들 달리셨나요?",
    "이번 주말에 시간 되시는 분 같이 뛰어요!",
    "저녁에 번개 뛸 사람?",
    "새로 오신 분들 모두 환영합니다!",
    "오늘 5km 뛰고 왔는데 너무 상쾌해요.",
    "오늘 대박이에여",
    "날씨 진짜 달리기 딱 좋은 날씨네요!",
	"새로 산 러닝화 신어봤는데 발이 너무 편해요.",
    "요즘 무릎이 좀 안 좋은데, 다들 부상 관리 어떻게 하세요?",
    "혹시 괜찮은 러닝 코스 아시면 추천 좀 부탁드립니다.",
    "등산 즐겨하시는 분 계신가요?",
    "오늘 퇴근하고 가볍게 3km만 뛰고 와야겠어요.",
    "도파민 싹 도노",
    "내일 아침 7시에 같이 뛰실 분~?",
    "요즘 날씨 선선하니 좋아요",
    "페이스 조절하는 팁 같은 거 있을까요?",
    "1분만 뛰어도 힘든데 점점 늘겠죠?",
    "혼자 뛰는 것보다 같이 뛰니까 훨씬 재밌네요.",
    "어제 다들 고생 많으셨습니다! 덕분에 완주했어요.",
    "주말에 광안리 쪽에서 10km 같이 뛰어요!",
    "오늘 5km PB 찍었습니다! ㅎㅎ",
    "스트라바 쓰시는 분 친구해요!",
    "하프 마라톤 준비 중인데, 팁 좀 주세요.",
    "오늘 미세먼지 심하던데 다들 마스크 챙기세요.",
    "여름이라 뛰기 너무 힘드네요 ㅠㅠ",
    "겨울엔 보통 어디서 뛰세요? 실내 헬스장 가야 하나...",
    "다들 러닝 전에 스트레칭은 꼭 하세요!",
    "이 앱 써보니까 기록 관리가 편하네요. 추천합니다.",
    "대회 앞두고 있는데 너무 떨려요.",
    "오늘 러닝은 쉬어갑니다...",
    "비 오는데도 뛰시는 분들 존경합니다.",
    "오늘 처음 10km 넘겨봤어요! 뿌듯하네요.",
    "다들 기록이 어떻게 되세요? 궁금해요.",
    "역시 뛰고 나면 기분이 상쾌해요.",
    "이번 주 정기런은 어디서 하나요?",
    "내일 비 온다는데 정기런 취소인가요?",
    "러닝할 때 들을만한 노래 추천 좀 해주세요.",
    "물통 파우치 괜찮은 거 아시는 분?",
    "오늘 단체 사진 너무 잘 나왔어요!",
    "유튜버 중에 한스라고 아세요?",
    "운동 끝나고 시원한 맥주 한잔 어때요?",
    "다들 맛점하세요!",
    "오늘 저녁 뭐 먹지... 메뉴 추천 받습니다.",
    "주말에 뭐 하세요??",
    "근처에 맛집 새로 생겼던데 가보실 분?",
    "퇴근 시간만 기다리는 중...",
    "와, 벌써 금요일이네요. 시간 빠르다.",
    "다들 좋은 하루 보내세요!",
    "ㅋㅋㅋㅋㅋ 진짜 웃기네요.",
    "오늘 회식 장소는 어디인가요?",
    "드디어 월급날!",
    "오늘 날씨 왜 이렇죠? ㅠㅠ",
    "요즘 재밌는 영화 뭐 있나요?",
    "다들 감기 조심하세요.",
    "새로 오신 분들 모두 환영합니다!",
    "혹시 이 근처에 사시는 분?",
    "오늘 저녁은 치킨이다.",
    "피곤한데 야근 확정이네요...",
    "다들 투표하셨어요?",
    "오늘 너무 덥다...",
    "요즘 노래 뭐 들으세요?",
    "요즘 드라마 뭐 재밌나요?",
    "대탈출 보신 분 계세요?",
    "부산에 뷰 좋은 카페 추천해주세요.",
    "울산 태화강 주변에 좋은 곳 있나요?",
    "좋아요!",
    "네네, 가능합니다.",
    "ㅋㅋㅋㅋㅋ",
    "오, 진짜요?",
    "대박!",
    "헐",
    "넵!",
    "인정합니다.",
    "완전 좋아요.",
    "저는 참석이요!",
    "저는 어려울 것 같아요 ㅠㅠ",
    "고고!",
    "축하드려요!",
    "수고하셨습니다!",
    "감사합니다!",
    "화이팅!",
    "ㅠㅠ",
    "👍",
    "최고예요.",
    "고생하셨습니다.",
        "다들 화이팅!",
        "잘 부탁드립니다!",
    "오늘 안 뛰면 평생 후회함. 날씨 미쳤음.",
    "님 혹시 어제 야식 드심? 왜 안 나옴?",
    "먼저 뛰고 맥주 마시고 있겠습니다 ^^",
    "ㅋㅋㅋ 다들 나 없다고 너무 설렁설렁 뛰는 거 아님?",
    "오늘 런 ㄱ?",
    "야, 너 기록 왜 이래. 분발 좀.",
    "맨날 말로만 뛰는 사람 누구냐 나와라.",
    "오늘 뛰면 치킨 사줌 (내가 먹고 싶은 거)",
    "오늘 뛴 사람만 맛집 공유방 초대해드림.",
    "어제 뛴 거 다리 알 배겨서 죽겠다... 근데 또 뛰고 싶네.",
    "그렇게 뛸 거면 그냥 걷는 게 어때? ㅋㅋㅋ",
    "나 오늘 PB 찍었다. 부럽냐?",
    "슬슬 몸 푸는 중. 늦으면 버리고 감.",
    "오늘 코스 장난 아님. 역대급임.",
    "제발 한 번만 같이 뛰어주세요... 외로워요...",
    "아, 어제 무리했나 봐. 발목이 시큰거리네.",
    "뛰기 싫다... 근데 살 빼야 돼...",
    "오늘 왜 이렇게 힘드냐. 1km가 10km 같네.",
    "내 다리 내놔...",
    "배고파서 못 뛰겠다. 일단 먹고 생각하자.",
    "집에 가고 싶다...",
    "숨차 죽을 것 같아 헥헥",
    "아, 내일 출근 실화냐.",
    "다리가 내 다리가 아니야...",
    "오늘 왜 이렇게 안 뛰어지지 ㅠㅠ",
    "바람 너무 많이 불어서 날아갈 뻔.",
    "오늘따라 몸이 천근만근이네.",
    "어케했누",
    "나 오늘 양말 짝짝이로 신고 나옴.",
    "뛰다가 전여친 봄... 개뛰어서 도망침.",
    "새똥 맞을 뻔... 식겁했네.",
    "우리 크루에 존잘/존예분 새로 오셨던데 누구임?",
    "강아지랑 같이 뛰는 분 봤는데 너무 부러웠음.",
    "오늘 월급 들어왔다!!!!!!!!!",
    "아, 노래 뭐 듣지. 추천 좀.",
    "뛰고 집 가는데 버스 바로 와서 기분 좋음.",
    "편의점에서 2+1 하길래 이온음료 쟁여옴.",
    "바지 빵꾸남 ㅋㅋㅋ",
    "미쳤다 진짜",
    "ㄱㄱㄱㄱㄱㄱㄱ",
    "ㅇㅈ",
    "레전드네",
    "폼 미쳤다",
    "아, 배고파",
    "집가고싶다",
    "쌉가능",
    "ㅇㅋ",
    "ㄴㄴ",
    "무슨일이야",
    "개부럽다",
    "현타온다",
    "일단 ㅇㄷ",
    "가보자고",
    "운동했으니까 단백질 보충해야지. 삼겹살 ㄱ?",
    "치맥? 국룰이지.",
    "아, 시원한 냉면 땡긴다.",
    "오늘 무조건 국밥임. 뜨끈하게 지져야 돼",
    "님들 저 지금 배고파서 현기증 난단 말이에요.",
    "맛집 새로 찾음. 오늘 여기 어떰? (링크)",
    "일단 뛰고 생각하자. 뛰면 다 맛있어.",
    "운동 왜 하냐. 맛있게 먹으려고 하지.",
    "솔직히 뛰는 것보다 끝나고 먹는 게 더 기대됨.",
    "회비 걷어서 맛있는 거 먹죠!",
    "이번에 새로 나온 호카 신발 보신 분? 후기 좀",
    "가민 살까 애플워치 살까... 평생 고민이다 진짜.",
    "겨울에 입을만한 바람막이 추천 좀 ㅠㅠ",
    "역시 러닝은 장비빨이지.",
    "양말 뭐 신으세요? 자꾸 물집 잡히네;",
    "오늘 월급 들어왔는데... 신발 질러야겠다.",
    "헤드랜턴 사야 되는데 뭐 가성비 좋음?",
    "가민 사고 광명 찾았습니다. 다들 사세요.",
    "러닝벨트 쓰시는 분? 핸드폰 넣고 뛰기 너무 불편함.",
    "컴프레션 타이즈 효과 있긴 한가? 입어본 사람?",
    "오늘 OOO 매장에서 세일한대요! (링크)",
    "와, 저 신발 색깔 미쳤다.",
    "지갑은 얇아지는데 장비는 늘어만 간다...",
    "다들 시계 뭐 쓰는지 궁금함.",
    "단체티 맞출 때 안 됐나요??",
    "오늘 인터벌 뛰다가 영혼 가출함.",
    "주말에 LSD 뛸 사람? 코스 짜게.",
    "풀코스 D-50... 나 지금 떨고있냐.",
    "요즘 정체기 온 듯... 기록이 안 느네.",
    "5분 페이스 깨는 게 이렇게 힘들 일인가.",
    "케이던스 신경 쓰면서 뛰니까 확실히 다르네.",
    "심박수 몇까지 올라가세요? 저 180 그냥 넘는데 정상임?",
    "내일은 회복런으로 살살 뛰어야지.",
    "오늘 훈련 메뉴 빡세다...",
    "대회 신청 링크 떴다! 다들 ㄱㄱ",
    "목표는 서브4!",
    "보강 운동 뭐 하세요? 코어 운동 추천 좀.",
    "와... 기록 미쳤다. 약 하신 거 아님? ㅋㅋㅋ",
    "다음 주 정기런 코스 난이도 어때요?",
    "비 온다고 훈련 쉴 순 없지.",
    "나는 런데이 2분도 힘듦 😢",
    "와... 어제 뛰고 종아리 터질 것 같음.",
    "허벅지 안쪽 쓸려서 걸음걸이 이상해짐 ㅋㅋㅋ",
    "어제 그 오르막은 진짜 선 넘었지.",
    "뛰고 먹는 라면은 진리다.",
    "발톱 또 하나 죽은 듯... 색깔이 이상해.",
    "와, 땀으로 샤워했네.",
    "집까지 어떻게 가지... 택시 탈까.",
    "오늘 칼로리 태운 거, 지금 먹어서 다시 채운다.",
    "일단 아이스 아메리카노부터 수혈해야 돼.",
    "파스 냄새 진동 ㅋㅋㅋ",
    "와, 오늘 개운하다! 이 맛에 뛰지.",
    "오늘 몇 칼로리 태웠는지 배틀 ㄱ?",
    "내일 아침에 못 일어날 예정.",
    "족욕하니까 좀 살 것 같다.",
    "고기... 고기가 필요해...",
    "뉴비분들 어서오고~",
    "우리 단체 사진 인스타에 올렸어요! 좋아요 ㄱㄱ",
    "회비 언제 걷나요? 총무님!",
    "정기런 끝나고 회식 출석체크 합니다~",
    "혹시 오늘 OOO 근처에서 뛰신 분? 저 본 것 같은데.",
    "이번 주 정기런 참여율 왜 이럼! 다들 나오셈!",
    "늦는 사람 벌금 천 원.",
    "오늘 물 당번 누구였죠?",
    "단체복 사이즈 조사 다시 합니다!",
    "게스트 참여 가능한가요? 친구 데려가고 싶은데."
]

def generate_chat_data():
    conn = pymysql.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db=DB_NAME,
        charset="utf8mb4", cursorclass=pymysql.cursors.DictCursor
    )
    try:
        with conn.cursor() as cursor:
            cursor.execute("TRUNCATE TABLE message_tb")
            print("기존 메시지 데이터를 삭제했습니다.")

            cursor.execute("SELECT user_id, nickname FROM user_tb")
            users = cursor.fetchall()
            user_nicknames = {user['user_id']: user['nickname'] for user in users}
            print(f"{len(user_nicknames)}명의 유저 닉네임 정보를 불러왔습니다.")

            sql = "SELECT user_id, create_dt FROM crew_user_tb WHERE crew_id = 1 ORDER BY create_dt ASC"
            cursor.execute(sql)
            join_events = cursor.fetchall()
            all_users_in_crew = [event['user_id'] for event in join_events]
            print(f"총 {len(join_events)}명의 가입 이벤트를 찾았습니다.")

            for i in range(len(join_events)):
                current_event = join_events[i]
                current_user_id = current_event['user_id']
                current_join_time = current_event['create_dt']
                
                current_user_nickname = user_nicknames.get(current_user_id, f"user{current_user_id}")
                enter_message = f"{current_user_nickname}님이 크루에 가입했습니다."
                cursor.execute(
                    "INSERT INTO message_tb (crew_id, user_id, message, message_type, create_dt) VALUES (%s, %s, %s, %s, %s)",
                    (1, 1, enter_message, 'ENTER', current_join_time)
                )
                print(f"[{current_join_time}] {enter_message}")
                if(i == 0): continue;

                members_before_next_join = all_users_in_crew[:i+1]
                if i + 1 < len(join_events):
                    next_event = join_events[i+1]
                    time_diff_seconds = (next_event['create_dt'] - current_join_time).total_seconds()

                    # <--- 수정된 부분 1: 안전한 시간 조건
                    if time_diff_seconds > 300: # 5분(300초) 이상 간격에만 채팅 생성
                        chat_times = []
                        num_messages = random.randint(15, 30)
                        for _ in range(num_messages):
                            random_seconds = random.uniform(150, time_diff_seconds - 150)
                            chat_time = current_join_time + timedelta(seconds=random_seconds)
                            chat_times.append(chat_time)
                        
                        chat_times.sort()

                        for chat_time in chat_times:
                            chat_user_id = random.choice(members_before_next_join)
                            chat_message = random.choice(CHAT_MESSAGES)
                            cursor.execute(
                                "INSERT INTO message_tb (crew_id, user_id, message, message_type, create_dt) VALUES (%s, %s, %s, %s, %s)",
                                (1, chat_user_id, chat_message, 'CHAT', chat_time)
                            )
                            chat_user_nickname = user_nicknames.get(chat_user_id, f"user{chat_user_id}")
                            print(f"  -> [{chat_time}] ({chat_user_nickname}): {chat_message}")
            
            # <--- 수정된 부분 2: for 반복문 밖으로 이동된 '마지막 대화 생성' 로직
            print("\n마지막 가입자 이후의 대화를 생성합니다...")
            if join_events:
                last_join_event = join_events[-1]
                last_join_time = last_join_event['create_dt']
                
                num_final_messages = 200
                final_chat_times = []
                for _ in range(num_final_messages):
                    random_seconds = random.uniform(60, 259200) # 1분 ~ 3일
                    chat_time = last_join_time + timedelta(seconds=random_seconds)
                    final_chat_times.append(chat_time)
                
                final_chat_times.sort()

                for chat_time in final_chat_times:
                    chat_user_id = random.choice(all_users_in_crew)
                    chat_message = random.choice(CHAT_MESSAGES)
                    
                    # <--- 수정된 부분 3: 누락된 코드 추가
                    cursor.execute(
                        "INSERT INTO message_tb (crew_id, user_id, message, message_type, create_dt) VALUES (%s, %s, %s, %s, %s)",
                        (1, chat_user_id, chat_message, 'CHAT', chat_time)
                    )
                    chat_user_nickname = user_nicknames.get(chat_user_id, f"user{chat_user_id}")
                    print(f"  -> [{chat_time}] ({chat_user_nickname}): {chat_message}")

            conn.commit()
            print("\n성공적으로 채팅 데이터를 생성했습니다!")

            # 여기부터 안읽은 메시지 데이터 생성
            # ...(이전 코드)...
            # 마지막 가입자 이후의 대화 생성 로직 (final_chat_times를 만드는 부분)이 끝난 직후

            # ▼▼▼ ----- 이 아래 코드를 추가하세요 ----- ▼▼▼
            print("\n'내가 없는' 최신 대화를 추가로 생성합니다...")
            my_user_id = 502
            other_users = [uid for uid in all_users_in_crew if uid != my_user_id]

            # 나를 제외한 다른 유저가 있을 경우에만 실행
            if other_users and final_chat_times:
                # 이전에 생성된 마지막 채팅 시간을 새로운 시작점으로 설정
                new_start_time = final_chat_times[-1]

                num_unread_messages = 200 # 내가 안 읽을 메시지 개수
                unread_chat_times = []

                for _ in range(num_unread_messages):
                    # 마지막 대화 시간으로부터 1분 ~ 6시간 사이 랜덤 시간 추가
                    random_seconds = random.uniform(60, 21600)
                    chat_time = new_start_time + timedelta(seconds=random_seconds)
                    unread_chat_times.append(chat_time)
                
                unread_chat_times.sort()

                for chat_time in unread_chat_times:
                    # '나'를 제외한 유저 중에서만 랜덤으로 발신자 선택
                    chat_user = random.choice(other_users)
                    chat_message = random.choice(CHAT_MESSAGES)

                    cursor.execute(
                        "INSERT INTO message_tb (crew_id, user_id, message, message_type, create_dt) VALUES (%s, %s, %s, %s, %s)",
                        (1, chat_user, chat_message, 'CHAT', chat_time)
                    )
                    chat_user_nickname = user_nicknames.get(chat_user, f"user{chat_user}")
                    print(f"  -> [{chat_time}] ({chat_user_nickname}): {chat_message}  <-- 내가 안 읽은 메시지")

                    # ▲▲▲ ----- 여기까지 추가 ----- ▲▲▲

        conn.commit()
        print("\n성공적으로 모든 채팅 데이터를 생성했습니다!")

    finally:
        conn.close()

if __name__ == "__main__":
    generate_chat_data()