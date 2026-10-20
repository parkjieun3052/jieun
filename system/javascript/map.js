
/*
  map.js
  기능:
  1. 지도 생성
  2. 현재 위치 찾기
  3. 주변 상담센터 검색
  4. 검색 결과를 마커와 목록으로 표시
*/

// 1. 지도 표시 영역과 상태 메시지 가져오기
const container = document.getElementById("map");
const statusText = document.getElementById("location-status");
const centerList = document.getElementById("center-list");

// 2. 기본 위치 설정
// 현재 위치를 찾기 전까지 서울 좌표를 표시
const defaultPosition = new kakao.maps.LatLng(
    37.5665,
    126.9780
);

// 3. 지도 생성
const map = new kakao.maps.Map(container, {
    center: defaultPosition,
    level: 5
});

// 4. 장소 검색 객체 생성
const places = new kakao.maps.services.Places(map);

// 5. 현재 위치와 마커 저장 변수
let myPosition = null;
let myMarker = null;
let centerMarkers = [];

// 6. 현재 위치 찾기
function findMyLocation() {
    // 브라우저가 위치 정보를 지원하는지 확인
    if (!navigator.geolocation) {
        statusText.textContent =
            "이 브라우저에서는 위치 정보를 사용할 수 없습니다.";
        return;
    }

    statusText.textContent = "현재 위치를 확인하고 있습니다.";

    // 사용자에게 위치 권한을 요청하고 좌표 가져오기
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // 현재 위치 좌표 저장
            myPosition = new kakao.maps.LatLng(
                latitude,
                longitude
            );

            // 지도를 현재 위치로 이동
            map.setCenter(myPosition);
            map.setLevel(5);

            // 이전 내 위치 마커가 있다면 제거
            if (myMarker) {
                myMarker.setMap(null);
            }

            // 현재 위치 마커 생성
            myMarker = new kakao.maps.Marker({
                map: map,
                position: myPosition
            });

            statusText.textContent =
                "현재 위치를 찾았습니다. 주변 상담센터를 검색해 보세요.";
        },

        function (error) {
            // 위치 정보를 가져오지 못한 경우
            if (error.code === 1) {
                statusText.textContent =
                    "위치 권한을 허용해야 현재 위치를 찾을 수 있습니다.";
            } else if (error.code === 2) {
                statusText.textContent =
                    "현재 위치를 확인할 수 없습니다.";
            } else {
                statusText.textContent =
                    "위치 확인 시간이 초과되었습니다. 다시 시도해 주세요.";
            }
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// 7. 주변 상담센터 검색
function searchNearbyCenters() {
    // 현재 위치를 찾았는지 확인
    if (!myPosition) {
        statusText.textContent =
            "먼저 '내 위치 찾기' 버튼을 눌러 주세요.";
        return;
    }

    statusText.textContent = "주변 상담센터를 검색하고 있습니다.";

    // 이전 검색 결과 마커 제거
    centerMarkers.forEach(function (marker) {
        marker.setMap(null);
    });

    centerMarkers = [];

    // 이전 검색 결과 목록 비우기
    centerList.replaceChildren();

    // 현재 위치를 기준으로 3km 이내 상담센터 검색
    places.keywordSearch(
        "상담센터",
        function (data, searchStatus) {
            if (
                searchStatus !== kakao.maps.services.Status.OK
            ) {
                statusText.textContent =
                    "주변 상담센터를 찾지 못했습니다. 다른 검색어로 시도해 보세요.";
                return;
            }

            // 검색 결과의 위치를 지도 범위에 반영
            const bounds = new kakao.maps.LatLngBounds();

            data.forEach(function (place) {
                const position = new kakao.maps.LatLng(
                    Number(place.y),
                    Number(place.x)
                );

                // 상담센터 마커 생성
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position
                });

                centerMarkers.push(marker);
                bounds.extend(position);

                // 상담센터 이름을 누르면 상세 지도로 이동
                const item = document.createElement("li");
                const link = document.createElement("a");

                link.textContent = place.place_name;
                link.href = place.place_url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                item.appendChild(link);

                // 주소 표시
                const address = document.createElement("p");
                address.textContent =
                    place.road_address_name ||
                    place.address_name;

                item.appendChild(address);
                centerList.appendChild(item);

                // 마커를 누르면 장소 이름 표시
                kakao.maps.event.addListener(
                    marker,
                    "click",
                    function () {
                        const info = new kakao.maps.InfoWindow({
                            content:
                                '<div style="padding:8px;">' +
                                place.place_name +
                                "</div>"
                        });

                        info.open(map, marker);
                    }
                );
            });

            // 검색 결과가 지도에 모두 보이도록 조정
            if (data.length > 0) {
                map.setBounds(bounds);
            }

            statusText.textContent =
                "주변 상담센터 " + data.length + "곳을 찾았습니다.";
        },
        {
            location: myPosition,
            radius: 3000,
            sort: kakao.maps.services.SortBy.DISTANCE
        }
    );
}

