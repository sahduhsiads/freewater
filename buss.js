// --- 🤖 配置区域 🤖 ---
const deviceOld = "Water215224"; 
const codeOld = "FEFE09B201B7B3630002192601011428115B0600";

const deviceNew = "Water215083";
const codeNew = "FEFE09B2015111630001EC260101143814490900";
// ----------------------

var body = $response.body;
var obj = JSON.parse(body);
var url = $request.url;

// 智能分流逻辑：判断是否为设备/水表请求
if (url.indexOf(deviceOld) != -1 || url.indexOf(deviceNew) != -1) {
    // 对应 water.txt 的逻辑
    obj.statusCode = "200";
    obj.message = "小火箭脚本执行成功";

    if (url.indexOf(deviceOld) != -1) {
        console.log("SR: 识别到旧机器");
        obj.resultObject = codeOld;
    } else if (url.indexOf(deviceNew) != -1) {
        console.log("SR: 识别到新机器");
        obj.resultObject = codeNew;
    } else {
        console.log("SR: 未知设备，默认使用新机数据");
        obj.resultObject = codeNew; 
    }
} else {
    // 对应 name.txt 的逻辑（修改用户信息）
    if (obj.resultObject && obj.resultObject.user) {
        obj.resultObject.user.nickName = "哥2"; 
        obj.resultObject.user.realName = "哥233";
        obj.resultObject.user.studentNum = "88888888";
        obj.resultObject.user.amount = "2026";
        obj.resultObject.user.freeMoney = "666";
    }
}

$done({ body: JSON.stringify(obj) });
