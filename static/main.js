$(function(){
    $(document).on('click', '.navbar-burger', function(e){
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    })
})