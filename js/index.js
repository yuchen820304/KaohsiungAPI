fetch(
  'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',
)
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(jsonData => {
    console.log(jsonData.result.records);
    let data = jsonData.result.records;
    let append = document.querySelector('.location');

    // 將data內容透過map一次抓8筆，回傳str函式結果，並利用+=達成innerHTML渲染且不覆蓋。
    append.innerHTML += data
      .map((item, i) => {
        if (i < 8) {
          // 將data內所需資料作為str函式的參數帶入。
          return str(
            item.Name,
            item.Picture1,
            item.Zone,
            item.Opentime,
            item.Add,
            item.Tel,
          );
        }
      })
      .join('');
  })
  .catch(err => {
    console.log('錯誤', err);
  });

// 利用樣板字面值寫出需渲染的HTML結構與資料
let str = function (name, picture, zone, openTime, address, tel) {
  let strCombine = `
  <ul>
    <li class="img_block" style = "background: url(${picture}) center center no-repeat;height:155px;">
      <h2>${name}</h2>
      <p>${zone}</p>
    </li>
    <li>${openTime}</li>
    <li>${address}</li>
    <li>${tel}</li>
  </ul>
  `;
  return strCombine;
};
