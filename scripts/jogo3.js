var grupos, botoes;

var current_index = -1;

function printInputs() {
  $.ajax({
    url: "../scripts/aedes.json",
    dataType: "json",
    type: "GET",
    success: function (_data) {
      grupos = _data[2].grupos;
      botoes = shuffle(_data[2].botoes);

      botoes.forEach(function (value, i) {
        $(".row-grupos").append(
          '<div class="col-2 col-grupo"><button class="btn btn-grupo" data-index="' +
            i +
            '">' +
            (i + 1) +
            "</button></div>"
        );
      });

      grupos.forEach(function (value, i) {
        $("tbody ." + value).append(
          `
          <td>
            <div class="d-flex">
              <button type="button" title="" data-grupo='${value}' data-tipo=1 class="btn-input"></button>
            </div>
          </td>
          <td>
            <div class="d-flex">
              <button type="button" title="" data-grupo='${
                value == "A1" || value == "A2" ? "O" : value
              }' data-tipo=2 class="btn-input"></button>
            </div>
          </td>
          <td>
            <div class="d-flex">
              <button type="button" title="" data-grupo='${value}' data-tipo=3 class="btn-input"></button>
            </div>
          </td>
          `
        );
      });

      $(".btn-input").droppable({
        accept: ".btn",
        tolerance: "pointer",
        drop: function (event, ui) {
          if (!$(this).hasClass("ui-dropped")) {
            var index = ui.draggable.data("index");

            $(this).val(index);
            $(this).html(botoes[index].texto);
            $(this).addClass("ui-dropped");

            var btn = $(".col-grupo:nth-child(" + (index + 1) + ") button");
            btn.prop("disabled", true);

            ui.draggable.remove();
          }
        },
      });
    },
    error: function (request, error) {
      console.log(error);
    },
  });
}

$(document).on("click", ".btn-grupo", function () {
  $(".btn-grupo-texto").html(
    '<div type="button" class="btn d-flex align-items-center" data-index="' +
      $(this).data("index") +
      '">' +
      botoes[$(this).data("index")].texto +
      "</div>"
  );
  $(".btn-grupo-texto .btn").draggable();
  current_index = $(this).data("index");
});

// mobile
/*
$(document).on('click', '.btn-input', function () {
    console.log(current_index);
    if (current_index != -1 && !$(this).hasClass('ui-dropped')) {
        $(this).val(current_index);
        $(this).html(
            '<div class ="d-sm-none">' + (current_index + 1) +
            '</div><div class="d-none d-sm-block">' +
            botoes[current_index].texto +
            '</div>'
        );
        $(this).addClass('ui-dropped')

        var btn = $('.col-grupo:nth-child(' + (current_index + 1) + ') button')
        btn.prop('disabled', true)

        //ui.draggable.remove();

        current_index = -1;
    }
})
*/

//

$(document).on("click", ".ui-dropped:not(.ui-result)", function () {
  const val = $(this).val();
  const btn = $(`[data-index='${val}']`);
  btn.prop("disabled", false);
  $(this).removeClass("ui-dropped");
  $(this).html("");
});

const success = new bootstrap.Modal("#successModal", {
  backdrop: "static",
  keyboard: false,
});

$(document).on("click", ".btn-verif", function () {
  if ($(".ui-dropped").length == grupos.length * 3) {
    var acertos = 0;

    $(".ui-dropped").each(function (value, i) {
      console.log($(this).data("grupo"));
      var botao = botoes[$(this).val()];
      var grupo = $(this).data("grupo");
      var tipo = $(this).data("tipo");

      // var a1_n_a2 = (grupo = "A1A2");
      // var a1_or_a2 = botao.grupo == "A1" || botao.grupo == "A2";
      // (a1_n_a2 && a1_or_a2) ||

      var condition1 = grupo == botao.grupo;
      var condition2 = tipo == botao.tipo;

      console.log(botao.grupo, grupo);
      console.log(botao.tipo, tipo);

      $(this).addClass("ui-result");

      if (condition1 && condition2) {
        $(this).addClass("ui-right");
        acertos++;
      } else {
        $(this).addClass("ui-wrong");
      }
    });
    if (acertos == grupos.length * 3) {
      success.show();
    }

    $(".btn-verif").hide();
    $(".btn-retry").show();
    $(".btn-end").show();
    $(".btn-input").prop("disabled", true);
  }
});

$(document).on("click", ".btn-retry", function () {
  $(".ui-result").removeClass("ui-result");

  $(".ui-wrong").each(function (params) {
    var index = $(this).val();
    console.log(index);
    var btn = $(".btn-grupo[data-index=" + index + "]");
    console.log(btn);
    btn.prop("disabled", false);
    $(this).removeClass("ui-wrong");
    $(this).removeClass("ui-dropped");
    $(this).val("");
    $(this).html("");
    $(".btn-verif").show();
    $(".btn-retry").hide();
    $(".btn-input").prop("disabled", false);
  });
});

//var height = $(window).height() - $('.table').offset().top;

//$('.table').height(height)

printInputs();
