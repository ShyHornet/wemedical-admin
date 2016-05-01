$(function(){
  //消息通知选项
  toastr.options = {
  "closeButton": true,
  "debug": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "onclick": null,
  "showDuration": "400",
  "hideDuration": "1000",
  "timeOut": "7000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
  }
  //设置操作事件
  window.operateEvents = {
        'click .edit': function (e, value, row, index) {
             if (row.img_url) {
               console.log(row.img_url);
                 $('#edit').find('#doc_img').attr("src",row.img_url);
             }
              $('#edit').find('#doctor_id').val(row.doctor_id);
             $('#edit').find('#name').val(row.name);
             $('#edit').find('#gender').val(row.gender);
             $('#edit').find('#phone').val(row.phone);
             $('#edit').find('#title').val(titles[row.title]);
             $('#edit').find('#department').val(depts[row.department]);
             $('#edit').find('#specialism').val(row.specialism);
             $('#edit').find('#orders_per_day').val(row.orders_per_day);
              $('#edit').find('#intro').val(row.intro);
              if ($("#edit").find('#doc_img').attr('src')=="img/ImgHolder.png") {
                $("#edit").find("#filepicks-edit").closest('span').removeClass("fa-gear").addClass("fa-image").html("选择照片");
              }else{
                $("#edit").find("#filepicks-edit").closest('span').removeClass("fa-image").addClass("fa-gear").html("更换照片");
              }
             $('#edit').show();

        },
    };
    var $table = $('#docInfo');
    var $remove = $('#remove-btn');
    var $add = $('#add-btn');
    var selections = [];
//医生信息数据表
$('#docInfo').bootstrapTable({

  url: '../wemedical/Admin-index-getAllDocs',
  columns: [  {
    field: 'status',
    title: '',
     checkbox:true,
  },

    {
    field: 'doctor_id',
    title: 'ID',
     sortable: true
  }, {
    field: 'name',
    title: '姓名',
     sortable: true
  }, {
    field: 'title',
    title: '职称'

  },  {
      field: 'department',
      title: '科室'

    }, {
        field: 'specialism',
        title: '专长'

      }, {
          field: 'order_cost',
          title: '挂号费/￥',
           sortable: true

        }, {
            field: 'orders_per_day',
            title: '每日号源数',
             sortable: true

          },{
              field: 'treatment_period',
              title: '出诊时段'

            },{
                field: 'operate',
                title: ' 操作 ',
                align: 'center',
                events: operateEvents,
                formatter: operateFormatter
            }]
});

  var titles = {'副主治医师':0,'主治医师':1,'副主任医师':2,'主任医师':3};
  var depts = {	"心血管内科":0,"呼吸内科":1, "神经内科":2, "肾病内科":3,
  "消化内科":4,"血液病内科":5,"内分泌内科":6,"普通外科":7,"肝胆外科":8,"胃肠外科":9,
  "痔漏外科":10,"心脏外科":11,"骨外科":12,"神经外科":13,"泌尿外科":14,"整形外科":15,
  "烧伤外科":16,"妇科":17,"产科":18,"辅助生殖":19,"儿科":20,"眼科":21,"口腔科":22,"耳鼻喉科":23,
  "皮肤科":24,"中西医结合科":25,"传染科":26,}


$table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
    // save your data, here just save the current page
    selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
});

$add.click(function(){
$("#add").show();
});
$remove.click(function () {
      swal({
        title:getIdSelections().length==1?"您确定要删除这条记录?":"您确定要删除所选记录?",
        text: "删除后将无法恢复，请谨慎操作！",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "删除",
        cancelButtonText:"取消",
        closeOnConfirm:false,
        closeOnCancel:false
        }, function (isConfirm) {
              if (isConfirm) {
                  var ids = getIdSelections();
                  console.log(ids);
                  $.getJSON("../wemedical/Admin-index-delDoc",{id:ids},function(json){
                      if (json!=null){
                        console.log(json);
                          if (json['status']=='success') {
                            $table.bootstrapTable('remove', {
                              field: 'doctor_id',
                              values: ids
                            });

                            $remove.prop('disabled', true);
                            swal("删除成功！", getIdSelections().length==1?"您已经永久删除了这条记录":"您已经永久删除了所选记录", "success");
                          }
                      }
                    });




                }else{
                  swal("已取消","您取消了删除操作！","error");

                }
           });
});

$("#edit-cancel").click(function(){
  $("#edit").addClass("slideOutLeft animated");
  setTimeout(function(){
    $("#edit").hide();
      $("#edit").removeClass("slideOutLeft animated");
  },600);

});
$("#add-cancel").click(function(){
  $("#add").addClass("slideOutLeft animated");
  setTimeout(function(){
    $("#add").hide();
      $("#add").removeClass("slideOutLeft animated");
  },600);

});
$('#editForm').ajaxForm({
  beforeSubmit:function(){
   console.log("即将提交。。。");
  },
  success:function(data){
    if(data.status=="success"){
       toastr.success('',"医生信息更新成功!")

    }else {
        toastr.error('',"医生信息更新失败!")
    }
  },
  dataType:'json'
});


});
function getIdSelections() {
 return $.map($table.bootstrapTable('getSelections'), function (row) {
     return row.doctor_id
 });
}

  function detailFormatter(index, row) {
    console.log(row);
var html = [];

$.each(row, function (key, value) {
    html.push('<p><b>' + key + ':</b> ' + value + '</p>');
});
return html.join('');
 }
 function operateFormatter(value, row, index) {
 return [
     '<a class="edit" href="javascript:void(0)" title="编辑">',
     '<i class="fa fa-edit"></i>',
     '</a>  ',
 ].join('');
}
