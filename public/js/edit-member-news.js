$(document).ready(function () {
  let searchParams = new URLSearchParams(window.location.search)
  let id = searchParams.get('id')
  $(".subtitle").text(`${id ? "Edit" : "Add"} News`)
  const url = `api/news/${id}`

  if (id) {
    $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      },
      success: (data) => {
        console.log(data);
        fillFormInputsWithItem(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  function fillFormInputsWithItem(item) {
    let formattedDate = moment(item.created).format('MM/DD/YY');
    $(".title").val(item.title);
    $(".date").val(formattedDate);
    $(".source").val(item.source);
    $(".summary").val(item.summary);
  }

  console.log("--")
  $(".edit-form").submit(event => {
    console.log("HI")
    event.preventDefault()
    const url = "/api/news/";
    const slug = id ? id : "";
    const newsDetails = {
      title: $("textarea[name=title]").val(),
      date: $("input[name=date]").val(),
      source: $("input[name=source]").val(),
      summary: $("textarea[name=summary]").val(),
      id
    }

    console.log(newsDetails)
    $.ajax({
      url: url + slug,
      method: id ? "PUT" : "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(newsDetails),
      headers: {
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      },
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
