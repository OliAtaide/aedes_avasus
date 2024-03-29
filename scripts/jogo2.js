var criadouros = [];
var grupos = [];
var current_index = -1;

function imprimirGrupo(index, letra) {
  return `<div data-index="${index}" data-value="${letra}" class="btn btn-grupo btn-grupo-${letra}">${letra}</div>`;
}

function printQuestoes() {
  $.ajax({
    url: "../scripts/aedes.json",
    dataType: "json",
    type: "GET",
    success: function (_data) {
      criadouros = shuffle(_data[1].criadouros);
      grupos = _data[1].grupos;
      grupos.forEach(function (value, i) {
        var content = "";
        for (let j = 0; j < value.quantidade; j++) {
          content += imprimirGrupo(i, value.letra);
        }
        $(".row-grupos").append(
          `<div class=" col-3 col-sm-6 col-grupo col-grupo-${value.letra}">
            ${content} 
          </div>`
        );
      });
      $(".btn-grupo").draggable();

      criadouros.reverse().forEach(function (value, i) {
        $(".row-criadouros").prepend(
          `
            <div class="col-6 col-sm-3 col-criadouro my-2">
              <div class="flex-criadouro d-flex flex-column justify-content-center">
                <div class="d-flex align-items-end mt-auto">
                  <p class="text-center my-2 w-100">
                    ${value.titulo}
                  </p>
                </div>
                <div class="close-container">
                </div>
                <button type="button" data-index=${i} class="input-criadouro" >
                </button>
              </div>
            </div>
          `
        );
      });

      $(".input-criadouro").droppable({
        accept: ".btn-grupo",
        tolerance: "pointer",
        drop: function (event, ui) {
          if ($(this).hasClass("ui-dropped")) {
            $(".col-grupo-" + $(this).val()).append(
              imprimirGrupo($(this).data("index"), $(this).val())
            );
            $(".btn-grupo-" + $(this).val()).draggable();
          }
          $(this).val(ui.draggable.data("value"));
          $(this).html(ui.draggable.data("value"));
          $(this).addClass("ui-dropped");
          ui.draggable.remove();
        },
      });
    },
    error: function (request, error) {
      console.log(error);
      alert(" Can't do because: " + error);
    },
  });
}

$(document).on("click", ".close-container", function () {
  var input = $(this).parent().find("input");
  $(".col-grupo-" + input.val()).append(
    imprimirGrupo(input.data("index"), input.val())
  );
  $(".btn-grupo-" + input.val()).draggable();
  input.val("");
  input.removeClass("ui-dropped");
});

printQuestoes();

$(document).on("click", ".btn-grupo", function () {
  current_index = $(this).data("index");
});

$(document).on("click", ".input-criadouro", function () {
  if ($(this).hasClass("ui-dropped")) {
    $(".col-grupo-" + $(this).val()).append(
      imprimirGrupo($(this).data("index"), $(this).val())
    );
    $(".btn-grupo-" + $(this).val()).draggable();
  }
  if (current_index != -1) {
    const current_btn = $(".btn-grupo[data-index= " + current_index + "]").eq(
      0
    );
    $(this).val(current_btn.data("value"));
    $(this).html(current_btn.data("value"));
    $(this).addClass("ui-dropped");
    current_btn.remove();
    current_index = -1;
  } else {
    $(this).removeAttr("value");
    $(this).html("");
    $(this).removeClass("ui-dropped");
  }
});

$(document).on("click", ".card-feedback .btn-back", function () {
  $(".card-feedback").hide();
  $(".card-criadouro").show();
});

$(document).on("click", ".card-criadouro .btn-feedback", function () {
  $(".card-criadouro").hide();
  $(".card-feedback").show();
});

$(document).on("click", ".btn-verif", function () {
  var acertos = 0;
  if ($(".ui-dropped").length == criadouros.length) {
    $(".ui-dropped").each(function (value, i) {
      var criadouro = criadouros[$(this).data("index")];
      if (criadouro.resposta == $(this).val()) {
        $(this).addClass("ui-right");
        acertos++;
      } else {
        $(this).addClass("ui-wrong");
      }
    });

    $(".modal .card-title").html(
      `Você acertou ${acertos} de ${criadouros.length} criadouros.`
    );

    $(".btn-verif").hide();
    $(".btn-redo").show();
    $(".input-criadouro").prop("disabled", true);

    $("#successModal").modal("show");
  }
});

function refazerTeste() {
  if ($(".ui-wrong").length == 0) {
    $(".ui-right").each(function (index) {
      $(".col-grupo-" + $(this).val()).append(
        imprimirGrupo($(this).data("index"), $(this).val())
      );
      $(".btn-grupo-" + $(this).val()).draggable();
      $(this).removeAttr("value");
      $(this).html("");
      $(this).removeClass("ui-dropped");
      $(this).removeClass("ui-right");
    });
  } else {
    $(".ui-wrong").each(function (index) {
      $(".col-grupo-" + $(this).val()).append(
        imprimirGrupo($(this).data("index"), $(this).val())
      );
      $(".btn-grupo-" + $(this).val()).draggable();
      $(this).removeAttr("value");
      $(this).html("");
      $(this).removeClass("ui-dropped");
      $(this).removeClass("ui-wrong");
    });

    $(".ui-right").removeClass("ui-right");
  }
  $(".btn-verif").show();
  $(".btn-redo").hide();
  $(".input-criadouro").prop("disabled", false);
}

$(document).on("click", ".btn-redo", function () {
  refazerTeste();
});

/*
$(window).on('load', function() {
  $('#successModal').modal('show');
});
*/
