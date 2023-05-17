console.log('Hello!');
// 初始化按钮状态
document.getElementById('btn-pause').disabled = true;
document.getElementById('btn-stop').disabled = true;

// 定义全局变量
var timer = null; // 用于存储计时器的返回值
var h = 0; // 用于存储小时
var m = 0; // 用于存储分钟
var s = 0; // 用于存储秒数

// 定义函数
// 开始计时
function start_counting() {
  // 获取输入的时间，补充默认值
  h = +document.getElementById('inputh').value || h;
  m = +document.getElementById('inputm').value || m;
  s = +document.getElementById('inputs').value || s;

  // 判断输入的时间是否合法
  if ((h == 0 && m == 0 && s == 0) || h < 0 || m < 0 || s < 0) {
    alert('输入的时间不合法！');
    return;
  }

  // 开始计时
  timer = setInterval(counting, 1000);

  // 改变按钮和输入框的状态，禁止用户再次输入
  document.getElementById('btn-start').disabled = true;
  document.getElementById('btn-pause').disabled = false;
  document.getElementById('btn-stop').disabled = false;
  document.getElementById('inputh').disabled = true;
  document.getElementById('inputm').disabled = true;
  document.getElementById('inputs').disabled = true;
}

// 暂停计时
function pause_counting() {
  // 改变按钮和输入框的状态，允许用户再次输入
  document.getElementById('btn-start').disabled = false;
  document.getElementById('btn-pause').disabled = true;
  document.getElementById('btn-stop').disabled = false;
  document.getElementById('inputh').disabled = false;
  document.getElementById('inputm').disabled = false;
  document.getElementById('inputs').disabled = false;

  // 暂停计时
  clearInterval(timer);
}

// 结束计时
function end_counting() {
  // 改变按钮和输入框的状态，允许用户再次输入
  document.getElementById('btn-start').disabled = false;
  document.getElementById('btn-pause').disabled = true;
  document.getElementById('btn-stop').disabled = true;
  document.getElementById('inputh').disabled = false;
  document.getElementById('inputm').disabled = false;
  document.getElementById('inputs').disabled = false;

  // 结束计时
  clearInterval(timer);

  // 重置时间变量
  h = 0;
  m = 0;
  s = 0;
  document.getElementById('currentTime').innerHTML = '计时已结束';
}

// 计时
function counting() {
  // 判断秒数是否为 0
  if (s == 0) {
    // 秒数为 0 时，判断分钟是否为 0
    if (m == 0) {
      // 启动计时前已经检查过输入的时间是否合法，所以这里不需要再检查变量 h 的值
      h--;
      m = 59;
      s = 59;
    } else {
      // 分钟不为 0 时，分钟减 1，秒数变为 59
      m--;
      s = 59;
    }
  } else {
    // 秒数不为 0 时，秒数减 1
    s--;
  }

  // 显示当前时间
  document.getElementById('currentTime').innerHTML =
    '当前时间：' + h + ' 时 ' + m + ' 分 ' + s + ' 秒';
  document.getElementById('inputh').value = h;
  document.getElementById('inputm').value = m;
  document.getElementById('inputs').value = s;

  // 判断秒数是否为 0
  if (s == 0) {
    // 秒数为 0 时，判断分钟是否为 0
    if (m == 0) {
      // 分钟为 0 时，判断小时是否为 0
      if (h == 0) {
        // 小时为 0 时，结束计时
        // 停止计时
        end_counting();
        // 在下一个事件循环里执行弹窗，防止弹窗阻塞 DOM 渲染
        setTimeout(function () {
          alert('时间到！');
        }, 0);
        return;
      }
    }
  }
}
var inputh = document.getElementById('inputh');
inputh.addEventListener('input', function () {
  inputh.value = parseInt(inputh.value || 0);
  if (inputh.value > 24) inputh.value = 24;
  if (inputh.value < 0) inputh.value = 0;
});

var inputm = document.getElementById('inputm');
inputm.addEventListener('input', function () {
  inputm.value = parseInt(inputm.value || 0);
  if (inputm.value > 59) inputm.value = 59;
  if (inputm.value < 0) inputm.value = 0;
});

var inputs = document.getElementById('inputs');
inputs.addEventListener('input', function () {
  inputs.value = parseInt(inputs.value || 0);
  if (inputs.value > 59) inputs.value = 59;
  if (inputs.value < 0) inputs.value = 0;
});

h = h.toString();
m = m.toString();
s = s.toString();
if (h.match(/^\d$/)) {
  //如果时为个位数，则在前面加 0
  h = '0' + h;
}
if (m.match(/^\d$/)) {
  //如果分为个位数，则在前面加 0
  m = '0' + m;
}
if (s.match(/^\d$/)) {
  //如果秒为个位数，则在前面加 0
  s = '0' + s;
}
