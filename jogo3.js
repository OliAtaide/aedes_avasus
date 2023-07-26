var grupos, botoes;

function printInputs() {
    $.ajax({
        url: './aedes.json',
        dataType: "json",
        type: 'GET',
        success: function (_data) {
            grupos = _data[2].grupos
            botoes = _data[2].botoes

            botoes.forEach(function (value, i) {
                $('.row-grupos').append(
                    '<div class="col-2"><button class="btn btn-grupo" data-index="' + i + '">'
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

                        var btn = $('.row-grupos .col-2:nth-child(' + (index + 1) + ') button')
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

$(document).on('click', '.btn-verif', function () {
    if ($('.ui-dropped').length, (grupos.length * 3)) {
        $('.ui-dropped').each(function (value, i) {
            console.log($(this).data('grupo'))
            var botao = botoes[$(this).val()]
            var grupo = $(this).data('grupo')
            var tipo = $(this).data('tipo')
            if (grupo == botao.grupo && tipo == botao.tipo) {
                $(this).addClass('ui-right');
            }
            else {
                $(this).addClass('ui-wrong');
            }
        });
    }

})

var height = $(window).height() - $('.table').offset().top;

$('.table').height(height)

printInputs();