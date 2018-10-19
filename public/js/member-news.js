$(document).ready(function() {
    const url = "api/news/"
    $.ajax({
        url,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
            console.log(data);
            const results = generateNewsItemsString(data.newsitems);
            console.log('resssssss',)
            $('.news').html(results);
        },
        error: (error) => {
          console.log(error);
        }
      });

  function generateNewsItem(item) {
    let formattedDate = moment(item.created).format('MM/DD/YYYY');
    console.log('in generatenewsitem', item.id);
    return `
        <div class='news-item'>
        <h2>${item.title}</h2>
        <span id=${item.id}  class= "delete-newsitem-button">X</span>
        <a href="/edit-member-news.html?id=${item.id}" class= "edit-newsitem-button"><i class="far fa-edit"></i></a>
        </header>
        <p>Published on: ${formattedDate}
        </p>
        <p>Source: ${item.source}
        </p>
        <p>
          Summary: ${item.summary}
        </p>
        </div>`;
  }

      function generateNewsItemsString(itemList) {
        const items = itemList.map(item => generateNewsItem(item));
        return items.join("");
      }

  
    $(document).on('click', '.delete-newsitem-button', event => {
    console.log("Delete")
    event.preventDefault();
    const url = "/api/news/";
    const id = event.target.id;
    console.log(id)
    const slug = id ? id : "";
    $.ajax({
      url: url + id,
      method: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log(data)
        // NEWS ITEM SUCCESFULLY DELETED
        window.location.href = "/member-news.html"
      },
      error: (error) => {
        console.log(error);
      }

    });
  })
    
    
})