var btn_new,btn_modify,btn_delete,btn_send,btn_cancel;
var table=$('#myTable');
var IDCONTAT,NBCONTACT=0,j=1;
var diverror=$('.error');var k=0;

$(document).ready( function () {
    //initialization of variable
    btn_new=$('#new');
    btn_modify=$('#modify');
    btn_delete=$('#delete');
    btn_send=$('#send');
    btn_cancel=$('#cancel');

    //add table to html page
    ajouterTable();

    $('form').submit(function (event) {
        event.preventDefault();


    });

    //add new Contact
    btn_new.click(function () {

        var firstName_input=$('#firstName').val("");
        var lastName_input=$('#lastName').val("");
        var email_input=$('#email').val("");
        var number_input=$('#numberPhone').val("");


        $('.error').hide();

        $("*").css({

        });
        $('#dialog').addClass("add");
        $('#dialog').dialog({
            height: 430,
            width: 580,
            modal: true,
            resizable: true,
            dialogClass: 'no-close success-dialog dialogg'

        });
    });

    //send new Contact
    btn_send.click(function (event) {
        event.preventDefault();

         person.numberPhone=[];
        var okay=true;

        var firstName_input=$('#firstName').val();
        var lastName_input=$('#lastName').val();
        var email_input=$('#email').val();

        person.numberPhone[0]=$("#numberPhone").val();

        //verifiation

         diverror.show();
        //console.log(person.numberPhone[0]);
        //console.log(firstName_input);


        if(firstName_input=="" || firstName_input==null || firstName_input==undefined){
            diverror.text("First Name should not be empty");okay=false; console.log("firstName_input");
        }
        else if(lastName_input=="" || lastName_input==null || lastName_input==undefined){
            diverror.text("Last Name should not be empty");okay=false;console.log("lastName_input");
        }
        else if(email_input=="" || email_input==null || email_input==undefined ){
            diverror.text("Email should not be empty");okay=false;console.log("email_input");
        }

        else if(person.numberPhone[0]=="" || person.numberPhone[0]==null || person.numberPhone[0]==undefined ){
            diverror.text("First number phone should not be empty");okay=false;console.log("numberPhone");
        }
        else
            diverror.text("");


        if((email_input!="") && (email_input!=null) && (email_input!=undefined)){
            if(!isEmail(email_input)){
                diverror.text("Email is not correct");okay=false;console.log("email_input !=");
            }

        }


        console.log('okay='+okay);

        //--------------------------------------------------------------------------
        person.firstName=firstName_input;
        person.lastName=lastName_input;
        person.email=email_input;


        //----------------------------------------------------------------------------
        console.log(" 1>");

        console.log(person);


        if(okay)
        traitement(person,IDCONTAT);



    });


    function traitement(person,path) {
        j=1;
        //ajouter_ligne_table(person);
        var add=$("#dialog.add").length;

        diverror.text("");
        person.firstName=person.firstName;
        person.lastName=person.lastName;
        person.email=person.email;


        var ensembleContact=$(".numberPhoneMultiple");
        console.log("ensembleContact="+ensembleContact.length);

        ensembleContact.each(function (i,e) {
            var a=$(e).val().trim();
            if((a!=undefined) && (a!="")){
                person.numberPhone[j]=$(e).val();
                console.log('hada '+person.numberPhone[j]+" j="+j);
                j++;
            }
        });


        console.log(person);


        if(add!=0)
            addNewContact("user_"+getPrimaryKey(),person);
        else{
            updateU(IDCONTAT,person);
        }

        $("#dialog").dialog('close');
        //ajouter_ligne_table(person);
        var add=$("#dialog.add").length;

        removeAllnumberPhoneMultiple();
    }


    //bouton cancel
    btn_cancel.click(function () {
        $("#dialog").dialog('close');
        //$(".ui-dialog").dialog('open');
        $('input[type=text]').val("");
        removeAllnumberPhoneMultiple();

    });

});


function ajouterTable() {
    table =$('<table id="myTable" class="table"> <thead>    <tr> <th>Firstname</th> <th>Lastname</th> <th>Email</th> <th>Number phone</th>  </tr> </thead>    <tbody> </tbody> </table>');
    table.appendTo("#divTable");
}

function deleteContact(id) {
    var r = confirm("the contact will be deleted");
    if (r == true) {
        deleteU(id);
    }

}
function deleteAllContact() {
    $("#myTable tr").remove();

}

function modifyContact(button,id) {
removeAllnumberPhoneMultiple();
    IDCONTAT=id;k=0;

    var tr= $("tr").has($(button));
    var tab=[],i=0;

    var td=$("td",tr);

    td.each(function (i,e) {
        if(i<4){
        tab[i++]=$(e).text().trim();
        console.log($(e).text());
        }
    });

    var ol=$("li",tr);
    console.log(ol);

    ol.each(function (i,e) {
        if(k==0){
            var number_input=$('#numberPhone').val($(e).text());k++;
        }
        else{
            showNewInput($(e).text());k++;
         }
    });



    var firstName_input=$('#firstName').val(tab[0]);
    var lastName_input=$('#lastName').val(tab[1]);
    var email_input=$('#email').val(tab[2]);



    $("*").css({

    });
    $('#dialog').removeClass("add");

    $('#dialog').dialog({
        height: 430,
        width: 550,
        modal: true,
        resizable: true,
        dialogClass: 'no-close success-dialog dialogg'
    });



}

function showNewInput(text) {
    console.log("ici"+text);
    var box=$('.box');
        box=$('.box:first').clone();
        box.css("display","block");
        console.log("------------------->"+ $('input',box));
        $('input',box).val(text);

        box.appendTo($('.areaContact'));
        NBCONTACT++;
     //alert(NBCONTACT);
}

function hideBox(id) {
    $('.box').has($(id)).remove();
    NBCONTACT--;
    k--;
}

function removeAllnumberPhoneMultiple() {
    $('.box:not(:first)').remove();
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


function isPhone(email) {
    var regex = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/;
    return regex.test(email);
}


$( function() {
    $( "#progressbar" ).progressbar({
        value: 37
    });
} );