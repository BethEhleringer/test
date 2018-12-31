$(document).ready(function() {
   // Getting references to our form and input
   var signUpForm = $("form.signup");
   var emailInput = $("input#email-input");
   var passwordInput = $("input#password-input");
   var userFullName = $("input#full-name");
   var companyName = $("input#company-name");
     
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

   // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/newuser", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

/*
  $(document).on("click", ".signupbtn", submitSignup);

  function submitSignup(event) {
    event.preventDefault();

    var isFormValid = true;
    //Check to see if all the field are filled
    $("#signup-form input").each(function() {
      if ($.trim($(this).val()).length === 0) {
        isFormValid = false;
      }
    });
    if (!isFormValid) {
      alert("Please fill in all the fields");
    } else if (isFormValid) {
      //id association from the sign up page
      var userFullName = $("#full-name");
      var companyName = $("#company-name");
      var email = $("#email-input");
      var password = $("#password-input");
      //variable for storing all inputs in the signup page

      var data = {
        name: userFullName.val().trim(),
        company_name: companyName.val().trim(),
        email: email.val().trim(),
        password: password.val().trim()
      };
      console.log("the user sign up post" + JSON.stringify(data));
      //post the data
      $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/newuser",
        data: JSON.stringify(data)
      });
    }
  }
  $(".cancelbtn").on("click", function(event) {
    event.preventDefault();
    //return to the main page
    window.location = "/";
  });
});
*/
