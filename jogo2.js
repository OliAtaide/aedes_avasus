var criadouros = [];

function imprimirGrupo(index, letra) {
    return ('<div data-index=' + index +
        ' data-value=' + letra +
        ' class="btn btn-grupo">'
        + letra + '</div>')
}

function printQuestoes() {
    $.ajax({
        url: './aedes.json',
        dataType: "json",
        type: 'GET',
        success: function (_data) {
            criadouros = _data[1].criadouros;
            _data[1].grupos.forEach(function (value, i) {
                var content = '';
                console.log(value.quantidade)
                for (let j = 0; j < value.quantidade; j++) {
                    content += imprimirGrupo(i, value.letra)
                }
                $('.row-grupos').append(
                    '<div class="col-6 col-grupo col-grupo-' + value.letra + '">'
                    + content +
                    '</div>'
                )
            })
            $('.btn-grupo').draggable();

            _data[1].criadouros.forEach(function (value, i) {
                $('.row-criadouros').append(
                    `
                    <div class="col-3 col-criadouro">
                        <div class="flex-criadouro d-flex flex-column justify-content-center">
                            <p class="text-center">`
                    + value.titulo +
                    `
                            </p>
                            <div class="close-container">
                            </div>
                            <input data-index=`
                    + i +
                    ` class="input-criadouro" disabled>
                        </div>
                    </div>
                    `
                );
            })

            $('.input-criadouro').droppable({
                accept: ".btn-grupo",
                tolerance: "pointer",
                drop: function (event, ui) {
                    console.log($(this), ui.draggable.data("value"));
                    $(this).val(ui.draggable.data("value"));
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

$(document).on('click', '.close-container', function () {
    var input = $(this).parent().find('input');
    console.log($('.col-grupo-' + input.val()));
    $('.col-grupo-' + input.val()).append(
        imprimirGrupo(input.data('index'), input.val())
    )
    input.val('');
    input.removeClass('ui-dropped');
})

printQuestoes();
