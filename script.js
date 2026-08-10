/* ═════════════ CONTACT FORM ═════════════ */
function sendMail(event){
    event.preventDefault();

    /* ═════════════ ELEMENTS ═════════════ */
    const now=new Date();
    const form=document.getElementById("contact-form");
    const button=form.querySelector('button[type="submit"]');

    const name=document.getElementById("fname").value.trim();
    const email=document.getElementById("femail").value.trim();
    let subject=document.getElementById("fsubject").value;
    const message=document.getElementById("fmessage").value.trim();

    /* ═════════════ CUSTOM SUBJECT ═════════════ */
    if(subject==="Other"){
        subject=document.getElementById("customSubject").value.trim();
        if(subject.length<2){
            Swal.fire({
                icon:"warning",
                title:"Custom Subject Required",
                text:"Please enter your subject."
            });
            return;
        }
    }

    /* ═════════════ VALIDATION ═════════════ */
    if(name.length<2){
        Swal.fire({
            icon:"warning",
            title:"Invalid Name",
            text:"Please enter your full name."
        });
        return;
    }

    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if(!emailPattern.test(email)){
        Swal.fire({
            icon:"warning",
            title:"Invalid Email Address",
            html:`
                Please enter a valid email address.<br><br>
                <b>Examples:</b><br>
                name@gmail.com<br>
                name@yahoo.com<br>
                name@outlook.com
            `,
            confirmButtonColor:"#f97316"
        });
        return;
    }

    if(subject.length<2){
        Swal.fire({
            icon:"warning",
            title:"Subject Required",
            text:"Please enter a subject."
        });
        return;
    }

    if(message.length<10){
        Swal.fire({
            icon:"warning",
            title:"Message Too Short",
            text:"Please enter a more detailed message."
        });
        return;
    }

    /* ═════════════ DISABLE BUTTON ═════════════ */
    button.disabled=true;
    button.innerHTML="Sending...";

    /* ═════════════ EMAIL PARAMETERS ═════════════ */
    const params={
        name,
        email,
        subject,
        message,
        date:now.toLocaleDateString("en-PH",{
            year:"numeric",
            month:"long",
            day:"numeric"
        }),
        time:now.toLocaleTimeString("en-PH",{
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"
        })
    };

    /* ═════════════ LOADING ═════════════ */
    Swal.fire({
        title:"Sending...",
        text:"Please wait while your message is being sent.",
        allowOutsideClick:false,
        allowEscapeKey:false,
        didOpen:()=>Swal.showLoading()
    });

    /* ═════════════ SEND EMAIL ═════════════ */
    emailjs.send("service_vv1jnrh","template_mgrqvkt",params)

    .then(function(response){
        console.log("SUCCESS!",response);
        Swal.close();
        Swal.fire({
            icon:"success",
            title:"Message Sent!",
            text:"Thank you for contacting me. I'll get back to you as soon as possible.",
            confirmButtonColor:"#f97316",
            timer:2500,
            timerProgressBar:true,
            showConfirmButton:false
        });
        form.reset();
    })

    .catch(function(error){
        console.error("FAILED!",error);
        Swal.close();
        Swal.fire({
            icon:"error",
            title:"Message Not Sent",
            text:"Something went wrong while sending your message. Please try again.",
            confirmButtonColor:"#ef4444"
        });
    })

    .finally(function(){
        button.disabled=false;
        button.innerHTML="Send Message →";
    });
}

/* ═════════════ CUSTOM SUBJECT ═════════════ */
function toggleCustomSubject(){
    const subject=document.getElementById("fsubject").value;
    const custom=document.getElementById("customSubject");

    if(subject==="Other"){
        custom.style.display="block";
        custom.required=true;
    }else{
        custom.style.display="none";
        custom.required=false;
        custom.value="";
    }
}

/* ═════════════ SUBJECT COLOR ═════════════ */
function updateSubjectColor(select){
    if(select.value===""){
        select.classList.remove("text-white");
        select.classList.add("text-zinc-600");
    }else{
        select.classList.remove("text-zinc-600");
        select.classList.add("text-white");
    }
}