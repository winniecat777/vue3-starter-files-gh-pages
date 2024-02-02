export default {
    data: [  // 資料
      '這是第一句話',
      '這是第二句話',
      '這是第三句話'
    ],
    removeData(id) {  // 事件觸發
      // console.log(id);
      this.data.splice(id, 1);
      this.render();
    },
    render() {  // 渲染方法 (Vue.js 不會用到)
      const list = document.querySelector('.component ul');
      // console.log(list);
      let content = ''; // li 結構內容
      this.data.forEach((item, i) => {
        // console.log(item);
        content = `${content}<li>${item}
          <button type="button" class="btn" data-id="${i}">刪除</button>
          </li>`
        // console.log(content);
      })
      list.innerHTML = content;
  
      const btns = document.querySelectorAll('.btn');
      btns.forEach(btn => btn.addEventListener('click', (e) => {
        // console.log(e.target.dataset.id); // 陣列索引位置
        console.log(this); // 這裡的 this 觸發 component 元件
        this.removeData(e.target.dataset.id);
      }));
    },
    init() {  // 生命週期
      this.render();
    }
  }