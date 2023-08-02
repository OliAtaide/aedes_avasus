var grupos, botoes;

function printInputs() {
    $.ajax({
        url: '../scripts/aedes.json',
        dataType: "json",
        type: 'GET',
        success: function (_data) {
            grupos = _data[2].grupos
            botoes = _data[2].botoes

            botoes.forEach(function (value, i) {
                $('.row-grupos').append(
                    '<div class="col-2 col-grupo"><button class="btn btn-grupo" data-index="' + i + '">'
                    + (i + 1) +
                    '</button></div>'
                )
            })

            grupos.forEach(function (value, i) {
                $('tbody').append(
                    '<tr><th>'
                    + value +
                    '</th><td>' +
                    '<button data-grupo=' + value + ' data-tipo=1 class="btn-input" disabled></button>' + '</td><td>' +
                    '<button data-grupo=' + value + ' data-tipo=2 class="btn-input" disabled></button>' + '</td><td>' +
                    '<button data-grupo=' + value + ' data-tipo=3 class="btn-input" disabled></button>' + '</td></tr>'
                )
            })

            $('.btn-input').droppable({
                accept: ".btn",
                tolerance: "pointer",
                drop: function (event, ui) {
                    if (!$(this).hasClass('ui-dropped')) {
                        var index = ui.draggable.data("index");

                        $(this).val(index);
                        $(this).html(botoes[index].texto);
                        $(this).addClass('ui-dropped')

                        var btn = $('.col-grupo:nth-child(' + (index + 1) + ') button')
                        btn.prop('disabled', true)

                        ui.draggable.remove()
                    }
                }
            });
        },
        error: function (request, error) {
            console.log(error);
        },
    })
}

$(document).on('click', '.btn-grupo', function () {
    $('.btn-grupo-texto').html(
        '<div type="button" class="btn d-flex align-items-center" data-index="' + $(this).data('index') + '">' +
        botoes[$(this).data('index')].texto
        + '</div>'
    )
    $('.btn-grupo-texto .btn').draggable();
})

const success = new bootstrap.Modal('#successModal', {
    backdrop: 'static',
    keyboard: false
})

$(document).on('click', '.btn-verif', function () {
    if ($('.ui-dropped').length == (grupos.length * 3)) {
        var acertos = 0;

        $('.ui-dropped').each(function (value, i) {
            console.log($(this).data('grupo'))
            var botao = botoes[$(this).val()]
            var grupo = $(this).data('grupo')
            var tipo = $(this).data('tipo')
            if (grupo == botao.grupo && tipo == botao.tipo) {
                $(this).addClass('ui-right');
                acertos++;
            }
            else {
                $(this).addClass('ui-wrong');
            }
        });
        if (acertos == (grupos.length * 3)) {
            success.show();
        }
    }

    $('.btn-verif').hide();
    $('.btn-retry').show();
    //}

})

$(document).on('click', '.btn-retry', function () {
    $('.ui-wrong').each(function (params) {
        var index = $(this).val();
        console.log(index);
        var btn = $('.btn-grupo[data-index=' + index + ']');
        console.log(btn);
        btn.prop('disabled', false);
        $(this).removeClass('ui-wrong');
        $(this).removeClass('ui-dropped')
        $(this).val('');
        $(this).html('');
        $('.btn-verif').show();
        $('.btn-retry').hide();
    })
})

var height = $(window).height() - $('.table').offset().top;

$('.table').height(height)

printInputs();