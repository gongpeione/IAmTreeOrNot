<?php
/**
 * Created by PhpStorm.
 * User: Gong
 * Date: 2016/4/27
 * Time: 10:00
 */
error_reporting(0);
require_once('saetv2.ex.class.php');

$mypic = $_FILES["pic"];
if(!empty($mypic)){

    $picname = $mypic['name'];
    $picsize = $mypic['size'];

    $type = strtolower(strstr($picname, '.'));
    if (!in_array($type, ['.jpg', '.jpeg', '.png', '.gif'])) {

        echo json_encode(
                array(
                    'status' => -1,
                    'msg' => '图片格式不正确'
                )
        );
        exit;
    }

    if(!is_dir('tmp')) {
        mkdir('tmp');
    }
    $picName = md5(file_get_contents($mypic["tmp_name"])) . $type;
    $picPath = 'tmp/' . $picname;

    move_uploaded_file($mypic["tmp_name"], $picPath);

    $boundary      = uniqid('------------------');
    $MPboundary    = '--' . $boundary;
    $endMPboundary = $MPboundary . '--';

    // 需要上传的图片所在路径
    $filename = $picPath;
    $file     = file_get_contents($filename);

    $multipartbody  = '';
    $multipartbody .= $MPboundary . "\r\n";
    $multipartbody .= 'Content-Disposition: form-data; name="pic"; filename="wiki.png"'. "\r\n";
    $multipartbody .= 'Content-Type: image/png'. "\r\n\r\n";
    $multipartbody .= $file . "\r\n";

    //应用的AppKey
    $k = "source";
    $v = "";
    $multipartbody .= $MPboundary . "\r\n";
    $multipartbody .= 'Content-Disposition: form-data; name="' . $k . "\"\r\n\r\n";
    $multipartbody .= $v . "\r\n";

    $k = "status";
    $v = "描述文字";
    $multipartbody .= $MPboundary . "\r\n";
    $multipartbody .= 'Content-Disposition: form-data; name="' . $k . "\"\r\n\r\n";
    $multipartbody .= $v . "\r\n";

    //微博的可见性，0：所有人能看，1：仅自己可见，2：密友可见，3：指定分组可见，默认为0。
    $k = "visible";
    $v = 2;
    $multipartbody .= $MPboundary . "\r\n";
    $multipartbody .= 'Content-Disposition: form-data; name="' . $k . "\"\r\n\r\n";
    $multipartbody .= $v . "\r\n";
    $multipartbody .= $endMPboundary;

//echo $multipartbody;return;

    $url = 'http://upload.api.weibo.com/2/statuses/upload.json';
    $header = array(
        "Content-Type: multipart/form-data; boundary=$boundary"
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,  $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $multipartbody);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERPWD, "xxx:xxx"); //用户名:密码

    $msg = curl_exec($ch);

    curl_close($ch);

    $returnArray = json_decode($msg);

    if(isset($returnArray->thumbnail_pic)) {

        echo json_encode(array(
            'status' => 1,
            'msg' => '图片上传成功~',
            'thumb' => $returnArray->thumbnail_pic,
            'large' => $returnArray->original_pic
        ));

    } else {

        echo json_encode(array(
            'status' => -1,
            'code' => $returnArray->error_code,
            'msg' => $returnArray->error
        ));
    }

}

