let mainContent = document.querySelector('.location');
let option = document.querySelector('.option');
let districts = Array.from(document.querySelectorAll('.district'));
let title = document.querySelector('.district_title');

// 取得遠端資料
function getData() {
  return fetch(
    'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',
  )
    .then(res => {
      return res.json();
    })
    .then(res => {
      let data = res.result.records;
      return data;
    });
}

// 利用樣板字面值寫出需渲染的HTML結構與資料
function content(name, picture, zone, openTime, address, tel, ticketInfo) {
  return `
  <ul class="location_detail">
    <li class="img_block" style = "background: url(${picture}) center center no-repeat;height:155px;">
      <h2>${name}</h2>
      <p>${zone}</p>
    </li>
    <li><img src="https://github.com/yuchen820304/KaohsiungAPI/master/images/icons_clock.png" alt="" />${openTime}</li>
    <li><img src="https://github.com/yuchen820304/KaohsiungAPI/master/images/icons_pin.png" alt="" />${address}</li>
    <li><img src="https://github.com/yuchen820304/KaohsiungAPI/master/images/icons_phone.png" alt="" />${tel}</li>
    <li><img src="https://github.com/yuchen820304/KaohsiungAPI/master/images/icons_tag.png" alt="" />${ticketInfo}</li>
  </ul>
  `;
}

// select選項樣板
function options(zone) {
  return `<option>${zone}</option>`;
}

// 景點內容獲取，getData回傳結果是一個Promise，所以可以使用then方法
getData().then(res => {
  // 將data內容透過map一次抓8筆，回傳str函式結果
  mainContent.innerHTML = res
    .map((item, i) => {
      if (i < 8) {
        // 將data內所需資料作為str函式的參數帶入
        return content(
          item.Name,
          item.Picture1,
          item.Zone,
          item.Opentime,
          item.Add,
          item.Tel,
          item.Ticketinfo,
        );
      }
    })

    // map回傳新陣列，join空字串去除陣列","
    .join('');
});

// select選項獲取
getData().then(res => {
  let set = new Set();
  let result = res.filter(item =>
    !set.has(item.Zone) ? set.add(item.Zone) : false,
  );
  option.innerHTML += result.map(item => {
    return options(item.Zone);
  });
});

// 點選熱門行政區選項
districts.forEach(item => {
  item.addEventListener('click', e => {
    title.innerHTML = e.target.innerText;

    getData().then(res => {
      // 顯示景點資訊預設0
      let account = 0;
      let result = res
        .map(item => {
          // 點選行政區時行文字同步更新
          if (e.target.innerText === item.Zone && account < 8) {
            // 最多顯示8筆景點資訊
            account += 1;
            return content(
              item.Name,
              item.Picture1,
              item.Zone,
              item.Opentime,
              item.Add,
              item.Tel,
              item.Ticketinfo,
            );
          }
        })

        // map回傳新陣列，join空字串去除陣列","
        .join('');

      // result有無結果的三元運算
      result
        ? (mainContent.innerHTML = result)
        : (mainContent.innerHTML = e.target.innerText + '目前無推薦景點');
    });
  });
});

option.addEventListener('change', e => {
  getData().then(res => {
    // 顯示景點資訊預設0
    let account = 0;
    let result = res
      .map(item => {
        // 點選行政區時行文字同步更新
        title.innerHTML = e.target.value;
        if (e.target.value === item.Zone && account < 8) {
          // 最多顯示8筆景點資訊
          account += 1;
          return content(
            item.Name,
            item.Picture1,
            item.Zone,
            item.Opentime,
            item.Add,
            item.Tel,
            item.Ticketinfo,
          );
        }
      })
      .join('');
    mainContent.innerHTML = result;
  });
});
