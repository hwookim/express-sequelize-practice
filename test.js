const fetch = require("node-fetch");

const POST = (data) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...data,
  }),
});

const newData = {
  id: 23,
  name: "김치만선생",
  category: "한식",
  station: "충무로역",
  phone: "02-6052-5526",
  address: "서울 중구 필동로 30-1",
  location: {
    latitude: 37.55916348520624,
    longitude: 126.99605028458402,
  },
  comment: "돼지고기가 많이 들어간 김치찌개 맛집. 라면사리와 계란말이는 필수!",
  menu: "김치찌개 2인",
  price: 13_000,
  score: 3.5,
  photo:
    "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA0MjJfMTE2%2FMDAxNTI0MzQ0NTI3MzYw.C8jU_fFkgHIw0xC25Z0tHHQbIwPX2RW97646pYzofAMg.7YwlL3zyq32syCQYmfq5ODT49vynBXWnQpzWNLiFZ0cg.JPEG.jinn_dalle%2FIMG_9665.jpg",
  naver: "http://naver.me/x1eTKoqH",
  kakao: "https://place.map.kakao.com/996312899",
};

fetch("http://localhost:3000/places", POST(newData)).then(() => {
  console.log("done");
});
