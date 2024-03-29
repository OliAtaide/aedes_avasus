let questoes;
var acertos = 0;
var acertou = false;

function printQuestoes(num) {
  $.ajax({
    url: "../scripts/aedes.json",
    dataType: "json",
    type: "GET",
    success: function (_data) {
      questoes = _data[num].questoes;
      _data[num].questoes.forEach(function (value, i) {
        $(".game-body").append(
          `
                        <div style="display: none;" class="card game-card game-card-${i} m-auto">
                            <h4 class="card-title text-center my-auto"> 
                                ${value.titulo}
                            </h4>
                            <div class="row">
                                <div class="col">
                                    <button class="btn btn-opt w-100" data-value="0" data-index="${i}">
                                        Mito
                                    </button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-opt w-100" data-value="1" data-index="${i}">
                                        Verdade
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style="display: none;" class="card game-card game-card-${i}-result m-auto" >
                            <h1 class="card-title my-auto text-center">
                                
                                ${value.verdade ? "VERDADE" : "MITO"}
                                <i class='bi'></i><br>
                            </h1>
                            <h4>
                                ${value.texto}
                            </h4>
                            <div class="row">
                                <div class="col">
                                    <button class="btn btn-back w-100" data-current="game-card-${i}">
                                        Voltar
                                    </button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-next w-100" data-next="game-card-${
                                      i + 1
                                    }">
                                        Próxima Pergunta
                                    </button>
                                </div>
                            </div>
                        </div>
                        `
        );
        if (i == questoes.length - 1) {
          $(".game-body").append(
            `
                            <div style="display: none;" class="card game-card game-card-${
                              i + 1
                            } p-3 m-auto" >
                                <h4 class="card-title text-center my-auto">
                                    VOCÊ COMPLETOU!
                                    <br><br>
                                    Pontuação: X/7
                                </h4>
                                <div class="row">
                                    <div class="col">
                                        <a href="jogo1.html" class="btn btn-opt w-100">
                                            Refazer teste
                                        </a>
                                    </div>
                                    <!-- 
                                    <div class="col">
                                      <button onclick="window.open('','_self').close();" class="btn w-100" data-next="game-card-0">
                                          Finalizar
                                      </button>
                                    </div>
                                    -->
                                </div>
                            </div>
                            `
          );
        }
      });
    },
    error: function (request, error) {
      console.log(error);
      alert(" Can't do because: " + error);
    },
  });
}

$(document).on("click", ".btn-next", function () {
  const next = $(this).data("next");
  $(".game-card").hide();
  $("." + next).show();
});

$(document).on("click", ".btn-opt", function () {

  var index = $(this).data("index");
  var resposta = $(this).data("value");

  var result_title = $(`.game-card-${index}-result .card-title`);

  var result_icon = $(`.game-card-${index}-result .bi`);

  result_title.removeClass('card-title-right');
  result_title.removeClass('card-title-wrong');
  result_icon.removeClass('bi-check-circle');
  result_icon.removeClass('bi-x-circle');

  if (resposta == questoes[index].verdade) {
    acertos++;
    acertou = true;
    result_title.addClass('card-title-right');
    result_icon.addClass('bi-check-circle');
  } else {
    acertou = false;
    result_title.addClass('card-title-wrong');
    result_icon.addClass('bi-x-circle');
  }
  if (index == questoes.length - 1) {
    $(".game-card-" + (index + 1) + " h4").html(
      "VOCÊ COMPLETOU!<br><br>Pontuação: " + acertos + "/7"
    );
  }
  $(".game-card").hide();
  $(".game-card-" + index + "-result").show();
});

$(document).on("click", ".btn-back", function () {
  const current = $(this).data("current");
  $(".game-card").hide();
  $("." + current).show();

  if (!acertou) {
    acertos--;
  }
});
