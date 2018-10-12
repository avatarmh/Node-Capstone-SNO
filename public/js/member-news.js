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
           // console.log('resssssss', results)
            $('.news').html(results);
        },
        error: (error) => {
          console.log(error);
        }
      });

    function generateNewsItem(item) {
        let formattedDate = moment(item.created).format('MM/DD/YYYY');
//        console.log('in generatenewsitem', item.id);
        return `
        <div class='news-item'>
        <h2>${item.title}</h2>
        <button class= "remove-newsitem-button">X</button>
        <a href="/edit-member-news.html?id=${item.id}" class= "edit-newsitem-button"><i class="far fa-edit"></i></a>
        </header>
        <h2>Published on: ${formattedDate}</h2>
        <h2>Source: ${item.source}</h2>
        <p>
          Summary: ${item.summary}
        </p>
        </div>`;
      }
    
    function generateNewsItemsString(itemList) {
        const items = itemList.map(item => generateNewsItem(item));
        return items.join("");
      }

    //   function handleDeleteItemClicked() {
    //     $(".js-bookmarks-list").on("click", ".remove-bookmark-button", event => {
    //       const newFormShown = $("#js-bookmark-form").hasClass("hidden");
    //       // get the index of the item in store.items
    //       const id = getItemIdFromElement(event.currentTarget);
    //       // delete the item
    //       api.deleteItem(id, response => {
    //         store.findAndDelete(id);
    //         // render the updated bookmark list
    //         render();
    //         !$("#js-bookmark-form").hasClass("hidden") &&
    //           $("#min-rating-dropdown").hide();
    //       });
    //     });
    //   }
    
    //   function handleEditItemSubmit() {
    //     $(".js-bookmarks-list").on("click", ".edit-bookmark-item", event => {
    //       event.preventDefault();
    
    //       const id = getItemIdFromElement(event.currentTarget);
    //       const item = store.findById(id);
    //       $("#min-rating-dropdown").hide();
    //       $("#addItemButton").hide();
    //       $(".bookmarks-list").hide();
    //       const editForm = generateItemForm(item);
    //       $("#js-bookmark-form").show();
    //       $("#js-bookmark-form").html(editForm);
    //       $(`.js-bookmark-list-rating[value=${item.rating}]`)
    //         .prop("checked", "checked")
    //         .trigger("click");
    //     });
    //   }
})