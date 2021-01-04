var host = "https://www.changningpark.sh.cn/unq"
//var host = "https://localhost:443/unq"
var config = {
  host,
  home_config: `${host}/test/wx/home_config`,
};

//对外把对象config返回
module.exports = config