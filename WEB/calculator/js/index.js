var text = document.getElementsByTagName('li');
var countTxt = document.getElementById('countTxt');
var saveOne = 0; //定义第一次保存的数据
var countCe = true; //定义是否按下 运算符
var operator = 0; //定义运算符

function changeEvent(obj) {
    if (countTxt.value.length < 10) {
        countTxt.value += obj.innerText;
    }

}

//判断按键 
for (var i = 0; i < text.length; i++) {
    var num = i; //定义中间量 ，避免错误传值
    //判断按键是否为数字
    if (parseFloat(text[i].innerText).toString() != "NaN") {
        //数字按键
        text[i].onclick = function () {
            //当输入框显示0的时候，替换0
            if (countTxt.value == 0) {
                countTxt.value = this.innerText;
            } else { //当输入框不为0 时，数字叠加显示
                if (countTxt.value > 0) {

                    //判断是否按过运算符按键，如果按过 ，则替换，没按过叠加
                    if (countCe == true) {
                        changeEvent(this);
                    } else {
                        countTxt.value = this.innerText;
                        //替换一次之后，叠加显示
                        countCe = true;
                    }

                }
            }
            return false;
        }


    } else {
        //其他按键
        text[i].onclick = function () {
            //判断是什么运算符
            switch (this.innerText) {
                case '+':
                    saveOne = countTxt.value; //获取输入框的值 ，并保存
                    countCe = false; //保存运算符按键状态
                    operator = 1;
                    console.log(saveOne);
                    break;
                case '-':
                    saveOne = countTxt.value; //获取输入框的值 ，并保存
                    countCe = false; //保存运算符按键状态
                    operator = 2;
                    console.log(saveOne);
                    break;
                case '×':
                    saveOne = countTxt.value; //获取输入框的值 ，并保存
                    countCe = false; //保存运算符按键状态
                    operator = 3;
                    console.log(saveOne);
                    break;
                case '÷':
                    saveOne = countTxt.value; //获取输入框的值 ，并保存
                    countCe = false; //保存运算符按键状态
                    operator = 4;
                    console.log(saveOne);
                    break;
                case 'c':
                    saveOne = 0; //获取输入框的值 ，并保存
                    countTxt.value = 0;
                    countCe = false; //保存运算符按键状态
                    operator = 0;
                    console.log(saveOne);
                    break;
                case 'ce':

                    countTxt.value = 0;
                    countCe = false; //保存运算符按键状态

                    console.log(saveOne);
                    break;
                case '←':
                    if (countTxt.value.length == 1) {
                        countTxt.value = 0;
                    } else {
                        countTxt.value = countTxt.value.substring(0, countTxt.value.length - 1)
                    };
                    break;
                case '=':
                    /* 暂时有问题*/
                    switch (operator) {
                        case 0:
                            countTxt.value = parseInt(saveOne) + parseInt(countTxt.value);
                            saveOne = countTxt.value; //获取输入框的值 ，并保存

                            ;
                            break;

                        case 1:
                            countTxt.value = parseInt(saveOne) + parseInt(countTxt.value);
                            saveOne = countTxt.value; //获取输入框的值 ，并保存
                            ;
                            break;
                        case 2:
                            countTxt.value = parseInt(saveOne) - parseInt(countTxt.value);
                            saveOne = countTxt.value; //获取输入框的值 ，并保存
                            ;
                            break;
                        case 3:
                            countTxt.value = parseInt(saveOne) * parseInt(countTxt.value);
                            saveOne = countTxt.value; //获取输入框的值 ，并保存
                            ;
                            break;
                        case 4:
                            countTxt.value = parseInt(saveOne) / parseInt(countTxt.value);
                            saveOne = countTxt.value; //获取输入框的值 ，并保存
                            ;
                            break;
                    }
                    countCe = false; //保存运算符按键状态
                    ;
                    break;
            }
        }
    }
}