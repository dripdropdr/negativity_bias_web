var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var aws= require('aws-sdk');
var fs = require('fs');

var s3 = new aws.S3();

router.get('/', (req, res, next) => {
    var params = {
        "Bucket": "result11111",
        "Key":"sortedUniqueTrend.json", 
    }
	// getObject를 이용하여 객체의 데이터를 가져올 수 있다.
    s3.getObject(params, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            fs.writeFileSync(`sortedUniqueTrend.${data.ContentType.split("/")[1]}`, data.Body);
        }
    });
    next();
});

router.get('/', (req, res, next) => {
    var params = {
        "Bucket": "result11111",
        "Key":"resultPolarity.json", 
    }
	// getObject를 이용하여 객체의 데이터를 가져올 수 있다.
    s3.getObject(params, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            fs.writeFileSync(`resultPolarity.${data.ContentType.split("/")[1]}`, data.Body);
        }
    });
    //다음 라우터 함수 호출
    next();
});

router.get('/', (req, res, next) => {
    var params = {
        "Bucket": "result11111",
        "Key":"resultSubjectivity.json", 
    }
	// getObject를 이용하여 객체의 데이터를 가져올 수 있다.
    s3.getObject(params, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            fs.writeFileSync(`resultSubjectivity.${data.ContentType.split("/")[1]}`, data.Body);
        }
    });
    //다음 라우터 함수 호출
    next();
});


router.get('/', (req, res, next) => {
    const uniques = fs.readFileSync('./sortedUniqueTrend.json', 'utf8');
    var uniquejson = JSON.parse(uniques);
    const polarity = fs.readFileSync('./resultPolarity.json', 'utf8');
    var polarjson = JSON.parse(polarity );

    res.render('index', { keyword: uniquejson, sum: polarjson});
});

router.get('/key/:id', async (req, res, next) => {
    //json 호출
    const uniques = fs.readFileSync('./sortedUniqueTrend.json', 'utf8');
    var uniquejson = JSON.parse(uniques);
    //console.log(req.params.id, a);
    //polarity 호출
    const polarity = fs.readFileSync('./resultPolarity.json', 'utf8');
    var polarjson = JSON.parse(polarity);
    //subjectivity 호출
    const subjectivity = fs.readFileSync('./resultSubjectivity.json', 'utf8');
    var subjson = JSON.parse(subjectivity);
    //키워드 잘라서
    console.log("uniquejson[1]", uniquejson[0][0]);
    console.log("req.params.id", req.params.id);

    var key = uniquejson[req.params.id-1][0];
    //그냥 변수로 전달! 
    res.render('key', { keyword: key , polarity: polarjson[key], subjectivity: subjson[key]});
});

//json chart로드 하려구 함
router.get("/unique", (req, res) => {
    const unique = fs.readFileSync("./sortedUniqueTrend.json", "utf8");
    var uniqueJson = JSON.parse(unique);
  
    res.send(uniqueJson);
  });
  
  router.get("/polarity", (req, res) => {
    const polarity = fs.readFileSync("./resultPolarity.json", "utf8");
    var polarJson = JSON.parse(polarity);
  
    res.send(polarJson);
  });
  
  router.get("/subjectivity", (req, res) => {
    const subjectivity = fs.readFileSync("./resultSubjectivity.json", "utf8");
    var subjectivityJson = JSON.parse(subjectivity);
  
    res.send(subjectivityJson);
  });

module.exports = router;