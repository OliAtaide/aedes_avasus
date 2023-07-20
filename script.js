var questoes;
var acertos = 0;

function printQuestoes(num) {
    $.ajax({
        url: './aedes.json',
        dataType: "json",
        type: 'GET',
        success: function (_data) {
            questoes = _data[num].questoes;
            _data[num].questoes.forEach(function (value, i) {
                $('.game-body').append(
                    `
                        <div style="display: none;" class="card game-card game-card-`
                    + i +
                    ` p-3 m-auto" data-index="` + i + `">
                            <h4 class="card-title text-center my-auto">
                                `
                    + value.titulo +
                    `
                            </h4>
                            <button class="btn btn-opt mb-2" data-value="0">
                                Mito
                            </button>
                            <button class="btn btn-opt" data-value="1">
                                Verdade
                            </button>
                        </div>
                        <div style="display: none;" class="card game-card game-card-`
                    + i +
                    `-result p-3 m-auto" >
                            <h4 class="card-title text-center my-auto">
                                `
                    +
                    (i.verdade ? 'VERDADE' : 'MITO  ') +
                    `
                                <br><br>
                                `
                    +
                    value.texto +
                    `
                            </h4>
                            <button class="btn btn-next my-2" data-next="game-card-` + (i + 1) + `">
                                Próxima Pergunta
                            </button>
                            <button class="btn btn-back">
                                Voltar
                            </button>
                        </div>
                        `
                )
                if (i == questoes.length - 1) {
                    $('.game-body').append(
                        `
                            <div style="display: none;" class="card game-card game-card-`
                        + (i + 1) +
                        ` p-3 m-auto" >
                                <h4 class="card-title text-center my-auto">
                                    VOCÊ COMPLETOU!
                                    <br><br>
                                    Pontuação: X/7
                                </h4>
                                <div class="row">
                                    <div class="col-6">
                                        <a href="/jogo1.html" class="btn btn-opt w-100">
                                            Refazer teste
                                        </a>
                                    </div>    
                                    <div class="col-6">
                                        <a href="/jogo2.html" class="btn btn-next w-100" data-next="game-card-` + (i + 1) + `">
                                            Avançar
                                        </a>
                                    </div>    
                                </div>
                            </div>
                            `
                    )
                }
            });
        },
        error: function (request, error) {
            console.log(error);
            alert(" Can't do because: " + error);
        },
    })
}

$(document).on("click", '.btn-next', function () {
    var next = $(this).data('next');
    $(this).parent().hide();
    $('.' + next).show();
});

$(document).on("click", '.btn-opt', function () {
    var index = $(this).parent().data('index');
    var resposta = $(this).data('value');
    if (resposta == questoes[index].verdade) {
        acertos++;
    }
    if (index == questoes.length - 1) {
        $('.game-card-' + (index + 1) + ' h4').html(
            "VOCÊ COMPLETOU!<br><br>Pontuação: " + acertos + "/7"
        )
    }
    $(this).parent().hide();
    $('.game-card-' + index + '-result').show();
});