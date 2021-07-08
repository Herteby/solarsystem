$(function(){
    var labels = false;
    $('.description').hide();
    $('.planet').mouseover(function(){
        $('.description[name='+ $(this).attr('id') +']').stop().show();
    });
    $('.planet').mouseout(function(){
        if(!labels){
            $('.description[name='+ $(this).attr('id') +']').stop().hide();
        }
    });
    $('#labels').click(function(){
        if($('body').hasClass('notransitions')){
            var speed = 0;
        } else {
            var speed = 400;
        }
        $(this).toggleClass('on');
        if(labels){
            $('.description').stop().fadeOut(speed);
            labels = false;
        } else {
            $('.description').stop().fadeIn(speed);
            labels = true;
        }
    });
    $('#orbits').click(function(){
        $(this).toggleClass('on');
        $('body').toggleClass('noorbits');
    });
    $('#relative').click(function(){
        $(this).toggleClass('on');
        $('body').toggleClass('relative');
        $('.suntoggle').toggleClass('hidden');
        if(!$(this).hasClass('on')){
            $('#relativesun').removeClass('on');
            $('body').removeClass('relativesun');
        }
    });
    $('#relativesun').click(function(){
        $(this).toggleClass('on');
        $('body').toggleClass('relativesun');
    });
    
    $('#zoom').slider({
        min:0.2,
        max:4,
        value:1,
        step:0.01,
        slide:function(e, ui){
            $('#solarsystem').css('transform','scale(' + ui.value + ',' + ui.value + ')');
        }
    });
    $('body').mousewheel(function(e){
        var scale = $('#zoom').slider('value');
        $('#zoom').slider('value', scale + e.deltaY * scale / 5);
        scale = $('#zoom').slider('value');
        $('#solarsystem').css('transform','scale(' + scale + ',' + scale + ')');
    });
    
    $('.ui-slider-handle').mousedown(function(){
        $('body').addClass('grabbing');
    });
    $(document).mouseup(function(){
        $('body').removeClass('grabbing');
    });
    
    
    function step(){
        requestAnimationFrame(step);
        $('.planet').each(function(){
            var offset = $(this).find('.anchor').offset();
            offset.top = Math.floor(offset.top - 19);
            offset.left = Math.floor(offset.left + 12);
            $('.description[name='+ $(this).attr('id') +']').offset(offset);
        });
    }
    requestAnimationFrame(step);
});