

$(document).ready(function() {
    var MAX_QUESTIONS = 10;
    $('#parliamentaryQuestionForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                    notEmpty: {
                        message: 'A title for the question is required'
                    },
                    stringLength: {
                        max: 200,
                        message: 'The title must be less than 200 characters long'
                    }
                }
            },
            introductoryText: {
                validators: {
                   notEmpty: {
                        message: 'An introductory text is required'
                    },
                }
            },
            'question[]': {
                    validators: {
                        notEmpty: {
                            message: 'The question required and cannot be empty'
                        },
                    }
           },
        }
  })
  .on('click', '.addButton', function() {
      var $template = $('#questionTemplate'),
          $clone    = $template
                          .clone()
                          .removeClass('hide')
                          .removeAttr('id')
                          .insertBefore($template),
          $question   = $clone.find('[name="question[]"]');

      $('#parliamentaryQuestionForm').bootstrapValidator('addField', $question);
  })

  .on('click', '.removeButton', function() {
      var $row    = $(this).parents('.form-group'),
          $question = $row.find('[name="question[]"]');
      $row.remove();
      $('#parliamentaryQuestionForm').bootstrapValidator('removeField', $question);
  })

  .on('added.field.bv', function(e, data) {
      if (data.field === 'question[]') {
          if ($('#parliamentaryQuestionForm').find(':visible[name="question[]"]').length >= MAX_QUESTIONS) {
              $('#parliamentaryQuestionForm').find('.addButton').attr('disabled', 'disabled');
          }
      }
  })

  .on('removed.field.bv', function(e, data) {
     if (data.field === 'question[]') {
          if ($('#parliamentaryQuestionForm').find(':visible[name="question[]"]').length < MAX_QUESTIONS) {
              $('#parliamentaryQuestionForm').find('.addButton').removeAttr('disabled');
          }
      }
  });
});
