$(document).ready(function() {
  let searchParams = new URLSearchParams(window.location.search)
  let id = searchParams.get('id')



  const url = `api/news/${id}`
  $.ajax({
    url,
    method: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
      console.log(data);
      fillFormInputsWithItem(data);
    },
    error: (error) => {
      console.log(error);
    }
  });



  function fillFormInputsWithItem(item) {
    let formattedDate = moment(item.created).format('MM/DD/YYYY');
    $(".title").val(item.title);
    $(".date").val(formattedDate);
    $(".source").val(item.source);
    $(".summary").val(item.summary);
  }

  $(".edit-form").submit((event) => {
    event.preventDefault()
    const url = "/api/news/";
    const newsDetails = {
      title: $("input[name=title]").val(),
      date: $("input[name=date]").val(),
      source: $("input[name=source]").val(),
      summary: $("textarea[name=summary]").val()
    }
    $.ajax({
      url,
      method: id? "PUT" : "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newsDetails),
      success: (data) => {
        console.log(data)
        // NEWS ITEM SUCCESFULLY CREATED
        window.location.href = "/member-news.html"
      },
      error: (error) => {
        console.log(error);
      }
    });

  });



  //
})
