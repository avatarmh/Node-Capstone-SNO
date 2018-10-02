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
            $('.news').html(results);
        },
        error: (error) => {
          console.log(error);
        }
      });

    function generateNewsItemElement(item) {
        let formattedDate = moment(item.created).format('MM/DD/YYYY');

        return `
        <div class='news-item'>
        <h2>${item.title}</h2>
        <h2>Published on: ${formattedDate}</h2>
        <h2>Source: ${item.source}</h2>
        <p>
          Summary: ${item.summary}
        </p>
        </div>`;
      }
    
    function generateNewsItemsString(itemList) {
        const items = itemList.map(item => generateNewsItemElement(item));
        return items.join("");
      }
})