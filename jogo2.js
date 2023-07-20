var criadouros = [];

function printQuestoes() {
    $.ajax({
        url: './aedes.json',
        dataType: "json",
        type: 'GET',
        success: function (_data) {
            criadouros = _data[1].criadouros;
            _data[1].grupos.forEach(function (value, i) {
                $('.row-grupos').append(
                    `
                    <div class="col-6">
                        <div data-index=` + i + ` data-value=` + value.letra + ` class="btn btn-grupo">
                            `
                    + value.letra +
                    `
                        </div>
                    </div>
                    `
                )
            })
            $('.btn-grupo').draggable();

            _data[1].criadouros.forEach(function (value, i) {
                $('.row-criadouros').append(
                    `
                    <div class="col-3">
                        <div class="d-flex flex-column justify-content-center">
                            <p class="text-center">`
                    + value.titulo +
                    `
                            </p>
                            <input data-index=`
                    + i +
                    ` class="input-criadouro" value="A" disabled>
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

printQuestoes();

