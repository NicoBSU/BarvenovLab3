let editMode=false;
//Переменная возвращающая индекс строки и элемента массива соответственно, которые мы будем редактировать
let editIndex;
//Наш массив
let arr=[{name:"Nikolai",
          surname:"Logoshin",
          age:18,
          averageMark:6}];
//Counter. Поскольку нулевой элемент массива уже мы заняли по умолчанию, мы начнем с первого
let counter=1;
let sum;
let n;

$(document).ready(function() {
//По нажатию на кнопку переходим в editMode
   $("#studentList").click(function(ev){
    let self = $(ev.target);
    if (!self.hasClass('editButton') && !self.hasClass('deleteButton')) {
        return false;
    }
    if (self.hasClass('deleteButton')){
        editMode=false;
        let row=self.parent().parent();
        let index=row.index();
        row.remove();
        counter--;
        arr.splice(index,1);
    }
    if(self.hasClass('editButton')){
    let tr = self.parent().parent();
        //Делаем выбранный ряд серым
        tr.css('background-color','#CCCCCC');
        editMode=true;
        editIndex=tr.index();

        $("#name").val(arr[editIndex].name);
        $("#surname").val(arr[editIndex].surname);
        $("#age").val(arr[editIndex].age);
        $("#averageMark").val(arr[editIndex].averageMark);

        $('.add-row').val('Edit');
      }
   });
    //Форма добавления/редактирования
    $(".add-row").click(function submitForm(){
        if(!editMode){
            //Заносим объект в массив
            arr[counter]={};
            arr[counter].name = $("#name").val();
            arr[counter].surname = $("#surname").val();
            arr[counter].age = $("#age").val();
            arr[counter].averageMark = $("#averageMark").val();
            //Создаем макет, по которому добавим теги в tbody
            let markup = `<tr><td><img src="delete.png" alt="deleteButton" class="deleteButton" width="20px" height="20px"><img src="edit.png" alt="editButton" class="editButton" width="20px" height="20px"></td><td>` + arr[counter].name + "</td><td>" + arr[counter].surname + "</td><td>"+ arr[counter].age +"</td><td>"+ arr[counter].averageMark +"</td></tr>";
            //Добавляем наш макетик
            $("table tbody").append(markup);
            //Увеличиваем counter массива
            counter++;
             }
        else
        {
            //Режим редактирования
            //Меняем элемент массива
            arr[editIndex].name = $("#name").val();
            arr[editIndex].surname = $("#surname").val();
            arr[editIndex].age = $("#age").val();
            arr[editIndex].averageMark = $("#averageMark").val();
            //Меняем значения строки
        let tr = $($("#studentList").children()[editIndex]);
        let tds = tr.children();
            $(tds[1]).html(arr[editIndex].name);
            $(tds[2]).html(arr[editIndex].surname);
            $(tds[3]).html(arr[editIndex].age);
            $(tds[4]).html(arr[editIndex].averageMark);
            tr.css('background-color','#FFFFFF');

            //Обратно меняем на false
            editMode=false;
            //Обратно меняем текст кнопки на add row
            $('.add-row').val('Add row');
            };
        });
    $('.find-average').click(function(){
        sum=0;
        n=0;
        $("table tbody").find('tr').each(function(){
            let tds=$(this).children();
            sum+=Number(tds[4].innerHTML);
            console.log(tds[4].innerHTML);
            n++;
        });
        if (n!=0) {sum=sum/n;}
        $('#averageAmongAll').text(sum);
    });

});

