$(function(){
  //负责新增医生信息的照片上传器
  var uploader_add = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles-add',
        container: 'upload-container-add',
        drop_element: 'upload-container-add',
        max_file_size: '1000mb',
        flash_swf_url: '/js/plugins/plupload/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),
        uptoken_url: $("#add").find('#uptoken_url').val(),
        // uptoken_func: function(){
        //     var ajax = new XMLHttpRequest();
        //     ajax.open('GET', $('#uptoken_url').val(), false);
        //     ajax.setRequestHeader("If-Modified-Since", "0");
        //     ajax.send();
        //     if (ajax.status === 200) {
        //         var res = JSON.parse(ajax.responseText);
        //         console.log('custom uptoken_func:' + res.uptoken);
        //         return res.uptoken;
        //     } else {
        //         console.log('custom uptoken_func err');
        //         return '';
        //     }
        // },
        domain: $("#add").find('#domain').val(),
        get_new_uptoken: false,
        // downtoken_url: '/downtoken',
        auto_start: true,
        log_level: 5,
        unique_names:true,
        init: {
            'FilesAdded': function(up, files) {
//               var key = "";
//               // do something with key
//               //为图片生成随机名称
//               var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
// 　　            var maxPos = $chars.length;
// 　　            for (i = 0; i < 16; i++) {
// 　　　　         key += $chars.charAt(Math.floor(Math.random() * maxPos));
// 　　            }
//                $("#add").find("#img_name").val()
                // $('#success').hide();
                plupload.each(files, function(file) {
                    // var progress = new FileProgress(file, 'fsUploadProgress');
                    // progress.setStatus("等待...");
                    // progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
              //如果已经存在照片
              if ($("#add").find("#doc_img").attr("src")!=="img/ImgHolder.png") {
                //图片框恢复默认
                  $("#add").find("#doc_img").attr("src","img/ImgHolder.png");
                //获得旧照片的文件名
                 var key = $("#add").find('#img_key').val();

                  console.log("BeforeUpload: "+key);
                  $.ajax({
                    method:"POST",
                    url:"../wemedical/Admin-index-delImg",
                    data:{key:key},
                  })
                    .success(function(msg){
                      if (msg) {
                        console.log(json['error']);
                      }else{
                          console.log("图片删除成功! key: "+key);
                      }
                    });
                // $.getJSON("../wemedical/Admin-index-delImg",{key:key},function(json){
                //
                //   if (json!==null) {
                //
                //   }else {
                //
                //   }
                // });
                //在云端删除照片
              }
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // if (up.runtime === 'html5' && chunk_size) {
                //     progress.setChunkProgess(chunk_size);
                // }
            },
            'UploadProgress': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');

                 $("#add").find("#uploadProgress").parents(".form-group").show();
                 $("#add").find("#uploadProgress").css("width",file.percent+"%");
                 $("#add").find("#percent").html(file.percent+"%");
                 if (file.percent==100){
                    $("#add").find("#uploadProgress").parents(".form-group").hide();
                 }
                // progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                // $('#success').show();
            },
            'FileUploaded': function(up, file, info) {
              //获得图片名
              var key = file.id;
              //获得图片类型
              var type = file.type.replace("image/","");
                //给图片名输入框赋值
                $("#add").find('#img_key').val(key);

                //拼接图片url
                var img_url = $("#add").find('#domain').val()+'/'+ key;
                    $("#add").find('#doc_img').attr('src',img_url+'.'+type);
            },
            'Error': function(up, err, errTip) {
                // $('table').show();
                // var progress = new FileProgress(err.file, 'fsUploadProgress');
                // progress.setError();
                // progress.setStatus(errTip);
            },
                'Key': function(up, file) {
                    var key = "testImg";
                    file.name = key;
                }
        }
    });

    //负责编辑医生信息的照片上传器
    var uploader_edit = Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: 'pickfiles-edit',
          container: 'upload-container-edit',
          drop_element: 'upload-container-edit',
          max_file_size: '1000mb',
          flash_swf_url: '/js/plugins/plupload/Moxie.swf',
          dragdrop: true,
          chunk_size: '4mb',
          multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),
          uptoken_url: $("#edit").find('#uptoken_url').val(),
          // uptoken_func: function(){
          //     var ajax = new XMLHttpRequest();
          //     ajax.open('GET', $('#uptoken_url').val(), false);
          //     ajax.setRequestHeader("If-Modified-Since", "0");
          //     ajax.send();
          //     if (ajax.status === 200) {
          //         var res = JSON.parse(ajax.responseText);
          //         console.log('custom uptoken_func:' + res.uptoken);
          //         return res.uptoken;
          //     } else {
          //         console.log('custom uptoken_func err');
          //         return '';
          //     }
          // },
          domain: $("#edit").find('#domain').val(),
          get_new_uptoken: false,
          // downtoken_url: '/downtoken',
          auto_start: true,
          log_level: 5,
          unique_names:true,
          init: {
              'FilesAdded': function(up, files) {
    //               var key = "";
    //               // do something with key
    //               //为图片生成随机名称
    //               var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    // 　　            var maxPos = $chars.length;
    // 　　            for (i = 0; i < 16; i++) {
    // 　　　　         key += $chars.charAt(Math.floor(Math.random() * maxPos));
    // 　　            }
    //                $("#add").find("#img_name").val()
                  // $('#success').hide();
                  plupload.each(files, function(file) {
                      // var progress = new FileProgress(file, 'fsUploadProgress');
                      // progress.setStatus("等待...");
                      // progress.bindUploadCancel(up);
                  });
              },
              'BeforeUpload': function(up, file) {
                // //如果已经存在照片
                // if ($("#edit").find("#doc_img").attr("src")!=="img/ImgHolder.png") {
                //   //图片框恢复默认
                //     $("#edit").find("#doc_img").attr("src","img/ImgHolder.png");
                //   //获得旧照片的文件名
                //    var key = $("#edit").find('#img_key').val();
                //
                //     console.log("BeforeUpload: "+key);
                //     $.ajax({
                //       method:"POST",
                //       url:"../wemedical/Admin-index-delImg",
                //       data:{key:key},
                //     })
                //       .success(function(msg){
                //         if (msg) {
                //           console.log(json['error']);
                //         }else{
                //             console.log("图片删除成功! key: "+key);
                //         }
                //       });
                  // $.getJSON("../wemedical/Admin-index-delImg",{key:key},function(json){
                  //
                  //   if (json!==null) {
                  //
                  //   }else {
                  //
                  //   }
                  // });
                  //在云端删除照片
                // }
                  // var progress = new FileProgress(file, 'fsUploadProgress');
                  // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                  // if (up.runtime === 'html5' && chunk_size) {
                  //     progress.setChunkProgess(chunk_size);
                  // }
              },
              'UploadProgress': function(up, file) {
                  // var progress = new FileProgress(file, 'fsUploadProgress');

                   $("#edit").find("#uploadProgress").parents(".form-group").show();
                   $("#edit").find("#uploadProgress").css("width",file.percent+"%");
                   $("#edit").find("#percent").html(file.percent+"%");
                   if (file.percent==100){
                      $("#edit").find("#uploadProgress").parents(".form-group").hide();
                   }
                  // progress.setProgress(file.percent + "%", file.speed, chunk_size);
              },
              'UploadComplete': function() {
                  // $('#success').show();
              },
              'FileUploaded': function(up, file, info) {
                //获得图片名
                var key = file.id;
                //获得图片类型
                var type = file.type.replace("image/","");
                  //给图片名输入框赋值
                  $("#edit").find('#img_key').val(key);

                  //拼接图片url
                  var img_url = $("#edit").find('#domain').val()+'/'+ key;

                      $("#edit").find('#doc_img').attr('src',img_url+'.'+type);
                      $("#editForm").find('#img_url').val(img_url+'.'+type);
              },
              'Error': function(up, err, errTip) {
                  // $('table').show();
                  // var progress = new FileProgress(err.file, 'fsUploadProgress');
                  // progress.setError();
                  // progress.setStatus(errTip);
              },
          }
      });
    $('#container').on(
        'dragenter',
        function(e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function(e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function(e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });

});
