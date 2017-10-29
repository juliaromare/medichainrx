$( document ).ready(function() {
    $(".contactEdit").show();
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });


    var clickBool = false
    var pastTab = "contactEdit";
    var currentTab = "contactEdit"
    var newTab = "";

    var tabTitles = {
        "contactEdit": "Contact information",
        "insuranceEdit": "Insurance",
        "vaccinationEdit": "Vaccinations",
        "familyHistoryEdit": "Family History",
        "preConditionsEdit": "Pre-existing conditions",
        "currentConditionsEdit": "Current conditions",
        "pastConditionsEdit": "Past conditions",

    }


    $("button").mouseover(function () {
        currentTab = this.id;
        clickBool = false;


        if (currentTab != pastTab) {
            $("#" + currentTab).removeClass("btn-default");
            $("#" + currentTab).addClass("btn-primary");
        }

    });


    $("button").mouseout(function () {
        if (clickBool == false && pastTab != currentTab) {

            $("#" + pastTab).removeClass("btn-default");
            $("#" + pastTab).addClass("btn-primary");

            $("#" + currentTab).removeClass("btn-primary");
            $("#" + currentTab).addClass("btn-default");
        }

    });


    $("button").click(function () {

        currentTab = this.id;
        clickBool = true
        if (currentTab == "") {
            newTab = "." + newTab;
        }
        else {
            newTab = "." + currentTab;

        }


        if (currentTab != pastTab) {

            $("#" + pastTab).removeClass("btn-primary");
            $("#" + pastTab).addClass("btn-default");

            $("#" + pastTab).html(tabTitles[pastTab]);

            $("#" + currentTab).removeClass("btn-default");
            $("#" + currentTab).addClass("btn-primary");

            $("." + pastTab).attr('disabled', true);
            $("." + currentTab).attr('disabled', true);
            $("." + pastTab).hide();

            $("." + currentTab).show();

            pastTab = currentTab;


            clickBool = true
        }

        else {
            $("#" + pastTab).html("<b>Edit</b>");
            $('form fieldset').attr('disabled', false);
            $('.' + currentTab).attr('disabled', false);

            $('form fieldset .' + currentTab).show();
            clickBool = true
        }
    });


    $(document).on("click", ".add-pre-condition", function (e) {
        $("." + currentTab + " ul").append('<li>' + $("#input-pre").val() + '</li>');
        //Make POST request
    });

    $(document).on("click", ".add-current-condition", function (e) {
        $("." + currentTab + " ul").append('<li>' + $("#input-current").val() + '</li>');
        //Make POST request
    });

    $(document).on("click", ".add-past-condition", function (e) {
        $("." + currentTab + " ul").append('<li>' + $("#input-past").val() + '</li>');
        //Make POST request
    });

    $(document).on("click", ".add-vaccination", function (e) {
        $("." + currentTab + " ul").append('<li>' + $("#vaccName").val() + ",Shot#" + $("#vaccShot").val() + "," + $("#vaccDate").val() + '</li>');
        //Make POST request
    });

    $(document).on("click", ".add-family", function (e) {
        $("." + currentTab + " ul").append('<li>' + $("#fullName").val() + "," + $("#familyRelationship").val() + "," + $("#conditionLst").val() + '</li>');
        //Make POST request
    });


    $(document).on("click", ".saveChanges", function (e) {
        var postObj = {}


        if (currentTab == "contactEdit") {
            postObj = {
                first: $("#firstName").val(),
                last: $("#lastName").val(),
                address: $("#address").val(),
                zipCode: $("#zipCode").val(),
                cityName: $("#cityName").val(),
                stateName: $("#stateName").val(),
                phone: $("#stateName").val(),
            }
        }


        else if (currentTab == "insuranceEdit") {
            if (currentTab == "contactEdit") {
                postObj = {
                    insuranceName: $("#insuranceName").val(),
                    insuranceNumber: $("#insuranceNumber").val(),
                    insurancePhone: $("#insurancePhone").val(),
                    insuranceAddress: $("#insuranceAddress").val(),
                    insuranceCity: $("#insuranceCity").val(),
                    insuranceZip: $("#insuranceZip").val()
                }
            }
        }

        else if (currentTab == "vaccinationEdit") {
            var index = 0;
            $(".vaccinationEdit ul li").each(function () {

                postObj["vaccination"+index] = this.innerHTML;
                index++;

            })
        }


        else if (currentTab == "familyHistoryEdit") {
            var index = 0;
            $(".familyHistoryEdit ul li").each(function () {

                postObj["family"+index] = this.innerHTML;
                index++;
            })
        }

        else if (currentTab == "preConditionsEdit") {
            var index = 0;
            $(".preConditionsEdit ul li").each(function () {

                postObj["preCondition"+index] = this.innerHTML;
                index++;
            })


        }

        else if (currentTab == "currentConditionsEdit") {
            var index = 0;
            $(".currentConditionsEdit ul li").each(function () {

                postObj["currentCondition"+index] = this.innerHTML;
                index++;
            })


        }

        else if (currentTab == "pastConditionsEdit") {
            var index = 0;
            $(".pastConditionsEdit ul li").each(function () {

                postObj["pastConditionsEdit"+index] = this.innerHTML;
                index++;
            })


        }
        //Make POST request


        $.ajax({
            url: "https://www.medichainrx.com/api/patient/login",
            method: "POST",
            data: postObj,
            success: function(data, status) {
                console.log(status);
                console.log(data);
            }
        });
        console.log(postObj);


    })







});