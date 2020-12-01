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

$(document).ready(function() {
//По нажатию на кнопку переходим в editMode
    $(".editButton").click(function(){
        //Делаем выбранный ряд серым
        $(this).parent().parent().css('background-color','#CCCCCC');
        editMode=true;
        editIndex=$(this).parent().parent().index();

        $("#name").val(arr[editIndex].name);
        $("#surname").val(arr[editIndex].surname);
        $("#age").val(arr[editIndex].age);
        $("#averageMark").val(arr[editIndex].averageMark);

        $('.add-row').val('Edit');
        console.log(editMode);
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
//!!! Я добавляю элемент markup. Я много раз проверял но так и не нашел ошибку. Здесь я добавляю точно <tr></tr> с пятью тегами <td> внутри.Однако по какой-то причине выводится еще и 6 столбец.

//!!! Также здесь у меня внутри первого столбца добавляются кнопка чекбокс и заскриптованная кнопка-изображение. У всех img класс=editButton, однако, ивент выше ($(.editButton).click()) работает только с первым элементом класса(написанным тегами в html по умолчанию)
            let markup = `<tr><td><input type="checkbox" name="record"><img src="edit.png" alt="editButton" class="editButton" width="18px" height="18px"></td><td>` + arr[counter].name + "</td><td>" + arr[counter].surname + "</td><td>"+ arr[counter].age +"</td><td>"+ arr[counter].averageMark +"<td/></tr>";
            //Добавляем наш макетик
            $("table tbody").append(markup);
            //Увеличиваем counter массива
            counter++;
            //Служебная информация. Отображаем массив в консоль для проверки
            console.log(arr);
             }
        else
        {
            //Режим редактирования
            //Меняем элемент массива
            arr[editIndex].name = $("#name").val();
            arr[editIndex].surname = $("#surname").val();
            arr[editIndex].age = $("#age").val();
            arr[editIndex].averageMark = $("#averageMark").val();
            //Выводим в консоль новые значения
            console.log(arr[editIndex]);
            //Меняем значения строки

//!!! Тут вообще я не понимаю. Я лазил по разным сайтам, читал документацию, использовал разные сочетания селекторов и функции (html,text,val). Элемент массива изменяется как надо, а вот код ниже, просто не находит нужные элементы DOM-дерева.
            $("#studentList").children("tr:eq(editIndex)").children("td:eq(1)").html("arr[editIndex].name");
            $("#studentList").children("tr:eq(editIndex)").children("td:eq(2)").html("arr[editIndex].surname");
            $("#studentList").children("tr:eq(editIndex)").children("td:eq(3)").html("arr[editIndex].age");
            $("#studentList").children("tr:eq(editIndex)").children("td:eq(4)").html("arr[editIndex].averageMark");

            $("#studentList").children(":eq(editIndex)").css('background-color','#FFFFFF');
            //Обратно меняем на false
            editMode=false;
            //Обратно меняем текст кнопки на add row
            $('.add-row').val('Add row');
            };
        });
//Удаление строки и элемента массива
    $(".delete-row").click(function(){
            editMode=false;
            $("table tbody").find('input[name="record"]').each(function(){
                if($(this).is(":checked")){
                    let row=$(this).parent().parent();
                    let index=row.index();
                    $(this).parents("tr").remove();
                    counter--;
                    arr.splice(index,1);
                    console.log(arr);
                }
            });
        });
});

