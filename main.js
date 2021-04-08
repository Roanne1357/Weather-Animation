let rainyDay = {};

$.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=02c9e65f81988386ebf7ebf7b5557d2c&units=metric&lang=kr',
    async: false,
    dataType: 'json',
    success: function (json) {
        const wIcon = json.weather[0].icon.substring(0, 2);
        button(wIcon);
        viewWeather();
    }
});

function button(icon){
    const cloudSunIcon = $('#cloudSunIcon')[0];
    const cloudIcon = $('#cloudIcon')[0];
    const cloudRainIcon = $('#cloudRainIcon')[0];
    const smogIcon = $('#smogIcon')[0];
    const snowIcon = $('#snowIcon')[0];
    if (icon === "01" || icon === "02") {
        cloudSunIcon.checked  = true;
    }
    else if (icon === "03" || icon === "04") {
        cloudIcon.checked  = true;
    }
    else if (icon === "09" || icon === "10") {
        cloudRainIcon.checked  = true;
    }
    else if (icon === "13") {
        snowIcon.checked  = true;
    }
    else if (icon === "50") {
        smogIcon.checked  = true;
    }
}

function rain(){
    const image = document.getElementById('background');
    image.onload = function(){
        rainyDay = new RainyDay({
            image: this,
            fps: 30,
            blur: 10
        })
    }
    image.src = 'img/BG_photo.png';
}

function viewWeather(){
    const cloudSunIcon = $('#cloudSunIcon')[0];
    const cloudIcon = $('#cloudIcon')[0];
    const cloudRainIcon = $('#cloudRainIcon')[0];
    const smogIcon = $('#smogIcon')[0];
    const snowIcon = $('#snowflakeIcon')[0];
    const rainEffectChk = $('#rainCheck')[0];
    const sunEffect = $('#sun');
    const smogEffect = $('.fog-img');
    const snowEffect = $('#snow_fall');
    const cloudImg = $('#cloudImg');
    if (cloudSunIcon.checked) {
        sunEffect.removeClass('hidden');
        cloudImg.removeClass('dark');
        smogEffect.addClass('hidden');
        snowEffect.addClass('hide');
        if (rainEffectChk.className == 'rain on') {
            $(window).off("resize");
            rainyDay.destroy();
            rainEffectChk.className = 'rain off';
        }
    }
    else if (cloudIcon.checked) {
        sunEffect.addClass('hidden');
        cloudImg.removeClass('dark');
        smogEffect.addClass('hidden');
        snowEffect.addClass('hide');
        if (rainEffectChk.className == 'rain on') {
            $(window).off("resize");
            rainyDay.destroy();
            rainEffectChk.className = 'rain off';
        }
    }
    else if (cloudRainIcon.checked) {
        rainEffectChk.className = 'rain on';
        rain();
        $(window).resize(function(){
            rainyDay.destroy();
            rain();
        });
    }
    else if (snowIcon.checked) {
        cloudImg.removeClass('dark');
        smogEffect.addClass('hidden');
        snowEffect.removeClass('hide');
        if (rainEffectChk.className == 'rain on') {
            $(window).off("resize");
            rainyDay.destroy();
            rainEffectChk.className = 'rain off';
        }
    }
    else if (smogIcon.checked) {
        sunEffect.addClass('hidden');
        cloudImg.addClass('dark');
        smogEffect.removeClass('hidden');
        snowEffect.addClass('hide');
        if (rainEffectChk.className == 'rain on') {
            $(window).off("resize");
            rainyDay.destroy();
            rainEffectChk.className = 'rain off';
        }
    }
}

$('.radio').change(function(){
    viewWeather();
});