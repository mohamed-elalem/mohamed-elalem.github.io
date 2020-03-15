$(document).ready(() => {
   $('.search-form').submit((e) => {
       console.log('Here');
       e.preventDefault();
       $('.search-btn').attr('disabled', true);
       $.ajax({
           url: `http://localhost:8080/dictionary-project/lookup?${$(e.target).serialize()}`,
           success: (res) => {
               let counter = 1;
               $('.result-section').empty();
               res.forEach(entry => {
                  $('.result-section').append(`
                    <div class="record">
                        <div class="counter">
                            ${counter++}
                        </div>
                        <div class="word-type">
                            ${entry.wordType}
                        </div>
                        <div class="word-definition">
                            ${entry.definition}
                        </div>
                    </div>
`)
               });
           },
           error: (err) => {
           },
           complete: () => {
            $('.search-btn').attr('disabled', false);
           }
        });
   });
});
