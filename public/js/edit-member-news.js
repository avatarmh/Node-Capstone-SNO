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
    });
})







//       function handleDeleteItemClicked() {
//         $(".js-bookmarks-list").on("click", ".remove-bookmark-button", event => {
//           const newFormShown = $("#js-bookmark-form").hasClass("hidden");
//           // get the index of the item in store.items
//           const id = getItemIdFromElement(event.currentTarget);
//           // delete the item
//           api.deleteItem(id, response => {
//             store.findAndDelete(id);
//             // render the updated bookmark list
//             render();
//             !$("#js-bookmark-form").hasClass("hidden") &&
//               $("#min-rating-dropdown").hide();
//           });
//         });
//       }

//       function handleEditItemSubmit() {
//         $(".js-bookmarks-list").on("click", ".edit-bookmark-item", event => {
//           event.preventDefault();

//           const id = getItemIdFromElement(event.currentTarget);
//           const item = store.findById(id);
//           $("#min-rating-dropdown").hide();
//           $("#addItemButton").hide();
//           $(".bookmarks-list").hide();
//           const editForm = generateItemForm(item);
//           $("#js-bookmark-form").show();
//           $("#js-bookmark-form").html(editForm);
//           $(`.js-bookmark-list-rating[value=${item.rating}]`)
//             .prop("checked", "checked")
//             .trigger("click");
//         });
//       }
// })
