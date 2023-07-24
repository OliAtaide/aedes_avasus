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
                    '</th><td><textarea disabled></textarea></td><td><textarea disabled></textarea></td><td><textarea disabled></textarea></td></tr>'
                )
            })

            $('textarea').droppable({
                accept: ".btn",
                tolerance: "pointer",
                drop: function (event, ui) {
                    var index = ui.draggable.data("index");
                    console.log(index);
                    $(this).val(botoes[index].texto);
                    $(this).addClass('ui-dropped')
                    ui.draggable.remove()
                }
            });
        },
        error: function (request, error) {
            console.log(error);
            alert(" Can't do because: " + error);
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

printInputs()