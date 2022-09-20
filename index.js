function getPlans() {

    var html = '<option value="0" disabled selected>Select Plan</option>';
    html += '<option value="200">Static IP - Monthly Charges - Rs.200/- </option>';
    html += '<option value="2400">Static IP - Lifetime Charges - Rs.2400/- </option>';
    html += '<option disabled></option>';
    html += '<b><option disabled class="exciting">     *** New Exciting Offers  ***</option>';
    html += '<option disabled class="bold"><b>              Unlimited Plans         <b></option>';
    html += '<option disabled></option>';
    
    html += '<option value="499">30 MBPS - unlimited - 30 Days - Rs. 499/- </option>';
    html += '<option value="649">50 MBPS - unlimited - 30 Days - Rs. 649/- </option>';
    html += '<option value="749">100 MBPS - unlimited - 30 Days - Rs. 749/- </option>';
    html += '<option value="899">150 MBPS - unlimited - 30 Days - Rs. 899/- </option>';

   //  html += '<option disabled>--------------------------------------------------------------------------------</option>';
   //  html += '<option disabled class="exciting"> Fair Usage Policy ( FUP ) Plans</option>';
   // html += '<option disabled></option>';

   // html += '<option value="649">50 MBPS 1TB - 30 Days - Post FUP: 3 mbps - Rs. 649/- </option>';
   // html += '<option value="749">100 MBPS 1TB - 30 Days - Post FUP: 5 mbps - Rs. 749/- </option>';
   //  html += '<option value="899">150 MBPS 1TB - 30 Days - Post FUP: 8 mbps - Rs. 899/- </option>';

    $('#sel1').html(html);
}

$(function() {
    var total = 0.0;
    var plan = "";
    var customerid = "";
    var customername = "";

    getPlans();    

    $('#sel1').on('change', function() {
        $('#msg').hide();
        
        plan = $("#sel1 :selected").text();
        
        var planamount = parseFloat(this.value);
        var gst = planamount * 0.18;
        total = planamount + gst;
        total = total.toFixed(2);
    
        $('#total').show();
        $('#withgst').css("color", "green");
        $('#withgst').html(total);
    });

    $('#payonline').unbind('click').click( function(e) {
        $('#msg').hide();
        
        if (!$.trim($('#sel1').val())) {
            $('#msg').html("* Please select plan");
            $('#msg').css("color", "red");
            $('#msg').show();
            return
        }

        if (!$.trim($('#custid').val())) {
            $('#msg').html("* Please provide your Customer ID");
            $('#msg').css("color", "red");
            $('#msg').show();
            return
        }

        if ($('#custid').val().length < 3){
            $('#msg').html("* Enter valid Customer ID");
            $('#msg').css("color", "red");
            $('#msg').show();
            return 
        }
                    
        if (!$.trim($('#custname').val())) {
            $('#msg').html("* Please provide your Customer Name");
            $('#msg').css("color", "red");
            $('#msg').show();
            return
        }

        var paise = Math.round(total * 100,2) ;
        customerid = $('#custid').val();
        customername = $('#custname').val();
        
        var options = {
            // "key" : "rzp_live_3hD7FjHA86JbNN",
            "key" : "rzp_live_qw5VwHhKevvb8x",
            "amount" : paise, // 2000 paise = INR 20
            "name" : "Aeroway Networks Private Limited",
            "description" : plan,
            "image" : "image/logo-sample.png",
            "handler" : function(response) {
                console.log(response);
                if (response.razorpay_payment_id) {
                    alert("Payment Successful");
                    location.reload();
                }
            },
            "prefill" : {
                "name" : "",
                "email" : ""
            },
            "notes" : {
                "Plan Details" : plan,
                "Customer ID" : customerid,
                "Customer Name" : customername
            },
            "theme" : {
                "color" : "#0275d8"
            }
        };
        
        var rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

    });
});