// 8. 버튼에 기능 연결
document
    .getElementById("my-location-btn")
    .addEventListener("click", findMyLocation);

document
    .getElementById("search-center-btn")
    .addEventListener("click", searchNearbyCenters);

// 검색창과 검색 결과 폼 가져오기
const searchForm = document.getElementById("center-search-form");
const searchInput = document.getElementById("center-search-input");

function resetMapSession() {
    if (searchInput) {
        searchInput.value = "";
    }

    if (statusText) {
        statusText.textContent = "검색어를 입력해주세요";
    }

    if (centerList) {
        centerList.replaceChildren();
    }

    if (myMarker) {
        myMarker.setMap(null);
        myMarker = null;
    }

    if (centerMarkers.length) {
        centerMarkers.forEach(function (marker) {
            marker.setMap(null);
        });
        centerMarkers = [];
    }

    myPosition = null;

    if (map && window.kakao && window.kakao.maps) {
        map.setCenter(new kakao.maps.LatLng(37.5665, 126.9780));
        map.setLevel(5);
    }
}

window.resetMapSession = resetMapSession;

// 검색 버튼을 누르거나 Enter를 누르면 실행
searchForm.addEventListener("submit", function (event) {
    // 폼 제출로 페이지가 새로고침되는 것을 방지
    event.preventDefault();

    // 입력한 검색어의 앞뒤 공백 제거
    const keyword = searchInput.value.trim();

    // 검색어가 비어 있는지 확인
    if (keyword === "") {
        statusText.textContent = "검색어를 입력해 주세요.";
        return;
    }

    // 기존 검색 결과 마커 제거
    centerMarkers.forEach(function (marker) {
        marker.setMap(null);
    });

    centerMarkers = [];
    centerList.replaceChildren();

    statusText.textContent = "'" + keyword + "' 검색 중입니다.";

    // 현재 위치가 있으면 현재 위치 중심으로 검색
    // 현재 위치가 없으면 전국 키워드 검색으로 진행
    const searchOptions = myPosition
        ? {
            location: myPosition,
            radius: 20000,
            sort: kakao.maps.services.SortBy.DISTANCE
        }
        : {};

    // 카카오맵 장소 검색
    places.keywordSearch(
        keyword,
        function (data, searchStatus) {
            if (searchStatus !== kakao.maps.services.Status.OK) {
                statusText.textContent =
                    "검색 결과가 없습니다. 다른 검색어를 입력해 주세요.";
                return;
            }

            const bounds = new kakao.maps.LatLngBounds();

            data.forEach(function (place) {
                const position = new kakao.maps.LatLng(
                    Number(place.y),
                    Number(place.x)
                );

                // 검색 결과에 마커 표시
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position
                });

                centerMarkers.push(marker);
                bounds.extend(position);

                // 검색 결과 목록 생성
                const item = document.createElement("li");
                const link = document.createElement("a");

                link.textContent = place.place_name;
                link.href = place.place_url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                item.appendChild(link);

                const address = document.createElement("p");
                address.textContent =
                    place.road_address_name || place.address_name;

                item.appendChild(address);
                centerList.appendChild(item);

                // 마커 클릭 시 장소 이름 표시
                kakao.maps.event.addListener(
                    marker,
                    "click",
                    function () {
                        const info = new kakao.maps.InfoWindow({
                            content:
                                '<div style="padding:8px;">' +
                                place.place_name +
                                "</div>"
                        });

                        info.open(map, marker);
                    }
                );
            });

            // 검색 결과가 모두 보이도록 지도 이동
            if (data.length > 0) {
                map.setBounds(bounds);
            }

            statusText.textContent =
                "'" + keyword + "' 검색 결과: " +
                data.length + "곳";
        },
        searchOptions
    );
});
