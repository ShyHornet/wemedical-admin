$(function(){
  var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'upload-container',
        drop_element: 'upload-container',
        max_file_size: '1000mb',
        flash_swf_url: '/js/plugins/plupload/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),
        uptoken_url: $('#uptoken_url').val(),
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
        domain: $('#domain').val(),
        get_new_uptoken: false,
        // downtoken_url: '/downtoken',
        // unique_names: true,
        // save_key: true,
        // x_vars: {
        //     'id': '1234',
        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        auto_start: true,
        log_level: 5,
        init: {
            'FilesAdded': function(up, files) {

                // $('#success').hide();
                plupload.each(files, function(file) {
                    // var progress = new FileProgress(file, 'fsUploadProgress');
                    // progress.setStatus("等待...");
                    // progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // if (up.runtime === 'html5' && chunk_size) {
                //     progress.setChunkProgess(chunk_size);
                // }
            },
            'UploadProgress': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');

                 $("#uploadProgress").parents(".form-group").show();
                 $("#uploadProgress").css("width",file.percent+"%");
                 $("#percent").html(file.percent+"%");
                 if (file.percent==100){
                    $("#uploadProgress").parents(".form-group").hide();
                 }
                // progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function() {
                // $('#success').show();
            },
            'FileUploaded': function(up, file, info) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // progress.setComplete(up, info);
                var key = file.name;
                var img_url = $('#domain').val()+'/'+ key;
                    $("#add").find('#doc_img').attr('src',img_url);
            },
            'Error': function(up, err, errTip) {
                // $('table').show();
                // var progress = new FileProgress(err.file, 'fsUploadProgress');
                // progress.setError();
                // progress.setStatus(errTip);
            }
                // ,
                // 'Key': function(up, file) {
                //     var key = "";
                //     // do something with key
                //     return key
                // }
        }
    });

    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
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
